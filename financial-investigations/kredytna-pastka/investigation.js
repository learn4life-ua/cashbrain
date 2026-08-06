const evidence=[
  {id:'chat',type:'Повідомлення друга',title:'«Дивись тільки на відсоток»',preview:'Порада з чату · без розрахунків',visual:'ЧАТ ІЗ ДРУГОМ\n\n«2% річних - це майже безкоштовно. Комісії всюди однакові, тож документи можна не читати».',copy:'Це припущення, а не фінансовий документ. Комісії та додаткові платежі відрізняються, тому рекламної ставки недостатньо для порівняння.',key:false,icon:'?'},
  {id:'ad',type:'Рекламна пропозиція',title:'Велика цифра «2% річних»',preview:'12 000 грн · рішення за 10 хвилин',visual:'РЕКЛАМНИЙ БАНЕР\n\nКредит на техніку\nСтавка - лише 2% річних*\nСума - до 20 000 грн\nРішення - за 10 хвилин\n\n*Детальні умови - у паспорті кредиту.',copy:'Реклама привертає увагу номінальною ставкою, але сама відсилає до паспорта кредиту. Саме ця цифра сформувала помилкове очікування Максима про майже нульову переплату.',key:true,icon:'%'},
  {id:'passport',type:'Паспорт кредиту',title:'Повна вартість пропозиції',preview:'До повернення 15 600 грн · РРПС 153,3%',visual:'ПАСПОРТ СПОЖИВЧОГО КРЕДИТУ\n\nСума кредиту ........... 12 000 грн\nСтрок ................... 6 місяців\nНомінальна ставка ........ 2% річних\nЗагальні витрати ........ 3 600 грн\nЗагальна вартість ...... 15 600 грн\nРеальна річна ставка .... 153,3%',copy:'Паспорт показує показники, потрібні для порівняння: реальну річну ставку, загальні витрати та орієнтовну загальну вартість кредиту.',key:true,icon:'i'},
  {id:'seller',type:'Нотатка продавця',title:'«Платіж менший за 3 000 грн»',preview:'Усне пояснення в магазині',visual:'НОТАТКА ПІСЛЯ РОЗМОВИ\n\nПродавець: «Головне, що щомісячний платіж менший за 3 000 грн. Отже кредит вигідний».\n\nПорівняння з бюджетом не проводилося.',copy:'Розмір одного платежу без повної суми до повернення та перевірки бюджету не доводить вигідність кредиту.',key:false,icon:'…'},
  {id:'tariff',type:'Договір і тарифи',title:'Чотири складники переплати',preview:'120 + 360 + 2 520 + 600 грн',visual:'ВИТЯГ ІЗ ДОГОВОРУ\n\nВідсотки за 6 місяців ..... 120 грн\nРазова комісія 3% ......... 360 грн\nОбслуговування 420 × 6 ... 2 520 грн\nДодаткова послуга ......... 600 грн\n\nЗАГАЛЬНІ ВИТРАТИ ......... 3 600 грн',copy:'Договір розкриває, чому невелика номінальна ставка не означає дешевий кредит: основну частину витрат створюють комісії та додаткова послуга.',key:true,icon:'§'},
  {id:'rumour',type:'Порада з форуму',title:'«Прострочення нічого не змінить»',preview:'Анонімний допис · без посилання на договір',visual:'ДОПИС НА ФОРУМІ\n\n«Якщо затримати платіж на кілька днів, нічого не буде. Просто візьми іншу позику і закрий першу».',copy:'Наслідки прострочення визначаються договором. Нова позика для погашення попередньої збільшує ризик боргової спіралі.',key:false,icon:'!'},
  {id:'schedule',type:'Графік платежів',title:'Шість платежів по 2 600 грн',preview:'2 600 × 6 = 15 600 грн',visual:'ГРАФІК ПЛАТЕЖІВ\n\nМісяць 1 ............... 2 600 грн\nМісяць 2 ............... 2 600 грн\nМісяць 3 ............... 2 600 грн\nМісяць 4 ............... 2 600 грн\nМісяць 5 ............... 2 600 грн\nМісяць 6 ............... 2 600 грн\n\nРАЗОМ ................ 15 600 грн',copy:'Графік підтверджує повну суму до повернення та конкретні дати. Його потрібно зіставити з регулярними доходами й витратами.',key:true,icon:'6'},
  {id:'budget',type:'Особистий бюджет',title:'Вільний залишок лише 3 500 грн',preview:'16 000 − 12 500 = 3 500 грн',visual:'БЮДЖЕТ МАКСИМА\n\nЧистий дохід ........... 16 000 грн\nОбов’язкові витрати .... 12 500 грн\nВільний залишок ......... 3 500 грн\nПлатіж за кредитом ...... 2 600 грн\nЗапас після платежу ........ 900 грн',copy:'Платіж формально вкладається у бюджет, але залишає лише 900 грн запасу. Будь-яка непередбачена витрата створює ризик прострочення.',key:true,icon:'₴'}
];

