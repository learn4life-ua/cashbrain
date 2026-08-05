const evidence=[
  {id:'advice',type:'Порада з мережі',title:'Правило «нічого не купувати»',preview:'«Відмовся від усього зайвого...»',visual:'ДОПИС У СОЦМЕРЕЖІ\n\n«Щоб накопичити гроші, просто місяць нічого не купуй, крім їжі й житла».\n\nАвтор не знає доходу, цілей і структури витрат Данила.',copy:'Радикальна порада не є документом цієї справи й не пояснює, куди зникли 3 749 грн.',key:false,icon:'? '},
  {id:'plan',type:'Фінансовий план',title:'Бюджет на початок місяця',preview:'Дохід 18 500 · витрати 13 700',visual:'ПЛАН НА МІСЯЦЬ\n\nДохід ................ 18 500 грн\nЖитло й комунальні ..... 6 500 грн\nХарчування ............. 3 500 грн\nТранспорт .............. 1 200 грн\nЗв’язок .................. 500 грн\nЗдоров’я ................. 600 грн\nГнучкі витрати ......... 1 400 грн\n\nНа фінансову ціль ...... 1 800 грн\nУ резерв ............... 3 000 грн',copy:'План установлює контрольні суми. Без нього неможливо визначити, де факт перевищив заплановані межі.',key:true,icon:'₴'},
  {id:'sale',type:'Рекламне повідомлення',title:'Знижка 40% на рюкзак',preview:'Пропозиція діяла до 23:59',visual:'ЛИШЕ СЬОГОДНІ\nРюкзак: 2 100 грн → 1 260 грн\nЗнижка: 40%\n\nПерехід за рекламою зафіксовано, але купівлі у виписці немає.',copy:'Реклама могла впливати на рішення, однак фактичного платежу за рюкзак немає. Це хибний слід.',key:false,icon:'%'},
  {id:'subscriptions',type:'Регулярні платежі',title:'Три забуті підписки',preview:'149 + 200 + 400 = 749 грн',visual:'АВТОМАТИЧНІ СПИСАННЯ\n\nМузичний сервіс ........ 149 грн\nХмарне сховище ......... 200 грн\nПреміум-застосунок ..... 400 грн\n\nРазом .................. 749 грн\nУ плані окремо не враховано.',copy:'Регулярні списання увійшли до гнучких витрат, але Данило не заклав їх у бюджет і не перевірив перед поновленням.',key:true,icon:'↻'},
  {id:'statement',type:'Банківська виписка',title:'Фактичні витрати місяця',preview:'Усього 17 449 · залишок 1 051',visual:'ЗВЕДЕННЯ ЗА КАТЕГОРІЯМИ\n\nЖитло й комунальні ..... 6 500 грн\nХарчування ............. 4 370 грн\nТранспорт .............. 1 200 грн\nЗв’язок .................. 500 грн\nЗдоров’я ................. 600 грн\nКава й перекуси ........ 1 130 грн\nПідписки ................. 749 грн\nКросівки ................ 2 400 грн\n\nВИТРАЧЕНО ............. 17 449 грн\nЗАЛИШОК ................ 1 051 грн',copy:'Виписка показує факт: обов’язкові категорії не змінилися, а перевищення виникло у харчуванні та гнучких витратах.',key:true,icon:'='},
  {id:'delivery',type:'Історія замовлень',title:'Доставка замість плану',preview:'6 замовлень · 1 470 грн',visual:'ДОСТАВКА ЇЖІ\n\n6 замовлень ............ 1 470 грн\nПродукти ............... 2 900 грн\nРазом харчування ....... 4 370 грн\nПлан категорії ......... 3 500 грн\nПеревищення .............. 870 грн',copy:'Доставка не є «невидимою» сама по собі, але без підсумку категорії Данило не помітив перевищення на 870 грн.',key:true,icon:'+'},
  {id:'gift',type:'Повідомлення',title:'Подарунок від друга',preview:'«Поверну тобі 600 грн у п’ятницю»',visual:'ЧАТ, 24 ЧИСЛО\n\nДруг: «Дякую за квитки. Поверну тобі 600 грн у п’ятницю».\n\nПереказ не надійшов до кінця розрахункового місяця. У початковий дохід 18 500 грн ці кошти не включалися.',copy:'Очікувані 600 грн не можна вважати гарантованим доходом. Проте вони не входили до плану, тому не пояснюють різницю між планом і фактом.',key:false,icon:'…'},
  {id:'shoes',type:'Чек покупки',title:'Кросівки без окремого ліміту',preview:'2 400 грн · «оплата частинами» не обрана',visual:'МАГАЗИН ОДЯГУ\n\nКросівки ............... 2 400 грн\nЗнижка .................... 0 грн\nСплачено карткою ....... 2 400 грн\n\nКатегорія у виписці: гнучкі витрати.',copy:'Одна покупка перевищила весь місячний ліміт гнучких витрат на 1 000 грн, а разом із кавою та підписками ця категорія сягнула 4 279 грн.',key:true,icon:'!'}
];

