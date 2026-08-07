const evidence = [
  {id:'receipt',type:'Касовий чек',title:'До сплати 12 000 грн',preview:'Податкова складова - 2 000 грн',visual:'КАСОВИЙ ЧЕК\n\nТовар ............. 12 000 грн\nУ т.ч. податкова складова ... 2 000 грн\n\nДо сплати ......... 12 000 грн',copy:'Чек підтверджує фінальну суму та показує, що податкова складова вже входить у неї.',key:true},
  {id:'friend',type:'Порада знайомого',title:'«Магазин залишає 20% собі»',preview:'Припущення без документів',visual:'ЧАТ\n\n«Якщо до 10 000 додали 20%, то це просто націнка магазину. Отже, магазин заробив 2 000 грн».',copy:'Припущення змішує податкову складову з торговою націнкою та прибутком. Документального підтвердження воно не має.',key:false},
  {id:'base',type:'Рахунок',title:'Базова ціна - 10 000 грн',preview:'Сума до податкової складової',visual:'РАХУНОК\n\nБазова ціна товару: 10 000 грн\nПодаткова складова: окремо\nФінальна сума: після розрахунку',copy:'Документ задає базову суму, від якої в навчальному прикладі обчислюється податкова складова.',key:true},
  {id:'coupon',type:'Промокод',title:'Знижка 150 грн',preview:'Лише на наступну покупку',visual:'ПРОМОКОД\n\n-150 грн на наступне замовлення.\nУ поточній покупці не використано.',copy:'Промокод не вплинув на поточну суму 12 000 грн і не пояснює структуру цього чека.',key:false},
  {id:'rate',type:'Умова справи',title:'Ставка для розрахунку - 20%',preview:'Застосовується до базової ціни',visual:'УМОВА СПРАВИ\n\nБазова ціна: 10 000 грн\nЗадана ставка: 20%\n\nДля реальних операцій актуальні правила перевіряють окремо.',copy:'Цей матеріал прямо задає ставку, потрібну для навчального розрахунку.',key:true},
  {id:'invoice',type:'Розрахунок',title:'10 000 + 2 000 = 12 000 грн',preview:'Структура фінальної ціни',visual:'РОЗРАХУНОК\n\n10 000 грн × 20% = 2 000 грн\n10 000 грн + 2 000 грн = 12 000 грн',copy:'Розрахунок пов’язує базову ціну, задану ставку, податкову складову та фінальну суму.',key:true},
  {id:'review',type:'Відгук покупця',title:'«В іншому магазині дешевше»',preview:'Порівняння без структури чека',visual:'ВІДГУК\n\n«Бачив схожий товар дешевше на 700 грн».',copy:'Інша ціна може бути корисною для вибору магазину, але не пояснює, як сформовано саме цей чек.',key:false},
  {id:'note',type:'Пояснення',title:'Податок не дорівнює націнці',preview:'Різні економічні поняття',visual:'ПОЯСНЕННЯ\n\nПодаткова складова - елемент розрахунку ціни за правилами справи.\nНацінка - окреме рішення продавця щодо ціноутворення.\nЦі поняття не можна автоматично ототожнювати.',copy:'Податкова складова не є автоматично прибутком або націнкою магазину.',key:true}
];

const timelines = [
  {id:'a',label:'Розрахунок А',text:'10 000 × 20% = 2 000 грн; 10 000 + 2 000 = 12 000 грн.',correct:true},
  {id:'b',label:'Розрахунок Б',text:'12 000 × 20% = 2 400 грн, тому базова ціна дорівнює 9 600 грн.',correct:false},
  {id:'c',label:'Розрахунок В',text:'10 000 + 20 = 10 020 грн, бо 20% - це число 20.',correct:false},
  {id:'d',label:'Розрахунок Г',text:'12 000 грн неможливо розкласти на складові, тому чек нічого не пояснює.',correct:false}
];

