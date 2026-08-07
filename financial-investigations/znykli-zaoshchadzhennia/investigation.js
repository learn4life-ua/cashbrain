const evidence=[
{id:'ledger',type:'Запис про заощадження',title:'24 000 грн відкладено на ноутбук',preview:'12 місяців тому · сума зафіксована',visual:'НОТАТКА ПРО ЦІЛЬ\n\nМета ............ ноутбук\nСума ............ 24 000 грн\nСтрок ........... 12 місяців\n\nГроші відкладені повністю.',copy:'Цей документ фіксує початкову суму й фінансову ціль. Саме з ним треба порівнювати результат через рік.',key:true,icon:'₴'},
{id:'friend',type:'Порада знайомого',title:'«Готівка не може втратити вартість»',preview:'Припущення · без розрахунків',visual:'ЧАТ\n\n«Якщо 24 000 грн лежать у сейфі, вони так і залишаться 24 000 грн. Отже нічого не втрачається».',copy:'Номінальна сума справді не змінюється, але це не доводить незмінність купівельної спроможності.',key:false,icon:'?'},
{id:'oldprice',type:'Архів ціни',title:'Ноутбук коштував 24 000 грн',preview:'Рік тому · та сама модель',visual:'АРХІВ МАГАЗИНУ\n\nНоутбук Model X\nЦіна: 24 000 грн\nДата: 12 місяців тому',copy:'Архів показує стартову ціну цілі. Рік тому накопиченої суми вистачало на покупку повністю.',key:true,icon:'24'},
{id:'crypto',type:'Рекламна пропозиція',title:'«5% щотижня гарантовано»',preview:'Надприбуток · без пояснення ризику',visual:'РЕКЛАМА\n\n«Вкладіть заощадження у цифровий актив.\n5% щотижня гарантовано.\nРизику немає».',copy:'Обіцянка високої гарантованої дохідності без опису ризику — не доказ причини втрати заощаджень і сама є сигналом небезпеки.',key:false,icon:'↗'},
{id:'newprice',type:'Поточна ціна',title:'Тепер ноутбук коштує 27 600 грн',preview:'+3 600 грн · +15%',visual:'КАТАЛОГ СЬОГОДНІ\n\nНоутбук Model X\nЦіна: 27 600 грн\n\nЗміна: +3 600 грн (+15%)',copy:'Ціна конкретної цілі зросла на 15%. Накопичених 24 000 грн тепер не вистачає на 3 600 грн.',key:true,icon:'27'},
{id:'cash',type:'Умови зберігання',title:'Готівка в домашньому сейфі',preview:'Дохідність 0% · поповнень не було',visual:'СПОСІБ ЗБЕРІГАННЯ\n\nДомашній сейф\nПочаток: 24 000 грн\nПоповнення: 0 грн\nВилучення: 0 грн\nНарахований дохід: 0 грн',copy:'Документ пояснює, чому номінальна сума не зросла разом із цінами: заощадження не приносили доходу.',key:true,icon:'0%'},
{id:'coupon',type:'Промокод магазину',title:'Знижка 200 грн на аксесуари',preview:'Не діє на ноутбук',visual:'ПРОМОКОД\n\n-200 грн на миші та чохли.\nНа ноутбуки не поширюється.',copy:'Ця знижка не змінює ціну фінансової цілі й не пояснює втрату купівельної спроможності.',key:false,icon:'-200'},
{id:'inflation',type:'Статистичний бюлетень',title:'Споживчі ціни зросли на 12%',preview:'Річна інфляція · навчальний показник',visual:'СТАТИСТИЧНИЙ БЮЛЕТЕНЬ\n\nІндекс споживчих цін за рік: +12%\n\nЦе означає загальне зростання рівня цін. Окремі товари можуть дорожчати швидше або повільніше.',copy:'Інфляція пояснює загальне зниження купівельної спроможності грошей. При 12% інфляції 24 000 грн через рік мають реальну вартість приблизно 21 429 грн у цінах початку року.',key:true,icon:'12%'}
];