const balances=[
  {id:'a',label:'Розрахунок А',text:'18 500 − 13 700 = 4 800 грн. План складено правильно, отже нестача виникла через помилку банку.',correct:false},
  {id:'b',label:'Розрахунок Б',text:'17 449 − 13 700 = 3 749 грн. Це борг Данила, тому його треба відняти від доходу ще раз.',correct:false},
  {id:'c',label:'Розрахунок В',text:'18 500 − 17 449 = 1 051 грн залишку; 4 800 − 1 051 = 3 749 грн не потрапили до резерву й цілі через перевищення витрат.',correct:true},
  {id:'d',label:'Розрахунок Г',text:'18 500 − 17 449 + 600 очікуваного повернення = 1 651 грн; тому реальна нестача становить 3 149 грн.',correct:false}
];

const suspects=[
  {id:'income',mark:'01',title:'Надто малий дохід',text:'План нібито не міг працювати від початку, хоча всі 18 500 грн надійшли й заплановані статті складали рівно цю суму.',correct:false},
  {id:'system',mark:'02',title:'Витрати без поточного контролю',text:'Невраховані підписки, перевищення ліміту на харчування та імпульсивна покупка разом використали кошти, призначені для резерву й цілі.',correct:true},
  {id:'shoes',mark:'03',title:'Лише купівля кросівок',text:'Покупка була найбільшою помилкою, але 2 400 грн не пояснюють усю різницю 3 749 грн.',correct:false},
  {id:'friend',mark:'04',title:'Друг не повернув 600 грн',text:'Очікуване повернення не було включене до запланованого доходу, тому його затримка не змінила початковий баланс.',correct:false}
];

const plans=[
  {id:'borrow',mark:'01',title:'Позичати до наступного доходу',text:'Закривати перевищення кредитними коштами, не змінюючи звичок.',correct:false},
  {id:'limits',mark:'02',title:'Установити ліміти категорій',text:'Зберегти 3 500 грн на харчування і 1 400 грн на всі гнучкі витрати.',correct:true},
  {id:'transfer',mark:'03',title:'Автоматизувати резерв і ціль',text:'Переказувати 3 000 грн і 1 800 грн одразу після надходження доходу.',correct:true},
  {id:'ban',mark:'04',title:'Назавжди заборонити всі бажання',text:'Повністю відмовитися від відпочинку, кави, одягу й будь-яких незапланованих потреб.',correct:false},
  {id:'review',mark:'05',title:'Щотижня звіряти план і факт',text:'Переглядати витрати за категоріями та коригувати решту місяця.',correct:true},
  {id:'subs',mark:'06',title:'Перевірити регулярні списання',text:'Скасувати непотрібні підписки й занести потрібні до бюджету.',correct:true}
];

const state={viewed:new Set(),selected:new Set(),balance:null,suspect:null,plans:new Set(),evidenceScore:0,balanceScore:0,verdictScore:0,planScore:0,currentEvidence:null};
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];

