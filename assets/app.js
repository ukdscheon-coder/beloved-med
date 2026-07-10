import { DRUGS } from "../data/drugs.js";

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
const storeKey = "beloved-med-state-v5";
const OCR_CDN = "https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js";

const i18n = {
  ko: {
    today: "오늘",
    add: "등록",
    search: "검색",
    shape: "모양",
    garden: "정원",
    guardian: "보호자",
    todayTitle: "오늘 복약",
    addTitle: "약 등록",
    searchTitle: "정보 검색",
    shapeTitle: "모양 검색",
    gardenTitle: "꽃 정원",
    guardianTitle: "보호자",
    heroInfo: "정보로 의약품 찾기",
    heroShape: "모양으로 의약품 찾기",
    heroInfoText: "제품명, 성분명, 회사명으로 검색",
    heroShapeText: "식별문자, 모양, 색상으로 검색",
    locked: "약 등록 후 활성화됩니다.",
    startWithPhoto: "사진 촬영으로 자동 인식",
    captureHelp: "약 봉투, 약 포장, 처방전을 크게 촬영하세요. 촬영 직후 제품명과 용량을 자동으로 읽습니다.",
    scanTitle: "촬영",
    scanHelp: "약봉투, 처방전, 포장 라벨을 프레임 안에 맞춰 촬영",
    scanCapture: "촬영",
    takePhoto: "사진 촬영",
    chooseImage: "이미지 선택",
    autoResult: "자동 인식 결과",
    recognizing: "자동 인식 중...",
    readingImage: "이미지에서 글자를 읽는 중입니다.",
    failCount: "자동 인식 실패",
    manualTitle: "직접 입력",
    manualHelp: "자동 인식이 어렵거나 약이 정확히 무엇인지 모르면 모름을 눌러 등록하세요.",
    medName: "약 이름",
    dose: "함량 + 복용량",
    meal: "식사 기준",
    unknown: "모름",
    register: "등록",
    alarmTitle: "알람시계 설정",
    alarmHelp: "첫 알람 시간과 복용 횟수, 시간 차이를 맞추세요.",
    alarmTime: "알람 시간",
    doseCount: "복용 횟수",
    interval: "시간 차이",
    everyHours: "매 {n}시간",
    saveAlarm: "알람 등록",
    completeTitle: "등록 완료",
    completeText: "이제 의약품 찾기 기능이 활성화되었습니다.",
    goToday: "오늘 복약으로 이동",
    guardianOptional: "보호자 등록 선택",
    guardianOptionalText: "복약 확인 문자를 보내고 싶다면 보호자를 등록하세요. 나중에 해도 됩니다.",
    setupGuardian: "보호자 등록",
    skipGuardian: "나중에",
    guardianName: "보호자 이름",
    guardianPhone: "보호자 전화번호",
    saveGuardian: "보호자 저장",
    guardianNotice: "브라우저 보안상 문자 무단 자동발송은 불가합니다. 복약 확인 시 보호자 문자 초안을 자동으로 엽니다.",
    adherence: "오늘 복약률",
    takenHint: "먹었어요 버튼을 누르면 꽃이 자라고 보호자에게 복약 확인 문자가 준비됩니다.",
    addMedicine: "약 등록하기",
    registeredMeds: "등록 약",
    done: "완료",
    waiting: "대기",
    noMeds: "아직 등록된 약이 없습니다.",
    taken: "먹었어요",
    infoPlaceholder: "제품명, 성분명, 회사명",
    noResults: "검색 결과가 없습니다.",
    select: "선택",
    imprint: "식별 문자",
    color: "색상",
    shapeForm: "모양",
    all: "전체",
    round: "원형",
    oval: "타원형",
    capsule: "캡슐",
    square: "사각형",
    flowerText: "복약 확인을 할 때마다 꽃이 자랍니다.",
    before: "식전",
    after: "식후",
    with: "식사와 함께",
    any: "상관없음",
    savedGuardian: "보호자 정보가 저장되었습니다.",
    unlockedToast: "등록 완료 후 활성화됩니다.",
    searchLockedToast: "약 등록 후 검색할 수 있습니다.",
    ocrDone: "자동 인식 완료. 내용 확인 후 등록하세요.",
    ocrFail: "자동 인식 실패",
    ocrFail3: "3회 실패했습니다. 직접 입력해 주세요.",
    ocrPoor: "글자를 충분히 읽지 못했습니다.",
    ocrProgress: "글자 인식 중 {n}%",
    doseTime: "복약 시간"
  },
  en: {
    today: "Today",
    add: "Add",
    search: "Search",
    shape: "Shape",
    garden: "Garden",
    guardian: "Guardian",
    todayTitle: "Today",
    addTitle: "Add medicine",
    searchTitle: "Info search",
    shapeTitle: "Shape search",
    gardenTitle: "Flower garden",
    guardianTitle: "Guardian",
    heroInfo: "Find by info",
    heroShape: "Find by shape",
    heroInfoText: "Search by product, ingredient, company",
    heroShapeText: "Search by imprint, shape, color",
    locked: "Enabled after registration.",
    startWithPhoto: "Auto recognize by photo",
    captureHelp: "Photograph the medicine bag, package, or prescription clearly. The app reads name and strength right away.",
    scanTitle: "Capture",
    scanHelp: "Fit the medicine bag, prescription, or package label inside the frame.",
    scanCapture: "Capture",
    takePhoto: "Take photo",
    chooseImage: "Choose image",
    autoResult: "Recognition result",
    recognizing: "Recognizing...",
    readingImage: "Reading text from the image.",
    failCount: "Recognition failures",
    manualTitle: "Manual entry",
    manualHelp: "If recognition is difficult or you do not know the medicine, tap Unknown.",
    medName: "Medicine name",
    dose: "Strength + dose",
    meal: "Meal timing",
    unknown: "Unknown",
    register: "Register",
    alarmTitle: "Alarm setup",
    alarmHelp: "Set the first alarm, dose count, and interval.",
    alarmTime: "Alarm time",
    doseCount: "Dose count",
    interval: "Interval",
    everyHours: "Every {n} hours",
    saveAlarm: "Save alarm",
    completeTitle: "Registration complete",
    completeText: "Medicine search is now enabled.",
    goToday: "Go to today",
    guardianOptional: "Guardian optional",
    guardianOptionalText: "Add a guardian if you want medication confirmation texts. You can do it later.",
    setupGuardian: "Add guardian",
    skipGuardian: "Later",
    guardianName: "Guardian name",
    guardianPhone: "Guardian phone",
    saveGuardian: "Save guardian",
    guardianNotice: "Browsers cannot send SMS silently. When medication is confirmed, an SMS draft opens.",
    adherence: "Adherence",
    takenHint: "Tap Taken to grow flowers and prepare a guardian confirmation text.",
    addMedicine: "Add medicine",
    registeredMeds: "Meds",
    done: "Done",
    waiting: "Waiting",
    noMeds: "No medicines registered yet.",
    taken: "Taken",
    infoPlaceholder: "Product, ingredient, company",
    noResults: "No results found.",
    select: "Select",
    imprint: "Imprint",
    color: "Color",
    shapeForm: "Shape",
    all: "All",
    round: "Round",
    oval: "Oval",
    capsule: "Capsule",
    square: "Square",
    flowerText: "Every confirmed dose grows the garden.",
    before: "Before food",
    after: "After food",
    with: "With food",
    any: "Any time",
    savedGuardian: "Guardian saved.",
    unlockedToast: "Enabled after registration.",
    searchLockedToast: "Search is enabled after adding medicine.",
    ocrDone: "Recognition complete. Review and register.",
    ocrFail: "Recognition failed",
    ocrFail3: "Three attempts failed. Please enter manually.",
    ocrPoor: "Could not read enough text.",
    ocrProgress: "Recognizing text {n}%",
    doseTime: "Dose time"
  },
  es: {
    today: "Hoy",
    add: "Agregar",
    search: "Buscar",
    shape: "Forma",
    garden: "Jardin",
    guardian: "Cuidador",
    todayTitle: "Medicacion de hoy",
    addTitle: "Agregar medicina",
    searchTitle: "Busqueda",
    shapeTitle: "Buscar por forma",
    gardenTitle: "Jardin",
    guardianTitle: "Cuidador",
    heroInfo: "Buscar por informacion",
    heroShape: "Buscar por forma",
    heroInfoText: "Producto, ingrediente, compania",
    heroShapeText: "Impresion, forma, color",
    locked: "Disponible despues del registro.",
    startWithPhoto: "Reconocer por foto",
    captureHelp: "Fotografia la bolsa, envase o receta claramente. La app lee nombre y dosis.",
    scanTitle: "Capturar",
    scanHelp: "Coloca la bolsa, receta o etiqueta del envase dentro del marco.",
    scanCapture: "Capturar",
    takePhoto: "Tomar foto",
    chooseImage: "Elegir imagen",
    autoResult: "Resultado",
    recognizing: "Reconociendo...",
    readingImage: "Leyendo texto de la imagen.",
    failCount: "Fallos",
    manualTitle: "Entrada manual",
    manualHelp: "Si no sabes que medicina es, toca Desconocido.",
    medName: "Nombre",
    dose: "Concentracion + dosis",
    meal: "Comida",
    unknown: "Desconocido",
    register: "Registrar",
    alarmTitle: "Configurar alarma",
    alarmHelp: "Define primera alarma, numero de tomas e intervalo.",
    alarmTime: "Hora",
    doseCount: "Tomas",
    interval: "Intervalo",
    everyHours: "Cada {n} horas",
    saveAlarm: "Guardar alarma",
    completeTitle: "Registro completo",
    completeText: "La busqueda de medicinas esta activada.",
    goToday: "Ir a hoy",
    guardianOptional: "Cuidador opcional",
    guardianOptionalText: "Agrega un cuidador si quieres enviar confirmaciones.",
    setupGuardian: "Agregar cuidador",
    skipGuardian: "Luego",
    guardianName: "Nombre del cuidador",
    guardianPhone: "Telefono",
    saveGuardian: "Guardar cuidador",
    guardianNotice: "El navegador no puede enviar SMS en silencio. Se abre un borrador.",
    adherence: "Adherencia",
    takenHint: "Toca Tomada para crecer flores y preparar SMS.",
    addMedicine: "Agregar medicina",
    registeredMeds: "Medicinas",
    done: "Listo",
    waiting: "Pendiente",
    noMeds: "No hay medicinas registradas.",
    taken: "Tomada",
    infoPlaceholder: "Producto, ingrediente, compania",
    noResults: "No se encontraron resultados.",
    select: "Elegir",
    imprint: "Impresion",
    color: "Color",
    shapeForm: "Forma",
    all: "Todo",
    round: "Redonda",
    oval: "Ovalada",
    capsule: "Capsula",
    square: "Cuadrada",
    flowerText: "Cada toma confirmada hace crecer el jardin.",
    before: "Antes",
    after: "Despues",
    with: "Con comida",
    any: "Cualquier hora",
    savedGuardian: "Cuidador guardado.",
    unlockedToast: "Disponible despues del registro.",
    searchLockedToast: "Busca despues de agregar una medicina.",
    ocrDone: "Reconocimiento completo. Revisa y registra.",
    ocrFail: "Fallo el reconocimiento",
    ocrFail3: "Tres intentos fallaron. Ingresa manualmente.",
    ocrPoor: "No se pudo leer suficiente texto.",
    ocrProgress: "Reconociendo texto {n}%",
    doseTime: "Hora de toma"
  },
  ja: {
    today: "今日",
    add: "登録",
    search: "検索",
    shape: "形",
    garden: "庭",
    guardian: "家族",
    todayTitle: "今日の服薬",
    addTitle: "薬を登録",
    searchTitle: "情報検索",
    shapeTitle: "形で検索",
    gardenTitle: "花の庭",
    guardianTitle: "家族",
    heroInfo: "情報で医薬品検索",
    heroShape: "形で医薬品検索",
    heroInfoText: "製品名、成分名、会社名",
    heroShapeText: "刻印、形、色で検索",
    locked: "登録後に有効になります。",
    startWithPhoto: "写真で自動認識",
    captureHelp: "薬袋、包装、処方箋を大きく撮影してください。名前と用量を自動で読み取ります。",
    scanTitle: "撮影",
    scanHelp: "薬袋、処方箋、包装ラベルを枠内に合わせて撮影してください。",
    scanCapture: "撮影",
    takePhoto: "写真撮影",
    chooseImage: "画像選択",
    autoResult: "認識結果",
    recognizing: "認識中...",
    readingImage: "画像の文字を読んでいます。",
    failCount: "認識失敗",
    manualTitle: "手入力",
    manualHelp: "薬がわからない場合は不明を押してください。",
    medName: "薬名",
    dose: "規格 + 服用量",
    meal: "食事",
    unknown: "不明",
    register: "登録",
    alarmTitle: "アラーム設定",
    alarmHelp: "最初の時刻、回数、間隔を設定します。",
    alarmTime: "時刻",
    doseCount: "回数",
    interval: "間隔",
    everyHours: "{n}時間ごと",
    saveAlarm: "保存",
    completeTitle: "登録完了",
    completeText: "医薬品検索が有効になりました。",
    goToday: "今日へ",
    guardianOptional: "家族登録は任意",
    guardianOptionalText: "服薬確認を送りたい場合だけ登録してください。あとでも可能です。",
    setupGuardian: "家族を登録",
    skipGuardian: "あとで",
    guardianName: "家族の名前",
    guardianPhone: "電話番号",
    saveGuardian: "保存",
    guardianNotice: "ブラウザではSMSの自動送信はできません。確認時に下書きを開きます。",
    adherence: "服薬率",
    takenHint: "飲みましたを押すと花が育ち、家族へのSMS下書きを準備します。",
    addMedicine: "薬を登録",
    registeredMeds: "薬",
    done: "完了",
    waiting: "待機",
    noMeds: "まだ薬が登録されていません。",
    taken: "飲みました",
    infoPlaceholder: "製品名、成分名、会社名",
    noResults: "検索結果がありません。",
    select: "選択",
    imprint: "刻印",
    color: "色",
    shapeForm: "形",
    all: "全て",
    round: "丸",
    oval: "楕円",
    capsule: "カプセル",
    square: "四角",
    flowerText: "服薬確認のたびに庭が育ちます。",
    before: "食前",
    after: "食後",
    with: "食事と一緒",
    any: "指定なし",
    savedGuardian: "家族情報を保存しました。",
    unlockedToast: "登録後に有効になります。",
    searchLockedToast: "薬登録後に検索できます。",
    ocrDone: "認識完了。確認して登録してください。",
    ocrFail: "認識失敗",
    ocrFail3: "3回失敗しました。手入力してください。",
    ocrPoor: "十分に文字を読めませんでした。",
    ocrProgress: "文字認識中 {n}%",
    doseTime: "服薬時間"
  }
};