const calculations=[
{id:'a',label:'Розрахунок А',text:'24 000 грн не змінилися, тому реальна вартість заощаджень теж не змінилася.',correct:false},
{id:'b',label:'Розрахунок Б',text:'За інфляції 12% реальна вартість 24 000 грн становить приблизно 24 000 ÷ 1,12 = 21 429 грн у цінах початку року. Ноутбук окремо подорожчав на 15%, тому до покупки бракує 3 600 грн.',correct:true},
{id:'c',label:'Розрахунок В',text:'Інфляція 12% означає, що з сейфа фізично зникло 2 880 грн, тому залишилося 21 120 грн.',correct:false},
{id:'d',label:'Розрахунок Г',text:'Якщо ноутбук подорожчав на 15%, то всі товари й послуги обов’язково подорожчали рівно на 15%.',correct:false}
];

const suspects=[
{id:'theft',mark:'01',title:'Приховане списання грошей',text:'Сума в сейфі не зменшувалася, тому фізичного списання або крадіжки матеріали не підтверджують.',correct:false},
{id:'inflation',mark:'02',title:'Інфляція + нульова дохідність',text:'Ціни зростали, а готівкові заощадження не приносили доходу. Номінал зберігся, але купівельна спроможність знизилася.',correct:true},
{id:'shop',mark:'03',title:'Магазин забрав частину заощаджень',text:'Магазин змінив ціну товару, але не мав доступу до грошей Марії.',correct:false},
{id:'coupon',mark:'04',title:'Промокод зменшив суму накопичень',text:'Промокод стосується аксесуарів і не впливає ні на баланс, ні на ціну ноутбука.',correct:false}
];

const plans=[
{id:'goal',mark:'01',title:'Визначати мету і строк заощаджень',text:'Спосіб зберігання має відповідати тому, коли гроші знадобляться і яку суму потрібно зберегти.',correct:true},
{id:'cash',mark:'02',title:'Завжди тримати всі гроші лише готівкою',text:'Готівка ліквідна, але тривале зберігання всієї суми без доходу залишає інфляційний ризик.',correct:false},
{id:'compare',mark:'03',title:'Порівнювати дохідність, ризик і ліквідність',text:'Оцінювати не тільки відсоток, а й ризик втрат, доступність коштів, комісії та вплив інфляції.',correct:true},
{id:'reserve',mark:'04',title:'Тримати резерв окремо від довгострокових цілей',text:'Фінансова подушка має залишатися доступною, а довші цілі можуть мати інший допустимий рівень ризику.',correct:true},
{id:'allin',mark:'05',title:'Вкласти всю суму в актив із «гарантованим» надприбутком',text:'Висока обіцяна дохідність без ризику — тривожний сигнал. Ризикувати всією сумою нераціонально.',correct:false},
{id:'review',mark:'06',title:'Періодично переглядати суму цілі та план поповнень',text:'Якщо ціна цілі зростає, план накопичень треба коригувати, а не чекати, що стара сума залишиться достатньою.',correct:true}
];

const state={viewed:new Set(),selected:new Set(),calculation:null,suspect:null,plans:new Set(),evidenceScore:0,calculationScore:0,verdictScore:0,planScore:0,currentEvidence:null};
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];