function renderEvidence(){
  const cards=evidence.map((x,i)=>`<button class="evidence-card" data-evidence="${x.id}" type="button"><span class="evidence-top"><span>МАТЕРІАЛ ${String(i+1).padStart(2,'0')}</span><b class="evidence-state">Не оглянуто</b></span><span class="evidence-icon">${x.icon}</span><span class="evidence-type">${x.type}</span><strong>${x.title}</strong><small>${x.preview}</small><em>Відкрити документ →</em></button>`).join('');
  $('#evidence-board').innerHTML=`<header class="board-toolbar"><div><span>ФІНАНСОВИЙ АУДИТ · CB-18500</span><strong>Документи й фінансові сліди</strong></div><div><small>Оглянуто</small><b id="board-viewed">0 / 8</b></div></header><div class="board-canvas">${cards}</div><section class="selection-folder"><header><div><span>РОБОЧА ПАПКА</span><strong>Докази нестачі</strong></div><small>Рівно 5 матеріалів</small></header><ol id="selected-evidence"></ol></section>`;
}
function renderChoices(){
  $('#balance-options').innerHTML=balances.map(x=>`<button class="choice-option" data-balance="${x.id}" type="button"><span class="option-mark">${x.label.slice(-1)}</span><span><strong>${x.label}</strong><small>${x.text}</small></span></button>`).join('');
  $('#suspects').innerHTML=suspects.map(x=>`<button class="choice-option" data-suspect="${x.id}" type="button"><span class="option-mark">${x.mark}</span><span><strong>${x.title}</strong><small>${x.text}</small></span></button>`).join('');
  $('#plan-options').innerHTML=plans.map(x=>`<button class="choice-option" data-plan="${x.id}" type="button"><span class="option-mark">${x.mark}</span><span><strong>${x.title}</strong><small>${x.text}</small></span></button>`).join('');
}
function updateDashboard(stage=1){
  $('#dash-stage').textContent=`${stage} / 4`; $('#dash-viewed').textContent=`${state.viewed.size} / 8`; $('#dash-selected').textContent=`${state.selected.size} / 5`;
  const earned=state.evidenceScore+state.balanceScore+state.verdictScore+state.planScore;
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
  $$('.evidence-card').forEach(card=>{const id=card.dataset.evidence, viewed=state.viewed.has(id), selected=state.selected.has(id);card.classList.toggle('is-viewed',viewed);card.classList.toggle('is-selected',selected);card.querySelector('.evidence-state').textContent=selected?'Долучено':viewed?'Оглянуто':'Не оглянуто';});
  $('#board-viewed').textContent=`${state.viewed.size} / 8`;
  const chosen=[...state.selected].map(id=>evidence.find(x=>x.id===id));
  $('#selected-evidence').innerHTML=Array.from({length:5},(_,i)=>chosen[i]?`<li class="is-filled"><span>${i+1}</span><strong>${chosen[i].title}</strong><button type="button" data-remove="${chosen[i].id}" aria-label="Вилучити ${chosen[i].title}">×</button></li>`:`<li><span>${i+1}</span><em>Вільне місце для доказу</em></li>`).join('');
  const all=state.viewed.size===8, full=state.selected.size===5; $('#check-evidence').disabled=!(all&&full);
  $('#evidence-hint').textContent=!all?`Оглянуто ${state.viewed.size} із 8 матеріалів.`:!full?`Долучено ${state.selected.size} із 5 доказів.`:'Усі матеріали оглянуто. Можна зафіксувати докази.'; updateDashboard(1);
}
function showStage(id,number){ $$('.stage').forEach(x=>x.classList.remove('is-active')); $(id).classList.add('is-active'); updateDashboard(number); window.scrollTo({top:$(id).offsetTop-90,behavior:'smooth'}); }
function chooseOne(selector,key,id,button){ state[key]=id; $$(selector).forEach(x=>x.classList.remove('is-selected')); button.classList.add('is-selected'); }
function checkEvidence(){ const keys=evidence.filter(x=>x.key).map(x=>x.id); state.evidenceScore=keys.filter(x=>state.selected.has(x)).length*8; showStage('#stage-balance',2); }
function checkBalance(){ state.balanceScore=balances.find(x=>x.id===state.balance)?.correct?20:0; showStage('#stage-verdict',3); }
function checkVerdict(){ state.verdictScore=suspects.find(x=>x.id===state.suspect)?.correct?20:0; showStage('#stage-plan',4); }
function togglePlan(id,button){ if(state.plans.has(id)){state.plans.delete(id);button.classList.remove('is-selected')}else if(state.plans.size<4){state.plans.add(id);button.classList.add('is-selected')} $('#finish-button').disabled=state.plans.size!==4; $('#plan-hint').textContent=`Обрано ${state.plans.size} із 4 дій.`; }
function finish(){
  state.planScore=plans.filter(x=>x.correct&&state.plans.has(x.id)).length*5;
  const score=state.evidenceScore+state.balanceScore+state.verdictScore+state.planScore;
  $('#stage-plan').classList.remove('is-active'); $('.case-dashboard').style.display='none'; $('#result').classList.add('is-visible'); $('#result-score').textContent=`${score} / 100`;
  const level=score>=90?['Бюджетну загадку розкрито','Ви правильно звірили суми, не сплутали помітну покупку з усією причиною та склали реалістичний протокол.']:score>=70?['Головну причину встановлено','Баланс відновлено. У рапорті є неточності, але фінансовий слід і принцип контролю визначені правильно.']:['Нестачу знайдено, але версія має прогалини','Перегляньте, які документи доводять саме різницю між планом і фактом та які дії працюють щомісяця.'];
  $('#result-title').textContent=level[0]; $('#result-lead').textContent=level[1];
  const missed=evidence.filter(x=>x.key&&!state.selected.has(x.id)).map(x=>x.title), noise=evidence.filter(x=>!x.key&&state.selected.has(x.id)).map(x=>x.title), wrong=plans.filter(x=>!x.correct&&state.plans.has(x.id)).map(x=>x.title);
  $('#report-content').innerHTML=`<p><strong>Докази:</strong> ${state.evidenceScore===40?'усі п’ять ключових матеріалів визначено правильно.':`пропущено: ${missed.join(', ')||'немає'}; зайві: ${noise.join(', ')||'немає'}.`}</p><p><strong>Баланс:</strong> ${state.balanceScore?'правильно встановлено 17 449 грн витрат, 1 051 грн залишку та 3 749 грн перевищення.':'обраний розрахунок не узгоджується з випискою або враховує негарантований дохід.'}</p><p><strong>Причина:</strong> ${state.verdictScore?'встановлено системну відсутність поточного контролю витрат.':'версія пояснює лише частину нестачі або суперечить плану.'}</p><p><strong>Новий план:</strong> ${state.planScore===20?'усі чотири робочі дії обрано правильно.':`ризикові або нереалістичні рішення: ${wrong.join(', ')||'частину необхідних дій не обрано'}.`}</p>`;
  window.scrollTo({top:$('#result').offsetTop-30,behavior:'smooth'});
}
function reset(){ state.viewed.clear();state.selected.clear();state.plans.clear();state.balance=null;state.suspect=null;state.evidenceScore=state.balanceScore=state.verdictScore=state.planScore=0;$('.case-dashboard').style.display='grid';$('#result').classList.remove('is-visible');$$('.is-selected,.is-viewed').forEach(x=>x.classList.remove('is-selected','is-viewed'));$('#check-balance').disabled=true;$('#check-verdict').disabled=true;$('#finish-button').disabled=true;$('#plan-hint').textContent='Оберіть 4 дії.';showStage('#stage-evidence',1);updateEvidence(); }

