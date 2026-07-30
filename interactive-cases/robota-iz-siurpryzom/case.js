const initialState = {
  money: 5000,
  risk: 35,
  time: 10,
  trust: 30,
  fraudLoss: 0,
  unpaidHours: 0,
  exposedData: false,
  muleRisk: false,
  strengths: [],
  improvements: []
};

const stages = [
  {
    title: "Вакансія без зайвих подробиць",
    copy: "Автор допису переводить розмову в Telegram. Каже, що компанія міжнародна, але назву розкриють після відбору. Для анкети просить фото паспорта, селфі з документом і номер картки для майбутньої зарплати.",
    choices: [
      {
        label: "Надіслати все, щоб швидше потрапити на співбесіду",
        hint: "Рекрутер ще не підтвердив компанію та свої повноваження.",
        effects: {risk:25,time:-0.2,trust:-12,exposedData:true},
        outcomeTitle: "Даних стало більше, доказів не додалося",
        outcome: "Невідомий співрозмовник отримав документи й платіжні реквізити раніше, ніж ви дізналися назву роботодавця. Для першого контакту це надмірний обсяг даних.",
        improvement: "Не надсилати документи та платіжні дані неперевіреному рекрутеру."
      },
      {
        label: "Перевірити компанію, контакти, опис роботи та автора вакансії",
        hint: "Попросити повну назву й знайти вакансію на офіційному ресурсі.",
        effects: {risk:-12,time:-0.5,trust:18},
        outcomeTitle: "У вакансії з’явилися помітні прогалини",
        outcome: "За вказаним номером немає компанії, а текст оголошення повторюється в різних містах. Ви просите офіційну адресу й повний опис обов’язків.",
        strength: "Перевірено роботодавця та походження вакансії до передавання даних."
      },
      {
        label: "Одразу відмовитися від вакансії",
        hint: "Безпечно, але без розуміння конкретних ознак ризику.",
        effects: {risk:-5,time:-1,trust:5},
        outcomeTitle: "Ви зберегли дані, але втратили день пошуку",
        outcome: "Відмова захистила від цієї пропозиції. Проте для наступних вакансій корисно мати зрозумілий перелік перевірок, а не покладатися лише на відчуття.",
        strength: "Особисті та банківські дані не передано.",
        improvement: "Фіксувати конкретні ознаки ризику, щоб краще перевіряти наступні вакансії."
      }
    ]
  },
  {
    title: "Поворотний страховий внесок",
    copy: "Рекрутер повідомляє, що ви пройшли перший етап. Перед навчанням потрібно сплатити 900 грн за доступ до кабінету й страховку обладнання. Гроші нібито повернуть із першою зарплатою.",
    choices: [
      {
        label: "Сплатити 900 грн і зберегти чек",
        hint: "Чек підтвердить платіж, але не справжність вакансії.",
        effects: {money:-900,risk:30,time:-0.2,trust:-22,fraudLoss:900},
        outcomeTitle: "Платіж відкрив не роботу, а новий етап тиску",
        outcome: "Після переказу рекрутер обіцяє інструкції пізніше й просить ні з ким не обговорювати умови. Роботодавець не має перекладати на кандидата плату за доступ до вакансії.",
        improvement: "Не платити за доступ, навчання, страховку чи активацію вакансії."
      },
      {
        label: "Відмовитися платити й попросити офіційний порядок працевлаштування",
        hint: "Уточнити, хто роботодавець і на якій підставі стягують гроші.",
        effects: {risk:-15,time:-0.4,trust:18},
        outcomeTitle: "Просте запитання зламало переконливу легенду",
        outcome: "Рекрутер не надає рахунок компанії, договір або правила повернення внеску. Замість відповіді повторює, що місць майже немає.",
        strength: "Відхилено плату за вакансію та запитано офіційні умови."
      },
      {
        label: "Домовитися про менший внесок у 300 грн",
        hint: "Менша сума не підтверджує роботодавця.",
        effects: {money:-300,risk:20,time:-0.2,trust:-12,fraudLoss:300},
        outcomeTitle: "Компроміс зменшив суму, але не проблему",
        outcome: "Рекрутер легко погоджується на менший платіж. Це показує, що метою може бути будь-який переказ, а не реальна страховка.",
        improvement: "Не замінювати перевірку вакансії торгом про розмір внеску."
      }
    ]
  },
  {
    title: "Тестове завдання на шість годин",
    copy: "Наступний етап - завантажити в магазин 150 карток товарів із реальними фото й цінами. Рекрутер називає це тестовим завданням і дає строк до вечора. Оплата не передбачена.",
    choices: [
      {
        label: "Виконати все, щоб довести мотивацію",
        hint: "Результат одразу можна використати в роботі магазину.",
        effects: {risk:12,time:-1,trust:-10,unpaidHours:6},
        outcomeTitle: "Компанія отримала готову роботу без зобов’язань",
        outcome: "Шість годин витрачено на реальний каталог. Після відправлення файлів рекрутер не дає оцінки й переходить до нового завдання.",
        improvement: "Не виконувати повноцінну виробничу роботу під виглядом тестового завдання."
      },
      {
        label: "Запропонувати короткий тест на вигаданих даних або оплачувану зміну",
        hint: "Обмежити тест до 45 хвилин і не створювати готовий продукт.",
        effects: {risk:-10,time:-0.5,trust:18,unpaidHours:0.75},
        outcomeTitle: "Межі зробили тест справді тестом",
        outcome: "Ви готові показати навички, але не безоплатно наповнювати магазин. Справжній роботодавець може оцінити підхід на короткому прикладі.",
        strength: "Тестове завдання обмежено за часом і практичною цінністю для роботодавця."
      },
      {
        label: "Відмовитися від будь-якого тестового завдання",
        hint: "Захищає час, але не кожне коротке тестове є зловживанням.",
        effects: {risk:-5,time:-1,trust:5},
        outcomeTitle: "Час збережено, можливість перевірки теж втрачено",
        outcome: "Ви не працюєте безоплатно, але категорична відмова від будь-якої перевірки навичок може закрити й добросовісну вакансію.",
        strength: "Повноцінну безоплатну зміну не виконано.",
        improvement: "Розрізняти коротку перевірку навичок і завдання, яке створює готовий продукт."
      }
    ]
  },
  {
    title: "Договір потім, картка зараз",
    copy: "Рекрутер пропонує почати завтра, а оформлення обіцяє через два тижні. Із заявлених 28 000 грн гарантовано лише 8 000, решта залежить від невідомих бонусів. Ще одна умова - приймати платежі клієнтів на власну картку й переказувати їх менеджеру.",
    choices: [
      {
        label: "Погодитися: головне почати заробляти",
        hint: "Реальна робота без оформлення та рух чужих коштів.",
        effects: {risk:35,time:-0.3,trust:-30,muleRisk:true,unpaidHours:4},
        outcomeTitle: "Вакансія перетворилася на фінансову схему",
        outcome: "Особистий рахунок не повинен бути транзитним для грошей невідомого походження. Ви також не маєте підтвердження обов’язків, оплати й самого працевлаштування.",
        improvement: "Не використовувати особисту картку для переказу коштів невідомого походження."
      },
      {
        label: "Попросити оформлення, точну оплату, графік і відмовитися від переказів",
        hint: "Усі ключові умови мають бути зрозумілими до початку роботи.",
        effects: {risk:-18,time:-0.5,trust:25},
        outcomeTitle: "Конкретні умови відділили роботу від обіцянок",
        outcome: "Ви просите назвати фіксовану оплату, критерії бонусів, обов’язки, графік і форму оформлення. Особисту картку для розрахунків компанії не надаєте.",
        strength: "До початку роботи запитано оформлення та всі істотні умови оплати."
      },
      {
        label: "Почати без оформлення, але відмовитися від переказів через картку",
        hint: "Один великий ризик прибрано, інші залишилися.",
        effects: {risk:12,time:-0.5,trust:-10,unpaidHours:4},
        outcomeTitle: "Ви уникнули ролі посередника, але працюєте без гарантій",
        outcome: "Відмова від транзитних переказів правильна. Проте без оформлення, чіткої ставки та зафіксованого графіка роботодавець може не оплатити виконану роботу.",
        strength: "Відхилено використання особистої картки для чужих платежів.",
        improvement: "Не починати реальну роботу без узгодженої форми оформлення й оплати."
      }
    ]
  },
  {
    title: "Остання перевірка",
    copy: "Рекрутер надсилає посилання на «корпоративну зарплатну систему». Сторінка просить номер картки, строк дії, CVV-код і код із SMS. У чаті вас кваплять завершити активацію за п’ять хвилин.",
    choices: [
      {
        label: "Зупинитися, звернутися до банку й повідомити про вакансію",
        hint: "Діяти через офіційні канали, особливо якщо дані або гроші вже передані.",
        effects: {risk:-22,time:-0.5,trust:12},
        outcomeTitle: "Ви припинили контакт і перейшли до захисту",
        outcome: "Посилання закрито, докази збережено. Якщо дані вже передавалися, ви зв’язуєтеся з банком, змінюєте паролі і повідомляєте платформу та Кіберполіцію.",
        strength: "Підозріле посилання не використано, обрано офіційний алгоритм реагування."
      },
      {
        label: "Нічого не вводити, але почекати пояснень рекрутера",
        hint: "Дані не передано, однак контакт із шахрайською схемою триває.",
        effects: {risk:8,time:-1,trust:-8},
        outcomeTitle: "Ви не втратили нових даних, але втратили час",
        outcome: "Рекрутер повторює вимогу й погрожує скасувати працевлаштування. Жодного офіційного пояснення призначення CVV-коду та SMS немає.",
        strength: "CVV-код і код підтвердження не передано.",
        improvement: "Після очевидної спроби викрадення даних припиняти контакт і повідомляти про схему."
      },
      {
        label: "Заповнити форму, бо зарплата має кудись надійти",
        hint: "Для зарахування зарплати CVV-код і код із SMS не потрібні.",
        effects: {risk:35,time:-0.2,trust:-30,exposedData:true},
        outcomeTitle: "Зарплатна форма відкрила доступ не до зарплати",
        outcome: "Ви передали дані, які можуть бути використані для операцій із карткою. Коди підтвердження не можна повідомляти роботодавцю або вводити на невідомих сторінках.",
        improvement: "Ніколи не передавати CVV-код, PIN, пароль банкінгу або код із SMS."
      }
    ]
  }
];

