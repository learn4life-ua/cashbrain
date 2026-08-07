const evidence = [
  {id:'order',type:'Сторінка замовлення',title:'Навушники за 4 800 грн',preview:'Оплата переказом на номер картки',visual:'ЗАМОВЛЕННЯ № 1847\n\nБездротові навушники .... 4 800 грн\nДоставка ................ за тарифом перевізника\nОплата .................. переказ на картку\n\nРеквізити підприємницького рахунку не надано.',copy:'Замовлення пов’язує товар, суму й обраний спосіб оплати. Воно показує, що покупцеві запропонували картковий переказ, а не платіж на підприємницький рахунок за реквізитами IBAN.',key:true,mark:'WEB'},
  {id:'chat',type:'Листування',title:'«Скиньте на особисту картку»',preview:'Чек обіцяють покласти в посилку',visual:'ЛИСТУВАННЯ З ПРОДАВЦЕМ\n\nПродавець: «Оплатіть 4 800 грн на номер картки».\nПокупець: «Фіскальний чек буде?»\nПродавець: «Так, папірець покладемо в посилку».',copy:'Листування підтверджує спосіб оплати та обіцянку надати чек. Саме слово «чек» ще не доводить, що документ буде фіскальним.',key:true,mark:'CHAT'},
  {id:'bank',type:'Банківська квитанція',title:'Переказ 4 800 грн виконано',preview:'Отримувач - фізична особа',visual:'БАНКІВСЬКА КВИТАНЦІЯ\n\nОперація .......... переказ з картки на картку\nСума .............. 4 800,00 грн\nСтатус ............ виконано\nОтримувач ......... фізична особа\n\nФіскальних реквізитів продавця немає.',copy:'Квитанція підтверджує факт переказу коштів. Вона не є розрахунковим документом продавця, сформованим РРО/ПРРО, і не замінює фіскальний чек у цій ситуації.',key:true,mark:'BANK'},
  {id:'paper',type:'Документ із посилки',title:'Папірець «Товарний чек»',preview:'Без фіскального номера РРО/ПРРО',visual:'ТОВАРНИЙ ЧЕК\n\nНавушники .............. 4 800 грн\nДата ................... 06.08.2026\nПідпис ................. продавець\n\nФіскальний номер чека відсутній.\nФіскальний номер РРО/ПРРО відсутній.\nДані для перевірки в ДПС відсутні.',copy:'Документ містить назву товару й суму, але не має фіскальних реквізитів. Тому він не підтверджує, що розрахункову операцію зареєстровано через РРО/ПРРО.',key:true,mark:'DOC'},
  {id:'search',type:'Сервіс ДПС',title:'Фіскальна перевірка неможлива',preview:'У документі немає даних для пошуку',visual:'ЕЛЕКТРОННИЙ КАБІНЕТ ДПС\nСЕРВІС «ПОШУК ФІСКАЛЬНОГО ЧЕКА»\n\nДля пошуку потрібні фіскальні реквізити документа.\n\nУ папірці продавця:\nСума .............. 4 800 грн\nФіскальний номер .. відсутній\nНомер РРО/ПРРО ..... відсутній\nЧас операції ....... відсутній\n\nПеревірити документ як фіскальний чек неможливо.',copy:'Сервіс ДПС показує, яких даних бракує для перевірки. Разом з іншими матеріалами це підтверджує, що продавець не надав покупцеві належного фіскального чека.',key:true,mark:'DPS'},
  {id:'waybill',type:'Накладна перевізника',title:'Посилку доставлено',preview:'Вага 0,7 кг · відділення 12',visual:'ЕКСПРЕС-НАКЛАДНА\n\nВідправлення прийнято ........ 06.08.2026\nВага ........................ 0,7 кг\nСтатус ...................... отримано\n\nОголошена вартість не є фіскальним чеком продавця.',copy:'Накладна підтверджує пересилання й отримання посилки. Вона не показує, чи зареєстрував продавець розрахункову операцію.',key:false,mark:'BOX'},
  {id:'warranty',type:'Гарантійний талон',title:'Гарантія на 12 місяців',preview:'Модель і серійний номер товару',visual:'ГАРАНТІЙНИЙ ТАЛОН\n\nТовар ............. бездротові навушники\nСерійний номер .... HPH-04800\nСтрок гарантії .... 12 місяців',copy:'Гарантійний талон стосується обслуговування товару. Він не підтверджує реєстрацію оплати через РРО/ПРРО.',key:false,mark:'12M'},
  {id:'review',type:'Відгук покупця',title:'«Замовляв раніше - усе добре»',preview:'Особиста думка без документів',visual:'ВІДГУК\n\n«Купував у них торік. Доставили швидко, навушники працюють».',copy:'Позитивний досвід іншого покупця не підтверджує, що саме цю операцію проведено офіційно та що фіскальний чек сформовано.',key:false,mark:'★'}
];

