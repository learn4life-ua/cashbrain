const evidence=[
{id:'receipt',type:'Касовий чек',title:'До сплати 12 000 грн',preview:'Податкова складова вказана окремо',visual:'КАСОВИЙ ЧЕК\n\nТовар ............. 12 000 грн\nУ т.ч. податкова складова ... 2 000 грн\n\nДо сплати ......... 12 000 грн',copy:'Чек підтверджує фінальну суму та показує, що податкова складова вже входить у неї.',key:true,icon:'12'},
{id:'friend',type:'Порада знайомого',title:'«Ці 20% магазин просто залишає собі»',preview:'Припущення · без документів',visual:'ЧАТ\n\n«Якщо до 10 000 додали 20%, то це просто націнка магазину. Значить магазин заробив 2 000 грн».',copy:'Це припущення змішує податкову складову з торговою націнкою та прибутком. Його треба перевірити за документами.',key:false,icon:'?'},
{id:'base',type:'Рахунок постачальника',title:'Базова ціна — 10 000 грн',preview:'До податкової складової',visual:'РАХУНОК\n\nБазова ціна товару: 10 000 грн\nПодаткова складова: окремо\nФінальна сума: після розрахунку',copy:'Документ задає базову суму, від якої в навчальному прикладі обчислюється податкова складова.',key:true,icon:'10'},
{id:'coupon',type:'Промокод',title:'Знижка 150 грн на наступну покупку',preview:'Не застосована в цьому чеку',visual:'ПРОМОКОД\n\n-150 грн на наступне замовлення.\nУ поточній покупці не використано.',copy:'Промокод не вплинув на поточну суму 12 000 грн і не пояснює структуру цього чека.',key:false,icon:'-150'},
{id:'rate',type:'Умова навчального прикладу',title:'Ставка для розрахунку — 20%',preview:'Застосовується до базової ціни',visual:'УМОВА СПРАВИ\n\nБазова ціна: 10 000 грн\nЗадана ставка: 20%\n\nДля реальних операцій актуальні правила перевіряють окремо.',copy:'Цей матеріал прямо задає ставку, потрібну для навчального розрахунку.',key:true,icon:'20%'},
{id:'invoice',type:'Розрахунок продавця',title:'10 000 + 2 000 = 12 000 грн',preview:'Структура фінальної ціни',visual:'РОЗРАХУНОК\n\n10 000 грн × 20% = 2 000 грн\n10 000 грн + 2 000 грн = 12 000 грн',copy:'Розрахунок пов’язує базову ціну, задану ставку, податкову складову та фінальну суму.',key:true,icon:'='},
{id:'review',type:'Відгук покупця',title:'«У сусідньому магазині дешевше»',preview:'Порівняння цін · без структури чека',visual:'ВІДГУК\n\n«Бачив схожий товар дешевше на 700 грн».',copy:'Інша ціна може бути корисною для вибору магазину, але не пояснює, як сформовано саме цей чек.',key:false,icon:'700'},
{id:'note',type:'Пояснення до чека',title:'Податок не дорівнює націнці продавця',preview:'Різні економічні поняття',visual:'ПОЯСНЕННЯ\n\nПодаткова складова — елемент розрахунку ціни за правилами справи.\nНацінка — окреме рішення продавця щодо ціноутворення.\nЦі поняття не можна автоматично ототожнювати.',copy:'Матеріал фіксує ключову логіку справи: наявність податкової складової не означає, що ця сума є прибутком або націнкою магазину.',key:true,icon:'≠'}
];

const calculations=[
{id:'a',label:'Розрахунок А',text:'10 000 × 20% = 2 000 грн; 10 000 + 2 000 = 12 000 грн.',correct:true},
{id:'b',label:'Розрахунок Б',text:'12 000 × 20% = 2 400 грн, тому базова ціна дорівнює 9 600 грн.',correct:false},
{id:'c',label:'Розрахунок В',text:'10 000 + 20 = 10 020 грн, бо 20% — це просто число 20.',correct:false},
{id:'d',label:'Розрахунок Г',text:'12 000 грн не можна розкласти на складові, тому чек нічого не пояснює.',correct:false}
];