const safeFinalStage = {
  title: "Перевірена пропозиція без чарівних обіцянок",
  copy: "Через офіційний сайт ви знаходите іншу вакансію з нижчою, але фіксованою оплатою. Є назва роботодавця, робоча пошта, конкретні обов’язки, графік і можливість оформлення до початку роботи.",
  choices: [
    {
      label: "Уточнити суму на руки, оформлення й погодити дату початку",
      hint: "Перевірити умови до першої робочої години.",
      effects: {risk:-10,time:-0.5,trust:15},
      outcomeTitle: "Робота починається з домовленостей, а не з сюрпризів",
      outcome: "Оплата, графік, обов’язки та форма оформлення зрозумілі до старту. Від вас не вимагають передоплати або використання особистої картки для чужих коштів.",
      strength: "Обрано вакансію з перевіреним роботодавцем і зрозумілими умовами."
    },
    {
      label: "Обрати іншу пропозицію з вищою оплатою готівкою без оформлення",
      hint: "Дохід привабливіший, але гарантії знову зникають.",
      effects: {risk:25,time:-0.3,trust:-18,unpaidHours:4},
      outcomeTitle: "Вища цифра повернула стару невизначеність",
      outcome: "Без зафіксованих умов складно довести обсяг роботи й суму оплати. Приваблива обіцянка не компенсує відсутність базових домовленостей.",
      improvement: "Не обирати лише найбільшу цифру без перевірки умов і роботодавця."
    },
    {
      label: "Відкласти працевлаштування й продовжити спокійний пошук",
      hint: "Гроші не втрачені, але дохід відкладається.",
      effects: {risk:-8,time:-2,trust:8},
      outcomeTitle: "Обережність зберегла ресурси, але не дала доходу",
      outcome: "Ви не погодилися на сумнівну роботу й не втратили гроші. Водночас варто встановити строк пошуку та критерії прийнятної вакансії, щоб рішення не відкладалося безкінечно.",
      strength: "Не прийнято рішення лише через термінову потребу в доході.",
      improvement: "Визначити строк пошуку та мінімальні прийнятні умови вакансії."
    }
  ]
};

