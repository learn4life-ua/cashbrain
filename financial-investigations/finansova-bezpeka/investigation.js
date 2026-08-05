const evidence = [
  {id:'sms',type:'Повідомлення',title:'Тривожне SMS',preview:'14:07 · «Платіж заблоковано...»',visual:'14:07\nBANK ALERT: Платіж 5 800 грн заблоковано.\nЩоб скасувати операцію, підтвердьте особу:\nsecure-bank-help.site/cancel',copy:'Повідомлення створює терміновість і веде на сторонній домен, який лише наслідує банківську адресу.',key:true},
  {id:'url',type:'Огляд браузера',title:'Адреса сторінки',preview:'secure-bank-help.site',visual:'Адреса: https://secure-bank-help.site/cancel\nЗаголовок: «Служба безпеки банку»\nСтворено вкладку о 14:08\nОфіційна адреса банку має інший домен.',copy:'Наявність HTTPS не робить сайт офіційним. Вирішальна ознака - домен не належить банку.',key:true},
  {id:'form',type:'Знімок сторінки',title:'Форма «скасування»',preview:'Номер · строк · CVV',visual:'СКАСУВАННЯ ПЛАТЕЖУ\nНомер картки: •••• •••• •••• 1842\nТермін дії: введено\nCVV: введено\nКнопка: «Захистити рахунок»',copy:'Для скасування чужого платежу банк не просить вводити всі реквізити картки на сторінці з повідомлення.',key:true},
  {id:'otp',type:'Банківське SMS',title:'Одноразовий код',preview:'14:10 · Код 491772',visual:'14:10\nКод 491772 для підтвердження входу з нового пристрою.\nНікому не повідомляйте цей код, зокрема працівникам банку.',copy:'Текст прямо вказує: код підтверджував вхід із нового пристрою, а не скасування платежу.',key:true},
  {id:'session',type:'Журнал безпеки',title:'Новий пристрій',preview:'14:11 · Android · інше місто',visual:'ІСТОРІЯ ВХОДІВ\n13:02 · iPhone Марти · Полтава\n14:11 · Android 13 · інший регіон · НОВИЙ\n14:16 · iPhone Марти · Полтава',copy:'Сторонній вхід з’явився через хвилину після введення одноразового коду.',key:true},
  {id:'statement',type:'Виписка',title:'Списання коштів',preview:'14:12 · −5 800,00 грн',visual:'14:12:06\nПереказ на картку\nОтримувач: А. К.\nСума: −5 800,00 грн\nСтатус: виконано',copy:'Виписка підтверджує збиток, але сама по собі не пояснює спосіб отримання доступу.',key:false},
  {id:'wifi',type:'Пояснення свідка',title:'Wi-Fi у кав’ярні',preview:'Марта була в публічній мережі',visual:'«Близько 14:00 я під’єдналася до безкоштовного Wi-Fi кав’ярні. Пароля мережа не мала».',copy:'Публічний Wi-Fi є ризиком, але у цій справі немає факту перехоплення трафіку. Інші докази показують конкретний канал викрадення.',key:false},
  {id:'receipt',type:'Речовий доказ',title:'Чек із кав’ярні',preview:'13:58 · капучино · 78 грн',visual:'КАВ’ЯРНЯ «КОЛО»\n13:58\nКапучино ........ 78,00 грн\nОплата: готівка',copy:'Чек підтверджує місце перебування Марти, але не пов’язаний із доступом до банкінгу чи списанням.',key:false}
];

const timelines=[
  {id:'a',label:'Версія А',text:'Шахрай списав гроші → банк надіслав код → Марта відкрила сайт → з’явився новий пристрій.',correct:false},
  {id:'b',label:'Версія Б',text:'SMS із посиланням → підроблена форма отримала реквізити → код підтвердив новий вхід → відбувся переказ.',correct:true},
  {id:'c',label:'Версія В',text:'Публічний Wi-Fi скопіював картку → чек підтвердив оплату → шахрай підібрав пароль → відбувся переказ.',correct:false},
  {id:'d',label:'Версія Г',text:'Банк заблокував платіж → Марта скасувала його на офіційному сайті → стався технічний повтор списання.',correct:false}
];

const suspects=[
  {id:'phishing',mark:'01',title:'Фішинг і соціальна інженерія',text:'Тривожне повідомлення спрямувало на підроблений сайт, де виманили реквізити й одноразовий код.',correct:true},
  {id:'nfc',mark:'02',title:'Безконтактне копіювання картки',text:'Дані нібито зчитали поруч із Мартою, хоча картку не використовували й фізичного контакту не зафіксовано.',correct:false},
  {id:'bank',mark:'03',title:'Технічний збій банку',text:'Система нібито помилково провела переказ і випадково зареєструвала сторонній пристрій.',correct:false},
  {id:'wifi',mark:'04',title:'Злам через публічний Wi-Fi',text:'Увесь інцидент пояснюється лише незахищеною мережею, без урахування підробленої форми та переданого коду.',correct:false}
];

const responses=[
  {id:'block',mark:'01',title:'Заблокувати картку й онлайн-доступ',text:'Зателефонувати до банку за офіційним номером або скористатися банківським застосунком.',correct:true,order:1},
  {id:'password',mark:'02',title:'Змінити пароль і завершити чужі сесії',text:'Зробити це з безпечного пристрою після блокування доступу.',correct:true,order:2},
  {id:'evidence',mark:'03',title:'Зберегти цифрові докази',text:'Не видаляти SMS, адресу сайту, сповіщення, виписку та листування.',correct:true,order:3},
  {id:'police',mark:'04',title:'Подати звернення до Кіберполіції',text:'Передати опис події, посилання, часові мітки та реквізити операції.',correct:true,order:4},
  {id:'chat',mark:'05',title:'Написати у чат на підозрілому сайті',text:'Попросити «службу безпеки» повернути кошти й чекати відповіді.',correct:false},
  {id:'post',mark:'06',title:'Одразу опублікувати все в соцмережі',text:'Викласти повний номер картки, SMS і чек, щоб інші побачили докази.',correct:false}
];