const suspects=[
{id:'markup',mark:'01',title:'Податкова складова — це автоматично націнка магазину',text:'Націнка і податкова складова — різні елементи ціноутворення. Сам факт 20% не доводить прибуток продавця.',correct:false},
{id:'separate',mark:'02',title:'Податок і націнку треба розрізняти',text:'У справі 2 000 грн — податкова складова, розрахована за заданою ставкою. Вона не є автоматично чистим доходом магазину.',correct:true},
{id:'bank',mark:'03',title:'2 000 грн забрав банк за оплату карткою',text:'Матеріали не містять такої банківської комісії. Сума пояснюється структурою ціни в чеку.',correct:false},
{id:'discount',mark:'04',title:'2 000 грн з’явилися через невикористаний промокод',text:'Промокод стосується майбутньої покупки і не формує поточну податкову складову.',correct:false}
];

const plans=[
{id:'total',mark:'01',title:'Знайти фінальну суму до сплати',text:'Спочатку потрібно зрозуміти, скільки покупець фактично платить за чеком.',correct:true},
{id:'guess',mark:'02',title:'Будь-яку різницю між двома цінами називати податком',text:'Різниця може виникати через знижки, націнки, комплектацію чи інші фактори. Потрібні документи.',correct:false},
{id:'included',mark:'03',title:'Перевірити, чи податкова складова вже включена у фінальну ціну',text:'Це допомагає не додавати одну й ту саму суму вдруге.',correct:true},
{id:'terms',mark:'04',title:'Розділяти поняття податку, націнки та прибутку',text:'Вони можуть впливати на ціну по-різному й не є взаємозамінними словами.',correct:true},
{id:'rumor',mark:'05',title:'Довіряти поясненню знайомого замість чека',text:'Фінансовий висновок треба будувати на документах і розрахунках, а не на припущеннях.',correct:false},
{id:'rules',mark:'06',title:'Для реальних покупок перевіряти актуальні правила й документи',text:'Навчальна справа має задану ставку, а реальні податкові правила можуть змінюватися.',correct:true}
];

const state={viewed:new Set(),selected:new Set(),calculation:null,suspect:null,plans:new Set(),evidenceScore:0,calculationScore:0,verdictScore:0,planScore:0,currentEvidence:null};
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];