const timelines = [
  {id:'a',label:'Пояснення А',text:'Банківська квитанція доводить переказ коштів; товарний документ описує покупку; фіскальний чек РРО/ПРРО підтверджує реєстрацію розрахункової операції.',correct:true},
  {id:'b',label:'Пояснення Б',text:'Будь-яка квитанція мобільного банку автоматично є фіскальним чеком продавця.',correct:false},
  {id:'c',label:'Пояснення В',text:'Накладна перевізника замінює всі документи, бо товар уже доставлено покупцеві.',correct:false},
  {id:'d',label:'Пояснення Г',text:'Достатньо рукописного папірця із сумою, навіть якщо операцію неможливо перевірити в ДПС.',correct:false}
];

const suspects = [
  {id:'alltax',mark:'01',title:'Продавець точно не сплатив жодного податку',text:'Відсутність чека нібито автоматично доводить усі можливі податкові порушення.',correct:false},
  {id:'violation',mark:'02',title:'Є ознаки незареєстрованої розрахункової операції',text:'Картковий переказ прийнято, але належний фіскальний чек не надано й перевірити його в сервісі ДПС неможливо. Це потребує офіційної перевірки.',correct:true},
  {id:'bankproof',mark:'03',title:'Банк уже підтвердив офіційність продажу',text:'Банк підтвердив переказ, але не реєстрацію продажу через РРО/ПРРО.',correct:false},
  {id:'buyerfault',mark:'04',title:'Покупець сам мав сформувати фіскальний чек',text:'Розрахунковий документ покупцеві надає продавець, який проводить операцію.',correct:false}
];

const responses = [
  {id:'request',mark:'01',title:'Попросити належний фіскальний чек',text:'Вимагати паперовий або електронний розрахунковий документ із фіскальними реквізитами.',correct:true},
  {id:'verify',mark:'02',title:'Перевірити чек у сервісі ДПС',text:'Скористатися сервісом «Пошук фіскального чека» та звірити дані операції.',correct:true},
  {id:'delete',mark:'03',title:'Видалити листування після доставки',text:'Так покупець втратить частину доказів про умови продажу та спосіб оплати.',correct:false},
  {id:'save',mark:'04',title:'Зберегти всі матеріали покупки',text:'Зберегти оголошення, чат, банківську квитанцію, документи з посилки й результат перевірки.',correct:true},
  {id:'publish',mark:'05',title:'Опублікувати повний номер картки продавця',text:'Поширення платіжних реквізитів у відкритому доступі не замінює офіційного звернення.',correct:false},
  {id:'report',mark:'06',title:'Повідомити ДПС про можливе порушення',text:'Якщо продавець не надає чек або документ не знаходиться в реєстрі, передати факти для офіційної перевірки.',correct:true}
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
  const cards = evidence.map((item,index) => `
    <button class="evidence-card" data-evidence="${item.id}" data-kind="${item.id}" type="button" aria-label="Відкрити матеріал: ${item.title}">
      <span class="evidence-pin" aria-hidden="true"></span>
      <span class="evidence-topline"><span class="evidence-id">МАТЕРІАЛ ${String(index+1).padStart(2,'0')}</span><span class="evidence-state">Не оглянуто</span></span>
      <span class="evidence-icon" aria-hidden="true">${item.mark}</span>
      <span class="evidence-type">${item.type}</span>
      <strong>${item.title}</strong>
      <span class="evidence-preview">${item.preview}</span>
      <span class="evidence-open">Відкрити матеріал →</span>
    </button>
  `).join('');
  $('#evidence-board').innerHTML = `
    <div class="board-toolbar"><div><span>Слідча дошка · справа CB-04800</span><strong>Матеріали покупки</strong></div><div class="board-counter"><span>Оглянуто</span><strong id="board-viewed">0 / 8</strong></div></div>
    <div class="board-canvas">${cards}</div>
    <section class="selection-folder" aria-labelledby="selection-title">
      <div class="selection-folder-head"><div><span>РОБОЧА ПАПКА</span><strong id="selection-title">Докази, долучені до справи</strong></div><small>Оберіть рівно 5 матеріалів</small></div>
      <ol id="selected-evidence" class="selected-evidence" aria-live="polite"></ol>
    </section>`;
}

function renderChoices(){
  $('#timeline-options').innerHTML = timelines.map(item => `<button class="timeline-option" data-timeline="${item.id}" type="button"><span class="option-mark">${item.label.slice(-1)}</span><span><strong>${item.label}</strong><span>${item.text}</span></span></button>`).join('');
  $('#suspects').innerHTML = suspects.map(item => `<button class="suspect" data-suspect="${item.id}" type="button"><span class="option-mark">${item.mark}</span><span><strong>${item.title}</strong><span>${item.text}</span></span></button>`).join('');
  $('#response-list').innerHTML = responses.map(item => `<button class="response-option" data-response="${item.id}" type="button"><span class="option-mark">${item.mark}</span><span><strong>${item.title}</strong><span>${item.text}</span></span></button>`).join('');
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
  if(state.selected.has(id)) state.selected.delete(id);
  else if(state.selected.size < 5) state.selected.add(id);
  updateModalButton();
  updateEvidenceControls();
}