const suspects = [
  {id:'markup',mark:'01',title:'Це автоматично націнка магазину',text:'Уся різниця між базовою і фінальною ціною нібито є заробітком продавця.',correct:false},
  {id:'separate',mark:'02',title:'Податок і націнку треба розрізняти',text:'У справі 2 000 грн - податкова складова за заданою ставкою. Вона не є автоматично чистим доходом магазину.',correct:true},
  {id:'bank',mark:'03',title:'Це комісія банку за оплату карткою',text:'Матеріали не містять такої банківської комісії. Суму пояснює структура ціни в чеку.',correct:false},
  {id:'discount',mark:'04',title:'Це наслідок невикористаного промокоду',text:'Промокод стосується наступної покупки і не впливає на поточну податкову складову.',correct:false}
];

const responses = [
  {id:'total',mark:'01',title:'Знайти фінальну суму до сплати',text:'Спочатку визначити, скільки покупець фактично сплачує за чеком.',correct:true},
  {id:'guess',mark:'02',title:'Будь-яку різницю назвати податком',text:'Різниця може виникнути через знижку, націнку, комплектацію чи інші умови.',correct:false},
  {id:'included',mark:'03',title:'Перевірити, чи податок уже включено',text:'Це допомагає не додати ту саму складову до ціни вдруге.',correct:true},
  {id:'terms',mark:'04',title:'Розділяти податок, націнку та прибуток',text:'Ці поняття впливають на ціну по-різному і не є взаємозамінними.',correct:true},
  {id:'rumor',mark:'05',title:'Повірити знайомому замість чека',text:'Фінансовий висновок будують на документах і розрахунках, а не на припущеннях.',correct:false},
  {id:'rules',mark:'06',title:'Перевірити актуальні правила',text:'Навчальна справа має задану ставку, а реальні податкові правила можуть змінюватися.',correct:true}
];

const state = {
  viewed:new Set(),
  selected:new Set(),
  timeline:null,
  suspect:null,
  responses:new Set(),
  evidenceScore:0,
  timelineScore:0,
  verdictScore:0,
  responseScore:0,
  currentEvidence:null,
  lastFocused:null
};

const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];

function renderEvidence(){
  $('#evidence-board').innerHTML = evidence.map((item,index) => `
    <button class="evidence-card" data-evidence="${item.id}" type="button" aria-label="Відкрити матеріал: ${item.title}">
      <span class="evidence-id">МАТЕРІАЛ ${String(index+1).padStart(2,'0')}</span>
      <span class="evidence-type">${item.type}</span>
      <strong>${item.title}</strong>
      <span class="evidence-preview">${item.preview}</span>
    </button>
  `).join('');
}

function renderChoices(){
  $('#timeline-options').innerHTML = timelines.map(item => `
    <button class="timeline-option" data-timeline="${item.id}" type="button">
      <span class="option-mark">${item.label.slice(-1)}</span>
      <span><strong>${item.label}</strong><span>${item.text}</span></span>
    </button>
  `).join('');
  $('#suspects').innerHTML = suspects.map(item => `
    <button class="suspect" data-suspect="${item.id}" type="button">
      <span class="option-mark">${item.mark}</span>
      <span><strong>${item.title}</strong><span>${item.text}</span></span>
    </button>
  `).join('');
  $('#response-list').innerHTML = responses.map(item => `
    <button class="response-option" data-response="${item.id}" type="button">
      <span class="option-mark">${item.mark}</span>
      <span><strong>${item.title}</strong><span>${item.text}</span></span>
    </button>
  `).join('');
}

function updateDashboard(stage=1){
  $('#dash-stage').textContent = `${stage} / 4`;
  $('#dash-viewed').textContent = `${state.viewed.size} / 8`;
  $('#dash-selected').textContent = `${state.selected.size} / 5`;
  const earned = state.evidenceScore + state.timelineScore + state.verdictScore + state.responseScore;
  const available = stage===1 ? 40 : stage===2 ? 60 : stage===3 ? 80 : 100;
  $('#dash-score').textContent = `${Math.round((earned/available)*100)||0}%`;
}