const state={viewed:new Set(),selected:new Set(),timeline:null,suspect:null,responses:new Set(),evidenceScore:0,timelineScore:0,verdictScore:0,responseScore:0,currentEvidence:null};
const $=s=>document.querySelector(s);
const $$=s=>[...document.querySelectorAll(s)];

function renderEvidence(){
  const marks={sms:'SMS',url:'URL',form:'WEB',otp:'OTP',session:'LOG',statement:'₴',wifi:'WI-FI',receipt:'DOC'};
  const cards=evidence.map((item,i)=>`<button class="evidence-card" data-evidence="${item.id}" data-kind="${item.id}" type="button" aria-label="Відкрити матеріал: ${item.title}"><span class="evidence-pin" aria-hidden="true"></span><span class="evidence-topline"><span class="evidence-id">МАТЕРІАЛ ${String(i+1).padStart(2,'0')}</span><span class="evidence-state">Не оглянуто</span></span><span class="evidence-icon" aria-hidden="true">${marks[item.id]}</span><span class="evidence-type">${item.type}</span><strong>${item.title}</strong><span class="evidence-preview">${item.preview}</span><span class="evidence-open">Відкрити матеріал →</span></button>`).join('');
  $('#evidence-board').innerHTML=`<div class="board-toolbar"><div><span>Слідча дошка · справа CB-01412</span><strong>Матеріали інциденту</strong></div><div class="board-counter"><span>Оглянуто</span><strong id="board-viewed">0 / 8</strong></div></div><div class="board-canvas">${cards}</div><section class="selection-folder" aria-labelledby="selection-title"><div class="selection-folder-head"><div><span>РОБОЧА ПАПКА</span><strong id="selection-title">Докази, долучені до справи</strong></div><small>Оберіть рівно 5 матеріалів</small></div><ol id="selected-evidence" class="selected-evidence" aria-live="polite"></ol></section>`;
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
  $$('.evidence-card').forEach(card=>card.classList.toggle('is-selected',state.selected.has(card.dataset.evidence)));updateModalButton();updateEvidenceControls();
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
  const level=score>=90?['Справу розкрито бездоганно','Ви відділили вирішальні факти від шуму, правильно відновили атаку й обрали безпечне реагування.']:score>=70?['Справу розкрито','Головний механізм встановлено. У рапорті залишилися неточності, але вони не завадили викрити фішингову схему.']:['Версію встановлено, але доказів бракує','Правильний механізм можна побачити у матеріалах, однак частина доказів або першочергових дій була визначена неточно.'];
  $('#result-title').textContent=level[0];$('#result-lead').textContent=level[1];
  const missed=evidence.filter(x=>x.key&&!state.selected.has(x.id)).map(x=>x.title);const noise=evidence.filter(x=>!x.key&&state.selected.has(x.id)).map(x=>x.title);
  const wrongResponse=responses.filter(x=>!x.correct&&state.responses.has(x.id)).map(x=>x.title);
  $('#report-content').innerHTML=`<p><strong>Докази:</strong> ${state.evidenceScore===40?'усі п’ять ключових доказів визначено правильно.':`пропущено: ${missed.join(', ')||'немає'}; зайві матеріали: ${noise.join(', ')||'немає'}.`}</p><p><strong>Хронологія:</strong> ${state.timelineScore?'відновлена правильно.':'обрана версія суперечить часовим міткам.'}</p><p><strong>Механізм:</strong> ${state.verdictScore?'фішинг і соціальну інженерію встановлено.':'обрана причина не пояснює підроблений домен та одноразовий код.'}</p><p><strong>Реагування:</strong> ${state.responseScore===20?'усі першочергові дії безпечні.':`небезпечні або другорядні рішення: ${wrongResponse.join(', ')||'частину необхідних дій не обрано'}.`}</p>`;
  window.scrollTo({top:$('#result').offsetTop-30,behavior:'smooth'});
}
function reset(){state.viewed.clear();state.selected.clear();state.responses.clear();state.timeline=null;state.suspect=null;state.evidenceScore=state.timelineScore=state.verdictScore=state.responseScore=0;$('.case-dashboard').style.display='grid';$('#result').classList.remove('is-visible');$$('.is-selected,.is-viewed').forEach(x=>x.classList.remove('is-selected','is-viewed'));$('#check-timeline').disabled=true;$('#check-verdict').disabled=true;$('#finish-button').disabled=true;$('#response-hint').textContent='Оберіть 4 дії.';showStage('#stage-evidence',1);updateEvidenceControls()}

renderEvidence();renderChoices();
$('#start-button').addEventListener('click',()=>{$('#investigation').classList.add('is-visible');$('#briefing').style.display='none';window.scrollTo({top:$('#investigation').offsetTop-20,behavior:'smooth'})});
$('#evidence-board').addEventListener('click',e=>{
  const remove=e.target.closest('[data-remove-evidence]');
  if(remove){
    state.selected.delete(remove.dataset.removeEvidence);
    updateEvidenceControls();
    return;
  }
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