renderEvidence(); renderChoices();
$('#start-button').addEventListener('click',()=>{$('#investigation').classList.add('is-visible');$('#briefing').style.display='none';window.scrollTo({top:$('#investigation').offsetTop-20,behavior:'smooth'})});
$('#evidence-board').addEventListener('click',e=>{const remove=e.target.closest('[data-remove]');if(remove){state.selected.delete(remove.dataset.remove);updateEvidence();return}const card=e.target.closest('[data-evidence]');if(card)openEvidence(card.dataset.evidence)});
$('#modal-select').addEventListener('click',toggleEvidence); $$('[data-close-modal]').forEach(x=>x.addEventListener('click',closeModal)); document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!$('#evidence-modal').hidden)closeModal()});
$('#check-evidence').addEventListener('click',checkEvidence);
$('#balance-options').addEventListener('click',e=>{const b=e.target.closest('[data-balance]');if(!b)return;chooseOne('.choice-option[data-balance]','balance',b.dataset.balance,b);$('#check-balance').disabled=false}); $('#check-balance').addEventListener('click',checkBalance);
$('#suspects').addEventListener('click',e=>{const b=e.target.closest('[data-suspect]');if(!b)return;chooseOne('.choice-option[data-suspect]','suspect',b.dataset.suspect,b);$('#check-verdict').disabled=false}); $('#check-verdict').addEventListener('click',checkVerdict);
$('#plan-options').addEventListener('click',e=>{const b=e.target.closest('[data-plan]');if(b)togglePlan(b.dataset.plan,b)}); $('#finish-button').addEventListener('click',finish); $('#restart-button').addEventListener('click',reset);
