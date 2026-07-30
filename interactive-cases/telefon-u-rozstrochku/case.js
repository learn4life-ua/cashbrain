const initialState = {
  reserve: 7000,
  freeMonthly: 3500,
  phonePayment: 0,
  emergencyPayment: 0,
  phoneCost: 0,
  emergencyCost: 0,
  debt: 0,
  risk: 25,
  plan: "none",
  bought: false,
  informed: false,
  strengths: [],
  improvements: []
};

const stages = [
  {
    title: "Потреба чи дедлайн магазину",
    copy: "Телефон вимикається за кілька годин, але працює від павербанка. Продавець нагадує: акційна пропозиція діє лише до закриття магазину.",
    choices: [
      {
        label: "Брати зараз, бо завтра буде дорожче",
        hint: "Рішення визначає рекламний дедлайн, а не ваш бюджет.",
        apply: state => { state.plan = "rush"; state.risk += 15; },
        outcomeTitle: "Терміновість звузила вибір",
        outcome: "Ви ще не порівняли ремонт, дешевшу модель і повну вартість розстрочки. Знижка має значення лише тоді, коли сама покупка вже обґрунтована.",
        improvement: "Не дозволяти строку акції замінювати перевірку потреби та бюджету."
      },
      {
        label: "Замінити батарею за 800 грн і скласти перелік потрібних функцій",
        hint: "Спочатку недорого усунути головну проблему.",
        apply: state => { state.reserve -= 800; state.plan = "repair"; state.risk -= 12; },
        outcomeTitle: "Невелика витрата прибрала штучний поспіх",
        outcome: "Телефон знову тримає заряд, а у вас з’явився час порівняти моделі. 800 грн вирішили проблему, через яку покупка здавалася невідкладною.",
        strength: "Перевірено дешевший спосіб розв’язати проблему до великої покупки."
      },
      {
        label: "Взяти паузу на 48 годин і порівняти моделі",
        hint: "Акція може закінчитися, зате рішення не буде імпульсивним.",
        apply: state => { state.plan = "compare"; state.risk -= 5; },
        outcomeTitle: "Пауза повернула контроль",
        outcome: "Ви записуєте, які характеристики справді потрібні для навчання й роботи. Частина дорожчих функцій виявляється бажанням, а не необхідністю.",
        strength: "Потребу відокремлено від емоції та рекламного дедлайну."
      }
    ]
  },
  {
    title: "Нуль відсотків, але не нуль гривень",
    copy: "Ціна готівкою становить 24 000 грн. За програмою «0%» потрібно зробити 12 платежів по 2 400 грн, тобто 28 800 грн, а також оплатити сервісний пакет за 1 200 грн. Загальна сума виходить 30 000 грн.",
    choices: [
      {
        label: "Порахувати всі платежі й попросити паспорт споживчого кредиту",
        hint: "Звірити загальну вартість, реальну ставку й додаткові послуги.",
        apply: state => { state.informed = true; state.risk -= 15; },
        outcomeTitle: "Реклама й договір показали різні цифри",
        outcome: "Різниця з ціною готівкою становить 6 000 грн. Позначка «0%» не скасовує комісії, дорожчу ціну та супутні послуги.",
        strength: "Порівняно ціну готівкою із сумою всіх платежів."
      },
      {
        label: "Орієнтуватися лише на платіж 2 400 грн",
        hint: "Зручно для місяця, але не показує повну ціну.",
        apply: state => { state.plan = "installment"; state.phonePayment = 2400; state.phoneCost = 30000; state.risk += 20; },
        outcomeTitle: "Малий платіж приховав велику суму",
        outcome: "За рік ви сплатите 30 000 грн за телефон із ціною 24 000 грн. До того ж 2 400 грн забиратимуть майже 69% ваших вільних коштів щомісяця.",
        improvement: "Оцінювати не лише місячний платіж, а загальну вартість і частку вільного бюджету."
      },
      {
        label: "Повірити поясненню продавця, що переплати немає",
        hint: "Усна відповідь не змінює графік і суму платежів.",
        apply: state => { state.risk += 10; },
        outcomeTitle: "Слова продавця не зійшлися з арифметикою",
        outcome: "12 платежів по 2 400 грн уже перевищують ціну готівкою на 4 800 грн, навіть без сервісного пакета. Вирішальними є документи й цифри.",
        improvement: "Перевіряти усні обіцянки розрахунком і документами."
      }
    ]
  },
  {
    title: "Який план витримає бюджет",
    copy: "Ваш дохід становить 11 500 грн, обов’язкові витрати - 8 000 грн. Після них залишається 3 500 грн. Магазин пропонує ще довший варіант: 1 900 грн протягом 18 місяців, усього 34 200 грн.",
    choices: [
      {
        label: "Обрати 12 платежів по 2 400 грн",
        hint: "Після платежу залишатиметься 1 100 грн на всі інші потреби.",
        apply: state => { state.plan = "installment"; state.phonePayment = 2400; state.phoneCost = 30000; state.risk += 20; },
        outcomeTitle: "Платіж помістився в дохід, але стиснув вільний бюджет",
        outcome: "На папері грошей вистачає. Насправді одна несподівана витрата може змусити позичати, бо 2 400 грн забирають більшу частину вільних коштів.",
        improvement: "Перевіряти, скільки залишиться після платежу, а не лише чи є потрібна сума в доході."
      },
      {
        label: "Обрати модель за 15 000 грн і накопичувати по 2 500 грн",
        hint: "Купівля через шість місяців без кредитного платежу.",
        apply: state => { state.plan = "save"; state.phonePayment = 0; state.phoneCost = 15000; state.risk -= 15; },
        outcomeTitle: "Дешевша модель зберегла бюджет гнучким",
        outcome: "План накопичення не створює боргового зобов’язання. Якщо місяць буде складним, внесок можна тимчасово зменшити без прострочення.",
        strength: "Обрано дешевшу модель і план накопичення без боргу."
      },
      {
        label: "Обрати 18 платежів по 1 900 грн",
        hint: "Платіж менший, але телефон коштуватиме 34 200 грн.",
        apply: state => { state.plan = "long"; state.phonePayment = 1900; state.phoneCost = 34200; state.risk += 18; },
        outcomeTitle: "Менший платіж подовжив борг і збільшив ціну",
        outcome: "Щомісяця легше, але зобов’язання триватиме півтора року. Загальна сума на 10 200 грн більша за ціну готівкою.",
        improvement: "Не подовжувати строк лише заради привабливішого місячного платежу."
      }
    ]
  },
  {
    title: "Ноутбук ламається невчасно",
    copy: "Наступного дня сервіс оцінює терміновий ремонт ноутбука в 4 000 грн. Він потрібен для навчання, а фінансовий резерв становить 7 000 грн або 6 200 грн, якщо ви вже замінили батарею телефона.",
    choices: [
      {
        label: "Оплатити ремонт із резерву й не змінювати план щодо телефона",
        hint: "Резерв зменшиться, а майбутній платіж залишиться.",
        apply: state => { state.reserve -= 4000; state.emergencyCost = 4000; state.risk += 15; },
        outcomeTitle: "Резерв спрацював, але запас міцності зменшився",
        outcome: "Ноутбук відремонтовано без нового боргу. Якщо одночасно почнеться розстрочка, на наступну несподіванку грошей може не вистачити.",
        improvement: "Після використання резерву повторно оцінювати доцільність нових боргових платежів."
      },
      {
        label: "Взяти 4 000 грн у швидкий кредит: 6 платежів по 900 грн",
        hint: "За ремонт доведеться повернути 5 400 грн.",
        apply: state => { state.debt += 5400; state.emergencyCost = 5400; state.emergencyPayment = 900; state.risk += 35; },
        outcomeTitle: "Одна покупка почала фінансувати інший борг",
        outcome: "До платежу за телефон додаються 900 грн щомісяця. Загальні нові зобов’язання можуть перевищити весь вільний бюджет.",
        improvement: "Не закривати несподівану витрату новим дорогим боргом, щоб зберегти іншу покупку."
      },
      {
        label: "Відкласти телефон і оплатити ремонт із резерву",
        hint: "Головна потреба закрита, новий кредит не виникає.",
        apply: state => { state.reserve -= 4000; state.emergencyCost = 4000; state.plan = "postpone"; state.phonePayment = 0; state.phoneCost = 0; state.risk -= 18; },
        outcomeTitle: "Пріоритет змінився разом з обставинами",
        outcome: "Ремонт ноутбука оплачено, а рішення про телефон переглянуто. Це не відмова назавжди, а коригування плану після нової важливої витрати.",
        strength: "План покупки скориговано після зміни фінансової ситуації."
      }
    ]
  },
  {
    title: "Договір на планшеті продавця",
    copy: "Перед підтвердженням продавець пропонує страховку, налаштування та подовжену гарантію ще на 3 000 грн. Каже, що це «майже обов’язково», а весь договір можна швидко підписати кодом.",
    choices: [
      {
        label: "Підписати зараз разом з усіма послугами",
        hint: "Телефон стане ще дорожчим, а перший платіж зменшить резерв.",
        apply: state => { state.bought = true; state.reserve -= state.phonePayment; state.phoneCost += 3000; state.risk += 25; },
        outcomeTitle: "Швидке підтвердження додало 3 000 грн",
        outcome: "Додаткові послуги збільшили загальну вартість, хоча їхня користь не була порівняна з ціною. Код підтвердження має таку саму вагу, як підпис під договором.",
        improvement: "Не підтверджувати кредитний договір, доки не перевірені всі додаткові послуги."
      },
      {
        label: "Обрати дешевшу модель за 15 000 грн без додаткових послуг",
        hint: "12 платежів по 1 250 грн і зрозуміла загальна сума.",
        apply: state => { state.plan = "cheaper"; state.bought = true; state.phonePayment = 1250; state.phoneCost = 15000; state.reserve -= 1250; state.risk -= 10; },
        outcomeTitle: "Менша ціна залишила місце для інших потреб",
        outcome: "Платіж становить близько 36% вільних коштів замість 54% або 69%. Це все одно зобов’язання, але його простіше витримати без нового боргу.",
        strength: "Зменшено суму покупки, строк і щомісячне навантаження."
      },
      {
        label: "Відмовитися від договору й повернутися до накопичення",
        hint: "Телефона сьогодні не буде, зате не буде й кредитного платежу.",
        apply: state => { state.plan = "save"; state.bought = false; state.phonePayment = 0; state.phoneCost = 0; state.risk -= 18; },
        outcomeTitle: "Відмова від підпису зберегла майбутні доходи",
        outcome: "Ви не зобов’язані завершувати покупку лише тому, що вже витратили час на консультацію. План накопичення можна переглянути після відновлення резерву.",
        strength: "Договір не підписано під тиском, обрано накопичення."
      }
    ]
  }
];