function renderEvidence(){
  const cards=evidence.map((x,i)=>`<button class="evidence-card" data-evidence="${x.id}" type="button"><span class="evidence-top"><span>МАТЕРІАЛ ${String(i+1).padStart(2,'0')}</span><b class="evidence-state">Не оглянуто</b></span><span class="evidence-icon">${x.icon}</span><span class="evidence-type">${x.type}</span><strong>${x.title}</strong><small>${x.preview}</small><em>Відкрити документ →</em></button>`).join('');
  $('#evidence-board').innerHTML=`<header class="board-toolbar"><div><span>ПОДАТКОВІ СЛІДИ · CB-12020</span><strong>Матеріали структури ціни</strong></div><div><small>Оглянуто</small><b id="board-viewed">0 / 8</b></div></header><div class="board-canvas">${cards}</div><section class="selection-folder"><header><div><span>РОБОЧА ПАПКА</span><strong>Ключові докази структури ціни</strong></div><small>Рівно 5 матеріалів</small></header><ol id="selected-evidence"></ol></section>`;
}
function renderChoices(){
  $('#calculation-options').innerHTML=calculations.map(x=>`<button class="choice-option" data-calculation="${x.id}" type="button"><span class="option-mark">${x.label.slice(-1)}</span><span><strong>${x.label}</strong><small>${x.text}</small></span></button>`).join('');
  $('#suspects').innerHTML=suspects.map(x=>`<button class="choice-option" data-suspect="${x.id}" type="button"><span class="option-mark">${x.mark}</span><span><strong>${x.title}</strong><small>${x.text}</small></span></button>`).join('');
  $('#plan-options').innerHTML=plans.map(x=>`<button class="choice-option" data-plan="${x.id}" type="button"><span class="option-mark">${x.mark}</span><span><strong>${x.title}</strong><small>${x.text}</small></span></button>`).join('');
}
function updateDashboard(stage=1){
  $('#dash-stage').textContent=`${stage} / 4`;$('#dash-viewed').textContent=`${state.viewed.size} / 8`;$('#dash-selected').textContent=`${state.selected.size} / 5`;
  const earned=state.evidenceScore+state.calculationScore+state.verdictScore+state.planScore;const available=[0,40,60,80,100][stage];$('#dash-score').textContent=`${Math.round(earned/available*100)||0}%`;
}
function openEvidence(id){const x=evidence.find(e=>e.id===id);if(!x)return;state.currentEvidence=id;state.viewed.add(id);$('#modal-label').textContent=`Матеріал справи · ${x.type}`;$('#modal-title').textContent=x.title;$('#modal-visual').textContent=x.visual;$('#modal-copy').textContent=x.copy;updateEvidence();updateModalButton();$('#evidence-modal').hidden=false;document.body.classList.add('modal-open');}
function closeModal(){$('#evidence-modal').hidden=true;document.body.classList.remove('modal-open');state.currentEvidence=null;}
function updateModalButton(){const yes=state.selected.has(state.currentEvidence);$('#modal-select').textContent=yes?'Вилучити з робочої папки':'Долучити до робочої папки';$('#modal-select').classList.toggle('is-remove',yes);}
function toggleEvidence(){const id=state.currentEvidence;if(!id)return;if(state.selected.has(id))state.selected.delete(id);else if(state.selected.size<5)state.selected.add(id);updateModalButton();updateEvidence();}
function updateEvidence(){
  $$('.evidence-card').forEach(card=>{const id=card.dataset.evidence,viewed=state.viewed.has(id),selected=state.selected.has(id);card.classList.toggle('is-viewed',viewed);card.classList.toggle('is-selected',selected);const status=card.querySelector('.evidence-state');if(status)status.textContent=selected?'Долучено':viewed?'Оглянуто':'Не оглянуто';});
  const boardViewed=$('#board-viewed');if(boardViewed)boardViewed.textContent=`${state.viewed.size} / 8`;const chosen=[...state.selected].map(id=>evidence.find(x=>x.id===id)).filter(Boolean);
  const selectedList=$('#selected-evidence');if(selectedList)selectedList.innerHTML=Array.from({length:5},(_,i)=>chosen[i]?`<li class="is-filled"><span>${i+1}</span><strong>${chosen[i].title}</strong><button type="button" data-remove="${chosen[i].id}" aria-label="Вилучити ${chosen[i].title}">×</button></li>`:`<li><span>${i+1}</span><em>Вільне місце</em></li>`).join('');
  const ready=state.viewed.size===8&&state.selected.size===5;$('#check-evidence').disabled=!ready;$('#evidence-hint').textContent=state.viewed.size<8?`Оглянуто ${state.viewed.size} з 8 матеріалів.`:state.selected.size<5?`Оберіть ще ${5-state.selected.size} матеріал(и).`:'Можна фіксувати докази.';updateDashboard(1);
}
function chooseOne(selector,key,id,button){state[key]=id;$$(selector).forEach(x=>x.classList.toggle('is-selected',x===button));}
function togglePlan(id,button){if(state.plans.has(id))state.plans.delete(id);else if(state.plans.size<4)state.plans.add(id);button.classList.toggle('is-selected',state.plans.has(id));$('#finish-button').disabled=state.plans.size!==4;$('#plan-hint').textContent=`Обрано ${state.plans.size} / 4 дії.`;}
function showStage(id,stage){$$('.stage').forEach(x=>x.classList.remove('is-active'));$(id).classList.add('is-active');updateDashboard(stage);$(id).scrollIntoView({behavior:'smooth',block:'start'});}
function checkEvidence(){const correct=[...state.selected].filter(id=>evidence.find(x=>x.id===id)?.key).length;state.evidenceScore=correct*8;showStage('#stage-calculation',2);}
function checkCalculation(){state.calculationScore=calculations.find(x=>x.id===state.calculation)?.correct?20:0;showStage('#stage-verdict',3);}
function checkVerdict(){state.verdictScore=suspects.find(x=>x.id===state.suspect)?.correct?20:0;showStage('#stage-plan',4);}
function finish(){const correct=[...state.plans].filter(id=>plans.find(x=>x.id===id)?.correct).length;state.planScore=correct*5;const total=state.evidenceScore+state.calculationScore+state.verdictScore+state.planScore;$('#result-score').textContent=`${total} / 100`;$('#result-title').textContent=total>=90?'Структуру ціни розкрито точно':total>=70?'Справу розкрито, але є неточності':'Потрібна повторна перевірка матеріалів';$('#result-lead').textContent=total>=90?'Ви правильно відділили базову ціну, податкову складову та фінальну суму й не сплутали податок із націнкою продавця.':'Перегляньте, які документи підтверджують структуру ціни та чому податок не можна автоматично називати прибутком магазину.';const chosen=[...state.selected].map(id=>evidence.find(x=>x.id===id)?.title).filter(Boolean).join('; ');$('#report-content').innerHTML=`<p><strong>Долучені матеріали:</strong> ${chosen}.</p><p><strong>Висновок:</strong> у навчальному прикладі 10 000 грн × 20% = 2 000 грн, тому фінальна ціна становить 12 000 грн. Податкова складова і торгова націнка — різні поняття.</p>`;$$('.stage').forEach(x=>x.classList.remove('is-active'));$('#result').classList.add('is-visible');updateDashboard(4);$('#result').scrollIntoView({behavior:'smooth',block:'start'});}
function reset(){state.viewed.clear();state.selected.clear();state.calculation=null;state.suspect=null;state.plans.clear();state.evidenceScore=state.calculationScore=state.verdictScore=state.planScore=0;$('#result').classList.remove('is-visible');renderEvidence();renderChoices();$('#check-calculation').disabled=true;$('#check-verdict').disabled=true;$('#finish-button').disabled=true;showStage('#stage-evidence',1);}