function openEvidence(id,trigger){
  const item = evidence.find(entry => entry.id===id);
  state.currentEvidence = id;
  state.lastFocused = trigger;
  state.viewed.add(id);
  trigger.classList.add('is-viewed');
  $('#modal-label').textContent = `Матеріал справи · ${item.type}`;
  $('#modal-title').textContent = item.title;
  $('#modal-visual').textContent = item.visual;
  $('#modal-copy').textContent = item.copy;
  updateModalButton();
  $('#evidence-modal').hidden = false;
  document.body.classList.add('modal-open');
  $('.modal-close').focus();
  updateEvidenceControls();
}

function updateModalButton(){
  const selected = state.selected.has(state.currentEvidence);
  $('#modal-select').textContent = selected ? 'Вилучити з матеріалів справи' : 'Долучити до матеріалів справи';
  $('#modal-select').classList.toggle('is-remove',selected);
}

function closeModal(){
  $('#evidence-modal').hidden = true;
  document.body.classList.remove('modal-open');
  state.currentEvidence = null;
  if(state.lastFocused) state.lastFocused.focus();
}

function toggleEvidence(){
  const id = state.currentEvidence;
  if(state.selected.has(id)){
    state.selected.delete(id);
  }else if(state.selected.size < 5){
    state.selected.add(id);
  }
  $$('.evidence-card').forEach(card => card.classList.toggle('is-selected',state.selected.has(card.dataset.evidence)));
  updateModalButton();
  updateEvidenceControls();
}

function updateEvidenceControls(){
  updateDashboard(1);
  const allViewed = state.viewed.size===8;
  const folderFull = state.selected.size===5;
  $('#check-evidence').disabled = !(allViewed && folderFull);
  $('#evidence-hint').textContent = !allViewed
    ? `Оглянуто ${state.viewed.size} із 8 матеріалів.`
    : !folderFull
      ? `Долучено ${state.selected.size} із 5 доказів.`
      : 'Матеріали оглянуто. Можна фіксувати докази.';
}

function showStage(id,number){
  $$('.stage').forEach(stage => stage.classList.remove('is-active'));
  $(id).classList.add('is-active');
  updateDashboard(number);
  window.scrollTo({top:$(id).offsetTop-90,behavior:'smooth'});
}

function checkEvidence(){
  const correct = evidence.filter(item => item.key).map(item => item.id);
  const hits = correct.filter(id => state.selected.has(id)).length;
  state.evidenceScore = hits*8;
  showStage('#stage-timeline',2);
}

function chooseSingle(selector,key,id,button){
  state[key] = id;
  $$(selector).forEach(item => item.classList.remove('is-selected'));
  button.classList.add('is-selected');
}

function checkTimeline(){
  state.timelineScore = timelines.find(item => item.id===state.timeline)?.correct ? 20 : 0;
  showStage('#stage-verdict',3);
}

function checkVerdict(){
  state.verdictScore = suspects.find(item => item.id===state.suspect)?.correct ? 20 : 0;
  showStage('#stage-response',4);
}

function toggleResponse(id,button){
  if(state.responses.has(id)){
    state.responses.delete(id);
    button.classList.remove('is-selected');
  }else if(state.responses.size < 4){
    state.responses.add(id);
    button.classList.add('is-selected');
  }
  $('#finish-button').disabled = state.responses.size!==4;
  $('#response-hint').textContent = `Обрано ${state.responses.size} із 4 дій.`;
}

