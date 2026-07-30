const initialState = {
  reserve: 10000,
  hours: 48,
  cost: 0,
  payment: 0,
  debt: 0,
  risk: 25,
  plan: "none",
  assignmentSafe: false,
  dataRisk: false,
  documented: false,
  strengths: [],
  improvements: []
};

const stages = [
  {
    title: "Перші десять хвилин після поломки",
    copy: "Ноутбук не реагує на кнопку живлення. У найближчому сервісі телефоном припускають «серйозну проблему з платою» й пропонують терміновий ремонт без попередньої діагностики.",
    choices: [
      {
        label: "Погодитися на ремонт одразу",
        hint: "Причина й остаточна ціна ще невідомі.",
        apply:s=>{s.risk+=20;s.hours-=2;},
        outcomeTitle:"Поспіх перетворив припущення на діагноз",
        outcome:"Без огляду неможливо знати, чи проблема в зарядному пристрої, батареї, роз’ємі або платі. Ви вже готові платити за найдорожчу версію.",
        improvement:"Не погоджувати дорогий ремонт до діагностики й кошторису."
      },
      {
        label: "Перевірити гарантію й отримати дві діагностики",
        hint: "Одна діагностика коштує 500 грн, зате дає письмовий висновок.",
        apply:s=>{s.reserve-=500;s.cost+=500;s.risk-=12;s.hours-=6;},
        outcomeTitle:"Причина стала конкретною",
        outcome:"Гарантія вже закінчилася. Обидва сервіси називають несправність живлення, а перевірений сервіс оцінює ремонт у 5 500 грн і три дні.",
        strength:"Отримано діагностику та порівняно кошториси до ремонту."
      },
      {
        label: "Одразу шукати новий ноутбук",
        hint: "Швидко, але без оцінки вартості відновлення старого.",
        apply:s=>{s.plan="rush_new";s.risk+=18;s.hours-=3;},
        outcomeTitle:"Поломка одразу стала великою покупкою",
        outcome:"Новий ноутбук вирішує проблему, але ви ще не знаєте, чи старий можна відновити за п’яту частину ціни.",
        improvement:"Спочатку порівнювати ремонт і заміну, якщо діагностика можлива."
      }
    ]
  },
  {
    title: "Пароль для майстра",
    copy: "У сервісі просять залишити пароль від основного облікового запису, щоб перевірити ноутбук після ремонту. На диску є особисті фото, документи, збережені входи й чернетка курсової.",
    choices: [
      {
        label: "Продиктувати основний пароль",
        hint: "Цей пароль також використовується для пошти.",
        apply:s=>{s.dataRisk=true;s.risk+=28;s.hours-=1;},
        outcomeTitle:"Ремонт отримав зайвий доступ до вашого цифрового життя",
        outcome:"Для базової перевірки сервісу не потрібен пароль від пошти чи інших сервісів. Повторно використаний пароль створює ризик для кількох акаунтів.",
        improvement:"Не передавати основні та повторно використані паролі третім особам."
      },
      {
        label: "Зробити копію даних, створити тимчасовий профіль і оформити приймання",
        hint: "Зафіксувати стан, серійний номер і комплектацію.",
        apply:s=>{s.documented=true;s.risk-=15;s.hours-=2;},
        outcomeTitle:"Майстер отримав доступ лише до потрібного",
        outcome:"В акті зазначено модель, серійний номер, зарядний пристрій, стан корпусу й опис несправності. Основні паролі не передаються.",
        strength:"Дані захищено, а стан пристрою зафіксовано документально."
      },
      {
        label: "Залишити ноутбук розблокованим без документа",
        hint: "Зручно для перевірки, але межі доступу й комплектність не зафіксовані.",
        apply:s=>{s.dataRisk=true;s.risk+=18;s.hours-=1;},
        outcomeTitle:"Зручність сервісу стала ризиком для даних",
        outcome:"Пристрій і файли доступні без обмежень, а довести його початковий стан або комплектацію буде складно.",
        improvement:"Фіксувати приймання техніки та обмежувати доступ до особистих даних."
      }
    ]
  },
  {
    title: "Курсова не чекатиме ремонту",
    copy: "Навіть найкращий сервіс не поверне ноутбук до дедлайну. Чернетка збережена в хмарі, але для завершення потрібен повноцінний комп’ютер.",
    choices: [
      {
        label: "Позичити ноутбук у коледжі або в знайомих",
        hint: "Працювати у власному профілі й вийти з усіх акаунтів після завершення.",
        apply:s=>{s.assignmentSafe=true;s.risk-=10;s.hours-=4;},
        outcomeTitle:"Дедлайн відокремлено від ремонту",
        outcome:"Термінове завдання можна завершити, не купуючи техніку в паніці. Після роботи ви виходите з акаунтів і видаляєте локальні копії.",
        strength:"Знайдено тимчасовий пристрій без нового боргу."
      },
      {
        label: "Орендувати ноутбук на три дні за 700 грн",
        hint: "Перевірити умови, заставу й стан пристрою.",
        apply:s=>{s.assignmentSafe=true;s.reserve-=700;s.cost+=700;s.risk-=5;s.hours-=3;},
        outcomeTitle:"Невелика тимчасова витрата купила час",
        outcome:"Оренда не вирішує поломку назавжди, але дає змогу спокійно завершити курсову й обрати довгострокове рішення.",
        strength:"Термінову потребу закрито окремим короткостроковим рішенням."
      },
      {
        label: "Чекати ремонту й просити перенести дедлайн потім",
        hint: "Домовленості про перенесення ще немає.",
        apply:s=>{s.assignmentSafe=false;s.risk+=18;s.hours-=36;},
        outcomeTitle:"Технічна проблема стала навчальним ризиком",
        outcome:"До дедлайну лишається кілька годин, а підтвердження перенесення немає. Рішення залежить від чужої швидкості.",
        improvement:"Не прив’язувати термінове завдання до строку ремонту без резервного плану."
      }
    ]
  },
  {
    title: "Ремонт, уживаний чи новий",
    copy: "Після діагностики є три варіанти: ремонт за 5 500 грн, перевірений уживаний ноутбук за 8 500 грн або новий за 30 000 грн у кредит із платежем 2 500 грн протягом року.",
    choices: [
      {
        label: "Ремонтувати за 5 500 грн",
        hint: "Сервіс дає кошторис і три місяці гарантії на роботу.",
        apply:s=>{s.plan="repair";s.reserve-=5500;s.cost+=5500;s.risk-=8;},
        outcomeTitle:"Ремонт зберіг більшу частину бюджету",
        outcome:"Сума значна, але нижча за вартість заміни. Головне тепер зафіксувати перелік робіт, запчастини, строк і гарантію.",
        strength:"Вартість ремонту порівняно з альтернативами."
      },
      {
        label: "Купити вживаний ноутбук за 8 500 грн",
        hint: "Продавець дозволяє діагностику до оплати.",
        apply:s=>{s.plan="used";s.reserve-=8500;s.cost+=8500;s.risk+=8;},
        outcomeTitle:"Ціна нижча, але історія пристрою невідома",
        outcome:"Вживаний ноутбук може бути добрим рішенням, якщо перевірити батарею, накопичувач, екран, порти, блокування й походження.",
        improvement:"Не купувати вживану техніку без повної перевірки."
      },
      {
        label: "Купити новий у кредит",
        hint: "2 500 грн із 3 000 грн вільних коштів щомісяця.",
        apply:s=>{s.plan="new";s.payment=2500;s.cost+=30000;s.reserve-=2500;s.risk+=25;},
        outcomeTitle:"Надійність нового пристрою коштувала гнучкості бюджету",
        outcome:"Після платежу залишатиметься лише 500 грн вільних коштів. Будь-яка нова витрата може потребувати ще одного боргу.",
        improvement:"Не спрямовувати майже весь вільний бюджет на один кредитний платіж."
      }
    ]
  }
];