const calculations=[
  {id:'a',label:'Розрахунок А',text:'12 000 × 2% = 240 грн. Повна сума до повернення становить 12 240 грн, бо комісії не є витратами за кредитом.',correct:false},
  {id:'b',label:'Розрахунок Б',text:'2 600 × 6 = 15 600 грн, отже самі відсотки становлять 3 600 грн, а всі комісії вже входять до ставки 2%.',correct:false},
  {id:'c',label:'Розрахунок В',text:'12 000 + 120 + 360 + 2 520 + 600 = 15 600 грн. Загальні витрати за кредитом - 3 600 грн.',correct:true},
  {id:'d',label:'Розрахунок Г',text:'12 000 + 420 × 6 = 14 520 грн. Разова комісія, відсотки й додаткова послуга сплачуються кредитодавцем.',correct:false}
];

const suspects=[
  {id:'bank',mark:'01',title:'Невідоме списання з картки',text:'Переплату нібито створила банківська операція після видачі кредиту, хоча всі суми є в договорі та графіку.',correct:false},
  {id:'headline',mark:'02',title:'Рішення за рекламною ставкою',text:'Максим порівняв лише 2% річних, не перевірив повну вартість, комісії та залишок 900 грн після щомісячного платежу.',correct:true},
  {id:'price',mark:'03',title:'Помилка в ціні ноутбука',text:'Магазин нібито додав 3 600 грн до вартості товару, хоча ціна покупки й сума кредиту однакові - 12 000 грн.',correct:false},
  {id:'term',mark:'04',title:'Зайвий сьомий платіж',text:'У графіку нібито є додатковий місяць, хоча зафіксовано рівно шість платежів по 2 600 грн.',correct:false}
];

const plans=[
  {id:'headline',mark:'01',title:'Порівнювати лише рекламний відсоток',text:'Обирати найменшу велику цифру на банері й не враховувати платежі у гривнях.',correct:false},
  {id:'passport',mark:'02',title:'Зіставити паспорти кредитів',text:'Порівняти реальну річну ставку, загальні витрати, суму до повернення та графік.',correct:true},
  {id:'budget',mark:'03',title:'Перевірити платіж у власному бюджеті',text:'Оцінити не лише можливість заплатити 2 600 грн, а й запас після платежу.',correct:true},
  {id:'rollover',mark:'04',title:'Перекрити прострочення новою позикою',text:'У разі нестачі коштів оформити швидкий кредит для погашення попереднього.',correct:false},
  {id:'terms',mark:'05',title:'Прочитати договір до підписання',text:'Перевірити комісії, додаткові послуги, дострокове повернення та наслідки прострочення.',correct:true},
  {id:'calendar',mark:'06',title:'Планувати погашення завчасно',text:'Зафіксувати дати платежів, сплачувати раніше, а за труднощів одразу звертатися до кредитодавця.',correct:true}
];

const state={viewed:new Set(),selected:new Set(),calculation:null,suspect:null,plans:new Set(),evidenceScore:0,calculationScore:0,verdictScore:0,planScore:0,currentEvidence:null};
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];

