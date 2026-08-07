const evidence = [
{id:'payment',type:'Виписка платформи',title:'Надходження за проєкт',preview:'+20 000 грн · оплата замовника',visual:'ВИПИСКА ПЛАТФОРМИ\nОплата замовлення: +20 000,00 грн\nСтатус: виконано\nДата зарахування: 28 лютого',copy:'Документ підтверджує суму надходження, але сам по собі не показує ані витрат, ані фактичного фінансового результату.',key:true},
{id:'fee',type:'Звіт платформи',title:'Комісія за замовлення',preview:'−2 000 грн · 10% від оплати',visual:'КОМІСІЯ ПЛАТФОРМИ\nСума замовлення: 20 000,00 грн\nКомісія: 10%\nУтримано: −2 000,00 грн',copy:'Комісія безпосередньо пов’язана з отриманням замовлення, тому її потрібно врахувати у витратах.',key:true},
{id:'expenses',type:'Облік витрат',title:'Програми, реклама й матеріали',preview:'1 200 + 1 500 + 800 грн',visual:'ВИТРАТИ ПРОЄКТУ\nПрограми: 1 200 грн\nРеклама портфоліо: 1 500 грн\nПлатні матеріали: 800 грн\nРАЗОМ: 3 500 грн',copy:'Усі три витрати підтверджені й використані саме для цього замовлення. Разом вони становлять 3 500 грн.',key:true},
{id:'refund',type:'Листування із замовником',title:'Часткове повернення коштів',preview:'−2 500 грн · невикористаний макет',visual:'ПОВІДОМЛЕННЯ ЗАМОВНИКА\nОдин із макетів не використано.\nПогоджене повернення: 2 500 грн\nСтатус: кошти повернено 1 березня',copy:'Погоджене й проведене повернення зменшує результат замовлення на 2 500 грн.',key:true},
{id:'hours',type:'Трекер часу',title:'Фактично витрачено 80 годин',preview:'48 + 20 + 12 годин',visual:'ОБЛІК ЧАСУ\nОсновна робота: 48 год\nДодаткові правки: 20 год\nЛистування й підготовка: 12 год\nРАЗОМ: 80 год',copy:'Повний облік часу показує, що Олег працював не 48, а 80 годин. Саме 80 годин потрібно використати для розрахунку реальної погодинної оплати.',key:true},
{id:'laptop',type:'Старий чек',title:'Ноутбук за 28 000 грн',preview:'Куплено дев’ять місяців тому',visual:'ФІСКАЛЬНИЙ ЧЕК\nНоутбук: 28 000 грн\nДата купівлі: 9 місяців тому\nОплата: особиста картка',copy:'Ноутбук використовувався й для навчання та був придбаний задовго до замовлення. Віднімати всю його вартість від одного проєкту некоректно.',key:false},
{id:'coffee',type:'Чеки з кав’ярні',title:'Кава під час роботи',preview:'420 грн · особисті покупки',visual:'ТРИ ЧЕКИ\nКава й десерти\nЗагальна сума: 420 грн\nОплачено особистою карткою',copy:'Ці чеки не підтверджують необхідну витрату проєкту. Особисті покупки не слід автоматично відносити до вартості замовлення.',key:false},
{id:'review',type:'Відгук замовника',title:'«Результат сподобався»',preview:'5 зірок · позитивний коментар',visual:'ВІДГУК\nОцінка: 5/5\n«Дякую за відповідальність і швидкі правки»',copy:'Відгук важливий для репутації, але не містить суми витрат, часу або умов, потрібних для фінансового розрахунку.',key:false}
];
const timelines=[
{id:'a',label:'Версія А',text:'20 000 грн надходжень − 2 000 грн комісії − 3 500 грн підтверджених витрат − 2 500 грн повернення = 12 000 грн до оподаткування; 12 000 ÷ 80 год = 150 грн за годину.',correct:true},
{id:'b',label:'Версія Б',text:'20 000 грн надходжень = 20 000 грн прибутку; 20 000 ÷ 48 год = приблизно 417 грн за годину.',correct:false},
{id:'c',label:'Версія В',text:'20 000 грн − повна вартість ноутбука 28 000 грн − 420 грн за каву = збиток 8 420 грн.',correct:false},
{id:'d',label:'Версія Г',text:'20 000 грн − 2 000 грн комісії = 18 000 грн; час правок, листування й підготовки на оплату години не впливає.',correct:false}
];
const suspects=[
{id:'client',mark:'01',title:'У всьому винен замовник',text:'Позитивний відгук нібито доводить, що Олег мав отримати більше, незалежно від погоджених умов і власного обліку.',correct:false},
{id:'platform',mark:'02',title:'Платформа приховала весь заробіток',text:'Комісія була вказана у звіті й становила лише одну частину витрат, тому не пояснює всю різницю.',correct:false},
{id:'calculation',mark:'03',title:'Надходження прийнято за прибуток',text:'Олег не врахував пов’язані витрати, повернення коштів, додаткові правки й повний час роботи, а умови змін завдання не погодив наперед.',correct:true},
{id:'laptop',mark:'04',title:'Замовлення зіпсувала купівля ноутбука',text:'Ноутбук придбано раніше й використовують не лише для цього проєкту; віднесення всієї ціни на одне замовлення спотворює результат.',correct:false}
];
const responses=[
{id:'scope',mark:'01',title:'Погодити обсяг і кількість правок',text:'До старту зафіксувати результат, строки, включені правки та оплату додаткової роботи.',correct:true},
{id:'cost',mark:'02',title:'Розрахувати мінімальну вигідну ціну',text:'Врахувати очікуваний час, комісії, матеріали, інші пов’язані витрати й бажану оплату години.',correct:true},
{id:'records',mark:'03',title:'Вести облік часу й витрат',text:'Записувати основну роботу, комунікацію, переробки та підтверджені витрати окремо за кожним замовленням.',correct:true},
{id:'formalize',mark:'04',title:'Перевірити належне оформлення діяльності',text:'Для систематичної роботи з’ясувати вимоги до реєстрації, податків і рахунку за офіційними джерелами.',correct:true},
{id:'double',mark:'05',title:'Просто подвоїти ціну',text:'Підняти будь-яку наступну ціну вдвічі без розрахунку обсягу, витрат, попиту та складності.',correct:false},
{id:'hide',mark:'06',title:'Не рахувати неоплачуваний час',text:'Не записувати листування й правки, щоб погодинна оплата виглядала вищою.',correct:false}
];
const state={viewed:new Set(),selected:new Set(),timeline:null,suspect:null,responses:new Set(),evidenceScore:0,timelineScore:0,verdictScore:0,responseScore:0,currentEvidence:null};
const $=s=>document.querySelector(s);
const $$=s=>[...document.querySelectorAll(s)];