const defaultState = {
  lang: "ko",
  tab: "add",
  flow: "capture",
  attempts: 0,
  recognizing: false,
  image: "",
  ocrText: "",
  guardianName: "",
  guardianPhone: "",
  draft: { name: "", dose: "", meal: "with" },
  alarmDraft: { firstTime: "08:00", count: 2, interval: 8 },
  medicines: [],
  logs: [],
  query: "",
  shapeQuery: { imprint: "", color: "", shape: "" },
  alarmEnabled: false,
  alarmFired: [],
  searchUnlocked: false,
  xp: 0
};

let state = loadState();
let toastTimer = null;
let alarmTimer = null;
let searchTimer = null;
let tesseractWorker = null;
let alarmAudioContext = null;

function tr(key, params = {}) {
  const text = i18n[state.lang]?.[key] || i18n.en[key] || key;
  return Object.entries(params).reduce((value, [name, replacement]) => value.replaceAll(`{${name}}`, replacement), text);
}

function mealLabel(meal) {
  return tr(meal);
}

function loadState() {
  try {
    return { ...cloneDefaultState(), ...JSON.parse(localStorage.getItem(storeKey) || "{}") };
  } catch {
    return cloneDefaultState();
  }
}

function cloneDefaultState() {
  return typeof structuredClone === "function" ? structuredClone(defaultState) : JSON.parse(JSON.stringify(defaultState));
}

