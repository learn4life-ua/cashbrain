(() => {
  "use strict";
  const config = window.testConfig;
  if (!config) return;

  const questionView = document.querySelector("#questionView");
  const resultView = document.querySelector("#resultView");
  const questionTitle = document.querySelector("#questionTitle");
  const answersEl = document.querySelector("#answers");
  const explanationEl = document.querySelector("#explanation");
  const currentEl = document.querySelector("#currentQuestion");
  const totalEl = document.querySelector("#totalQuestions");
  const progressEl = document.querySelector("#progressBar");
  const backBtn = document.querySelector("#backButton");
  const nextBtn = document.querySelector("#nextButton");
  const restartBtn = document.querySelector("#restartButton");
  let index = 0;
  let answers = Array(config.questions.length).fill(null);
  let locked = Array(config.questions.length).fill(false);
  let knowledgeMode = config.type === "knowledge" ? null : "profile";

  totalEl.textContent = config.questions.length;

  function showModeChoice() {
    const modeView = document.createElement("div");
    modeView.className = "mode-view";
    modeView.id = "modeView";
    modeView.innerHTML = `
      <div class="question__type">Оберіть формат проходження</div>
      <h2>Як хочете пройти цей тест?</h2>
      <p>Режим можна змінити після завершення або перезапуску тесту.</p>
      <div class="mode-grid">
        <button class="mode-card" type="button" data-mode="learn">
          <span class="mode-card__label">Для навчання</span>
          <strong>Пояснення одразу</strong>
          <span>Після кожної відповіді ви побачите правильний варіант і коротке пояснення.</span>
        </button>
        <button class="mode-card" type="button" data-mode="check">
          <span class="mode-card__label">Для оцінювання</span>
          <strong>Перевірка знань</strong>
          <span>Правильні відповіді не показуються до завершення тесту.</span>
        </button>
      </div>`;
    questionView.prepend(modeView);
    [...questionView.children].forEach(el => {
      if (el !== modeView) el.hidden = true;
    });
    modeView.querySelectorAll("[data-mode]").forEach(button => {
      button.addEventListener("click", () => {
        knowledgeMode = button.dataset.mode;
        modeView.remove();
        [...questionView.children].forEach(el => { el.hidden = false; });
        renderQuestion();
      });
    });
  }

  function renderQuestion() {
    const q = config.questions[index];
    currentEl.textContent = index + 1;
    progressEl.style.width = `${((index + 1) / config.questions.length) * 100}%`;
    questionTitle.textContent = q.text;
    answersEl.innerHTML = "";
    explanationEl.className = "explanation";
    explanationEl.innerHTML = "";
    q.options.forEach((option, optionIndex) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "answer";
      button.innerHTML = `<span class="answer__key">${String.fromCharCode(65 + optionIndex)}</span><span class="answer__text">${option.text}</span>`;
      if (answers[index] === optionIndex) button.classList.add("is-selected");
      button.disabled = locked[index];
      button.addEventListener("click", () => chooseAnswer(optionIndex));
      answersEl.appendChild(button);
    });
    backBtn.disabled = index === 0;
    nextBtn.disabled = answers[index] === null;
    nextBtn.textContent = index === config.questions.length - 1 ? "Показати результат" : "Далі";
    if (config.type === "knowledge" && knowledgeMode === "learn" && answers[index] !== null) showKnowledgeFeedback();
  }

  function chooseAnswer(optionIndex) {
    if (locked[index]) return;
    answers[index] = optionIndex;
    [...answersEl.children].forEach((el, i) => el.classList.toggle("is-selected", i === optionIndex));
    nextBtn.disabled = false;
    if (config.type === "knowledge" && knowledgeMode === "learn") {
      locked[index] = true;
      [...answersEl.children].forEach(el => { el.disabled = true; });
      showKnowledgeFeedback();
    }
  }

  function showKnowledgeFeedback() {
    const q = config.questions[index];
    const selected = answers[index];
    [...answersEl.children].forEach((el, i) => {
      el.classList.toggle("is-correct", i === q.correct);
      el.classList.toggle("is-wrong", i === selected && i !== q.correct);
    });
    const correct = selected === q.correct;
    explanationEl.innerHTML = `<strong>${correct ? "Правильно." : "Не зовсім."}</strong> ${q.explanation}`;
    explanationEl.classList.add("is-visible");
  }

  function finish() {
    questionView.hidden = true;
    resultView.classList.add("is-visible");
    buildResult();
    window.scrollTo({top: document.querySelector(".test-shell").offsetTop - 16, behavior: "smooth"});
  }

  function buildResult() {
    const chosen = config.questions.map((q, i) => q.options[answers[i]]);
    let result;
    if (config.type === "knowledge") {
      const score = config.questions.reduce((sum, q, i) => sum + (answers[i] === q.correct ? 1 : 0), 0);
      result = config.getResult(score, config.questions.length);
    } else {
      const totals = {};
      chosen.forEach(option => Object.entries(option.points).forEach(([key, value]) => totals[key] = (totals[key] || 0) + value));
      result = config.getResult(totals);
    }
    document.querySelector("#resultLabel").textContent = result.label;
    document.querySelector("#resultTitle").textContent = result.title;
    document.querySelector("#resultLead").textContent = result.lead;
    document.querySelector("#scoreLabel").textContent = result.scoreLabel;
    document.querySelector("#scoreValue").textContent = result.scoreValue;
    document.querySelector("#resultGrid").innerHTML = result.items.map(item => `<div class="result-item"><strong>${item.title}</strong><span>${item.text}</span></div>`).join("");
    const note = config.type === "knowledge"
      ? "Це освітній тест, а не індивідуальна фінансова або правова консультація. Перед реальним рішенням перевіряйте актуальні умови та офіційні джерела."
      : "Результат є орієнтиром для самооцінювання, а не діагнозом чи офіційною оцінкою фінансової готовності.";
    document.querySelector("#resultTips").innerHTML = `<strong>${result.tipsTitle}</strong><ul>${result.tips.map(tip => `<li>${tip}</li>`).join("")}</ul><p class="result-note">${note}</p>`;
  }

  backBtn.addEventListener("click", () => { if (index > 0) { index -= 1; renderQuestion(); } });
  nextBtn.addEventListener("click", () => {
    if (answers[index] === null) return;
    if (config.type === "knowledge") locked[index] = true;
    if (index < config.questions.length - 1) { index += 1; renderQuestion(); } else finish();
  });
  restartBtn.addEventListener("click", () => {
    index = 0;
    answers = Array(config.questions.length).fill(null);
    locked = Array(config.questions.length).fill(false);
    resultView.classList.remove("is-visible");
    questionView.hidden = false;
    if (config.type === "knowledge") {
      knowledgeMode = null;
      showModeChoice();
    } else {
      renderQuestion();
    }
    window.scrollTo({top: document.querySelector(".test-shell").offsetTop - 16, behavior: "smooth"});
  });
  if (config.type === "knowledge") showModeChoice();
  else renderQuestion();
})();