let state;
let stageIndex;
let activeStage;

const elements = {
  intro: document.getElementById("case-intro"),
  start: document.getElementById("start-button"),
  game: document.getElementById("game"),
  grid: document.getElementById("game-grid"),
  result: document.getElementById("result"),
  progress: document.getElementById("progress"),
  step: document.getElementById("scene-step"),
  title: document.getElementById("scene-title"),
  copy: document.getElementById("scene-copy"),
  choices: document.getElementById("choices"),
  consequence: document.getElementById("consequence"),
  consequenceTitle: document.getElementById("consequence-title"),
  consequenceCopy: document.getElementById("consequence-copy"),
  next: document.getElementById("next-button"),
  restart: document.getElementById("restart-button")
};

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function formatMoney(value) {
  return `${Math.round(value).toLocaleString("uk-UA")} грн`;
}

function formatDays(value) {
  const rounded = Math.max(0, Math.round(value * 10) / 10);
  const word = rounded === 1 ? "день" : rounded >= 2 && rounded <= 4 ? "дні" : "днів";
  return `${String(rounded).replace(".", ",")} ${word}`;
}

function formatHours(value) {
  const rounded = Math.round(value * 100) / 100;
  return `${String(rounded).replace(".", ",")} год`;
}

function updateMetrics() {
  document.getElementById("metric-money").textContent = formatMoney(state.money);
  document.getElementById("metric-risk").textContent = `${state.risk} / 100`;
  document.getElementById("metric-time").textContent = formatDays(state.time);
  document.getElementById("metric-trust").textContent = `${state.trust} / 100`;
}