function saveState() {
  try {
    localStorage.setItem(storeKey, JSON.stringify(state));
  } catch {}
}

function setState(next) {
  state = { ...state, ...next };
  saveState();
  render();
}

function showToast(message) {
  clearTimeout(toastTimer);
  $(".toast")?.remove();
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  document.body.append(toast);
  toastTimer = setTimeout(() => toast.remove(), 3200);
}

function icon(name) {
  return `<svg class="icon" aria-hidden="true"><use href="#i-${name}"></use></svg>`;
}

function render() {
  $("#app").innerHTML = `
    <div class="phone-frame">
      ${renderHero()}
      <main class="main-panel">
        ${renderTopbar()}
        ${renderTab()}
      </main>
    </div>
    ${renderNav()}
  `;
  bindGlobal();
  bindTab();
}

function renderHero() {
  return `
    <aside class="side-panel compact-hero">
      <div class="pop-pill pill-a"></div>
      <div class="pop-pill pill-b"></div>
      <div class="brand-mark">${icon("garden")}</div>
      <h1>beloved-med</h1>
      <div class="hero-duo ${state.searchUnlocked ? "" : "locked"}">
        <button data-tab-jump="search" class="hero-mini" ${state.searchUnlocked ? "" : "disabled"}>
          <span class="emoji">📁</span>
          <b>${tr("heroInfo")}</b>
          <small>${tr("heroInfoText")}</small>
        </button>
        <button data-tab-jump="shape" class="hero-mini" ${state.searchUnlocked ? "" : "disabled"}>
          <span class="emoji">💊</span>
          <b>${tr("heroShape")}</b>
          <small>${tr("heroShapeText")}</small>
        </button>
      </div>
    </aside>
  `;
}

function renderTopbar() {
  const titles = {
    today: tr("todayTitle"),
    add: tr("addTitle"),
    search: tr("searchTitle"),
    shape: tr("shapeTitle"),
    garden: tr("gardenTitle"),
    guardian: tr("guardianTitle")
  };
  return `
    <div class="topbar">
      <h2>${titles[state.tab] || "beloved-med"}</h2>
      <div class="top-actions">
        <div class="lang-switch" role="group" aria-label="Language">
          ${["ko", "en", "es", "ja"].map((lang) => `<button class="${state.lang === lang ? "active" : ""}" data-lang="${lang}">${lang.toUpperCase()}</button>`).join("")}
        </div>
        <button class="btn secondary small-btn" data-tab-jump="guardian">${escapeHtml(state.guardianName || tr("guardian"))}</button>
      </div>
    </div>
  `;
}

function renderNav() {
  const tabs = [
    ["today", "home", tr("today")],
    ["add", "camera", tr("add")],
    ["search", "search", tr("search")],
    ["shape", "search", tr("shape")],
    ["garden", "garden", tr("garden")],
    ["guardian", "user", tr("guardian")]
  ];
  return `<nav class="bottom-nav">${tabs.map(([id, ico, label]) => `
    <button class="${state.tab === id ? "active" : ""}" data-tab="${id}" ${(id === "search" || id === "shape") && !state.searchUnlocked ? "disabled" : ""}>${icon(ico)}<span>${label}</span></button>
  `).join("")}</nav>`;
}

function renderTab() {
  if (state.tab === "add") return renderRegistration();
  if (state.tab === "search") return renderSearch();
  if (state.tab === "shape") return renderShapeSearch();
  if (state.tab === "garden") return renderGarden();
  if (state.tab === "guardian") return renderGuardianSettings();
  return renderToday();
}

function renderToday() {
  const doses = allDoses();
  const stats = todayStats();
  return `
    <section class="grid">
      <div class="hero-card pop-card">
        <div>
          <strong>${tr("adherence")} ${stats.adherence}%</strong>
          <p>${tr("takenHint")}</p>
          <div class="actions"><button class="btn" data-tab-jump="add">${tr("addMedicine")}</button></div>
        </div>
        <div class="adherence-ring" style="--progress:${stats.adherence}%"><span>${stats.adherence}%</span></div>
      </div>
      ${renderGuardianOptionalCard()}
      <div class="stats">
        <div class="stat"><b>${state.medicines.length}</b><span>${tr("registeredMeds")}</span></div>
        <div class="stat"><b>${stats.taken}</b><span>${tr("done")}</span></div>
        <div class="stat"><b>${stats.waiting}</b><span>${tr("waiting")}</span></div>
      </div>
      ${doses.map(renderDoseCard).join("") || `<div class="empty">${tr("noMeds")}</div>`}
    </section>
  `;
}

function renderGuardianOptionalCard() {
  if (state.guardianPhone) return "";
  return `
    <div class="card guardian-card" style="padding:16px">
      <strong>${tr("guardianOptional")}</strong>
      <p>${tr("guardianOptionalText")}</p>
      <div class="actions">
        <button class="btn secondary" data-tab-jump="guardian">${tr("setupGuardian")}</button>
        <button class="btn ghost" data-dismiss-guardian>${tr("skipGuardian")}</button>
      </div>
    </div>
  `;
}

function renderDoseCard(dose) {
  const done = isTaken(dose.doseId);
  return `
    <article class="medicine-card">
      <div class="tablet"></div>
      <div>
        <h4>${escapeHtml(dose.name)}</h4>
        <small>${escapeHtml(dose.dose)} · ${mealLabel(dose.meal)}</small>
      </div>
      <div>
        <div class="time-badge">${dose.time}</div>
        <button class="btn ${done ? "secondary" : ""}" data-confirm="${dose.doseId}" ${done ? "disabled" : ""}>${done ? tr("done") : tr("taken")}</button>
      </div>
    </article>
  `;
}

function renderRegistration() {
  if (state.flow === "manual") return renderManualEntry();
  if (state.flow === "alarm") return renderAlarmSetup();
  if (state.flow === "complete") return renderRegistrationComplete();
  return renderCaptureRegistration();
}

