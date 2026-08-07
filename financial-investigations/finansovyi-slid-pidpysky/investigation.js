const evidence = [
  {id:'offer',type:'Екран пропозиції',title:'7 днів безкоштовно',preview:'Далі - 449 грн щомісяця',visual:'PHOTO LAB PRO\n7 ДНІВ БЕЗКОШТОВНО\nПотім 449,00 грн на місяць\nАвтоматичне поновлення до скасування\nКнопка: «Спробувати безкоштовно»',copy:'На екрані вказано, що після пробного періоду підписка стає платною та автоматично поновлюється, доки користувач її не скасує.',key:true},
  {id:'calendar',type:'Календар',title:'День модульної роботи',preview:'10 липня · математика',visual:'10 ЛИПНЯ\n09:00 - модульна робота\n13:30 - консультація\n17:00 - зустріч із групою',copy:'Запис пояснює, чому Дарина могла не звернути увагу на повідомлення, але не доводить причину регулярних списань.',key:false},
  {id:'receipt',type:'Лист-підтвердження',title:'Підписку активовано',preview:'3 липня · наступна оплата 10 липня',visual:'ПІДТВЕРДЖЕННЯ ПІДПИСКИ\nPhoto Lab Pro - місячний план\nПробний період: 3-9 липня\nНаступна оплата: 10 липня\nСума: 449,00 грн',copy:'Лист фіксує дату активації, тривалість пробного періоду, суму та день першого платного поновлення.',key:true},
  {id:'delete',type:'Журнал телефону',title:'Застосунок видалено',preview:'4 липня · 21:18',visual:'ЖУРНАЛ ДІЙ\n4 липня · 21:18\nPhoto Lab Pro видалено з пристрою\nДані застосунку очищено\nОбліковий запис не змінено',copy:'Дарина справді видалила застосунок, але в журналі немає дії зі скасування підписки в обліковому записі.',key:true},
  {id:'statement',type:'Банківська виписка',title:'Три однакові платежі',preview:'449 грн · липень, серпень, вересень',visual:'ВИПИСКА ЗА КАРТКОЮ\n10 липня  PHOTO LAB PRO  −449,00 грн\n10 серпня  PHOTO LAB PRO  −449,00 грн\n10 вересня PHOTO LAB PRO  −449,00 грн\nРАЗОМ: −1 347,00 грн',copy:'Однакова сума й однакова дата трьох місяців поспіль показують регулярний платіж. Загальні витрати становлять 1 347 грн.',key:true},
  {id:'cloud',type:'Історія покупок',title:'Хмарне сховище',preview:'18 серпня · 79 грн · разово',visual:'ПОКУПКА\nДодаткове хмарне сховище - 20 ГБ\n18 серпня\n79,00 грн\nТип платежу: разовий',copy:'Це окрема разова покупка. Вона не пов’язана з трьома щомісячними списаннями по 449 грн.',key:false},
  {id:'status',type:'Налаштування акаунта',title:'Підписка досі активна',preview:'Наступна оплата · 10 жовтня',visual:'ПІДПИСКИ\nPhoto Lab Pro\nСтатус: АКТИВНА\nПлан: 449,00 грн щомісяця\nНаступна оплата: 10 жовтня\nКнопка: «Скасувати підписку»',copy:'Активний статус і дата наступної оплати доводять, що автоматичне поновлення не було припинено після видалення застосунку.',key:true},
  {id:'cashback',type:'Сповіщення банку',title:'Нараховано кешбек',preview:'Вересень · +31,20 грн',visual:'КЕШБЕК ЗА ВЕРЕСЕНЬ\nНараховано: +31,20 грн\nКатегорія: покупки онлайн\nЗарахування: 1 жовтня',copy:'Кешбек змінює залишок на картці, але не пояснює походження й механізм трьох платежів Photo Lab Pro.',key:false}
];

const timelines=[
  {id:'a',label:'Версія А',text:'Дарина видалила застосунок → підписка автоматично скасувалася → банк тричі помилково повторив один платіж.',correct:false},
  {id:'b',label:'Версія Б',text:'3 липня активовано пробний період → 4 липня видалено лише застосунок → 10 липня підписка стала платною → 10 серпня і 10 вересня вона поновилася знову.',correct:true},
  {id:'c',label:'Версія В',text:'Хмарне сховище за 79 грн перетворилося на місячний план → кешбек приховав частину витрат → виникли три списання.',correct:false},
  {id:'d',label:'Версія Г',text:'10 вересня стороння особа оформила одразу три покупки по 449 грн → застосунок автоматично зник із телефону.',correct:false}
];