function renderEvidence(){
  const marks={payment:'₴',fee:'10%',expenses:'COST',refund:'↩',hours:'80H',laptop:'PC',coffee:'CAFÉ',review:'5★'};
  const cards=evidence.map((item,i)=>`<button class="evidence-card" data-evidence="${item.id}" data-kind="${item.id}" type="button" aria-label="Відкрити матеріал: ${item.title}"><span class="evidence-pin" aria-hidden="true"></span><span class="evidence-topline"><span class="evidence-id">МАТЕРІАЛ ${String(i+1).padStart(2,'0')}</span><span class="evidence-state">Не оглянуто</span></span><span class="evidence-icon" aria-hidden="true">${marks[item.id]}</span><span class="evidence-type">${item.type}</span><strong>${item.title}</strong><span class="evidence-preview">${item.preview}</span><span class="evidence-open">Відкрити матеріал →</span></button>`).join('');
  $('#evidence-board').innerHTML=`<div class="board-toolbar"><div><span>Слідча дошка · справа CB-102000</span><strong>Матеріали замовлення</strong></div><div class="board-counter"><span>Оглянуто</span><strong id="board-viewed">0 / 8</strong></div></div><div class="board-canvas">${cards}</div><section class="selection-folder" aria-labelledby="selection-title"><div class="selection-folder-head"><div><span>РОБОЧА ПАПКА</span><strong id="selection-title">Докази, долучені до справи</strong></div><small>Оберіть рівно 5 матеріалів</small></div><ol id="selected-evidence" class="selected-evidence" aria-live="polite"></ol></section>`;
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
$('#stage-response').classList.remove('is-active');$('.case-dashboard').style.display='none';$('#result').classList.add('is-visible');$('#result-score').textContent=`${score} / 100`;
const level=score>=90?['Справу розкрито бездоганно','Ви правильно відділили надходження від фінансового результату, врахували 80 годин роботи та визначили реальну оплату години.']:score>=70?['Справу розкрито','Головну помилку встановлено. У рапорті залишилися неточності, але повний фінансовий слід замовлення вже видно.']:['Версію встановлено, але доказів бракує','Результат можна відновити з матеріалів, однак частину витрат, часу або правильних дій визначено неточно.'];
$('#result-title').textContent=level[0];$('#result-lead').textContent=level[1];
const missed=evidence.filter(x=>x.key&&!state.selected.has(x.id)).map(x=>x.title);const noise=evidence.filter(x=>!x.key&&state.selected.has(x.id)).map(x=>x.title);const wrongResponse=responses.filter(x=>!x.correct&&state.responses.has(x.id)).map(x=>x.title);
$('#report-content').innerHTML=`<p><strong>Докази:</strong> ${state.evidenceScore===40?'усі п’ять ключових доказів визначено правильно.':`пропущено: ${missed.join(', ')||'немає'}; зайві матеріали: ${noise.join(', ')||'немає'}.`}</p><p><strong>Розрахунок:</strong> ${state.timelineScore?'правильний: 20 000 − 8 000 = 12 000 грн до оподаткування; 12 000 ÷ 80 = 150 грн за годину.':'обрана версія не враховує всі підтверджені витрати або фактичні 80 годин.'}</p><p><strong>Причина:</strong> ${state.verdictScore?'надходження помилково прийнято за прибуток, а обсяг і правки не погоджено наперед.':'обрана причина не пояснює різницю між надходженням, витратами та оплатою години.'}</p><p><strong>Наступні дії:</strong> ${state.responseScore===20?'усі рішення допомагають обґрунтувати ціну й вести роботу прозоро.':`неправильні або недостатні рішення: ${wrongResponse.join(', ')||'частину необхідних дій не обрано'}.`}</p>`;
window.scrollTo({top:$('#result').offsetTop-30,behavior:'smooth'});}
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