function applyEffects(choice) {
  const effects = choice.effects;
  state.money = Math.max(0, state.money + (effects.money || 0));
  state.risk = clamp(state.risk + (effects.risk || 0), 0, 100);
  state.time = Math.max(0, state.time + (effects.time || 0));
  state.trust = clamp(state.trust + (effects.trust || 0), 0, 100);
  state.fraudLoss += effects.fraudLoss || 0;
  state.unpaidHours += effects.unpaidHours || 0;
  state.exposedData = state.exposedData || Boolean(effects.exposedData);
  state.muleRisk = state.muleRisk || Boolean(effects.muleRisk);
  if (choice.strength && !state.strengths.includes(choice.strength)) state.strengths.push(choice.strength);
  if (choice.improvement && !state.improvements.includes(choice.improvement)) state.improvements.push(choice.improvement);
}

function shouldShowRecoveryStage() {
  return state.fraudLoss > 0 || state.exposedData || state.muleRisk;
}

function renderStage() {
  activeStage = stageIndex === stages.length - 1 && !shouldShowRecoveryStage()
    ? safeFinalStage
    : stages[stageIndex];
  elements.progress.style.width = `${((stageIndex + 1) / stages.length) * 100}%`;
  elements.step.textContent = `Рішення ${stageIndex + 1} із ${stages.length}`;
  elements.title.textContent = activeStage.title;
  elements.copy.textContent = activeStage.copy;
  elements.consequence.classList.remove("is-visible");
  elements.choices.innerHTML = "";

  activeStage.choices.forEach((choice, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "choice";
    button.innerHTML = `<strong>${choice.label}</strong><span>${choice.hint}</span>`;
    button.addEventListener("click", () => selectChoice(index, button));
    elements.choices.appendChild(button);
  });
  updateMetrics();
  elements.grid.scrollIntoView({behavior:"smooth",block:"start"});
}

function selectChoice(index, selectedButton) {
  const choice = activeStage.choices[index];
  applyEffects(choice);
  [...elements.choices.children].forEach(button => {
    button.disabled = true;
    button.classList.toggle("is-selected", button === selectedButton);
  });
  elements.consequenceTitle.textContent = choice.outcomeTitle;
  elements.consequenceCopy.textContent = choice.outcome;
  elements.next.textContent = stageIndex === stages.length - 1 ? "Побачити фінал →" : "Продовжити →";
  elements.consequence.classList.add("is-visible");
  updateMetrics();
}

function addListItems(elementId, items, fallback) {
  const list = document.getElementById(elementId);
  list.innerHTML = "";
  const unique = [...new Set(items)];
  (unique.length ? unique : [fallback]).slice(0, 4).forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    list.appendChild(li);
  });
}