function renderEvidence(){
  const cards=evidence.map((x,i)=>`<button class="evidence-card" data-evidence="${x.id}" type="button"><span class="evidence-top"><span>МАТЕРІАЛ ${String(i+1).padStart(2,'0')}</span><b class="evidence-state">Не оглянуто</b></span><span class="evidence-icon">${x.icon}</span><span class="evidence-type">${x.type}</span><strong>${x.title}</strong><small>${x.preview}</small><em>Відкрити документ →</em></button>`).join('');
  $('#evidence-board').innerHTML=`<header class="board-toolbar"><div><span>ПЕРЕВІРКА КРЕДИТУ · CB-12002</span><strong>Документи й фінансові сліди</strong></div><div><small>Оглянуто</small><b id="board-viewed">0 / 8</b></div></header><div class="board-canvas">${cards}</div><section class="selection-folder"><header><div><span>РОБОЧА ПАПКА</span><strong>Докази повної вартості й ризику</strong></div><small>Рівно 5 матеріалів</small></header><ol id="selected-evidence"></ol></section>`;
}
function renderChoices(){
  $('#calculation-options').innerHTML=calculations.map(x=>`<button class="choice-option" data-calculation="${x.id}" type="button"><span class="option-mark">${x.label.slice(-1)}</span><span><strong>${x.label}</strong><small>${x.text}</small></span></button>`).join('');
  $('#suspects').innerHTML=suspects.map(x=>`<button class="choice-option" data-suspect="${x.id}" type="button"><span class="option-mark">${x.mark}</span><span><strong>${x.title}</strong><small>${x.text}</small></span></button>`).join('');
  $('#plan-options').innerHTML=plans.map(x=>`<button class="choice-option" data-plan="${x.id}" type="button"><span class="option-mark">${x.mark}</span><span><strong>${x.title}</strong><small>${x.text}</small></span></button>`).join('');
}
function updateDashboard(stage=1){
  $('#dash-stage').textContent=`${stage} / 4`; $('#dash-viewed').textContent=`${state.viewed.size} / 8`; $('#dash-selected').textContent=`${state.selected.size} / 5`;
  const earned=state.evidenceScore+state.calculationScore+state.verdictScore+state.planScore;
  const available=[0,40,60,80,100][stage]; $('#dash-score').textContent=`${Math.round(earned/available*100)||0}%`;
}
function openEvidence(id){
  const x=evidence.find(e=>e.id===id); state.currentEvidence=id; state.viewed.add(id);
  $('#modal-label').textContent=`Матеріал справи · ${x.type}`; $('#modal-title').textContent=x.title; $('#modal-visual').textContent=x.visual; $('#modal-copy').textContent=x.copy;
  updateEvidence(); updateModalButton(); $('#evidence-modal').hidden=false; document.body.classList.add('modal-open');
}
function closeModal(){ $('#evidence-modal').hidden=true; document.body.classList.remove('modal-open'); state.currentEvidence=null; }
function updateModalButton(){ const yes=state.selected.has(state.currentEvidence); $('#modal-select').textContent=yes?'Вилучити з робочої папки':'Долучити до робочої папки'; $('#modal-select').classList.toggle('is-remove',yes); }
function toggleEvidence(){ const id=state.currentEvidence; if(state.selected.has(id))state.selected.delete(id); else if(state.selected.size<5)state.selected.add(id); updateModalButton(); updateEvidence(); }
function updateEvidence(){
  $$('.evidence-card').forEach(card=>{const id=card.dataset.evidence,viewed=state.viewed.has(id),selected=state.selected.has(id);card.classList.toggle('is-viewed',viewed);card.classList.toggle('is-selected',selected);card.querySelector('.evidence-state').textContent=selected?'Долучено':viewed?'Оглянуто':'Не оглянуто';});
  $('#board-viewed').textContent=`${state.viewed.size} / 8`;
  const chosen=[...state.selected].map(id=>evidence.find(x=>x.id===id));
  $('#selected-evidence').innerHTML=Array.from({length:5},(_,i)=>chosen[i]?`<li class="is-filled"><span>${i+1}</span><strong>${chosen[i].title}</strong><button type="button" data-remove="${chosen[i].id}" aria-label="Вилучити ${chosen[i].title}">×</button></li>`:`<li><span>${i+1}</span><em>Вільне місце для доказу</em></li>`).join('');
  const all=state.viewed.size===8,full=state.selected.size===5; $('#check-evidence').disabled=!(all&&full);
  $('#evidence-hint').textContent=!all?`Оглянуто ${state.viewed.size} із 8 матеріалів.`:!full?`Долучено ${state.selected.size} із 5 доказів.`:'Усі матеріали оглянуто. Можна зафіксувати докази.'; updateDashboard(1);
}
function showStage(id,number){ $$('.stage').forEach(x=>x.classList.remove('is-active')); $(id).classList.add('is-active'); updateDashboard(number); window.scrollTo({top:$(id).offsetTop-90,behavior:'smooth'}); }
function chooseOne(selector,key,id,button){ state[key]=id; $$(selector).forEach(x=>x.classList.remove('is-selected')); button.classList.add('is-selected'); }
function checkEvidence(){ const keys=evidence.filter(x=>x.key).map(x=>x.id); state.evidenceScore=keys.filter(x=>state.selected.has(x)).length*8; showStage('#stage-calculation',2); }
function checkCalculation(){ state.calculationScore=calculations.find(x=>x.id===state.calculation)?.correct?20:0; showStage('#stage-verdict',3); }
function checkVerdict(){ state.verdictScore=suspects.find(x=>x.id===state.suspect)?.correct?20:0; showStage('#stage-plan',4); }
function togglePlan(id,button){ if(state.plans.has(id)){state.plans.delete(id);button.classList.remove('is-selected')}else if(state.plans.size<4){state.plans.add(id);button.classList.add('is-selected')} $('#finish-button').disabled=state.plans.size!==4; $('#plan-hint').textContent=`Обрано ${state.plans.size} із 4 дій.`; }
function finish(){
  state.planScore=plans.filter(x=>x.correct&&state.plans.has(x.id)).length*5;
  const score=state.evidenceScore+state.calculationScore+state.verdictScore+state.planScore;
  $('#stage-plan').classList.remove('is-active'); $('.case-dashboard').style.display='none'; $('#result').classList.add('is-visible'); $('#result-score').textContent=`${score} / 100`;
  const level=score>=90?['Ціну дрібного шрифту встановлено','Ви відновили повну вартість кредиту, знайшли комісії та оцінили ризик платежу для бюджету.']:score>=70?['Основний механізм розкрито','Переплату здебільшого пояснено. У рапорті є неточності, але рекламну ставку вже відділено від повної вартості.']:['У справі залишилися прогалини','Перегляньте паспорт, тарифи, графік і бюджет: разом вони пояснюють і 3 600 грн витрат, і ризик прострочення.'];
  $('#result-title').textContent=level[0]; $('#result-lead').textContent=level[1];
  const missed=evidence.filter(x=>x.key&&!state.selected.has(x.id)).map(x=>x.title),noise=evidence.filter(x=>!x.key&&state.selected.has(x.id)).map(x=>x.title),wrong=plans.filter(x=>!x.correct&&state.plans.has(x.id)).map(x=>x.title);
  $('#report-content').innerHTML=`<p><strong>Докази:</strong> ${state.evidenceScore===40?'усі п’ять ключових матеріалів визначено правильно.':`пропущено: ${missed.join(', ')||'немає'}; зайві: ${noise.join(', ')||'немає'}.`}</p><p><strong>Повна вартість:</strong> ${state.calculationScore?'правильно встановлено 15 600 грн до повернення та 3 600 грн загальних витрат.':'обраний розрахунок пропускає частину комісій, послуг або неправильно трактує ставку.'}</p><p><strong>Механізм:</strong> ${state.verdictScore?'встановлено рішення за рекламною ставкою без перевірки повної вартості й бюджету.':'версія не пояснює одночасно переплату та ризик щомісячного платежу.'}</p><p><strong>Протокол:</strong> ${state.planScore===20?'усі чотири захисні дії обрано правильно.':`ризикові рішення: ${wrong.join(', ')||'частину необхідних дій не обрано'}.`}</p>`;
  window.scrollTo({top:$('#result').offsetTop-30,behavior:'smooth'});
}
function reset(){ state.viewed.clear();state.selected.clear();state.plans.clear();state.calculation=null;state.suspect=null;state.evidenceScore=state.calculationScore=state.verdictScore=state.planScore=0;$('.case-dashboard').style.display='grid';$('#result').classList.remove('is-visible');$$('.is-selected,.is-viewed').forEach(x=>x.classList.remove('is-selected','is-viewed'));$('#check-calculation').disabled=true;$('#check-verdict').disabled=true;$('#finish-button').disabled=true;$('#plan-hint').textContent='Оберіть 4 дії.';showStage('#stage-evidence',1);updateEvidence(); }