function finish(){
  const correctChosen = responses.filter(item => item.correct && state.responses.has(item.id)).length;
  state.responseScore = correctChosen*5;
  const score = state.evidenceScore + state.timelineScore + state.verdictScore + state.responseScore;
  $('#stage-response').classList.remove('is-active');
  $('.case-dashboard').style.display = 'none';
  $('#result').classList.add('is-visible');
  $('#result-score').textContent = `${score} / 100`;
  const level = score>=90
    ? ['Структуру ціни розкрито точно','Ви правильно відділили базову ціну, податкову складову та фінальну суму й не сплутали податок із націнкою продавця.']
    : score>=70
      ? ['Справу розкрито','Головний розрахунок установлено. У рапорті залишилися неточності, але вони не завадили зрозуміти структуру ціни.']
      : ['Висновок потребує перевірки','Частину документів або правил читання ціни визначено неточно. Перегляньте докази та спробуйте ще раз.'];
  $('#result-title').textContent = level[0];
  $('#result-lead').textContent = level[1];
  const missed = evidence.filter(item => item.key && !state.selected.has(item.id)).map(item => item.title);
  const noise = evidence.filter(item => !item.key && state.selected.has(item.id)).map(item => item.title);
  const wrongResponses = responses.filter(item => !item.correct && state.responses.has(item.id)).map(item => item.title);
  $('#report-content').innerHTML = `
    <p><strong>Докази:</strong> ${state.evidenceScore===40 ? 'усі п’ять ключових матеріалів визначено правильно.' : `пропущено: ${missed.join(', ')||'немає'}; зайві матеріали: ${noise.join(', ')||'немає'}.`}</p>
    <p><strong>Розрахунок:</strong> ${state.timelineScore ? '10 000 × 20% = 2 000 грн; 10 000 + 2 000 = 12 000 грн.' : 'обраний розрахунок не відповідає документам справи.'}</p>
    <p><strong>Висновок:</strong> ${state.verdictScore ? 'податкову складову правильно відокремлено від націнки та прибутку.' : 'обране твердження змішує різні складові ціни.'}</p>
    <p><strong>Перевірка:</strong> ${state.responseScore===20 ? 'усі чотири корисні дії визначено правильно.' : `помилкові дії: ${wrongResponses.join(', ')||'частину необхідних дій не обрано'}.`}</p>
  `;
  window.scrollTo({top:$('#result').offsetTop-30,behavior:'smooth'});
}

function reset(){
  state.viewed.clear();
  state.selected.clear();
  state.responses.clear();
  state.timeline = null;
  state.suspect = null;
  state.evidenceScore = state.timelineScore = state.verdictScore = state.responseScore = 0;
  $('.case-dashboard').style.display = 'grid';
  $('#result').classList.remove('is-visible');
  $$('.is-selected,.is-viewed').forEach(item => item.classList.remove('is-selected','is-viewed'));
  $('#check-timeline').disabled = true;
  $('#check-verdict').disabled = true;
  $('#finish-button').disabled = true;
  $('#response-hint').textContent = 'Оберіть 4 дії.';
  showStage('#stage-evidence',1);
  updateEvidenceControls();
}

renderEvidence();
renderChoices();
$('#start-button').addEventListener('click',()=>{
  $('#investigation').classList.add('is-visible');
  $('#briefing').style.display = 'none';
  window.scrollTo({top:$('#investigation').offsetTop-20,behavior:'smooth'});
});
$('#evidence-board').addEventListener('click',event=>{
  const card = event.target.closest('[data-evidence]');
  if(card) openEvidence(card.dataset.evidence,card);
});
$('#modal-select').addEventListener('click',toggleEvidence);
$$('[data-close-modal]').forEach(item => item.addEventListener('click',closeModal));
document.addEventListener('keydown',event=>{
  if(event.key==='Escape' && !$('#evidence-modal').hidden) closeModal();
});
$('#check-evidence').addEventListener('click',checkEvidence);
$('#timeline-options').addEventListener('click',event=>{
  const button = event.target.closest('[data-timeline]');
  if(!button) return;
  chooseSingle('.timeline-option','timeline',button.dataset.timeline,button);
  $('#check-timeline').disabled = false;
});
$('#check-timeline').addEventListener('click',checkTimeline);
$('#suspects').addEventListener('click',event=>{
  const button = event.target.closest('[data-suspect]');
  if(!button) return;
  chooseSingle('.suspect','suspect',button.dataset.suspect,button);
  $('#check-verdict').disabled = false;
});
$('#check-verdict').addEventListener('click',checkVerdict);
$('#response-list').addEventListener('click',event=>{
  const button = event.target.closest('[data-response]');
  if(button) toggleResponse(button.dataset.response,button);
});
$('#finish-button').addEventListener('click',finish);
$('#restart-button').addEventListener('click',reset);