const finalStages = {
  repair:{
    title:"Що саме ремонтують",
    copy:"Сервіс готовий почати роботу. Потрібно погодити запчастини, остаточну ціну й документи.",
    choices:[
      {label:"Підписати кошторис і отримати чек та гарантію",hint:"У документі є роботи, запчастини, строк і ціна.",apply:s=>{s.documented=true;s.risk-=15;},outcomeTitle:"Умови ремонту можна перевірити",outcome:"Ви знаєте, за що платите, і маєте документи для гарантійного звернення.",strength:"Ремонт оформлено кошторисом, чеком і гарантією."},
      {label:"Погодитися на дешевший ремонт готівкою без чека",hint:"На 1 000 грн дешевше, але без документів.",apply:s=>{s.reserve+=1000;s.cost-=1000;s.risk+=22;},outcomeTitle:"Економія прибрала підтвердження",outcome:"Якщо несправність повториться, довести обсяг робіт і гарантійні умови буде складно.",improvement:"Не відмовлятися від документів заради невеликої знижки."},
      {label:"Одразу додати SSD і пам’ять ще за 4 000 грн",hint:"Оновлення корисне, але резерв майже зникне.",apply:s=>{s.reserve-=4000;s.cost+=4000;s.risk+=12;},outcomeTitle:"Ремонт перетворився на незаплановане оновлення",outcome:"Покращення може бути доречним, але зараз воно забирає кошти, призначені для непередбачених ситуацій.",improvement:"Відокремлювати необхідний ремонт від бажаного оновлення."}
    ]
  },
  used:{
    title:"Перевірка перед оплатою",
    copy:"Продавець зустрічається особисто й дозволяє ввімкнути ноутбук. Потрібно вирішити, наскільки глибокою буде перевірка.",
    choices:[
      {label:"Заплатити 500 грн за діагностику й оформити покупку",hint:"Перевірити батарею, диск, порти, серійний номер і блокування.",apply:s=>{s.reserve-=500;s.cost+=500;s.documented=true;s.risk-=18;},outcomeTitle:"Невідомий пристрій став перевіреним",outcome:"Діагностика не дає абсолютної гарантії, але виявляє основні проблеми до оплати.",strength:"Вживану техніку перевірено до оплати й покупку зафіксовано."},
      {label:"Переказати 2 000 грн завдатку до зустрічі",hint:"Продавець обіцяє не показувати ноутбук іншим.",apply:s=>{s.reserve-=2000;s.cost+=2000;s.risk+=28;},outcomeTitle:"Завдаток з’явився раніше за перевірку",outcome:"Ви платите за товар, якого ще не бачили. Тиск інших покупців не замінює огляд.",improvement:"Не переказувати завдаток за вживану техніку до перевірки."},
      {label:"Купити без тесту, бо продавця знає знайомий",hint:"Рекомендація не показує стан батареї й накопичувача.",apply:s=>{s.risk+=15;},outcomeTitle:"Довіра замінила технічну перевірку",outcome:"Знайомство зменшує анонімність, але не скасовує приховані дефекти або чужі блокування.",improvement:"Перевіряти технічний стан незалежно від знайомства з продавцем."}
    ]
  },
  new:{
    title:"Кредит і додаткові послуги",
    copy:"До нового ноутбука пропонують налаштування, страховку й подовжену гарантію за 3 500 грн.",
    choices:[
      {label:"Перевірити повну вартість і прибрати непотрібні послуги",hint:"Залишити лише зрозумілий кредит і гарантію виробника.",apply:s=>{s.risk-=15;},outcomeTitle:"Договір залишився дорогим, але прозорим",outcome:"Ви бачите загальну суму, платіж і наслідки прострочення. Додаткові послуги не нав’язані.",strength:"Перевірено повну вартість кредиту та прибрано зайві послуги."},
      {label:"Додати все, щоб точно не мати проблем",hint:"Загальна вартість зросте до 33 500 грн.",apply:s=>{s.reserve-=3500;s.cost+=3500;s.risk+=18;},outcomeTitle:"Страх поломки зробив покупку ще дорожчою",outcome:"Додаткові послуги мають сенс лише після порівняння умов, винятків і ціни.",improvement:"Не купувати всі додаткові послуги без аналізу їхніх умов."},
      {label:"Відмовитися від кредиту й повернутися до ремонту",hint:"Переглянути рішення до підписання.",apply:s=>{s.reserve+=2500;s.cost-=30000;s.payment=0;s.plan="repair_later";s.risk-=20;},outcomeTitle:"Відмова до підпису зберегла майбутній дохід",outcome:"Витрачений час не зобов’язує завершувати покупку. Ви повертаєтеся до діагностики й тимчасового рішення.",strength:"Кредит не оформлено лише через терміновість."}
    ]
  }
};

