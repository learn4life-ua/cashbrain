const evidence=[
  {id:'payslip',type:'Розрахунковий лист',title:'Нарахування й утримання',preview:'20 000 − 3 600 − 1 000 = 15 400',visual:'РОЗРАХУНКОВИЙ ЛИСТ\n\nНарахована зарплата .... 20 000 грн\nПДФО, 18% ............... 3 600 грн\nВійськовий збір, 5% ..... 1 000 грн\nДо виплати ............. 15 400 грн\n\nЄСВ роботодавця, 22% .... 4 400 грн\nІз зарплати працівниці не утримується.',copy:'Документ пояснює всю різницю між нарахованою зарплатою та сумою «на руки». ЄСВ нараховує і сплачує роботодавець додатково.',key:true,icon:'='},
  {id:'rumour',type:'Повідомлення колеги',title:'«З тебе зняли ще 22%»',preview:'Порада з робочого чату',visual:'РОБОЧИЙ ЧАТ\n\n«Усім віднімають 18% ПДФО, 5% військового збору і ще 22% ЄСВ. Тому треба вимагати повернення ЄСВ».',copy:'Це хибне пояснення. Для найманого працівника ЄСВ не віднімають із зарплати: його нараховує роботодавець на фонд оплати праці.',key:false,icon:'?'},
  {id:'contract',type:'Трудовий договір',title:'Умова про оплату праці',preview:'Посадовий оклад · 20 000 грн',visual:'ВИТЯГ ІЗ ТРУДОВОГО ДОГОВОРУ\n\nПосадовий оклад: 20 000 грн на місяць.\n\nОплата здійснюється після утримання податків і зборів відповідно до законодавства.',copy:'Договір фіксує нараховану, а не чисту зарплату. Формулювання не обіцяє зарахування всіх 20 000 грн на картку.',key:true,icon:'§'},
  {id:'bonus',type:'Усна обіцянка',title:'Можлива премія наступного місяця',preview:'«Може бути ще 2 000 грн»',visual:'НОТАТКА ПІСЛЯ РОЗМОВИ\n\nКерівник: «Якщо відділ виконає план, наступного місяця може бути премія до 2 000 грн».\n\nНаказу про премію немає.',copy:'Можливу премію не можна включати до гарантованого доходу поточного місяця. Вона не пояснює вже отриману виплату.',key:false,icon:'…'},
  {id:'bank',type:'Банківська операція',title:'Зарахування зарплати',preview:'15 400 грн · призначення «Заробітна плата»',visual:'БАНКІВСЬКА ВИПИСКА\n\nЗарахування ............ 15 400 грн\nПризначення: заробітна плата\nДата: 05 число\nКомісія за зарахування: 0 грн',copy:'Банк зарахував точно ту суму, яку визначено в розрахунковому листі. Окремої комісії або невідомого списання немає.',key:true,icon:'₴'},
  {id:'draft',type:'Особистий бюджет',title:'План, складений від 20 000 грн',preview:'Витрати та цілі разом · 20 000 грн',visual:'ПЛАН СОФІЇ\n\nОбов’язкові витрати .... 10 600 грн\nНавушники й святкування . 5 100 грн\nРезерв .................. 2 300 грн\nФінансова ціль .......... 2 000 грн\n\nРАЗОМ .................. 20 000 грн\nДоступно на картці ..... 15 400 грн\nДефіцит ................. 4 600 грн',copy:'Особистий бюджет повторює головну помилку: усі категорії розподілено від нарахованої, а не від чистої зарплати.',key:true,icon:'!'},
  {id:'psp',type:'Довідка ДПС',title:'Податкова соціальна пільга 2026',preview:'1 664 грн · граничний дохід 4 660 грн',visual:'ДОВІДКА ДПС · 2026\n\nБазова ПСП .............. 1 664 грн\nГраничний місячний дохід 4 660 грн\n\nЗарплата Софії ......... 20 000 грн',copy:'ПСП зменшує базу ПДФО лише за дотримання умов. Зарплата Софії перевищує граничний дохід, тому базова ПСП у цій справі не застосовується.',key:false,icon:'i'},
  {id:'spending',type:'Перші рішення',title:'Бажання раніше за план',preview:'Навушники 3 200 · святкування 1 900',visual:'ОПЕРАЦІЇ ПІСЛЯ ВИПЛАТИ\n\nНавушники ............... 3 200 грн\nСвяткування ............. 1 900 грн\nРазом ................... 5 100 грн\n\nПереказ у резерв ............ 0 грн\nНа фінансову ціль ........... 0 грн',copy:'Софія спочатку оплатила бажання і відклала заощадження «на кінець місяця». Після обов’язкових витрат це створило б дефіцит 300 грн.',key:true,icon:'↓'}
];

const calculations=[
  {id:'a',label:'Розрахунок А',text:'20 000 − 18% − 5% − 22% = 11 000 грн. Роботодавець мав переказати саме цю суму.',correct:false},
  {id:'b',label:'Розрахунок Б',text:'ПДФО: 3 600 грн; військовий збір: 1 000 грн; 20 000 − 3 600 − 1 000 = 15 400 грн. ЄСВ 4 400 грн сплачує роботодавець додатково.',correct:true},
  {id:'c',label:'Розрахунок В',text:'20 000 − 3 600 = 16 400 грн. Військовий збір уже входить до ПДФО, тому 1 000 грн утримано помилково.',correct:false},
  {id:'d',label:'Розрахунок Г',text:'До виплати мало бути 20 000 грн, бо всі податки із зарплати сплачує лише роботодавець.',correct:false}
];

