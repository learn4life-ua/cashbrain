"""Regenerate static navigation after adding pages or renaming sections."""
from pathlib import Path
from html import escape, unescape
import re

ROOT = Path(__file__).resolve().parents[1]
SECTIONS = {
    'simulators': 'Симулятори',
    'calculators': 'Калькулятори',
    'tests': 'Тести',
    'interactive-cases': 'Інтерактивні кейси',
    'worksheets': 'Робочі аркуші',
    'financial-investigations': 'Фінансові розслідування',
}

for file in ROOT.rglob('*.html'):
    rel = file.relative_to(ROOT)
    if len(rel.parts)>1 and rel.parts[0] not in SECTIONS:
        continue
    text = file.read_text(encoding='utf-8')
    prefix = '../' * (len(rel.parts)-1) or './'
    section = rel.parts[0] if len(rel.parts)>1 else None
    home = section is None
    h1 = re.search(r'<h1\b[^>]*>(.*?)</h1>', text, re.S)
    title = re.sub(r'\s+', ' ', unescape(re.sub(r'<[^>]+>', ' ', h1[1]))).strip()
    # Capture section anchors before replacing the old header.
    old = re.search(r'<header class="(?:site-header|cb-topbar)"[^>]*>.*?</header>', text, re.S)
    anchors = re.findall(r'<a[^>]*href="(#[^"]+)"[^>]*>(.*?)</a>', old[0], re.S) if old else []
    anchor_links = ''.join(f'<a href="{href}">{label}</a>' for href,label in anchors)
    links = ''.join(f'<li><a href="{prefix}{slug}/"'+ (' aria-current="page"' if section==slug and len(rel.parts)==2 else ' aria-current="true"' if section==slug else '')+f'>{label}</a></li>' for slug,label in SECTIONS.items())
    trail = ''
    if not home:
        items = f'<li><a href="{prefix}">Головна</a></li>'
        if len(rel.parts)>2:
            items += f'<li><a href="../">{SECTIONS[section]}</a></li><li><span aria-current="page">{escape(title)}</span></li>'
        else:
            items += f'<li><span aria-current="page">{SECTIONS[section]}</span></li>'
        trail = f'<div class="cb-trail"><nav class="cb-shell-width" aria-label="Хлібні крихти"><ol>{items}</ol></nav></div>'
    header = f'''<!-- cashbrain-navigation:start -->
<header class="cb-header"><div class="cb-shell-width cb-header-inner">
  <a class="cb-logo" href="{prefix}" aria-label="CASHBRAIN — головна"><span class="cb-logo-mark" aria-hidden="true"><img src="{prefix}assets/cashbrain-logo.png" alt="" width="1170" height="1170"></span><strong>CASHBRAIN</strong></a>
  <nav class="cb-global-nav" aria-label="Головна навігація">
    <details class="cb-menu"><summary>Усі формати</summary><ul>{links}</ul></details>
    {anchor_links}<a href="https://cashbrain.agrokoledg.poltava.ua/">Сайт проєкту ↗</a>
  </nav>
</div></header>
{trail}
<!-- cashbrain-navigation:end -->'''
    if 'cashbrain-navigation:start' in text:
        # Preserve anchor shortcuts on regeneration.
        previous = re.search(r'<!-- cashbrain-navigation:start -->.*?<!-- cashbrain-navigation:end -->', text, re.S)[0]
        if not anchors:
            old_anchors = ''.join(re.findall(r'<a href="#[^"]+">.*?</a>', previous))
            header = header.replace('    <a href="https://cashbrain', '    '+old_anchors+'<a href="https://cashbrain')
        text = re.sub(r'<!-- cashbrain-navigation:start -->.*?<!-- cashbrain-navigation:end -->', lambda _:header, text, count=1, flags=re.S)
    elif old:
        text = text[:old.start()] + header + text[old.end():]
    else:
        text = re.sub(r'(<body[^>]*>)', lambda m:m[0]+'\n'+header, text, count=1)
    text = re.sub(r'<div class="(?:breadcrumb|breadcrumbs)">.*?</div>', '', text, flags=re.S)
    if 'assets/ui.css' not in text:
        text = text.replace('</head>', f'<link rel="stylesheet" href="{prefix}assets/ui.css">\n</head>')
    if 'rel="icon"' not in text:
        text = text.replace('</head>', f'<link rel="icon" type="image/png" href="{prefix}assets/cashbrain-logo.png">\n</head>')
    if 'cb-shell' not in re.search(r'<body[^>]*>', text)[0]:
        text = text.replace('<body>', '<body class="cb-shell">', 1)
        text = re.sub(r'<body class="(cb-page[^"]*)">', r'<body class="\1 cb-shell">', text, count=1)
    # Make internal links work on previews and any deployment base path.
    text = text.replace('https://learn4life-ua.github.io/cashbrain/', prefix)
    text = re.sub(r'^[ \t]+$', '', text, flags=re.M)
    file.write_text(text, encoding='utf-8', newline='\n')
print('Navigation synchronized')
