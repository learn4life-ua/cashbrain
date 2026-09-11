const {evidence, timelines, suspects, responses} = caseData;
const state={viewed:new Set(),selected:new Set(),timeline:null,suspect:null,responses:new Set(),evidenceScore:0,timelineScore:0,verdictScore:0,responseScore:0,currentEvidence:null};
const $=s=>document.querySelector(s);
const $$=s=>[...document.querySelectorAll(s)];

function renderEvidence(){
  const marks=Object.fromEntries(evidence.map((item,i)=>[item.id,String(i+1).padStart(2,"0")]));
  const cards=evidence.map((item,i)=>`<button class="evidence-card" data-evidence="${item.id}" data-kind="${item.id}" type="button" aria-label="Відкрити матеріал: ${item.title}"><span class="evidence-pin" aria-hidden="true"></span><span class="evidence-topline"><span class="evidence-id">МАТЕРІАЛ ${String(i+1).padStart(2,'0')}</span><span class="evidence-state">Не оглянуто</span></span><span class="evidence-icon" aria-hidden="true">${marks[item.id]}</span><span class="evidence-type">${item.type}</span><strong>${item.title}</strong><span class="evidence-preview">${item.preview}</span><span class="evidence-open">Відкрити матеріал →</span></button>`).join('');
  $('#evidence-board').innerHTML=`<div class="board-toolbar"><div><span>Слідча дошка · справа ${caseData.code}</span><strong>Матеріали справи</strong></div><div class="board-counter"><span>Оглянуто</span><strong id="board-viewed">0 / 8</strong></div></div><div class="board-canvas">${cards}</div><section class="selection-folder" aria-labelledby="selection-title"><div class="selection-folder-head"><div><span>РОБОЧА ПАПКА</span><strong id="selection-title">Докази, долучені до справи</strong></div><small>Оберіть рівно 5 матеріалів</small></div><ol id="selected-evidence" class="selected-evidence" aria-live="polite"></ol></section>`;
}
function renderChoices(){
  $('#timeline-options').innerHTML=timelines.map(x=>`<button class="timeline-option" data-timeline="${x.id}" type="button"><span class="option-mark">${x.label.slice(-1)}</span><span><strong>${x.label}</strong><span>${x.text}</span></span></button>`).join('');
  $('#suspects').innerHTML=suspects.map(x=>`<button class="suspect" data-suspect="${x.id}" type="button"><span class="option-mark">${x.mark}</span><span><strong>${x.title}</strong><span>${x.text}</span></span></button>`).join('');
  $('#response-list').innerHTML=responses.map(x=>`<button class="response-option" data-response="${x.id}" type="button"><span class="option-mark">${x.mark}</span><span><strong>${x.title}</strong><span>${x.text}</span></span></button>`).join('');
}
function updateDashboard(stage=1){
  $('#dash-stage').textContent=`${stage} / 4`;
  $('#dash-viewed').textContent=`${state.viewed.size} / 8`;
  $('#dash-selected').textContent=`${state.selected.size} / 5`;
  const earned=state.evidenceScore+state.timelineScore+state.verdictScore+state.responseScore;
  const available=stage===1?40:stage===2?60:stage===3?80:100;
  $('#dash-score').textContent=`${Math.round((earned/available)*100)||0}%`;
}
function openEvidence(id){
  const item=evidence.find(x=>x.id===id);state.currentEvidence=id;state.viewed.add(id);
  $(`[data-evidence="${id}"]`).classList.add('is-viewed');
  $('#modal-label').textContent=`Матеріал справи · ${item.type}`;$('#modal-title').textContent=item.title;$('#modal-visual').textContent=item.visual;$('#modal-copy').textContent=item.copy;
  updateModalButton();$('#evidence-modal').hidden=false;$('.modal-close').focus();document.body.classList.add('modal-open');updateEvidenceControls();
}
function updateModalButton(){const selected=state.selected.has(state.currentEvidence);$('#modal-select').textContent=selected?'Вилучити з матеріалів справи':'Долучити до матеріалів справи';$('#modal-select').classList.toggle('is-remove',selected);$('#modal-select').disabled=!selected&&state.selected.size===5;if(!selected&&state.selected.size===5)$('#modal-select').textContent='Папка повна: спершу вилучіть один доказ'}
function closeModal(){const id=state.currentEvidence;$('#evidence-modal').hidden=true;document.body.classList.remove('modal-open');state.currentEvidence=null;$(`[data-evidence="${id}"]`)?.focus()}
function toggleEvidence(){
  const id=state.currentEvidence;if(state.selected.has(id))state.selected.delete(id);else if(state.selected.size<5)state.selected.add(id);
  updateModalButton();updateEvidenceControls();
}
function refreshBoardState(){
  const selectedItems=[...state.selected].map(id=>evidence.find(item=>item.id===id));
  document.querySelectorAll('.evidence-card').forEach(card=>{
    const id=card.dataset.evidence;
    const status=card.querySelector('.evidence-state');
    const selected=state.selected.has(id);
    const viewed=state.viewed.has(id);
    card.classList.toggle('is-selected',selected);
    card.classList.toggle('is-viewed',viewed);
    card.setAttribute('aria-pressed',String(selected));status.textContent=selected?'Долучено':viewed?'Оглянуто':'Не оглянуто';
  });
  $('#board-viewed').textContent=`${state.viewed.size} / 8`;
  $('#selected-evidence').innerHTML=Array.from({length:5},(_,index)=>{
    const item=selectedItems[index];
    return item?`<li class="is-filled"><span>${index+1}</span><strong>${item.title}</strong><button type="button" data-remove-evidence="${item.id}" aria-label="Вилучити доказ ${item.title}">×</button></li>`:`<li class="is-empty"><span>${index+1}</span><em>Вільне місце для доказу</em></li>`;
  }).join('');
}
function updateEvidenceControls(){
  refreshBoardState();updateDashboard(1);const all=state.viewed.size===8,full=state.selected.size===5;$('#check-evidence').disabled=!(all&&full);
  $('#evidence-hint').textContent=!all?`Оглянуто ${state.viewed.size} із 8 матеріалів.`:!full?`Долучено ${state.selected.size} із 5 доказів.`:'Матеріали оглянуто. Можна фіксувати версію.';
}
function showStage(id,number){$$('.stage').forEach(x=>x.classList.remove('is-active'));$(id).classList.add('is-active');updateDashboard(number);window.scrollTo({top:$(id).offsetTop-90,behavior:'smooth'})}
function checkEvidence(){const correct=evidence.filter(x=>x.key).map(x=>x.id);const hits=correct.filter(id=>state.selected.has(id)).length;state.evidenceScore=hits*8;showStage('#stage-timeline',2)}
function chooseSingle(selector,key,id,button){state[key]=id;$$(selector).forEach(x=>x.classList.remove('is-selected'));button.classList.add('is-selected');$$(selector).forEach(x=>x.setAttribute('aria-pressed',String(x===button)))}
function checkTimeline(){state.timelineScore=timelines.find(x=>x.id===state.timeline)?.correct?20:0;showStage('#stage-verdict',3)}
function checkVerdict(){state.verdictScore=suspects.find(x=>x.id===state.suspect)?.correct?20:0;showStage('#stage-response',4)}
function toggleResponse(id,button){if(state.responses.has(id)){state.responses.delete(id);button.classList.remove('is-selected')}else if(state.responses.size<4){state.responses.add(id);button.classList.add('is-selected')}$$('.response-option').forEach(x=>x.setAttribute('aria-pressed',String(state.responses.has(x.dataset.response))));$('#finish-button').disabled=state.responses.size!==4;$('#response-hint').textContent=`Обрано ${state.responses.size} із 4 дій.`}
function finish(){
const correctChosen=responses.filter(x=>x.correct&&state.responses.has(x.id)).length;state.responseScore=correctChosen*5;
const score=state.evidenceScore+state.timelineScore+state.verdictScore+state.responseScore;
$('#stage-response').classList.remove('is-active');$('.case-dashboard').style.display='none';$('#result').classList.add('is-visible');$('#result-score').textContent=`${score} / 100`;
const level=score>=90?'Справу розкрито бездоганно':score>=70?'Справу розкрито':'Висновок потребує уточнення';
$('#result-title').textContent=level;
$('#result-lead').textContent=score===100?'Усі ключові докази, розрахунок, висновок і план дій визначено правильно.':'Перегляньте рапорт: він показує ваші рішення та пояснює, що варто уточнити.';
const missed=evidence.filter(x=>x.key&&!state.selected.has(x.id)).map(x=>x.title);
const noise=evidence.filter(x=>!x.key&&state.selected.has(x.id)).map(x=>x.title);
const wrong=responses.filter(x=>!x.correct&&state.responses.has(x.id)).map(x=>x.title);
const missingActions=responses.filter(x=>x.correct&&!state.responses.has(x.id)).map(x=>x.title);
const chosenCalculation=timelines.find(x=>x.id===state.timeline);
const chosenVerdict=suspects.find(x=>x.id===state.suspect);
$('#report-content').innerHTML=`<p><strong>Докази — ${state.evidenceScore}/40:</strong> пропущено: ${missed.join(', ')||'немає'}; зайві: ${noise.join(', ')||'немає'}.</p><p><strong>Розрахунок — ${state.timelineScore}/20:</strong> ${chosenCalculation.text}</p><p>${caseData.calculation}</p><p><strong>Висновок — ${state.verdictScore}/20:</strong> ${chosenVerdict.title}.</p><p>${caseData.conclusion}</p><p><strong>План дій — ${state.responseScore}/20:</strong> хибні дії: ${wrong.join(', ')||'немає'}; пропущені: ${missingActions.join(', ')||'немає'}.</p>`;
window.scrollTo({top:$('#result').offsetTop-30,behavior:'smooth'});}
function reset(){$$('[aria-pressed]').forEach(x=>x.setAttribute('aria-pressed','false'));state.viewed.clear();state.selected.clear();state.responses.clear();state.timeline=null;state.suspect=null;state.evidenceScore=state.timelineScore=state.verdictScore=state.responseScore=0;$('.case-dashboard').style.display='grid';$('#result').classList.remove('is-visible');$$('.is-selected,.is-viewed').forEach(x=>x.classList.remove('is-selected','is-viewed'));$('#check-timeline').disabled=true;$('#check-verdict').disabled=true;$('#finish-button').disabled=true;$('#response-hint').textContent='Оберіть 4 дії.';showStage('#stage-evidence',1);updateEvidenceControls()}