renderEvidence();renderChoices();updateEvidence();
$('#start-button').addEventListener('click',()=>{$('#investigation').classList.add('is-visible');$('#briefing').style.display='none';window.scrollTo({top:$('#investigation').offsetTop-20,behavior:'smooth'});});
$('#evidence-board').addEventListener('click',e=>{const remove=e.target.closest('[data-remove]');if(remove){e.preventDefault();e.stopPropagation();state.selected.delete(remove.dataset.remove);updateEvidence();return;}const card=e.target.closest('[data-evidence]');if(card)openEvidence(card.dataset.evidence);});
$$('[data-close-modal]').forEach(x=>x.addEventListener('click',closeModal));$('#modal-select').addEventListener('click',toggleEvidence);document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!$('#evidence-modal').hidden)closeModal();});
$('#check-evidence').addEventListener('click',checkEvidence);
$('#calculation-options').addEventListener('click',e=>{const b=e.target.closest('[data-calculation]');if(!b)return;chooseOne('.choice-option[data-calculation]','calculation',b.dataset.calculation,b);$('#check-calculation').disabled=false;});$('#check-calculation').addEventListener('click',checkCalculation);
$('#suspects').addEventListener('click',e=>{const b=e.target.closest('[data-suspect]');if(!b)return;chooseOne('.choice-option[data-suspect]','suspect',b.dataset.suspect,b);$('#check-verdict').disabled=false;});$('#check-verdict').addEventListener('click',checkVerdict);
$('#plan-options').addEventListener('click',e=>{const b=e.target.closest('[data-plan]');if(b)togglePlan(b.dataset.plan,b);});$('#finish-button').addEventListener('click',finish);$('#restart-button').addEventListener('click',reset);