function refreshBoardState(){
  const selectedItems = [...state.selected].map(id => evidence.find(item => item.id===id));
  $$('.evidence-card').forEach(card => {
    const id = card.dataset.evidence;
    const selected = state.selected.has(id);
    const viewed = state.viewed.has(id);
    card.classList.toggle('is-selected',selected);
    card.classList.toggle('is-viewed',viewed);
    card.querySelector('.evidence-state').textContent = selected ? 'Долучено' : viewed ? 'Оглянуто' : 'Не оглянуто';
  });
  $('#board-viewed').textContent = `${state.viewed.size} / 8`;
  $('#selected-evidence').innerHTML = Array.from({length:5},(_,index) => {
    const item = selectedItems[index];
    return item
      ? `<li class="is-filled"><span>${index+1}</span><strong>${item.title}</strong><button type="button" data-remove-evidence="${item.id}" aria-label="Вилучити доказ ${item.title}">×</button></li>`
      : `<li class="is-empty"><span>${index+1}</span><em>Вільне місце для доказу</em></li>`;
  }).join('');
}

function updateEvidenceControls(){
  refreshBoardState();
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
    ? ['Фіскальний слід відновлено','Ви правильно розрізнили документи, встановили ознаки незареєстрованої операції та обрали обґрунтовані дії покупця.']
    : score>=70
      ? ['Справу розкрито','Головну проблему встановлено. У рапорті залишилися неточності, але ви не сплутали переказ коштів із фіскальним чеком.']
      : ['Висновок потребує перевірки','Частина документів отримала неправильне значення. Перегляньте, що доводить банківська квитанція, а що - фіскальний чек РРО/ПРРО.'];
  $('#result-title').textContent = level[0];
  $('#result-lead').textContent = level[1];
  const missed = evidence.filter(item => item.key && !state.selected.has(item.id)).map(item => item.title);
  const noise = evidence.filter(item => !item.key && state.selected.has(item.id)).map(item => item.title);
  const wrongResponses = responses.filter(item => !item.correct && state.responses.has(item.id)).map(item => item.title);
  $('#report-content').innerHTML = `
    <p><strong>Докази:</strong> ${state.evidenceScore===40 ? 'усі п’ять ключових матеріалів визначено правильно.' : `пропущено: ${missed.join(', ')||'немає'}; зайві матеріали: ${noise.join(', ')||'немає'}.`}</p>
    <p><strong>Документи:</strong> ${state.timelineScore ? 'банківську квитанцію правильно відокремлено від фіскального чека продавця.' : 'обране пояснення надає одному з документів функцію, якої він не виконує.'}</p>
    <p><strong>Висновок:</strong> ${state.verdictScore ? 'встановлено ознаки незареєстрованої розрахункової операції без необґрунтованих звинувачень.' : 'версія або ігнорує відсутність чека, або робить ширший висновок, ніж дозволяють докази.'}</p>
    <p><strong>Дії:</strong> ${state.responseScore===20 ? 'усі чотири корисні дії визначено правильно.' : `ризикові рішення: ${wrongResponses.join(', ')||'частину необхідних дій не обрано'}.`}</p>`;
  window.scrollTo({top:$('#result').offsetTop-30,behavior:'smooth'});
}

function reset(){
  state.viewed.clear();
  state.selected.clear();
  state.responses.clear();
  state.timeline = null;
  state.suspect = null;
  state.currentEvidence = null;
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
updateEvidenceControls();

$('#start-button').addEventListener('click',() => {
  $('#investigation').classList.add('is-visible');
  $('#briefing').style.display = 'none';
  window.scrollTo({top:$('#investigation').offsetTop-20,behavior:'smooth'});
});

$('#evidence-board').addEventListener('click',event => {
  const remove = event.target.closest('[data-remove-evidence]');
  if(remove){
    state.selected.delete(remove.dataset.removeEvidence);
    updateEvidenceControls();
    return;
  }
  const card = event.target.closest('[data-evidence]');
  if(card) openEvidence(card.dataset.evidence,card);
});

$('#modal-select').addEventListener('click',toggleEvidence);
$$('[data-close-modal]').forEach(item => item.addEventListener('click',closeModal));
document.addEventListener('keydown',event => {
  if(event.key==='Escape' && !$('#evidence-modal').hidden) closeModal();
});
$('#check-evidence').addEventListener('click',checkEvidence);
$('#timeline-options').addEventListener('click',event => {
  const button = event.target.closest('[data-timeline]');
  if(!button) return;
  chooseSingle('.timeline-option','timeline',button.dataset.timeline,button);
  $('#check-timeline').disabled = false;
});
$('#check-timeline').addEventListener('click',checkTimeline);
$('#suspects').addEventListener('click',event => {
  const button = event.target.closest('[data-suspect]');
  if(!button) return;
  chooseSingle('.suspect','suspect',button.dataset.suspect,button);
  $('#check-verdict').disabled = false;
});
$('#check-verdict').addEventListener('click',checkVerdict);
$('#response-list').addEventListener('click',event => {
  const button = event.target.closest('[data-response]');
  if(button) toggleResponse(button.dataset.response,button);
});
$('#finish-button').addEventListener('click',finish);
$('#restart-button').addEventListener('click',reset);