renderEvidence();renderChoices();
$('#start-button').addEventListener('click',()=>{$('#investigation').classList.add('is-visible');$('#briefing').style.display='none';window.scrollTo({top:$('#investigation').offsetTop-20,behavior:'smooth'})});
$('#evidence-board').addEventListener('click',e=>{
  const remove=e.target.closest('[data-remove-evidence]');
  if(remove){state.selected.delete(remove.dataset.removeEvidence);updateEvidenceControls();return;}
  const card=e.target.closest('[data-evidence]');
  if(card)openEvidence(card.dataset.evidence);
});
$('#modal-select').addEventListener('click',toggleEvidence);$$('[data-close-modal]').forEach(x=>x.addEventListener('click',closeModal));document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!$('#evidence-modal').hidden)closeModal()});
$('#check-evidence').addEventListener('click',checkEvidence);
$('#timeline-options').addEventListener('click',e=>{const b=e.target.closest('[data-timeline]');if(!b)return;chooseSingle('.timeline-option','timeline',b.dataset.timeline,b);$('#check-timeline').disabled=false});
$('#check-timeline').addEventListener('click',checkTimeline);
$('#suspects').addEventListener('click',e=>{const b=e.target.closest('[data-suspect]');if(!b)return;chooseSingle('.suspect','suspect',b.dataset.suspect,b);$('#check-verdict').disabled=false});
$('#check-verdict').addEventListener('click',checkVerdict);
$('#response-list').addEventListener('click',e=>{const b=e.target.closest('[data-response]');if(b)toggleResponse(b.dataset.response,b)});
$('#finish-button').addEventListener('click',finish);$('#restart-button').addEventListener('click',reset);

document.addEventListener('keydown',event=>{
  if(event.key!=='Tab'||$('#evidence-modal').hidden)return;
  const controls=[$('.modal-close'),$('#modal-select')].filter(x=>!x.disabled);
  const first=controls[0],last=controls[controls.length-1];
  if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus()}
  else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus()}
});