function getEnding() {
  if (state.fraudLoss === 0 && !state.exposedData && !state.muleRisk && state.risk <= 25 && state.trust >= 75 && state.unpaidHours <= 1) {
    return {
      badge:"Перевірена робота",
      title:"Ви знайшли вакансію без прихованої ціни",
      lead:"Роботодавець, обов’язки, оплата й оформлення зрозумілі до початку роботи. Ви не купували доступ до вакансії, не віддавали банківські дані та не погоджувалися проводити чужі гроші через свій рахунок."
    };
  }
  if (state.fraudLoss >= 900 || state.exposedData || state.muleRisk || state.risk >= 80) {
    return {
      badge:"Вакансія-пастка",
      title:state.muleRisk ? "Особиста картка втягнула вас у небезпечну фінансову схему" : "Обіцянка доходу відкрила доступ до ваших ресурсів",
      lead:state.muleRisk
        ? "Переказування чужих коштів через особистий рахунок є значно серйознішим ризиком, ніж неоплачене завдання. Потрібно припинити операції, зберегти докази та звернутися до банку й Кіберполіції."
        : "Замість роботи рекрутер отримав гроші, дані або безоплатну працю. Варто негайно припинити контакт, захистити банківські дані й зберегти докази."
    };
  }
  if (state.unpaidHours >= 5 && state.fraudLoss < 900 && !state.exposedData && !state.muleRisk) {
    return {
      badge:"Безоплатна робота",
      title:"Ви витратили час, але не отримали зарплату",
      lead:"Основна втрата в цьому маршруті не гроші, а кілька годин готової роботи без гарантії працевлаштування. Наступного разу обмежуйте тестове завдання та погоджуйте оплату реальної зміни."
    };
  }
  if (state.time <= 6 && state.fraudLoss === 0 && !state.exposedData && !state.muleRisk) {
    return {
      badge:"Пошук затягнувся",
      title:"Безпеку збережено, але до доходу залишилося мало часу",
      lead:"Ви не віддали гроші чи дані, однак кілька днів пішли на неперевірені або нечіткі пропозиції. Варто звузити пошук до офіційних джерел і встановити щоденний план відгуків."
    };
  }
  if (state.fraudLoss <= 300 && state.risk <= 55 && !state.muleRisk) {
    return {
      badge:"Зупинилися вчасно",
      title:"Сумнівів було достатньо, щоб не зайти далі",
      lead:"Окремі рішення коштували грошей або часу, але ви не дозволили схемі розвинутися. Найцінніший результат - розуміння, де закінчується відбір і починається використання кандидата."
    };
  }
  return {
    badge:"Умови не з’ясовані",
    title:"Ризики зменшилися, але вакансія не стала прозорою",
    lead:"Ви уникнули найнебезпечніших дій, однак погоджувалися на частину умов без достатньої перевірки. Перед виходом на роботу потрібно звести всі домовленості в один зрозумілий перелік."
  };
}

function showResult() {
  const ending = getEnding();
  elements.grid.style.display = "none";
  elements.result.classList.add("is-visible");
  document.getElementById("result-badge").textContent = ending.badge;
  document.getElementById("result-title").textContent = ending.title;
  document.getElementById("result-lead").textContent = ending.lead;
  document.getElementById("result-money").textContent = formatMoney(state.money);
  document.getElementById("result-loss").textContent = formatMoney(state.fraudLoss);
  document.getElementById("result-hours").textContent = formatHours(state.unpaidHours);
  document.getElementById("result-risk").textContent = `${state.risk} / 100`;
  addListItems("result-strengths", state.strengths, "Ви завершили історію й можете повторити її з іншою стратегією.");
  addListItems("result-improvements", state.improvements, "Перед наступною вакансією запишіть мінімальні прийнятні умови роботи.");
  elements.result.scrollIntoView({behavior:"smooth",block:"start"});
}

function startGame() {
  state = {...initialState, strengths:[], improvements:[]};
  stageIndex = 0;
  elements.intro.style.display = "none";
  elements.game.classList.add("is-visible");
  elements.grid.style.display = "";
  elements.result.classList.remove("is-visible");
  renderStage();
}

elements.start.addEventListener("click", startGame);
elements.next.addEventListener("click", () => {
  if (stageIndex === stages.length - 1) {
    showResult();
    return;
  }
  stageIndex += 1;
  renderStage();
});
elements.restart.addEventListener("click", startGame);