const suspects=[
  {id:'bank',mark:'01',title:'Комісія банку',text:'Банк нібито списав 4 600 грн під час зарахування, хоча у виписці комісія дорівнює нулю.',correct:false},
  {id:'employer',mark:'02',title:'Подвійне утримання ЄСВ',text:'Софія повірила пораді колеги, але розрахунковий лист не містить утримання ЄСВ із працівниці.',correct:false},
  {id:'psp',mark:'03',title:'Не застосували базову ПСП',text:'Зарплата 20 000 грн перевищує граничний дохід 4 660 грн, тому ця пільга не могла змінити виплату.',correct:false},
  {id:'net',mark:'04',title:'План від нарахованої суми',text:'Виплату розраховано правильно, але особистий бюджет складено від 20 000 грн замість 15 400 грн, а бажання оплачено раніше за резерв і ціль.',correct:true}
];

const plans=[
  {id:'demand',mark:'01',title:'Вимагати всі 20 000 грн на картку',text:'Вважати кожне законне утримання помилкою роботодавця.',correct:false},
  {id:'net',mark:'02',title:'Планувати від чистого доходу',text:'Використовувати 15 400 грн як межу всіх особистих витрат і заощаджень.',correct:true},
  {id:'split',mark:'03',title:'Розподілити зарплату одразу',text:'Спрямувати 10 600 грн на обов’язкові витрати, 1 500 грн у резерв, 1 000 грн на ціль і 2 300 грн на бажання.',correct:true},
  {id:'credit',mark:'04',title:'Купити бажане в кредит',text:'Залишити старий план на 20 000 грн, а дефіцит перекрити позикою.',correct:false},
  {id:'limits',mark:'05',title:'Зафіксувати межі категорій',text:'Не витрачати гроші резерву й фінансової цілі на бажання після першої виплати.',correct:true},
  {id:'verify',mark:'06',title:'Перевіряти розрахунковий лист',text:'Зіставляти нараховано, утримано й виплачено; за розбіжності звертатися до бухгалтерії.',correct:true}
];

const state={viewed:new Set(),selected:new Set(),calculation:null,suspect:null,plans:new Set(),evidenceScore:0,calculationScore:0,verdictScore:0,planScore:0,currentEvidence:null};
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];

function renderEvidence(){
  const cards=evidence.map((x,i)=>`<button class="evidence-card" data-evidence="${x.id}" type="button"><span class="evidence-top"><span>МАТЕРІАЛ ${String(i+1).padStart(2,'0')}</span><b class="evidence-state">Не оглянуто</b></span><span class="evidence-icon">${x.icon}</span><span class="evidence-type">${x.type}</span><strong>${x.title}</strong><small>${x.preview}</small><em>Відкрити документ →</em></button>`).join('');
  $('#evidence-board').innerHTML=`<header class="board-toolbar"><div><span>ПЕРЕВІРКА ВИПЛАТИ · CB-20000</span><strong>Документи й фінансові сліди</strong></div><div><small>Оглянуто</small><b id="board-viewed">0 / 8</b></div></header><div class="board-canvas">${cards}</div><section class="selection-folder"><header><div><span>РОБОЧА ПАПКА</span><strong>Докази розрахунку і помилки</strong></div><small>Рівно 5 матеріалів</small></header><ol id="selected-evidence"></ol></section>`;
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
  const level=score>=90?['Таємницю першої виплати розкрито','Ви правильно відділили податки працівниці від внеску роботодавця та склали план від чистого доходу.']:score>=70?['Розрахунок відновлено','Головну різницю пояснено. У рапорті є неточності, але принцип планування від суми «на руки» визначено правильно.']:['У версії залишилися прогалини','Перегляньте, які документи доводять законність утримань і чому особистий план на 20 000 грн не міг спрацювати.'];
  $('#result-title').textContent=level[0]; $('#result-lead').textContent=level[1];
  const missed=evidence.filter(x=>x.key&&!state.selected.has(x.id)).map(x=>x.title),noise=evidence.filter(x=>!x.key&&state.selected.has(x.id)).map(x=>x.title),wrong=plans.filter(x=>!x.correct&&state.plans.has(x.id)).map(x=>x.title);
  $('#report-content').innerHTML=`<p><strong>Докази:</strong> ${state.evidenceScore===40?'усі п’ять ключових матеріалів визначено правильно.':`пропущено: ${missed.join(', ')||'немає'}; зайві: ${noise.join(', ')||'немає'}.`}</p><p><strong>Виплата:</strong> ${state.calculationScore?'правильно встановлено ПДФО 3 600 грн, військовий збір 1 000 грн і чисту зарплату 15 400 грн.':'обраний розрахунок неправильно трактує податки або ЄСВ роботодавця.'}</p><p><strong>Помилка:</strong> ${state.verdictScore?'встановлено планування від нарахованої, а не чистої зарплати.':'версія не пояснює одночасно виплату 15 400 грн і дефіцит особистого бюджету.'}</p><p><strong>Новий план:</strong> ${state.planScore===20?'усі чотири робочі дії обрано правильно.':`ризикові рішення: ${wrong.join(', ')||'частину необхідних дій не обрано'}.`}</p>`;
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