const safeFinalStage = {
  title: "Покупка може почекати",
  copy: "Після ремонту ноутбука старий телефон поки виконує основні функції. Ви можете відновити резерв, накопичити на дешевшу модель або знову повернутися до рекламної розстрочки.",
  choices: [
    {
      label: "Відновити резерв і щомісяця відкладати 2 500 грн",
      hint: "Спочатку повернути фінансовий запас, потім купувати.",
      apply: state => { state.plan = "save"; state.bought = false; state.phonePayment = 0; state.phoneCost = 15000; state.risk -= 15; },
      outcomeTitle: "План залишився гнучким",
      outcome: "Накопичення можна коригувати без штрафів і прострочення. Телефон обраний за потребами, а не за максимальним кредитним лімітом.",
      strength: "Спочатку заплановано відновлення резерву, потім покупку."
    },
    {
      label: "Після двох місяців пошуку купити перевірений уживаний телефон за 9 000 грн",
      hint: "Перевірити стан, документи, блокування та безпечність продавця.",
      apply: state => { state.plan = "used"; state.bought = true; state.phonePayment = 0; state.phoneCost = 9000; state.risk -= 8; },
      outcomeTitle: "Функціональність обійшлася дешевше за новизну",
      outcome: "Покупка не створює регулярного платежу. Ризик уживаної техніки зменшується завдяки діагностиці, перевірці документів і безпечній оплаті.",
      strength: "Знайдено дешевшу альтернативу без боргового навантаження."
    },
    {
      label: "Повернутися до пропозиції 2 400 грн на місяць",
      hint: "Після ремонту ноутбука резерв уже менший.",
      apply: state => { state.plan = "installment"; state.bought = true; state.phonePayment = 2400; state.phoneCost = 30000; state.reserve -= 2400; state.risk += 25; },
      outcomeTitle: "Розстрочка почалася в слабший момент",
      outcome: "Після термінового ремонту резерв зменшився, але велике зобов’язання все одно додалося. Наступна несподівана витрата може вимагати нового боргу.",
      improvement: "Не починати велику розстрочку одразу після використання фінансового резерву."
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
  return `${Math.max(0, Math.round(value)).toLocaleString("uk-UA")} грн`;
}

function totalPayment() {
  return state.phonePayment + state.emergencyPayment;
}

function updateMetrics() {
  state.reserve = Math.max(0, state.reserve);
  state.risk = clamp(state.risk, 0, 100);
  document.getElementById("metric-reserve").textContent = formatMoney(state.reserve);
  document.getElementById("metric-free").textContent = formatMoney(state.freeMonthly);
  document.getElementById("metric-payment").textContent = formatMoney(totalPayment());
  document.getElementById("metric-risk").textContent = `${state.risk} / 100`;
}

function applyChoice(choice) {
  choice.apply(state);
  state.reserve = Math.max(0, state.reserve);
  state.risk = clamp(state.risk, 0, 100);
  if (choice.strength && !state.strengths.includes(choice.strength)) state.strengths.push(choice.strength);
  if (choice.improvement && !state.improvements.includes(choice.improvement)) state.improvements.push(choice.improvement);
}

function needsContractStage() {
  return state.plan === "installment" || state.plan === "long" || state.plan === "rush";
}

function renderStage() {
  activeStage = stageIndex === stages.length - 1 && !needsContractStage()
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
  applyChoice(choice);
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
  const payment = totalPayment();
  if (state.debt > 0 || payment > state.freeMonthly || state.risk >= 80) {
    return {
      badge:"Боргове перевантаження",
      title:"Два платежі забрали майже весь вільний бюджет",
      lead:"Розстрочка стала небезпечною не через сам телефон, а через поєднання довгого платежу, малого резерву та нового боргу на термінову витрату."
    };
  }
  if (state.phoneCost >= 30000) {
    return {
      badge:"Дорога зручність",
      title:"Місячний платіж приховав справжню ціну телефона",
      lead:"Покупка відбулася, але загальна сума значно перевищила ціну готівкою. Головний урок - завжди рахувати весь строк і перевіряти додаткові послуги."
    };
  }
  if (state.bought && state.reserve < 1500 && payment >= 1250) {
    return {
      badge:"Резерв майже порожній",
      title:"Телефон куплено без запасу на наступну несподіванку",
      lead:"Платежі формально поміщаються в дохід, але фінансова стійкість різко зменшилася. Навіть невелика нова витрата може запустити ще один борг."
    };
  }
  if (state.bought && state.phoneCost <= 15000 && payment <= 1250 && state.debt === 0 && state.risk <= 45) {
    return {
      badge:"Зважена покупка",
      title:"Функції телефона узгоджені з можливостями бюджету",
      lead:"Ви зменшили ціну покупки або обрали варіант без боргу. Рішення не ідеальне для кожної ситуації, але його вартість і наслідки зрозумілі."
    };
  }
  if (!state.bought && state.debt === 0 && state.risk <= 40) {
    return {
      badge:"Обґрунтована пауза",
      title:"Ви відклали покупку, а не власні фінансові потреби",
      lead:"Після зміни обставин ви переглянули план, зберегли гнучкість бюджету й уникнули договору під тиском. Телефон можна купити пізніше без кредитної пастки."
    };
  }
  return {
    badge:"Крихкий баланс",
    title:"Рішення працює лише за ідеального місяця",
    lead:"Платіж ще можна виконувати, однак резерв і вільний бюджет надто малі. Перед покупкою варто зменшити суму, відновити запас або відкласти оформлення."
  };
}

function showResult() {
  const ending = getEnding();
  elements.grid.style.display = "none";
  elements.result.classList.add("is-visible");
  document.getElementById("result-badge").textContent = ending.badge;
  document.getElementById("result-title").textContent = ending.title;
  document.getElementById("result-lead").textContent = ending.lead;
  document.getElementById("result-reserve").textContent = formatMoney(state.reserve);
  document.getElementById("result-cost").textContent = formatMoney(state.phoneCost);
  document.getElementById("result-payment").textContent = formatMoney(totalPayment());
  document.getElementById("result-risk").textContent = `${state.risk} / 100`;
  addListItems("result-strengths", state.strengths, "Ви завершили сценарій і можете перевірити іншу стратегію.");
  addListItems("result-improvements", state.improvements, "Перед покупкою порівняйте загальну вартість, резерв і залишок після платежу.");
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