let state,stageIndex,activeStage;
const el={
 intro:document.getElementById("case-intro"),start:document.getElementById("start-button"),game:document.getElementById("game"),grid:document.getElementById("game-grid"),result:document.getElementById("result"),progress:document.getElementById("progress"),step:document.getElementById("scene-step"),title:document.getElementById("scene-title"),copy:document.getElementById("scene-copy"),choices:document.getElementById("choices"),consequence:document.getElementById("consequence"),consequenceTitle:document.getElementById("consequence-title"),consequenceCopy:document.getElementById("consequence-copy"),next:document.getElementById("next-button"),restart:document.getElementById("restart-button")
};
const clamp=(v,min,max)=>Math.min(max,Math.max(min,v));
const money=v=>`${Math.max(0,Math.round(v)).toLocaleString("uk-UA")} грн`;
function updateMetrics(){state.reserve=Math.max(0,state.reserve);state.hours=Math.max(0,state.hours);state.risk=clamp(state.risk,0,100);document.getElementById("metric-reserve").textContent=money(state.reserve);document.getElementById("metric-hours").textContent=`${Math.round(state.hours)} год`;document.getElementById("metric-cost").textContent=money(state.cost);document.getElementById("metric-risk").textContent=`${state.risk} / 100`;}
function applyChoice(c){c.apply(state);state.risk=clamp(state.risk,0,100);state.reserve=Math.max(0,state.reserve);if(c.strength&&!state.strengths.includes(c.strength))state.strengths.push(c.strength);if(c.improvement&&!state.improvements.includes(c.improvement))state.improvements.push(c.improvement);}
function renderStage(){activeStage=stageIndex===4?(finalStages[state.plan]||finalStages.repair):stages[stageIndex];el.progress.style.width=`${((stageIndex+1)/5)*100}%`;el.step.textContent=`Рішення ${stageIndex+1} із 5`;el.title.textContent=activeStage.title;el.copy.textContent=activeStage.copy;el.consequence.classList.remove("is-visible");el.choices.innerHTML="";activeStage.choices.forEach((c,i)=>{const b=document.createElement("button");b.type="button";b.className="choice";b.innerHTML=`<strong>${c.label}</strong><span>${c.hint}</span>`;b.addEventListener("click",()=>selectChoice(i,b));el.choices.appendChild(b);});updateMetrics();el.grid.scrollIntoView({behavior:"smooth",block:"start"});}
function selectChoice(i,selected){const c=activeStage.choices[i];applyChoice(c);[...el.choices.children].forEach(b=>{b.disabled=true;b.classList.toggle("is-selected",b===selected);});el.consequenceTitle.textContent=c.outcomeTitle;el.consequenceCopy.textContent=c.outcome;el.next.textContent=stageIndex===4?"Побачити фінал →":"Продовжити →";el.consequence.classList.add("is-visible");updateMetrics();}
function ending(){
 if(state.dataRisk||state.risk>=85)return{badge:"Дані під загрозою",title:"Техніку врятувати легше, ніж скомпрометовані доступи",lead:"Поспіх відкрив стороннім доступ до файлів або паролів. Після повернення пристрою потрібно змінити скомпрометовані паролі й перевірити активні сеанси."};
 if(state.payment>=2500)return{badge:"Дорогий новий старт",title:"Ноутбук працює, але платіж забрав майже весь вільний бюджет",lead:"Нова техніка розв’язала проблему швидко, проте фінансовий запас міцності став дуже малим."};
 if(!state.assignmentSafe&&state.hours<=12)return{badge:"Дедлайн під загрозою",title:"Довгострокове рішення не врятувало термінове завдання",lead:"Ремонт або купівля техніки не замінили резервного плану на найближчі 48 годин."};
 if(state.reserve<1000)return{badge:"Резерв вичерпано",title:"Технічну проблему вирішено ціною фінансової стійкості",lead:"Рішення може працювати, але наступна несподівана витрата вже не має фінансового покриття."};
 if(state.plan==="used"&&state.documented&&state.risk<=40)return{badge:"Перевірена альтернатива",title:"Уживаний ноутбук став контрольованою покупкою",lead:"Ви не поклалися лише на низьку ціну: пристрій перевірено, а покупку й комплектацію зафіксовано."};
 if((state.plan==="repair"||state.plan==="repair_later")&&state.documented&&state.risk<=35)return{badge:"Стійке рішення",title:"Курсова завершена, ноутбук ремонтується, бюджет збережено",lead:"Ви відокремили термінове завдання від ремонту, захистили дані й зафіксували умови сервісу."};
 return{badge:"Часткове рішення",title:"Ноутбук буде, але кілька ризиків залишилися",lead:"Ви розв’язали основну проблему, проте документи, дані, дедлайн або резерв потребували більшої уваги."};
}
function list(id,items,fallback){const ul=document.getElementById(id);ul.innerHTML="";([...new Set(items)].length?[...new Set(items)]:[fallback]).slice(0,4).forEach(x=>{const li=document.createElement("li");li.textContent=x;ul.appendChild(li);});}
function showResult(){const e=ending();el.grid.style.display="none";el.result.classList.add("is-visible");document.getElementById("result-badge").textContent=e.badge;document.getElementById("result-title").textContent=e.title;document.getElementById("result-lead").textContent=e.lead;document.getElementById("result-reserve").textContent=money(state.reserve);document.getElementById("result-cost").textContent=money(state.cost);document.getElementById("result-payment").textContent=money(state.payment);document.getElementById("result-risk").textContent=`${state.risk} / 100`;list("result-strengths",state.strengths,"Ви завершили сценарій і можете перевірити інший маршрут.");list("result-improvements",state.improvements,"Перед наступним рішенням відокремте термінову потребу від довгострокової покупки.");el.result.scrollIntoView({behavior:"smooth",block:"start"});}
function start(){state={...initialState,strengths:[],improvements:[]};stageIndex=0;el.intro.style.display="none";el.game.classList.add("is-visible");el.grid.style.display="";el.result.classList.remove("is-visible");renderStage();}
el.start.addEventListener("click",start);el.next.addEventListener("click",()=>{if(stageIndex===4){showResult();return;}stageIndex++;renderStage();});el.restart.addEventListener("click",start);