renderEvidence(); renderChoices();
$('#start-button').addEventListener('click',()=>{$('#investigation').classList.add('is-visible');$('#briefing').style.display='none';window.scrollTo({top:$('#investigation').offsetTop-20,behavior:'smooth'})});
$('#evidence-board').addEventListener('click',e=>{const remove=e.target.closest('[data-remove]');if(remove){state.selected.delete(remove.dataset.remove);updateEvidence();return}const card=e.target.closest('[data-evidence]');if(card)openEvidence(card.dataset.evidence)});
$('#modal-select').addEventListener('click',toggleEvidence); $$('[data-close-modal]').forEach(x=>x.addEventListener('click',closeModal)); document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!$('#evidence-modal').hidden)closeModal()});
$('#check-evidence').addEventListener('click',checkEvidence);
$('#calculation-options').addEventListener('click',e=>{const b=e.target.closest('[data-calculation]');if(!b)return;chooseOne('.choice-option[data-calculation]','calculation',b.dataset.calculation,b);$('#check-calculation').disabled=false}); $('#check-calculation').addEventListener('click',checkCalculation);
$('#suspects').addEventListener('click',e=>{const b=e.target.closest('[data-suspect]');if(!b)return;chooseOne('.choice-option[data-suspect]','suspect',b.dataset.suspect,b);$('#check-verdict').disabled=false}); $('#check-verdict').addEventListener('click',checkVerdict);
$('#plan-options').addEventListener('click',e=>{const b=e.target.closest('[data-plan]');if(b)togglePlan(b.dataset.plan,b)}); $('#finish-button').addEventListener('click',finish); $('#restart-button').addEventListener('click',reset);