const suspects=[
  {id:'bank',mark:'01',title:'Потрійна помилка банку',text:'Банк нібито випадково повторював одну й ту саму операцію щомісяця, хоча в акаунті є активний план і дата наступної оплати.',correct:false},
  {id:'renewal',mark:'02',title:'Нескасоване автоматичне поновлення',text:'Пробний період перейшов у платну підписку. Видалення застосунку не змінило активний статус у сервісі.',correct:true},
  {id:'theft',mark:'03',title:'Викрадення даних картки',text:'Невідома особа нібито щомісяця вводила реквізити вручну, хоча платежі збігаються з умовами й датами підписки.',correct:false},
  {id:'storage',mark:'04',title:'Оплата хмарного сховища',text:'Разову покупку за 79 грн нібито тричі списали як 449 грн, попри різні назви, суми та дати операцій.',correct:false}
];

const responses=[
  {id:'delete',mark:'01',title:'Ще раз видалити застосунок',text:'Повторно встановити його, а потім стерти з телефона та чекати припинення платежів.',correct:false},
  {id:'cancel',mark:'02',title:'Скасувати підписку в офіційному розділі',text:'Відкрити підписки в тому акаунті або сервісі, де оформлено пробний період, і вимкнути поновлення.',correct:true},
  {id:'verify',mark:'03',title:'Перевірити статус і дату завершення',text:'Переконатися, що з’явилося підтвердження скасування та немає нової дати автоматичної оплати.',correct:true},
  {id:'ignore',mark:'04',title:'Не реагувати на невелику суму',text:'Залишити все як є, адже один платіж менший за 500 грн і з часом підписка може зникнути сама.',correct:false},
  {id:'refund',mark:'05',title:'Подати офіційний запит на повернення',text:'Перевірити правила платформи й подати запит щодо платежів, не сприймаючи повернення як гарантоване.',correct:true},
  {id:'audit',mark:'06',title:'Перевірити інші підписки й виписку',text:'Переглянути всі регулярні платежі та встановити нагадування до завершення майбутніх пробних періодів.',correct:true}
];

const state={viewed:new Set(),selected:new Set(),timeline:null,suspect:null,responses:new Set(),evidenceScore:0,timelineScore:0,verdictScore:0,responseScore:0,currentEvidence:null};
const $=s=>document.querySelector(s);
const $$=s=>[...document.querySelectorAll(s)];