function renderCaptureRegistration() {
  return `
    <section class="grid">
      <div class="hero-card pop-card">
        <div>
          <strong>${tr("startWithPhoto")}</strong>
          <p>${tr("captureHelp")}</p>
        </div>
      </div>
      ${renderGuardianOptionalCard()}
      <input id="camera-picker" type="file" accept="image/*" capture="environment" hidden>
      <input id="gallery-picker" type="file" accept="image/*" hidden>
      <div class="document-scan-card">
        <div class="document-frame">
          <span></span><span></span><span></span><span></span>
          <b>${tr("scanTitle")}</b>
          <small>${tr("scanHelp")}</small>
        </div>
      </div>
      <button class="btn capture-main" id="take-photo">${icon("camera")} ${tr("scanCapture")}</button>
      <button class="btn secondary" id="choose-photo">${tr("chooseImage")}</button>
      ${state.image ? `<div class="preview-strip"><img src="${state.image}" alt="Captured medicine"><div><b>${state.recognizing ? tr("recognizing") : tr("autoResult")}</b><small>${escapeHtml(state.ocrText || tr("readingImage"))}</small></div></div>` : ""}
      <div class="notice">${tr("failCount")} ${state.attempts}/3${state.attempts > 0 && state.attempts < 3 ? " · 다시 촬영해 주세요." : ""}</div>
    </section>
  `;
}

function renderManualEntry() {
  return `
    <section class="grid">
      <div class="hero-card pop-card">
        <div>
          <strong>${tr("manualTitle")}</strong>
          <p>${tr("manualHelp")}</p>
        </div>
      </div>
      <form id="manual-form" class="card form-grid" style="padding:16px">
        <div class="field">
          <label>${tr("medName")}</label>
          <input name="name" id="medicine-name-input" value="${escapeHtml(state.draft.name)}" placeholder="Tylenol" list="medicine-suggestions" autocomplete="off">
          <datalist id="medicine-suggestions">
            ${DRUGS.map((drug) => `<option value="${escapeHtml(drug.brand)}">${escapeHtml(drug.ingredient)} · ${escapeHtml(drug.strength)}</option>`).join("")}
          </datalist>
        </div>
        <div class="field"><label>${tr("dose")}</label><input name="dose" value="${escapeHtml(state.draft.dose)}" placeholder="500mg 1 tablet"></div>
        <div class="field full"><label>${tr("meal")}</label><select name="meal">
          ${["before", "after", "with", "any"].map((value) => `<option value="${value}" ${state.draft.meal === value ? "selected" : ""}>${mealLabel(value)}</option>`).join("")}
        </select></div>
        <div class="field full" id="suggestion-panel"></div>
        <button class="btn secondary field" type="button" id="unknown-med">${tr("unknown")}</button>
        <button class="btn field" type="submit">${tr("register")}</button>
      </form>
    </section>
  `;
}

function renderAlarmSetup() {
  return `
    <section class="grid">
      <div class="hero-card pop-card">
        <div>
          <strong>${tr("alarmTitle")}</strong>
          <p>${tr("alarmHelp")}</p>
        </div>
      </div>
      <form id="alarm-form" class="card form-grid" style="padding:16px">
        <div class="field"><label>${tr("alarmTime")}</label><input type="time" name="firstTime" value="${state.alarmDraft.firstTime}"></div>
        <div class="field"><label>${tr("doseCount")}</label><input type="number" name="count" min="1" max="8" value="${state.alarmDraft.count}"></div>
        <div class="field full"><label>${tr("interval")}</label><select name="interval">
          ${[2, 4, 6, 8, 12, 24].map((hour) => `<option value="${hour}" ${Number(state.alarmDraft.interval) === hour ? "selected" : ""}>${tr("everyHours", { n: hour })}</option>`).join("")}
        </select></div>
        <button class="btn full field full" type="submit">${tr("saveAlarm")}</button>
      </form>
    </section>
  `;
}

function renderRegistrationComplete() {
  return `
    <section class="grid">
      <div class="hero-card pop-card">
        <div>
          <strong>${tr("completeTitle")}</strong>
          <p>${tr("completeText")}</p>
        </div>
      </div>
      <div class="search-hero">
        <button data-tab-jump="search"><b>${tr("heroInfo")}</b><p>${tr("heroInfoText")}</p></button>
        <button data-tab-jump="shape"><b>${tr("heroShape")}</b><p>${tr("heroShapeText")}</p></button>
      </div>
      <button class="btn secondary" data-tab-jump="add">${icon("camera")} 새 약 문서 스캔</button>
      <button class="btn" data-tab-jump="today">${tr("goToday")}</button>
    </section>
  `;
}

function renderSearch() {
  if (!state.searchUnlocked) return `<section class="grid"><div class="empty">${tr("locked")}</div></section>`;
  const query = state.query || "";
  const results = searchDrugs(query);
  return `
    <section class="grid">
      <div class="card" style="padding:16px"><div class="search-box"><input id="drug-query" value="${escapeHtml(query)}" placeholder="Product, ingredient, company"></div></div>
      <div id="drug-results">${query.trim() ? renderSearchResults(results) : ""}</div>
    </section>
  `;
}

function renderSearchResults(results) {
  return results.map(renderDrugResult).join("") || `<div class="empty">${tr("noResults")}</div>`;
}

function renderShapeSearch() {
  if (!state.searchUnlocked) return `<section class="grid"><div class="empty">${tr("locked")}</div></section>`;
  const shapeQuery = state.shapeQuery || { imprint: "", color: "", shape: "" };
  const hasQuery = [shapeQuery.imprint, shapeQuery.color, shapeQuery.shape].some((value) => String(value || "").trim());
  const results = hasQuery ? searchDrugsByShape(shapeQuery) : [];
  return `
    <section class="grid">
      <div class="card form-grid" style="padding:16px">
        <div class="field"><label>${tr("imprint")}</label><input id="shape-imprint" value="${escapeHtml(shapeQuery.imprint || "")}" placeholder="A 500"></div>
        <div class="field"><label>${tr("color")}</label><input id="shape-color" value="${escapeHtml(shapeQuery.color || "")}" placeholder="white, yellow"></div>
        <div class="field full"><label>${tr("shapeForm")}</label><select id="shape-form">
          <option value="">${tr("all")}</option>
          ${["round", "oval", "capsule", "square"].map((shape) => `<option value="${shape}" ${shapeQuery.shape === shape ? "selected" : ""}>${tr(shape)}</option>`).join("")}
        </select></div>
      </div>
      <div id="shape-results">${hasQuery ? renderSearchResults(results) : ""}</div>
    </section>
  `;
}

function renderDrugResult(drug) {
  return `
    <article class="medicine-card">
      <div class="tablet"></div>
      <div>
        <h4>${escapeHtml(drug.brand)}</h4>
        <small>${escapeHtml(drug.ingredient)} · ${escapeHtml(drug.strength)} · ${escapeHtml(drug.form)}</small>
      </div>
      <button class="btn secondary" data-use-drug="${drug.id}">${tr("select")}</button>
    </article>
  `;
}

function renderGarden() {
  const count = Math.max(2, Math.min(9, Math.ceil((state.xp || 10) / 18)));
  const colors = ["#ff4d7d", "#ffd12f", "#27d6ff", "#7cff62", "#a86bff"];
  return `
    <section class="grid">
      <div class="garden-stage pop-garden"><div class="garden-bed">${Array.from({ length: count }).map((_, index) => `<div class="flower" style="--height:${76 + (index % 4) * 24}px;--flower-color:${colors[index % colors.length]}"></div>`).join("")}</div></div>
      <div class="hero-card"><div><strong>${tr("gardenTitle")} · ${state.xp} XP</strong><p>${tr("flowerText")}</p></div></div>
    </section>
  `;
}

function renderGuardianSettings() {
  return `
    <section class="grid">
      <form id="guardian-form" class="card form-grid" style="padding:16px">
        <div class="field"><label>${tr("guardianName")}</label><input name="guardianName" value="${escapeHtml(state.guardianName)}"></div>
        <div class="field"><label>${tr("guardianPhone")}</label><input name="guardianPhone" value="${escapeHtml(state.guardianPhone)}"></div>
        <button class="btn full field full" type="submit">${tr("saveGuardian")}</button>
      </form>
      <div class="notice">${tr("guardianNotice")}</div>
    </section>
  `;
}