function renderEvidence(){
  const cards=evidence.map((x,i)=>`<button class="evidence-card" data-evidence="${x.id}" type="button"><span class="evidence-top"><span>МАТЕРІАЛ ${String(i+1).padStart(2,'0')}</span><b class="evidence-state">Не оглянуто</b></span><span class="evidence-icon">${x.icon}</span><span class="evidence-type">${x.type}</span><strong>${x.title}</strong><small>${x.preview}</small><em>Відкрити документ →</em></button>`).join('');
  $('#evidence-board').innerHTML=`<header class="board-toolbar"><div><span>ФІНАНСОВІ СЛІДИ · CB-24012</span><strong>Матеріали заощаджень</strong></div><div><small>Оглянуто</small><b id="board-viewed">0 / 8</b></div></header><div class="board-canvas">${cards}</div><section class="selection-folder"><header><div><span>РОБОЧА ПАПКА</span><strong>Ключові докази втрати купівельної спроможності</strong></div><small>Рівно 5 матеріалів</small></header><ol id="selected-evidence"></ol></section>`;
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
function openEvidence(id){const x=evidence.find(e=>e.id===id);state.currentEvidence=id;state.viewed.add(id);$('#modal-label').textContent=`Матеріал справи · ${x.type}`;$('#modal-title').textContent=x.title;$('#modal-visual').textContent=x.visual;$('#modal-copy').textContent=x.copy;updateEvidence();updateModalButton();$('#evidence-modal').hidden=false;document.body.classList.add('modal-open');}
function closeModal(){$('#evidence-modal').hidden=true;document.body.classList.remove('modal-open');state.currentEvidence=null;}
function updateModalButton(){const yes=state.selected.has(state.currentEvidence);$('#modal-select').textContent=yes?'Вилучити з робочої папки':'Долучити до робочої папки';$('#modal-select').classList.toggle('is-remove',yes);}
function toggleEvidence(){const id=state.currentEvidence;if(state.selected.has(id))state.selected.delete(id);else if(state.selected.size<5)state.selected.add(id);updateModalButton();updateEvidence();}
function updateEvidence(){
  $$('.evidence-card').forEach(card=>{const id=card.dataset.evidence,viewed=state.viewed.has(id),selected=state.selected.has(id);card.classList.toggle('is-viewed',viewed);card.classList.toggle('is-selected',selected);card.querySelector('.evidence-state').textContent=selected?'Долучено':viewed?'Оглянуто':'Не оглянуто';});
  $('#board-viewed').textContent=`${state.viewed.size} / 8`;const chosen=[...state.selected].map(id=>evidence.find(x=>x.id===id));
  $('#selected-evidence').innerHTML=Array.from({length:5},(_,i)=>chosen[i]?`<li class="is-filled"><span>${i+1}</span><strong>${chosen[i].title}</strong><button type="button" data-remove="${chosen[i].id}" aria-label="Вилучити ${chosen[i].title}">×</button></li>`:`<li><span>${i+1}</span><em>Вільне місце для доказу</em></li>`).join('');
  const all=state.viewed.size===8,full=state.selected.size===5;$('#check-evidence').disabled=!(all&&full);$('#evidence-hint').textContent=!all?`Оглянуто ${state.viewed.size} із 8 матеріалів.`:!full?`Долучено ${state.selected.size} із 5 доказів.`:'Усі матеріали оглянуто. Можна зафіксувати докази.';updateDashboard(1);
}
function showStage(id,number){$$('.stage').forEach(x=>x.classList.remove('is-active'));$(id).classList.add('is-active');updateDashboard(number);window.scrollTo({top:$(id).offsetTop-90,behavior:'smooth'});}
function chooseOne(selector,key,id,button){state[key]=id;$$(selector).forEach(x=>x.classList.remove('is-selected'));button.classList.add('is-selected');}
function checkEvidence(){const keys=evidence.filter(x=>x.key).map(x=>x.id);state.evidenceScore=keys.filter(x=>state.selected.has(x)).length*8;showStage('#stage-calculation',2);}
function checkCalculation(){state.calculationScore=calculations.find(x=>x.id===state.calculation)?.correct?20:0;showStage('#stage-verdict',3);}
function checkVerdict(){state.verdictScore=suspects.find(x=>x.id===state.suspect)?.correct?20:0;showStage('#stage-plan',4);}
function togglePlan(id,button){if(state.plans.has(id)){state.plans.delete(id);button.classList.remove('is-selected');}else if(state.plans.size<4){state.plans.add(id);button.classList.add('is-selected');}$('#finish-button').disabled=state.plans.size!==4;$('#plan-hint').textContent=`Обрано ${state.plans.size} із 4 дій.`;}
function finish(){
  state.planScore=plans.filter(x=>x.correct&&state.plans.has(x.id)).length*5;const score=state.evidenceScore+state.calculationScore+state.verdictScore+state.planScore;
  $('#stage-plan').classList.remove('is-active');$('.case-dashboard').style.display='none';$('#result').classList.add('is-visible');$('#result-score').textContent=`${score} / 100`;
  const level=score>=90?['Купівельну спроможність відновлено','Ви правильно відрізнили номінальну суму від реальної вартості, врахували інфляцію й визначили безпечніші правила для фінансової цілі.']:score>=70?['Механізм втрати переважно встановлено','Основна причина зрозуміла, але в доказах, розрахунку або плані залишилися неточності.']:['У справі залишилися прогалини','Поверніться до стартової суми, старої й нової ціни, умов зберігання та показника інфляції. Разом вони пояснюють, чому 24 000 грн стали менш достатніми.'];
  $('#result-title').textContent=level[0];$('#result-lead').textContent=level[1];
  const missed=evidence.filter(x=>x.key&&!state.selected.has(x.id)).map(x=>x.title),noise=evidence.filter(x=>!x.key&&state.selected.has(x.id)).map(x=>x.title),wrong=plans.filter(x=>!x.correct&&state.plans.has(x.id)).map(x=>x.title);
  $('#report-content').innerHTML=`<p><strong>Докази:</strong> ${state.evidenceScore===40?'усі п’ять ключових матеріалів визначено правильно.':`пропущено: ${missed.join(', ')||'немає'}; зайві: ${noise.join(', ')||'немає'}.`}</p><p><strong>Реальна вартість:</strong> ${state.calculationScore?'правильно розрізнено загальну інфляцію 12%, реальну вартість близько 21 429 грн у цінах початку року та окреме подорожчання ноутбука на 15%.':'обраний розрахунок плутає номінальну суму, інфляцію або зміну ціни конкретного товару.'}</p><p><strong>Механізм:</strong> ${state.verdictScore?'встановлено: ціни зростали, а готівка мала нульову дохідність, тому купівельна спроможність зменшилася.':'версія не пояснює одночасно незмінний номінал і зростання цін.'}</p><p><strong>План:</strong> ${state.planScore===20?'усі чотири захисні дії обрано правильно.':`ризикові рішення: ${wrong.join(', ')||'частину необхідних дій не обрано'}.`}</p>`;
  window.scrollTo({top:$('#result').offsetTop-30,behavior:'smooth'});
}
function reset(){state.viewed.clear();state.selected.clear();state.plans.clear();state.calculation=null;state.suspect=null;state.evidenceScore=state.calculationScore=state.verdictScore=state.planScore=0;$('.case-dashboard').style.display='grid';$('#result').classList.remove('is-visible');$$('.is-selected,.is-viewed').forEach(x=>x.classList.remove('is-selected','is-viewed'));$('#check-calculation').disabled=true;$('#check-verdict').disabled=true;$('#finish-button').disabled=true;$('#plan-hint').textContent='Оберіть 4 дії.';showStage('#stage-evidence',1);updateEvidence();}

renderEvidence();renderChoices();
$('#start-button').addEventListener('click',()=>{$('#investigation').classList.add('is-visible');$('#briefing').style.display='none';window.scrollTo({top:$('#investigation').offsetTop-20,behavior:'smooth'});});
$('#evidence-board').addEventListener('click',e=>{const remove=e.target.closest('[data-remove]');if(remove){state.selected.delete(remove.dataset.remove);updateEvidence();return;}const card=e.target.closest('[data-evidence]');if(card)openEvidence(card.dataset.evidence);});
$('#modal-select').addEventListener('click',toggleEvidence);$$('[data-close-modal]').forEach(x=>x.addEventListener('click',closeModal));document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!$('#evidence-modal').hidden)closeModal();});
$('#check-evidence').addEventListener('click',checkEvidence);
$('#calculation-options').addEventListener('click',e=>{const b=e.target.closest('[data-calculation]');if(!b)return;chooseOne('.choice-option[data-calculation]','calculation',b.dataset.calculation,b);$('#check-calculation').disabled=false;});$('#check-calculation').addEventListener('click',checkCalculation);
$('#suspects').addEventListener('click',e=>{const b=e.target.closest('[data-suspect]');if(!b)return;chooseOne('.choice-option[data-suspect]','suspect',b.dataset.suspect,b);$('#check-verdict').disabled=false;});$('#check-verdict').addEventListener('click',checkVerdict);
$('#plan-options').addEventListener('click',e=>{const b=e.target.closest('[data-plan]');if(b)togglePlan(b.dataset.plan,b);});$('#finish-button').addEventListener('click',finish);$('#restart-button').addEventListener('click',reset);
