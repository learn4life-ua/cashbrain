from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit,unquote
import hashlib, subprocess
ROOT=Path(__file__).resolve().parents[1]
class Page(HTMLParser):
    def __init__(self,s):
        super().__init__(); self.links=[]; self.ids=set(); self.crumbs=0; self.current=0; self.feed(s)
    def handle_starttag(self,tag,attrs):
        a=dict(attrs)
        if 'id' in a:self.ids.add(a['id'])
        if tag=='a' and 'href' in a:self.links.append(a['href'])
        if tag=='nav' and a.get('aria-label')=='Хлібні крихти':self.crumbs+=1
        if tag=='span' and a.get('aria-current')=='page':self.current+=1
pages={p:Page(p.read_text(encoding='utf8')) for p in ROOT.rglob('*.html')}
errors=[]; count=0
for p,data in pages.items():
    for href in data.links:
        u=urlsplit(href)
        if u.scheme or u.netloc:continue
        count+=1
        target=(p.parent/unquote(u.path)).resolve() if u.path else p
        if target.is_dir():target=target/'index.html'
        if not target.exists():errors.append((str(p.relative_to(ROOT)),href,'missing file'))
        elif u.fragment and target in pages and unquote(u.fragment) not in pages[target].ids:errors.append((str(p.relative_to(ROOT)),href,'missing anchor'))
    expected=0 if p==ROOT/'index.html' else 1
    if data.crumbs!=expected or data.current!=expected:errors.append((str(p.relative_to(ROOT)),'breadcrumbs',data.crumbs,data.current))
reachable={ROOT/'index.html'}
while True:
    before=len(reachable)
    for p in list(reachable):
        for href in pages[p].links:
            u=urlsplit(href)
            if u.scheme or u.netloc:continue
            target=(p.parent/unquote(u.path)).resolve() if u.path else p
            if target.is_dir():target=target/'index.html'
            if target in pages:reachable.add(target)
    if len(reachable)==before:break
print({'pages':len(pages),'internal_links':count,'errors':errors,'unreachable':[str(p.relative_to(ROOT)) for p in pages if p not in reachable]})

assert not errors, errors
assert len(reachable)==len(pages), "Unreachable pages"
