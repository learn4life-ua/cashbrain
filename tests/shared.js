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

  totalEl.textContent = config.questions.length;

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
      button.addEventListener("click", () => chooseAnswer(optionIndex));
      answersEl.appendChild(button);
    });
    backBtn.disabled = index === 0;
    nextBtn.disabled = answers[index] === null;
    nextBtn.textContent = index === config.questions.length - 1 ? "Показати результат" : "Далі";
    if (config.type === "knowledge" && answers[index] !== null) showKnowledgeFeedback();
  }

  function chooseAnswer(optionIndex) {
    answers[index] = optionIndex;
    [...answersEl.children].forEach((el, i) => el.classList.toggle("is-selected", i === optionIndex));
    nextBtn.disabled = false;
    if (config.type === "knowledge") showKnowledgeFeedback();
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
    document.querySelector("#resultTips").innerHTML = `<strong>${result.tipsTitle}</strong><ul>${result.tips.map(tip => `<li>${tip}</li>`).join("")}</ul>`;
  }

  backBtn.addEventListener("click", () => { if (index > 0) { index -= 1; renderQuestion(); } });
  nextBtn.addEventListener("click", () => {
    if (answers[index] === null) return;
    if (index < config.questions.length - 1) { index += 1; renderQuestion(); } else finish();
  });
  restartBtn.addEventListener("click", () => {
    index = 0;
    answers = Array(config.questions.length).fill(null);
    resultView.classList.remove("is-visible");
    questionView.hidden = false;
    renderQuestion();
    window.scrollTo({top: document.querySelector(".test-shell").offsetTop - 16, behavior: "smooth"});
  });
  renderQuestion();
})();
