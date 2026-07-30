const initialState = {
  money: 18000,
  risk: 30,
  time: 4,
  trust: 30,
  fraudLoss: 0,
  strengths: [],
  improvements: []
};

const stages = [
  {
    title: "Знахідка, яку легко втратити",
    copy: "Ви пишете автору оголошення. Він відповідає за хвилину: квартира справді вільна, але нею вже цікавляться п’ятеро людей. За 500 грн він готовий видалити оголошення до вечора.",
    choices: [
      {
        label: "Переказати 500 грн, щоб квартиру не забрали",
        hint: "Швидко, але без огляду й перевірки.",
        effects: {money:-500,risk:20,time:-0.2,trust:-10,fraudLoss:500},
        outcomeTitle: "Поспіх став інструментом тиску",
        outcome: "Невелика сума здається прийнятною, але після першого платежу психологічно складніше зупинитися. Підтвердження права на житло ви ще не отримали.",
        improvement: "Не платити за «бронювання» до перевірки житла й особи."
      },
      {
        label: "Порівняти ціни, перевірити фото, адресу та профіль",
        hint: "Витратити трохи часу на базову перевірку.",
        effects: {risk:-12,time:-0.5,trust:18},
        outcomeTitle: "Ви знайшли перші невідповідності",
        outcome: "Схожі квартири дорожчі, а одне фото вже було в оголошенні іншого міста. Це ще не доказ шахрайства, але достатня причина не платити поспіхом.",
        strength: "Перевірено ринкову ціну, фото й цифровий слід оголошення."
      },
      {
        label: "Одразу відмовитися й шукати інший варіант",
        hint: "Безпечніше, але без перевірки причин.",
        effects: {risk:-6,time:-1,trust:8},
        outcomeTitle: "Ризик зменшився, часу теж стало менше",
        outcome: "Ви не втратили гроші, однак витратили день на новий пошук. Наступне оголошення все одно доведеться перевіряти системно.",
        strength: "Не зроблено передоплату під тиском.",
        improvement: "Використовувати чекліст перевірки, а не лише інтуїтивну відмову."
      }
    ]
  },
  {
    title: "Фото документів у месенджері",
    copy: "Орендодавець надсилає фото паспорта й нібито документа на квартиру. На відеодзвінок не погоджується, а огляд пропонує провести вже після повернення з-за кордону. До того часу просить заставу 3 000 грн.",
    choices: [
      {
        label: "Документи виглядають переконливо, переказати заставу",
        hint: "Фото документа може бути чужим або підробленим.",
        effects: {money:-3000,risk:25,time:-0.2,trust:-18,fraudLoss:3000},
        outcomeTitle: "Фото документа не підтвердило повноваження",
        outcome: "Надіслане зображення не доводить, що співрозмовник є власником або має право здавати житло. Платіж зроблено без огляду й підтвердженої угоди.",
        improvement: "Не вважати фото паспорта остаточним доказом."
      },
      {
        label: "Попросити відеозв’язок, огляд і звірення оригіналів",
        hint: "Перевірити людину, житло та право його здавати.",
        effects: {risk:-14,time:-0.5,trust:22},
        outcomeTitle: "Умови перевірки стали конкретними",
        outcome: "Ви просите показати житло наживо або через уповноваженого представника, а під час зустрічі звірити дані. Власник починає уникати відповідей.",
        strength: "Запитано огляд і звірення документів, а не лише їхні фото."
      },
      {
        label: "Надіслати документи другові й покластися на його думку",
        hint: "Друга думка корисна, але не замінює перевірку.",
        effects: {risk:5,time:-0.3,trust:-4},
        outcomeTitle: "Порада не дала нових доказів",
        outcome: "Друг каже, що все виглядає нормально, але не може перевірити походження файлів. Рішення все ще спирається на враження.",
        improvement: "Відокремлювати дружню пораду від фактичної перевірки."
      }
    ]
  },
  {
    title: "Картка «помічника» і десять хвилин",
    copy: "Співрозмовник пише, що інший орендар уже готовий платити. Дає десять хвилин і надсилає номер картки на ім’я іншої людини, пояснюючи, що це його помічник.",
    choices: [
      {
        label: "Переказати 6 500 грн за перший місяць",
        hint: "Одержувач не збігається з людиною в документах.",
        effects: {money:-6500,risk:35,time:-0.1,trust:-28,fraudLoss:6500},
        outcomeTitle: "Ключова невідповідність залишилася без відповіді",
        outcome: "Гроші отримала третя особа, зв’язок якої з квартирою нічим не підтверджений. Штучний дедлайн не дозволив перевірити реквізити.",
        improvement: "Не платити третій особі без підтверджених повноважень."
      },
      {
        label: "Відмовитися від оплати до огляду й звірення даних",
        hint: "Ризик втратити оголошення, але не гроші.",
        effects: {risk:-16,time:-0.4,trust:20},
        outcomeTitle: "Ви не дозволили дедлайну керувати рішенням",
        outcome: "Вимога лишається простою: спочатку перевірка, потім договір і лише тоді оплата. Співрозмовник посилює тиск замість того, щоб надати підтвердження.",
        strength: "Зупинено платіж через невідповідність одержувача й тиск."
      },
      {
        label: "Запропонувати компроміс і переказати 1 000 грн",
        hint: "Менший платіж не робить схему безпечною.",
        effects: {money:-1000,risk:20,time:-0.2,trust:-12,fraudLoss:1000},
        outcomeTitle: "Компроміс зменшив суму, але не ризик",
        outcome: "Ви все одно платите без перевіреної підстави. Для шахрая навіть невелика передоплата є результатом, а для вас це сигнал продовжувати угоду.",
        improvement: "Не підміняти перевірку зменшенням суми передоплати."
      }
    ]
  },
  {
    title: "Договір із дрібними розбіжностями",
    copy: "Вам надсилають PDF-договір. Прізвище орендодавця не збігається з одержувачем платежу, номер квартири відрізняється від оголошення, а поля про стан житла та повернення застави порожні.",
    choices: [
      {
        label: "Підписати й надіслати фото паспорта та картки",
        hint: "Договір є, але його дані суперечать угоді.",
        effects: {risk:26,time:-0.2,trust:-25},
        outcomeTitle: "Наявність PDF не зробила угоду справжньою",
        outcome: "Документ із суперечностями не захищає від шахрайства. Передавання зайвих персональних і платіжних даних створює додатковий ризик.",
        improvement: "Не надсилати фото картки й не підписувати документ із розбіжностями."
      },
      {
        label: "Звірити дані, зберегти листування й повідомити платформу",
        hint: "Зафіксувати докази та припинити підозрілу угоду.",
        effects: {risk:-20,time:-0.5,trust:22},
        outcomeTitle: "Невідповідності стали підставою зупинитися",
        outcome: "Ви зберігаєте посилання, скриншоти, файли й реквізити. Оголошення позначене для перевірки, а подальша оплата припинена.",
        strength: "Збережено докази та повідомлено платформу про підозріле оголошення."
      },
      {
        label: "Самостійно виправити номер квартири й підписати",
        hint: "Редагування тексту не підтверджує іншу сторону.",
        effects: {risk:16,time:-0.4,trust:-12},
        outcomeTitle: "Виправлений файл не виправив угоду",
        outcome: "Головна проблема не в помилці набору, а в непідтверджених особах і повноваженнях. Одностороння правка не робить договір погодженим.",
        improvement: "Не виправляти критичні невідповідності замість перевірки сторін."
      }
    ]
  },
  {
    title: "Останній крок",
    copy: "Ситуація стала підозрілою, а до навчання часу майже не залишилося. Якщо ви вже платили, є шанс швидше зафіксувати випадок. Якщо ні, потрібно знайти безпечний тимчасовий варіант.",
    choices: [
      {
        label: "Зв’язатися з банком, зберегти докази й звернутися до Кіберполіції",
        hint: "Діяти одразу через офіційні канали.",
        effects: {risk:-22,time:-0.5,trust:12},
        outcomeTitle: "Ви перейшли від паніки до конкретних дій",
        outcome: "Швидке звернення не гарантує повернення переказу, але дає банку й правоохоронцям більше інформації та не дозволяє шахраю виманити ще гроші.",
        strength: "Обрано негайний офіційний алгоритм після підозри на шахрайство."
      },
      {
        label: "Почекати до завтра, раптом людина просто зайнята",
        hint: "Затримка скорочує час для реагування.",
        effects: {risk:16,time:-1,trust:-10},
        outcomeTitle: "Очікування не створило нових доказів",
        outcome: "Контакт не відповідає, а оголошення зникає. Ви втрачаєте час, протягом якого можна було повідомити банк, платформу й Кіберполіцію.",
        improvement: "Не відкладати звернення, якщо платіж і контакт мають ознаки шахрайства."
      },
      {
        label: "Заплатити ще 1 000 грн «комісії за повернення»",
        hint: "Шахрай просить новий платіж, щоб нібито повернути попередній.",
        effects: {money:-1000,risk:28,time:-0.3,trust:-20,fraudLoss:1000},
        outcomeTitle: "Спроба повернути гроші збільшила втрату",
        outcome: "Додатковий платіж не повертає попередній. Це продовження тієї самої схеми з новим приводом.",
        improvement: "Не переказувати додаткові кошти для «розблокування» або повернення платежу."
      }
    ]
  }
];