function bindGlobal() {
  $$("[data-lang]").forEach((button) => button.addEventListener("click", () => setState({ lang: button.dataset.lang })));
  $$("[data-tab]").forEach((button) => button.addEventListener("click", () => {
    if ((button.dataset.tab === "search" || button.dataset.tab === "shape") && !state.searchUnlocked) return showToast(tr("searchLockedToast"));
    const next = { tab: button.dataset.tab };
    if (button.dataset.tab === "add" && state.flow === "complete") {
      Object.assign(next, { flow: "capture", image: "", ocrText: "", recognizing: false });
    }
    setState(next);
  }));
  $$("[data-tab-jump]").forEach((button) => button.addEventListener("click", () => {
    const tab = button.dataset.tabJump;
    if ((tab === "search" || tab === "shape") && !state.searchUnlocked) return showToast(tr("unlockedToast"));
    const next = { tab };
    if (tab === "add" && state.flow === "complete") {
      Object.assign(next, { flow: "capture", image: "", ocrText: "", recognizing: false });
    }
    setState(next);
  }));
  $$("[data-confirm]").forEach((button) => button.addEventListener("click", () => confirmDose(button.dataset.confirm)));
  $$("[data-dismiss-guardian]").forEach((button) => button.addEventListener("click", () => button.closest(".guardian-card")?.remove()));
}

function bindTab() {
  if (state.tab === "add") bindRegistration();
  if (state.tab === "search") bindSearch();
  if (state.tab === "shape") bindShapeSearch();
  if (state.tab === "guardian") bindGuardianSettings();
  bindDrugSelection();
}

function bindGuardianSettings() {
  $("#guardian-form")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setState({
      guardianName: String(form.get("guardianName") || "").trim(),
      guardianPhone: String(form.get("guardianPhone") || "").trim()
    });
    showToast(tr("savedGuardian"));
  });
}

function bindRegistration() {
  $("#take-photo")?.addEventListener("click", () => {
    const picker = $("#camera-picker");
    if (picker) picker.value = "";
    picker?.click();
  });
  $("#choose-photo")?.addEventListener("click", () => {
    const picker = $("#gallery-picker");
    if (picker) picker.value = "";
    picker?.click();
  });
  $("#camera-picker")?.addEventListener("change", readPickedFile);
  $("#gallery-picker")?.addEventListener("change", readPickedFile);
  $("#manual-form")?.addEventListener("submit", submitManual);
  $("#medicine-name-input")?.addEventListener("input", renderMedicineSuggestions);
  $("#unknown-med")?.addEventListener("click", () => {
    state.draft = { name: tr("unknown"), dose: state.draft.dose || tr("unknown"), meal: state.draft.meal || "any" };
    state.flow = "alarm";
    state.searchUnlocked = true;
    saveState();
    render();
  });
  $("#alarm-form")?.addEventListener("submit", submitAlarm);
}

function bindSearch() {
  $("#drug-query")?.addEventListener("input", (event) => {
    state.query = event.target.value;
    saveState();
    const results = $("#drug-results");
    if (results) results.innerHTML = state.query.trim() ? renderSearchResults(searchDrugs(state.query)) : "";
    bindDrugSelection(results || document);
    clearTimeout(searchTimer);
    const query = state.query.trim();
    if (query.length >= 3) {
      searchTimer = setTimeout(() => appendOpenFdaResults(query), 450);
    }
  });
}

function bindShapeSearch() {
  const update = () => {
    state.shapeQuery = {
      imprint: $("#shape-imprint")?.value || "",
      color: $("#shape-color")?.value || "",
      shape: $("#shape-form")?.value || ""
    };
    saveState();
    const hasQuery = [state.shapeQuery.imprint, state.shapeQuery.color, state.shapeQuery.shape].some((value) => String(value || "").trim());
    const results = $("#shape-results");
    if (results) results.innerHTML = hasQuery ? renderSearchResults(searchDrugsByShape(state.shapeQuery)) : "";
    bindDrugSelection(results || document);
  };
  $("#shape-imprint")?.addEventListener("input", update);
  $("#shape-color")?.addEventListener("input", update);
  $("#shape-form")?.addEventListener("change", update);
}

function bindDrugSelection(root = document) {
  $$("[data-use-drug]", root).forEach((button) => button.addEventListener("click", () => {
    const drug = DRUGS.find((item) => item.id === button.dataset.useDrug);
    if (!drug) return;
    state.draft = { name: drug.brand, dose: `${drug.strength} 1 ${drug.form}`, meal: mealFromInstruction(drug.instructions || "") };
    state.tab = "add";
    state.flow = "manual";
    saveState();
    render();
  }));
}

function renderMedicineSuggestions(event) {
  const value = event.target.value.trim().toLowerCase();
  const panel = $("#suggestion-panel");
  if (!panel) return;
  if (!value) {
    panel.innerHTML = "";
    return;
  }
  const matches = DRUGS
    .filter((drug) => [drug.brand, drug.generic, drug.ingredient, drug.manufacturer].filter(Boolean).join(" ").toLowerCase().includes(value))
    .slice(0, 5);
  panel.innerHTML = matches.length
    ? `<label>추천 약품명</label><div class="suggestion-list">${matches.map((drug) => `
        <button type="button" class="suggestion-chip" data-suggest-drug="${drug.id}">
          <b>${escapeHtml(drug.brand)}</b>
          <small>${escapeHtml(drug.ingredient)} · ${escapeHtml(drug.strength)}</small>
        </button>
      `).join("")}</div>`
    : `<small class="muted-text">추천 결과가 없습니다.</small>`;
  $$("[data-suggest-drug]", panel).forEach((button) => button.addEventListener("click", () => {
    const drug = DRUGS.find((item) => item.id === button.dataset.suggestDrug);
    if (!drug) return;
    const nameInput = $("#medicine-name-input");
    const doseInput = document.querySelector("input[name='dose']");
    if (nameInput) nameInput.value = drug.brand;
    if (doseInput) doseInput.value = `${drug.strength} 1 ${drug.form}`;
    panel.innerHTML = "";
  }));
}

function submitManual(event) {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  state.draft = {
    name: String(form.get("name") || "").trim() || tr("unknown"),
    dose: String(form.get("dose") || "").trim() || tr("unknown"),
    meal: String(form.get("meal") || "any")
  };
  state.searchUnlocked = true;
  state.flow = "alarm";
  saveState();
  render();
}

function submitAlarm(event) {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const alarm = {
    firstTime: String(form.get("firstTime") || "08:00"),
    count: Math.max(1, Number(form.get("count") || 1)),
    interval: Math.max(1, Number(form.get("interval") || 8))
  };
  const medicine = {
    id: `med-${Date.now()}`,
    name: state.draft.name || tr("unknown"),
    dose: state.draft.dose || tr("unknown"),
    meal: state.draft.meal || "any",
    times: makeDoseTimes(alarm.firstTime, alarm.count, alarm.interval)
  };
  state = {
    ...state,
    medicines: [...state.medicines, medicine],
    alarmDraft: alarm,
    alarmEnabled: true,
    flow: "complete",
    searchUnlocked: true,
    attempts: 0,
    image: "",
    ocrText: ""
  };
  saveState();
  scheduleAlarms();
  unlockAlarmSound().then(() => {
    beep(2);
    vibrateAlarm(2);
  });
  downloadNativeAlarmFile(medicine.times.map((time) => ({ ...medicine, doseId: `${medicine.id}-${time}`, time })), { silent: true });
  render();
  showToast("Alarm saved");
}