function renderEvidence(){
  const marks={offer:'FREE',calendar:'DATE',receipt:'MAIL',delete:'APP',statement:'₴',cloud:'CLOUD',status:'AUTO',cashback:'%' };
  const cards=evidence.map((item,i)=>`<button class="evidence-card" data-evidence="${item.id}" data-kind="${item.id}" type="button" aria-label="Відкрити матеріал: ${item.title}"><span class="evidence-pin" aria-hidden="true"></span><span class="evidence-topline"><span class="evidence-id">МАТЕРІАЛ ${String(i+1).padStart(2,'0')}</span><span class="evidence-state">Не оглянуто</span></span><span class="evidence-icon" aria-hidden="true">${marks[item.id]}</span><span class="evidence-type">${item.type}</span><strong>${item.title}</strong><span class="evidence-preview">${item.preview}</span><span class="evidence-open">Відкрити матеріал →</span></button>`).join('');
  $('#evidence-board').innerHTML=`<div class="board-toolbar"><div><span>Слідча дошка · справа CB-091347</span><strong>Матеріали підписки</strong></div><div class="board-counter"><span>Оглянуто</span><strong id="board-viewed">0 / 8</strong></div></div><div class="board-canvas">${cards}</div><section class="selection-folder" aria-labelledby="selection-title"><div class="selection-folder-head"><div><span>РОБОЧА ПАПКА</span><strong id="selection-title">Докази, долучені до справи</strong></div><small>Оберіть рівно 5 матеріалів</small></div><ol id="selected-evidence" class="selected-evidence" aria-live="polite"></ol></section>`;
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
  updateModalButton();$('#evidence-modal').hidden=false;document.body.classList.add('modal-open');updateEvidenceControls();
}
function updateModalButton(){const selected=state.selected.has(state.currentEvidence);$('#modal-select').textContent=selected?'Вилучити з матеріалів справи':'Долучити до матеріалів справи';$('#modal-select').classList.toggle('is-remove',selected)}
function closeModal(){$('#evidence-modal').hidden=true;document.body.classList.remove('modal-open');state.currentEvidence=null}
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
    status.textContent=selected?'Долучено':viewed?'Оглянуто':'Не оглянуто';
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
function chooseSingle(selector,key,id,button){state[key]=id;$$(selector).forEach(x=>x.classList.remove('is-selected'));button.classList.add('is-selected')}
function checkTimeline(){state.timelineScore=timelines.find(x=>x.id===state.timeline)?.correct?20:0;showStage('#stage-verdict',3)}
function checkVerdict(){state.verdictScore=suspects.find(x=>x.id===state.suspect)?.correct?20:0;showStage('#stage-response',4)}
function toggleResponse(id,button){if(state.responses.has(id)){state.responses.delete(id);button.classList.remove('is-selected')}else if(state.responses.size<4){state.responses.add(id);button.classList.add('is-selected')}$('#finish-button').disabled=state.responses.size!==4;$('#response-hint').textContent=`Обрано ${state.responses.size} із 4 дій.`}
function finish(){
  const correctChosen=responses.filter(x=>x.correct&&state.responses.has(x.id)).length;state.responseScore=correctChosen*5;
  const score=state.evidenceScore+state.timelineScore+state.verdictScore+state.responseScore;
  $('#stage-response').classList.remove('is-active');$('.case-dashboard').style.display='none';$('#result').classList.add('is-visible');
  $('#result-score').textContent=`${score} / 100`;
  const level=score>=90?['Справу розкрито бездоганно','Ви відділили регулярні платежі від випадкових витрат, правильно відновили шлях підписки та зупинили наступне списання.']:score>=70?['Справу розкрито','Головну причину встановлено. У рапорті залишилися неточності, але вони не завадили викрити нескасоване автоматичне поновлення.']:['Версію встановлено, але доказів бракує','Механізм підписки можна відновити з матеріалів, однак частина доказів або правильних дій була визначена неточно.'];
  $('#result-title').textContent=level[0];$('#result-lead').textContent=level[1];
  const missed=evidence.filter(x=>x.key&&!state.selected.has(x.id)).map(x=>x.title);const noise=evidence.filter(x=>!x.key&&state.selected.has(x.id)).map(x=>x.title);
  const wrongResponse=responses.filter(x=>!x.correct&&state.responses.has(x.id)).map(x=>x.title);
  $('#report-content').innerHTML=`<p><strong>Докази:</strong> ${state.evidenceScore===40?'усі п’ять ключових доказів визначено правильно.':`пропущено: ${missed.join(', ')||'немає'}; зайві матеріали: ${noise.join(', ')||'немає'}.`}</p><p><strong>Хронологія:</strong> ${state.timelineScore?'відновлена правильно: пробний період перейшов у три платні місяці.':'обрана версія суперечить датам активації, видалення та списань.'}</p><p><strong>Причина:</strong> ${state.verdictScore?'встановлено нескасоване автоматичне поновлення.':'обрана причина не пояснює активний статус і дату наступної оплати.'}</p><p><strong>Реагування:</strong> ${state.responseScore===20?'усі дії повертають контроль над підпискою та витратами.':`неправильні або недостатні рішення: ${wrongResponse.join(', ')||'частину необхідних дій не обрано'}.`}</p>`;
  window.scrollTo({top:$('#result').offsetTop-30,behavior:'smooth'});
}
function reset(){state.viewed.clear();state.selected.clear();state.responses.clear();state.timeline=null;state.suspect=null;state.evidenceScore=state.timelineScore=state.verdictScore=state.responseScore=0;$('.case-dashboard').style.display='grid';$('#result').classList.remove('is-visible');$$('.is-selected,.is-viewed').forEach(x=>x.classList.remove('is-selected','is-viewed'));$('#check-timeline').disabled=true;$('#check-verdict').disabled=true;$('#finish-button').disabled=true;$('#response-hint').textContent='Оберіть 4 дії.';showStage('#stage-evidence',1);updateEvidenceControls()}

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