const safeFinalStage = {
  title: "Пошук без ставки на удачу",
  copy: "Ви не переказали гроші підозрілому орендодавцю, але до навчання залишилося мало часу. Потрібно обрати тимчасове або постійне житло без нового поспішного платежу.",
  choices: [
    {
      label: "Звернутися до коледжу, студентської ради та перевірених знайомих",
      hint: "Шукати через людей і канали, де можна підтвердити джерело.",
      effects: {risk:-18,time:-0.7,trust:20},
      outcomeTitle: "Ви розширили пошук без послаблення правил",
      outcome: "Студентська рада підказує перевірений тимчасовий варіант і контакти власника, з яким можна зустрітися. Терміновість не зникла, але рішення стало контрольованим.",
      strength: "Знайдено безпечніший канал пошуку та можливість особистої перевірки."
    },
    {
      label: "Забронювати тимчасове житло через перевірений сервіс",
      hint: "Дорожче на кілька днів, зате є час спокійно шукати.",
      effects: {money:-1500,risk:-12,time:-0.4,trust:14},
      outcomeTitle: "Тимчасова витрата купила час на перевірку",
      outcome: "Ви не отримали постійне житло одразу, але зняли тиск дедлайну. Тепер наступну оренду можна оглянути й оформити без поспіху.",
      strength: "Обрано контрольовану тимчасову витрату замість ризикової передоплати."
    },
    {
      label: "Відкрити наступне дешеве оголошення й одразу переказати 1 000 грн",
      hint: "Спробувати надолужити час тим самим ризиковим способом.",
      effects: {money:-1000,risk:25,time:-0.2,trust:-18,fraudLoss:1000},
      outcomeTitle: "Новий дедлайн повернув старий ризик",
      outcome: "Відмова від першої підозрілої угоди не захищає автоматично від наступної. Без перевірки нова передоплата повторює ту саму вразливість.",
      improvement: "Не переносити ризикову поведінку на наступне оголошення через втрачений час."
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
  return `${String(rounded).replace(".", ",")} ${rounded === 1 ? "день" : "дні"}`;
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
  if (choice.strength && !state.strengths.includes(choice.strength)) state.strengths.push(choice.strength);
  if (choice.improvement && !state.improvements.includes(choice.improvement)) state.improvements.push(choice.improvement);
}

function renderStage() {
  activeStage = stageIndex === stages.length - 1 && state.fraudLoss === 0
    ? safeFinalStage
    : stages[stageIndex];
  const stage = activeStage;
  elements.progress.style.width = `${((stageIndex + 1) / stages.length) * 100}%`;
  elements.step.textContent = `Рішення ${stageIndex + 1} із ${stages.length}`;
  elements.title.textContent = stage.title;
  elements.copy.textContent = stage.copy;
  elements.consequence.classList.remove("is-visible");
  elements.choices.innerHTML = "";

  stage.choices.forEach((choice, index) => {
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
  if (state.fraudLoss === 0 && state.risk <= 25 && state.trust >= 70) {
    return {
      badge:"Безпечний фінал",
      title:"Ви перевірили угоду до оплати",
      lead:"Поспіх не замінив перевірку. Ви не довели, що оголошення справжнє, зате вчасно побачили невідповідності й зберегли бюджет для перевіреного варіанта."
    };
  }
  if (state.fraudLoss <= 1000 && state.risk <= 55) {
    return {
      badge:"Зупинилися вчасно",
      title:"Невелика втрата не стала великою",
      lead:"На одному з етапів ви ризикнули, але потім зупинили подальші платежі й перейшли до перевірки або офіційного реагування. Головний урок уже коштував грошей, та збиток не зріс."
    };
  }
  if (state.fraudLoss < 6500 && state.risk < 80) {
    return {
      badge:"Ризикований компроміс",
      title:"Обережність з’явилася надто пізно",
      lead:"Ви помічали частину сигналів, але намагалися знайти компроміс із неперевіреною стороною. Менша передоплата все одно лишається передоплатою, якщо немає надійної угоди."
    };
  }
  return {
    badge:"Шахрайство спрацювало",
    title:"Тиск і поспіх переважили перевірку",
    lead:"Кілька окремих сигналів склалися в типову схему: вигідна ціна, дистанційний власник, передоплата, чужі реквізити та суперечливий договір. Важливо не приховувати втрату й діяти через банк та Кіберполіцію."
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
  document.getElementById("result-risk").textContent = `${state.risk} / 100`;
  document.getElementById("result-trust").textContent = `${state.trust} / 100`;
  addListItems("result-strengths", state.strengths, "Ви завершили історію й можете повторити її з іншою стратегією.");
  addListItems("result-improvements", state.improvements, "Наступного разу фіксуйте причину кожного рішення та перевіряйте її фактами.");
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