function makeDoseTimes(firstTime, count, interval) {
  const [hour, minute] = firstTime.split(":").map(Number);
  const start = hour * 60 + minute;
  return Array.from({ length: count }, (_, index) => {
    const total = (start + index * interval * 60) % (24 * 60);
    return `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;
  });
}

function allDoses() {
  return state.medicines.flatMap((med) => med.times.map((time) => ({ ...med, doseId: `${med.id}-${time}`, time }))).sort((a, b) => a.time.localeCompare(b.time));
}

function todayKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function isTaken(doseId) {
  const today = todayKey();
  return state.logs.some((log) => `${log.medId}-${log.time}` === doseId && log.status === "taken" && (log.day || legacyLocalDay(log.at)) === today);
}

function legacyLocalDay(value) {
  const date = value ? new Date(value) : null;
  return date && !Number.isNaN(date.getTime()) ? todayKey(date) : "";
}

function todayStats() {
  const doses = allDoses();
  const taken = doses.filter((dose) => isTaken(dose.doseId)).length;
  return { taken, waiting: Math.max(0, doses.length - taken), adherence: doses.length ? Math.round((taken / doses.length) * 100) : 0 };
}

function confirmDose(doseId) {
  const dose = allDoses().find((item) => item.doseId === doseId);
  if (!dose || isTaken(doseId)) return;
  state.logs = [...state.logs, { id: `log-${Date.now()}`, medId: dose.id, time: dose.time, status: "taken", day: todayKey(), at: new Date().toISOString() }];
  state.xp += 10;
  saveState();
  render();
  beep();
  notifyGuardian(dose);
}

function notifyGuardian(dose) {
  if (!state.guardianPhone) return;
  const body = encodeURIComponent(`beloved-med: ${dose.name} ${dose.dose} ${dose.time} ${tr("done")}`);
  window.location.href = `sms:${encodeURIComponent(state.guardianPhone)}?&body=${body}`;
}

function readPickedFile(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    state.image = reader.result;
    state.recognizing = true;
    state.ocrText = "";
    saveState();
    render();
    recognizeImage(reader.result, file.name).catch(() => failRecognition(tr("ocrPoor")));
  };
  reader.readAsDataURL(file);
}

async function recognizeImage(dataUrl, filename = "") {
  const base = await prepareOcrBase(dataUrl);
  const specs = [
    { mode: "contrast", label: "fast", psm: "6" },
    { mode: "adaptive", label: "detail", psm: "6" },
    { mode: "inverted", label: "fallback", psm: "11" }
  ];
  const candidates = [];
  for (const spec of specs) {
    const variant = makeOcrVariant(base, spec.mode, spec.label, spec.psm);
    const text = await runOcr(variant.dataUrl, variant.psm, variant.label);
    const candidate = { ...variant, text, parsed: parseMedicineText(`${text}\n${filename}`) };
    candidates.push(candidate);
    if (scoreOcrCandidate(candidate, filename) >= 54) break;
  }
  const best = candidates.sort((a, b) => scoreOcrCandidate(b, filename) - scoreOcrCandidate(a, filename))[0] || { text: "", parsed: {} };
  const text = best.text || "";
  const parsed = best.parsed || parseMedicineText(`${text}\n${filename}`);
  state.recognizing = false;
  state.ocrText = text.trim().replace(/\s+/g, " ").slice(0, 180);
  if (!parsed.name && !parsed.dose) {
    failRecognition(tr("ocrFail"));
    return;
  }
  state.attempts = 0;
  state.draft = {
    name: parsed.name || tr("unknown"),
    dose: parsed.dose || tr("unknown"),
    meal: parsed.meal || "with"
  };
  state.flow = "manual";
  state.searchUnlocked = true;
  saveState();
  render();
  showToast(tr("ocrDone"));
}

function failRecognition(message) {
  state.recognizing = false;
  state.attempts += 1;
  state.ocrText = message;
  if (state.attempts >= 3) {
    state.flow = "manual";
  } else {
    state.flow = "capture";
    state.image = "";
  }
  saveState();
  render();
  showToast(state.attempts >= 3 ? tr("ocrFail3") : `${message} (${state.attempts}/3)`);
}

function loadImage(dataUrl) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = dataUrl;
  });
}

async function preprocessForOcr(dataUrl) {
  const base = await prepareOcrBase(dataUrl);
  return [
    makeOcrVariant(base, "contrast", "fast", "6"),
    makeOcrVariant(base, "adaptive", "detail", "6")
  ];
}

async function prepareOcrBase(dataUrl) {
  const image = await loadImage(dataUrl);
  const longSide = Math.max(image.width, image.height);
  const scale = Math.min(2.4, Math.max(1, 1800 / longSide));
  const width = Math.round(image.width * scale);
  const height = Math.round(image.height * scale);
  const base = document.createElement("canvas");
  base.width = width + 56;
  base.height = height + 56;
  const baseCtx = base.getContext("2d", { willReadFrequently: true });
  baseCtx.fillStyle = "#fff";
  baseCtx.fillRect(0, 0, base.width, base.height);
  baseCtx.imageSmoothingEnabled = true;
  baseCtx.imageSmoothingQuality = "high";
  baseCtx.filter = "contrast(1.18) brightness(1.06) saturate(0.82)";
  baseCtx.drawImage(image, 28, 28, width, height);
  baseCtx.filter = "none";
  return base;
}

function makeOcrVariant(sourceCanvas, mode, label, psm) {
  const canvas = document.createElement("canvas");
  canvas.width = sourceCanvas.width;
  canvas.height = sourceCanvas.height;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  ctx.drawImage(sourceCanvas, 0, 0);
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  const gray = new Uint8ClampedArray(canvas.width * canvas.height);

  for (let index = 0, pixel = 0; index < data.length; index += 4, pixel += 1) {
    const value = data[index] * 0.299 + data[index + 1] * 0.587 + data[index + 2] * 0.114;
    gray[pixel] = Math.max(0, Math.min(255, value));
  }

  for (let y = 0; y < canvas.height; y += 1) {
    for (let x = 0; x < canvas.width; x += 1) {
      const pixel = y * canvas.width + x;
      let value = gray[pixel];
      if (mode === "adaptive") {
        value = value < localMean(gray, canvas.width, canvas.height, x, y, 14) - 9 ? 0 : 255;
      } else if (mode === "inverted") {
        value = value < localMean(gray, canvas.width, canvas.height, x, y, 18) - 8 ? 255 : 0;
      } else {
        value = value > 182 ? 255 : value < 96 ? 0 : Math.max(0, Math.min(255, (value - 116) * 2.6 + 140));
      }
      const offset = pixel * 4;
      data[offset] = value;
      data[offset + 1] = value;
      data[offset + 2] = value;
      data[offset + 3] = 255;
    }
  }

  ctx.putImageData(imageData, 0, 0);
  sharpenCanvas(ctx, canvas.width, canvas.height);
  return { label, psm, dataUrl: canvas.toDataURL("image/png") };
}

function localMean(gray, width, height, x, y, radius) {
  let sum = 0;
  let count = 0;
  for (let yy = Math.max(0, y - radius); yy <= Math.min(height - 1, y + radius); yy += 3) {
    for (let xx = Math.max(0, x - radius); xx <= Math.min(width - 1, x + radius); xx += 3) {
      sum += gray[yy * width + xx];
      count += 1;
    }
  }
  return count ? sum / count : gray[y * width + x];
}

function sharpenCanvas(ctx, width, height) {
  const imageData = ctx.getImageData(0, 0, width, height);
  const src = imageData.data;
  const copy = new Uint8ClampedArray(src);
  const kernel = [0, -1, 0, -1, 5, -1, 0, -1, 0];
  for (let y = 1; y < height - 1; y += 1) {
    for (let x = 1; x < width - 1; x += 1) {
      let sum = 0;
      let k = 0;
      for (let ky = -1; ky <= 1; ky += 1) {
        for (let kx = -1; kx <= 1; kx += 1) {
          sum += copy[((y + ky) * width + (x + kx)) * 4] * kernel[k++];
        }
      }
      const value = Math.max(0, Math.min(255, sum));
      const offset = (y * width + x) * 4;
      src[offset] = value;
      src[offset + 1] = value;
      src[offset + 2] = value;
    }
  }
  ctx.putImageData(imageData, 0, 0);
}

async function ensureTesseract() {
  if (window.Tesseract) return window.Tesseract;
  await new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = OCR_CDN;
    script.async = true;
    script.onload = resolve;
    script.onerror = reject;
    document.head.append(script);
  });
  return window.Tesseract;
}

async function getOcrWorker() {
  const Tesseract = await ensureTesseract();
  if (tesseractWorker) return tesseractWorker;
  tesseractWorker = await Tesseract.createWorker("eng+kor", 1, {
    logger: (event) => {
      if (event.status === "recognizing text" && event.progress) {
        showToast(tr("ocrProgress", { n: Math.round(event.progress * 100) }));
      }
    }
  });
  await tesseractWorker.setParameters({
    preserve_interword_spaces: "1",
    load_system_dawg: "0",
    load_freq_dawg: "0",
    user_defined_dpi: "300",
    tessedit_char_whitelist: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789가-힣 .,/()+-:%㎍"
  });
  return tesseractWorker;
}

async function runOcr(imageDataUrl, psm = "6", label = "") {
  const worker = await getOcrWorker();
  await worker.setParameters({ tessedit_pageseg_mode: psm });
  showToast(`${label} OCR`);
  const result = await worker.recognize(imageDataUrl);
  return result?.data?.text || "";
}

function parseMedicineText(text) {
  const normalized = text
    .replace(/[|]/g, " ")
    .replace(/[^\S\r\n]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const lower = normalized.toLowerCase();
  const drug = bestDrugMatch(normalized);
  const strength = normalized.match(/(\d+(?:[.,]\d+)?)\s?(mg|mcg|ug|µg|㎍|g|ml|mL|iu|IU|%)/i);
  const unit = normalized.match(/(\d+)\s?(tablet|tablets|tab|capsule|capsules|cap|pill|pills|dose|doses)/i);
  const name = drug?.brand || extractLikelyName(normalized);
  const doseParts = [];
  if (strength) doseParts.push(`${strength[1].replace(",", ".")}${strength[2]}`);
  if (unit) doseParts.push(`${unit[1]}${unit[2]}`);
  return {
    name,
    dose: doseParts.join(" "),
    meal: lower.includes("before") ? "before" : lower.includes("after") ? "after" : lower.includes("with") ? "with" : "with"
  };
}

function scoreOcrCandidate(candidate, filename = "") {
  const text = `${candidate.text || ""} ${filename}`.replace(/\s+/g, " ").trim();
  const parsed = candidate.parsed || parseMedicineText(text);
  const drug = bestDrugMatch(text);
  let score = 0;
  if (drug) score += 35;
  if (parsed.name) score += 12;
  if (parsed.dose) score += 10;
  if (/\d+(?:[.,]\d+)?\s?(mg|mcg|ug|µg|㎍|g|ml|iu|%)/i.test(text)) score += 10;
  score += Math.min(18, Math.floor(text.length / 12));
  score -= (text.match(/[^\w\s가-힣.,/%()+-]/g) || []).length;
  if (candidate.label === "adaptive") score += 3;
  if (candidate.label === "adaptive-sparse") score += 2;
  return score;
}

function bestDrugMatch(text) {
  const lower = text.toLowerCase();
  const ranked = DRUGS.map((drug) => {
    const terms = [drug.brand, drug.generic, drug.ingredient, drug.manufacturer].filter(Boolean);
    const score = terms.reduce((total, term) => {
      const value = String(term).toLowerCase();
      if (!value || value.length < 3) return total;
      if (lower.includes(value)) return total + Math.min(18, Math.ceil(value.length / 2));
      return total + value.split(/\s+/).filter((part) => part.length > 3 && lower.includes(part)).length * 4;
    }, 0);
    return { drug, score };
  }).sort((a, b) => b.score - a.score);
  return ranked[0]?.score > 0 ? ranked[0].drug : null;
}

function extractLikelyName(text) {
  const blocked = new Set(["warning", "children", "tablet", "capsule", "dose", "dosage", "keep", "take", "daily"]);
  return text
    .split(/[^\p{L}\p{N}-]+/u)
    .find((item) => item.length >= 4 && !/^\d/.test(item) && !blocked.has(item.toLowerCase())) || "";
}

function searchDrugs(query) {
  const normalized = String(query || "").trim().toLowerCase();
  if (!normalized) return DRUGS.slice(0, 8);
  return DRUGS
    .map((drug) => ({ drug, score: scoreDrugForQuery(drug, normalized) }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 12)
    .map((item) => item.drug);
}

function scoreDrugForQuery(drug, normalized) {
  const fields = [drug.brand, drug.generic, drug.ingredient, drug.manufacturer, drug.source].filter(Boolean).map(String);
  return fields.reduce((total, field) => {
    const value = field.toLowerCase();
    if (value === normalized) return total + 50;
    if (value.startsWith(normalized)) return total + 24;
    if (value.includes(normalized)) return total + 12;
    return total + normalized.split(/\s+/).filter((part) => part.length > 1 && value.includes(part)).length * 4;
  }, 0);
}

function searchDrugsByShape(filters = {}) {
  const imprint = String(filters.imprint || "").trim().toLowerCase();
  const color = String(filters.color || "").trim().toLowerCase();
  const shape = String(filters.shape || "").trim().toLowerCase();
  return DRUGS
    .map((drug) => {
      const imprintText = String(drug.imprint || "").toLowerCase();
      const colorText = String(drug.color || "").toLowerCase();
      const shapeText = [drug.shape, drug.form].filter(Boolean).join(" ").toLowerCase();
      let score = 0;
      if (imprint && imprintText.includes(imprint)) score += 30;
      if (color && colorText.includes(color)) score += 20;
      if (shape && shapeText.includes(shape)) score += 20;
      if (imprint && imprintText && imprint.split(/\s+/).some((part) => part && imprintText.includes(part))) score += 8;
      if (color && colorText && color.split(/\s+/).some((part) => part && colorText.includes(part))) score += 6;
      if (!imprint && !color && shape && shapeText.includes(shape)) score += 6;
      return { drug, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 12)
    .map((item) => item.drug);
}

async function appendOpenFdaResults(query) {
  if (!query || state.query.trim() !== query) return;
  const container = $("#drug-results");
  if (!container) return;
  try {
    const terms = query.replace(/[^\w -]/g, " ").trim().split(/\s+/).filter(Boolean).slice(0, 4);
    if (!terms.length) return;
    const search = `openfda.brand_name:${terms.map(encodeURIComponent).join("+")}*+openfda.generic_name:${terms.map(encodeURIComponent).join("+")}*`;
    const response = await fetch(`https://api.fda.gov/drug/label.json?search=${search}&limit=5`);
    if (!response.ok || state.query.trim() !== query) return;
    const payload = await response.json();
    const seen = new Set(DRUGS.map((drug) => `${drug.brand || ""}|${drug.generic || ""}`.toLowerCase()));
    const remote = (payload.results || []).map((item, index) => {
      const openfda = item.openfda || {};
      const brand = openfda.brand_name?.[0] || openfda.generic_name?.[0] || query;
      const generic = openfda.generic_name?.[0] || brand;
      return {
        id: `openfda-live-${Date.now()}-${index}`,
        brand,
        generic,
        ingredient: generic,
        manufacturer: openfda.manufacturer_name?.[0] || "openFDA",
        strength: "label",
        form: openfda.product_type?.[0] || "medicine",
        route: openfda.route?.[0] || "Oral",
        color: "varies",
        shape: "varies",
        imprint: "varies",
        source: "openFDA live label",
        instructions: item.dosage_and_administration?.[0] || "Confirm the exact label with a pharmacist.",
        safety: item.warnings?.[0] || item.do_not_use?.[0] || "Read the package label before use."
      };
    }).filter((drug) => {
      const key = `${drug.brand || ""}|${drug.generic || ""}`.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
    if (!remote.length || state.query.trim() !== query) return;
    DRUGS.push(...remote);
    container.insertAdjacentHTML("beforeend", `<div class="remote-result-label">openFDA live</div>${remote.map(renderDrugResult).join("")}`);
    bindDrugSelection(container);
  } catch {
    // Offline use remains fully supported through the bundled Druglist cache.
  }
}

function mealFromInstruction(text = "") {
  const lower = text.toLowerCase();
  if (lower.includes("before")) return "before";
  if (lower.includes("after")) return "after";
  if (lower.includes("with")) return "with";
  return "with";
}

function scheduleAlarms() {
  clearInterval(alarmTimer);
  const tick = () => checkDueAlarms();
  tick();
  alarmTimer = setInterval(tick, 10000);
}

function checkDueAlarms() {
  const now = new Date();
  allDoses()
    .filter((dose) => isDoseDueNow(dose, now) && !isTaken(dose.doseId) && !alarmAlreadyFired(dose))
    .forEach(fireAlarm);
}

function isDoseDueNow(dose, now = new Date()) {
  const [hour, minute] = dose.time.split(":").map(Number);
  const due = new Date(now);
  due.setHours(hour, minute, 0, 0);
  const diffMs = now.getTime() - due.getTime();
  return diffMs >= 0 && diffMs <= 2 * 60 * 1000;
}

function alarmAlreadyFired(dose) {
  return (state.alarmFired || []).includes(alarmFireKey(dose));
}

function alarmFireKey(dose) {
  return `${todayKey()}|${dose.doseId}`;
}

function fireAlarm(dose) {
  state.alarmFired = [...(state.alarmFired || []).filter((key) => key.startsWith(todayKey())), alarmFireKey(dose)];
  saveState();
  beep(5);
  vibrateAlarm(5);
  showToast(`${tr("doseTime")}: ${dose.name} ${dose.dose}`);
  if ("Notification" in window && Notification.permission === "granted") {
    try {
      new Notification("beloved-med", {
        body: `${dose.time} ${dose.name} ${dose.dose}`,
        tag: dose.doseId,
        renotify: true
      });
    } catch {}
  }
}

async function enableAlarms() {
  await unlockAlarmSound();
  if ("Notification" in window && Notification.permission === "default") {
    try {
      await Notification.requestPermission();
    } catch {}
  }
  state.alarmEnabled = true;
  saveState();
  beep(2);
  showToast("Alarm enabled");
  scheduleAlarms();
  render();
}

function downloadNativeAlarmFile(doses = allDoses().filter((dose) => !isTaken(dose.doseId)), options = {}) {
  if (!doses.length) {
    if (!options.silent) showToast("No medication alarms to export");
    return;
  }
  const ics = buildMedicationCalendar(doses);
  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "beloved-med-alarms.ics";
  link.rel = "noopener";
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  if (!options.silent) showToast("Alarm file ready");
}

function buildMedicationCalendar(doses) {
  const now = new Date();
  const until = new Date(now);
  until.setDate(until.getDate() + 90);
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//beloved-med//Medication Alarms//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "X-WR-CALNAME:beloved-med medication alarms"
  ];
  doses.forEach((dose, index) => {
    const start = nextDateForTime(dose.time);
    lines.push(
      "BEGIN:VEVENT",
      `UID:${escapeIcs(`${dose.doseId}-${index}`)}@beloved-med`,
      `DTSTAMP:${formatIcsDateTime(now)}`,
      `DTSTART:${formatIcsDateTime(start)}`,
      `DTEND:${formatIcsDateTime(new Date(start.getTime() + 5 * 60 * 1000))}`,
      `RRULE:FREQ=DAILY;UNTIL=${formatIcsDateTime(until)}`,
      `SUMMARY:${escapeIcs(`복약 시간: ${dose.name}`)}`,
      `DESCRIPTION:${escapeIcs(`${dose.name} ${dose.dose} ${mealLabel(dose.meal)} - beloved-med`)}`,
      "BEGIN:VALARM",
      "TRIGGER:-PT0M",
      "ACTION:DISPLAY",
      `DESCRIPTION:${escapeIcs(`복약 시간: ${dose.name} ${dose.dose}`)}`,
      "END:VALARM",
      "END:VEVENT"
    );
  });
  lines.push("END:VCALENDAR");
  return `${lines.join("\r\n")}\r\n`;
}

function nextDateForTime(time) {
  const [hour, minute] = time.split(":").map(Number);
  const date = new Date();
  date.setHours(hour, minute, 0, 0);
  if (date.getTime() <= Date.now()) date.setDate(date.getDate() + 1);
  return date;
}

function formatIcsDateTime(date) {
  const pad = (value) => String(value).padStart(2, "0");
  return [
    date.getUTCFullYear(),
    pad(date.getUTCMonth() + 1),
    pad(date.getUTCDate()),
    "T",
    pad(date.getUTCHours()),
    pad(date.getUTCMinutes()),
    pad(date.getUTCSeconds()),
    "Z"
  ].join("");
}

function escapeIcs(value) {
  return String(value ?? "")
    .replaceAll("\\", "\\\\")
    .replaceAll(";", "\\;")
    .replaceAll(",", "\\,")
    .replace(/\r?\n/g, "\\n");
}

async function unlockAlarmSound() {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    alarmAudioContext ||= new AudioContextClass();
    if (alarmAudioContext.state === "suspended") await alarmAudioContext.resume();
  } catch {}
}

function beep(repeats = 1) {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    alarmAudioContext ||= new AudioContextClass();
    if (alarmAudioContext.state === "suspended") alarmAudioContext.resume();
    Array.from({ length: repeats }).forEach((_, index) => {
      const osc = alarmAudioContext.createOscillator();
      const gain = alarmAudioContext.createGain();
      const start = alarmAudioContext.currentTime + index * 0.42;
      osc.frequency.value = index % 2 ? 880 : 660;
      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.exponentialRampToValueAtTime(0.18, start + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.28);
      osc.connect(gain).connect(alarmAudioContext.destination);
      osc.start(start);
      osc.stop(start + 0.3);
    });
  } catch {}
}

function vibrateAlarm(repeats = 1) {
  if (!("vibrate" in navigator)) return;
  try {
    const pattern = Array.from({ length: repeats }, () => [260, 160]).flat();
    navigator.vibrate(pattern);
  } catch {}
}

function escapeHtml(value) {
  return String(value ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
}

function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return;
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js").catch(() => {});
  });
}

function bindAlarmWakeChecks() {
  window.addEventListener("focus", checkDueAlarms);
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) checkDueAlarms();
  });
}

render();
scheduleAlarms();
bindAlarmWakeChecks();
registerServiceWorker();
