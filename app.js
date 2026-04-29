const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");

const penBtn = document.getElementById("penBtn");
const eraserBtn = document.getElementById("eraserBtn");
const undoBtn = document.getElementById("undoBtn");
const redoBtn = document.getElementById("redoBtn");
const clearBtn = document.getElementById("clearBtn");
const saveBtn = document.getElementById("saveBtn");
const colorPicker = document.getElementById("colorPicker");
const sizeRange = document.getElementById("sizeRange");
const smoothRange = document.getElementById("smoothRange");
const letterSelect = document.getElementById("letterSelect");
const toggleGuideBtn = document.getElementById("toggleGuideBtn");
const toggleLinesBtn = document.getElementById("toggleLinesBtn");
const guideSizeRange = document.getElementById("guideSizeRange");
const arabicTextInput = document.getElementById("arabicTextInput");
const addTextBtn = document.getElementById("addTextBtn");
const harakatRow = document.getElementById("harakatRow");
const letterForms = document.getElementById("letterForms");
const letterHint = document.getElementById("letterHint");
const wordButtons = document.getElementById("wordButtons");

const HARAKAT = ["َ", "ِ", "ُ", "ّ", "ْ", "ً", "ٍ", "ٌ", "ٰ", "ـ"];

const LETTER_DATA = {
  "ا": { forms: "ا  ـا  ـا  ا", hint: "مثال: أسد", words: ["أرنب", "أمل", "أمانة"] },
  "ب": { forms: "ب  بـ  ـبـ  ـب", hint: "مثال: باب", words: ["بيت", "بحر", "بستان"] },
  "ت": { forms: "ت  تـ  ـتـ  ـت", hint: "مثال: تمر", words: ["تفاح", "تلميذ", "تعاون"] },
  "ث": { forms: "ث  ثـ  ـثـ  ـث", hint: "مثال: ثوب", words: ["ثمر", "ثعلب", "ثقافة"] },
  "ج": { forms: "ج  جـ  ـجـ  ـج", hint: "مثال: جمل", words: ["جسر", "جميل", "جامعة"] },
  "ح": { forms: "ح  حـ  ـحـ  ـح", hint: "مثال: حبر", words: ["حليب", "حكمة", "حديقة"] },
  "خ": { forms: "خ  خـ  ـخـ  ـخ", hint: "مثال: خبز", words: ["خيمة", "خريطة", "خُلق"] },
  "د": { forms: "د  ـد  ـد  د", hint: "مثال: دفتر", words: ["درس", "دقيقة", "دكان"] },
  "ذ": { forms: "ذ  ـذ  ـذ  ذ", hint: "مثال: ذهب", words: ["ذراع", "ذكاء", "ذوق"] },
  "ر": { forms: "ر  ـر  ـر  ر", hint: "مثال: ريشة", words: ["ربيع", "رسالة", "رياضة"] },
  "ز": { forms: "ز  ـز  ـز  ز", hint: "مثال: زهرة", words: ["زيت", "زميل", "زيارة"] },
  "س": { forms: "س  سـ  ـسـ  ـس", hint: "مثال: سمك", words: ["سماء", "سلام", "سفينة"] },
  "ش": { forms: "ش  شـ  ـشـ  ـش", hint: "مثال: شمس", words: ["شجرة", "شجاعة", "شاهد"] },
  "ص": { forms: "ص  صـ  ـصـ  ـص", hint: "مثال: صبر", words: ["صديق", "صورة", "صندوق"] },
  "ض": { forms: "ض  ضـ  ـضـ  ـض", hint: "مثال: ضوء", words: ["ضابط", "ضمير", "ضيافة"] },
  "ط": { forms: "ط  طـ  ـطـ  ـط", hint: "مثال: طريق", words: ["طالب", "طعام", "طائرة"] },
  "ظ": { forms: "ظ  ظـ  ـظـ  ـظ", hint: "مثال: ظرف", words: ["ظلال", "ظريف", "وظيفة"] },
  "ع": { forms: "ع  عـ  ـعـ  ـع", hint: "مثال: علم", words: ["عقل", "عصفور", "عائلة"] },
  "غ": { forms: "غ  غـ  ـغـ  ـغ", hint: "مثال: غيم", words: ["غزال", "غابة", "غرفة"] },
  "ف": { forms: "ف  فـ  ـفـ  ـف", hint: "مثال: فم", words: ["فراشة", "فكرة", "فصل"] },
  "ق": { forms: "ق  قـ  ـقـ  ـق", hint: "مثال: قلم", words: ["قمر", "قصة", "قيمة"] },
  "ك": { forms: "ك  كـ  ـكـ  ـك", hint: "مثال: كتاب", words: ["كرة", "كوكب", "كرم"] },
  "ل": { forms: "ل  لـ  ـلـ  ـل", hint: "مثال: لغة", words: ["لؤلؤ", "لعب", "لبن"] },
  "م": { forms: "م  مـ  ـمـ  ـم", hint: "مثال: مدرسة", words: ["ماء", "مفتاح", "محبة"] },
  "ن": { forms: "ن  نـ  ـنـ  ـن", hint: "مثال: نور", words: ["نخلة", "نهر", "نجاح"] },
  "ه": { forms: "ه  هـ  ـهـ  ـه", hint: "مثال: هدية", words: ["هلال", "هواء", "هجرة"] },
  "و": { forms: "و  ـو  ـو  و", hint: "مثال: ورد", words: ["وطن", "وسام", "وقت"] },
  "ي": { forms: "ي  يـ  ـيـ  ـي", hint: "مثال: يد", words: ["ياسمين", "يقين", "يوم"] }
};

const state = {
  tool: "pen",
  color: "#1d4ed8",
  size: 8,
  smoothing: 0.65,
  guideSize: 280,
  guideVisible: true,
  linesVisible: true,
  selectedLetter: "ا",
  actions: [],
  redoStack: [],
  currentStroke: null,
  isDrawing: false,
  pointerId: null,
  pixelRatio: 1,
  canvasWidth: 1,
  canvasHeight: 1,
  nextTextY: 120
};

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function midpoint(a, b) {
  return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
}

function getPoint(event) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top,
    t: performance.now()
  };
}

function smoothPoint(rawPoint, previousPoint, smoothStrength) {
  if (!previousPoint) {
    return { ...rawPoint };
  }

  const alpha = 0.62 - smoothStrength * 0.45;
  return {
    x: previousPoint.x + (rawPoint.x - previousPoint.x) * alpha,
    y: previousPoint.y + (rawPoint.y - previousPoint.y) * alpha,
    t: rawPoint.t
  };
}

function computeWidth(point, previousPoint, baseSize, smoothStrength, isEraser) {
  const rawBase = isEraser ? baseSize * 1.65 : baseSize;
  if (!previousPoint) {
    return rawBase;
  }

  const dt = Math.max(point.t - previousPoint.t, 8);
  const distance = Math.hypot(point.x - previousPoint.x, point.y - previousPoint.y);
  const speed = distance / dt;
  const speedFactor = clamp(1.35 - speed * 3.1, 0.42, 1.6);
  const targetWidth = rawBase * speedFactor;
  return previousPoint.w + (targetWidth - previousPoint.w) * (0.2 + smoothStrength * 0.25);
}

function simplifyByDistance(points, threshold) {
  if (points.length <= 2) {
    return points.slice();
  }

  const simplified = [points[0]];
  let last = points[0];

  for (let i = 1; i < points.length - 1; i += 1) {
    const candidate = points[i];
    const dist = Math.hypot(candidate.x - last.x, candidate.y - last.y);
    if (dist >= threshold) {
      simplified.push(candidate);
      last = candidate;
    }
  }

  simplified.push(points[points.length - 1]);
  return simplified;
}

function smoothPass(points, strength) {
  if (points.length <= 2) {
    return points.slice();
  }

  const next = [points[0]];

  for (let i = 1; i < points.length - 1; i += 1) {
    const prev = points[i - 1];
    const cur = points[i];
    const after = points[i + 1];

    next.push({
      x: cur.x * (1 - strength) + ((prev.x + after.x) * 0.5) * strength,
      y: cur.y * (1 - strength) + ((prev.y + after.y) * 0.5) * strength,
      w: cur.w * (1 - strength * 0.8) + ((prev.w + after.w) * 0.5) * strength * 0.8,
      t: cur.t
    });
  }

  next.push(points[points.length - 1]);
  return next;
}

function resamplePoints(points, spacing) {
  if (points.length <= 2) {
    return points.slice();
  }

  const sampled = [points[0]];
  let accumulated = 0;

  for (let i = 1; i < points.length; i += 1) {
    const start = points[i - 1];
    const end = points[i];
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const dw = end.w - start.w;
    const segment = Math.hypot(dx, dy);

    if (segment === 0) {
      continue;
    }

    let cursor = spacing - accumulated;
    while (cursor <= segment) {
      const t = cursor / segment;
      const x = start.x + dx * t;
      const y = start.y + dy * t;
      const w = start.w + dw * t;
      sampled.push({ x, y, w, t: end.t });
      cursor += spacing;
    }

    accumulated = segment - (cursor - spacing);
  }

  const lastOriginal = points[points.length - 1];
  const lastSampled = sampled[sampled.length - 1];
  if (Math.hypot(lastSampled.x - lastOriginal.x, lastSampled.y - lastOriginal.y) > 0.4) {
    sampled.push(lastOriginal);
  }

  return sampled;
}

function catmullRom(points, segmentsPerCurve) {
  if (points.length < 4) {
    return points.slice();
  }

  const output = [points[0]];

  for (let i = 0; i < points.length - 1; i += 1) {
    const p0 = points[Math.max(0, i - 1)];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[Math.min(points.length - 1, i + 2)];

    for (let j = 1; j <= segmentsPerCurve; j += 1) {
      const t = j / segmentsPerCurve;
      const t2 = t * t;
      const t3 = t2 * t;

      const x = 0.5 * (
        (2 * p1.x) +
        (-p0.x + p2.x) * t +
        (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * t2 +
        (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * t3
      );

      const y = 0.5 * (
        (2 * p1.y) +
        (-p0.y + p2.y) * t +
        (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * t2 +
        (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * t3
      );

      const w = 0.5 * (
        (2 * p1.w) +
        (-p0.w + p2.w) * t +
        (2 * p0.w - 5 * p1.w + 4 * p2.w - p3.w) * t2 +
        (-p0.w + 3 * p1.w - 3 * p2.w + p3.w) * t3
      );

      output.push({ x, y, w, t: p2.t });
    }
  }

  return output;
}

function beautifyStroke(points, strength) {
  if (points.length < 4) {
    return points.slice();
  }

  let result = simplifyByDistance(points, 0.5 + strength * 1.4);
  result = resamplePoints(result, 1.4 + (1 - strength) * 1.8);

  const passes = 1 + Math.round(strength * 2);
  for (let i = 0; i < passes; i += 1) {
    result = smoothPass(result, 0.33 + strength * 0.24);
  }

  result = catmullRom(result, 4 + Math.round(strength * 5));

  for (let i = 0; i < result.length; i += 1) {
    const prev = result[Math.max(0, i - 1)];
    const next = result[Math.min(result.length - 1, i + 1)];
    result[i].w = clamp((prev.w + result[i].w + next.w) / 3, 1.2, 72);
  }

  return result;
}

function drawStroke(points, color, composite) {
  if (!points || points.length === 0) {
    return;
  }

  ctx.save();
  ctx.globalCompositeOperation = composite;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  if (points.length === 1) {
    ctx.beginPath();
    ctx.arc(points[0].x, points[0].y, points[0].w / 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    return;
  }

  for (let i = 1; i < points.length; i += 1) {
    const prev = points[i - 1];
    const current = points[i];

    const start = i === 1 ? prev : midpoint(points[i - 2], prev);
    const end = midpoint(prev, current);

    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.quadraticCurveTo(prev.x, prev.y, end.x, end.y);
    ctx.lineWidth = (prev.w + current.w) * 0.5;
    ctx.stroke();
  }

  const beforeLast = points[points.length - 2];
  const last = points[points.length - 1];
  ctx.beginPath();
  ctx.moveTo(beforeLast.x, beforeLast.y);
  ctx.lineTo(last.x, last.y);
  ctx.lineWidth = last.w;
  ctx.stroke();

  ctx.restore();
}

function drawTextAction(action) {
  ctx.save();
  ctx.globalCompositeOperation = "source-over";
  ctx.fillStyle = action.color;
  ctx.direction = "rtl";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = `${action.size}px "Aref Ruqaa Ink", serif`;
  ctx.fillText(action.text, action.x, action.y);
  ctx.restore();
}

function drawWritingLines() {
  const upper = state.canvasHeight * 0.48;
  const baseline = state.canvasHeight * 0.68;
  const descender = state.canvasHeight * 0.84;

  ctx.save();
  ctx.lineWidth = 1.4;

  ctx.strokeStyle = "rgba(30, 64, 175, 0.25)";
  ctx.beginPath();
  ctx.moveTo(0, upper);
  ctx.lineTo(state.canvasWidth, upper);
  ctx.stroke();

  ctx.strokeStyle = "rgba(5, 150, 105, 0.33)";
  ctx.beginPath();
  ctx.moveTo(0, baseline);
  ctx.lineTo(state.canvasWidth, baseline);
  ctx.stroke();

  ctx.strokeStyle = "rgba(220, 38, 38, 0.22)";
  ctx.beginPath();
  ctx.moveTo(0, descender);
  ctx.lineTo(state.canvasWidth, descender);
  ctx.stroke();

  ctx.fillStyle = "rgba(15, 23, 42, 0.5)";
  ctx.font = '13px "Cairo", sans-serif';
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.fillText("سطر علوي", 8, upper - 8);
  ctx.fillText("السطر الأساسي", 8, baseline - 8);
  ctx.fillText("سطر النزول", 8, descender - 8);

  ctx.restore();
}

function drawGuideLetter() {
  ctx.save();
  ctx.direction = "rtl";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = `700 ${state.guideSize}px "Aref Ruqaa Ink", serif`;

  ctx.globalAlpha = 0.12;
  ctx.fillStyle = "#1e3a8a";
  ctx.fillText(state.selectedLetter, state.canvasWidth / 2, state.canvasHeight / 2);

  ctx.globalAlpha = 0.28;
  ctx.strokeStyle = "#1e40af";
  ctx.lineWidth = 2;
  ctx.setLineDash([8, 8]);
  ctx.strokeText(state.selectedLetter, state.canvasWidth / 2, state.canvasHeight / 2);

  ctx.restore();
}

function redraw() {
  ctx.clearRect(0, 0, state.canvasWidth, state.canvasHeight);

  ctx.save();
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, state.canvasWidth, state.canvasHeight);
  ctx.restore();

  for (const action of state.actions) {
    if (action.type === "stroke") {
      drawStroke(action.points, action.color, action.composite);
    } else if (action.type === "text") {
      drawTextAction(action);
    }
  }

  if (state.currentStroke) {
    drawStroke(
      state.currentStroke.points,
      state.currentStroke.color,
      state.currentStroke.tool === "eraser" ? "destination-out" : "source-over"
    );
  }

  if (state.linesVisible) {
    drawWritingLines();
  }

  if (state.guideVisible) {
    drawGuideLetter();
  }
}

function resizeCanvas() {
  const rect = canvas.getBoundingClientRect();
  state.pixelRatio = Math.max(1, window.devicePixelRatio || 1);
  state.canvasWidth = rect.width;
  state.canvasHeight = rect.height;

  canvas.width = Math.round(rect.width * state.pixelRatio);
  canvas.height = Math.round(rect.height * state.pixelRatio);

  ctx.setTransform(state.pixelRatio, 0, 0, state.pixelRatio, 0, 0);
  redraw();
}

function setTool(toolName) {
  state.tool = toolName;
  penBtn.classList.toggle("active", toolName === "pen");
  eraserBtn.classList.toggle("active", toolName === "eraser");
}

function pushAction(action) {
  state.actions.push(action);
  state.redoStack = [];
  redraw();
}

function undo() {
  if (!state.actions.length) {
    return;
  }

  state.redoStack.push(state.actions.pop());
  redraw();
}

function redo() {
  if (!state.redoStack.length) {
    return;
  }

  state.actions.push(state.redoStack.pop());
  redraw();
}

function clearBoard() {
  state.actions = [];
  state.redoStack = [];
  state.currentStroke = null;
  redraw();
}

function startStroke(event) {
  if (event.pointerType === "mouse" && event.button !== 0) {
    return;
  }
  event.preventDefault();
  const point = getPoint(event);
  const baseWidth = state.tool === "eraser" ? state.size * 1.65 : state.size;

  state.currentStroke = {
    type: "stroke",
    tool: state.tool,
    color: state.tool === "eraser" ? "#000000" : state.color,
    composite: state.tool === "eraser" ? "destination-out" : "source-over",
    points: [{ ...point, w: baseWidth }]
  };

  state.pointerId = event.pointerId;
  state.isDrawing = true;
  canvas.setPointerCapture(event.pointerId);
  redraw();
}

function moveStroke(event) {
  if (!state.isDrawing || !state.currentStroke || event.pointerId !== state.pointerId) {
    return;
  }

  const rawPoint = getPoint(event);
  const points = state.currentStroke.points;
  const lastPoint = points[points.length - 1];

  const smoothed = smoothPoint(rawPoint, lastPoint, state.smoothing);
  const computedWidth = computeWidth(smoothed, lastPoint, state.size, state.smoothing, state.tool === "eraser");

  points.push({ ...smoothed, w: computedWidth });
  redraw();
}

function endStroke(event) {
  if (!state.isDrawing || !state.currentStroke || event.pointerId !== state.pointerId) {
    return;
  }

  const finalized = { ...state.currentStroke };
  if (finalized.tool === "pen") {
    finalized.points = beautifyStroke(finalized.points, state.smoothing);
  }

  state.actions.push(finalized);
  state.redoStack = [];
  state.currentStroke = null;
  state.isDrawing = false;
  state.pointerId = null;
  redraw();
}

function addTextToBoard(text) {
  const trimmed = text.trim();
  if (!trimmed) {
    return;
  }

  const nextY = state.nextTextY;
  state.nextTextY += 56;
  if (state.nextTextY > state.canvasHeight - 80) {
    state.nextTextY = 110;
  }

  pushAction({
    type: "text",
    text: trimmed,
    x: state.canvasWidth * 0.5,
    y: nextY,
    size: clamp(44 + state.size * 1.7, 40, 88),
    color: state.color
  });
}

function saveImage() {
  const link = document.createElement("a");
  link.download = `arabic-board-${Date.now()}.png`;
  link.href = canvas.toDataURL("image/png");
  link.click();
}

function buildLetterOptions() {
  const letters = Object.keys(LETTER_DATA);

  for (const letter of letters) {
    const option = document.createElement("option");
    option.value = letter;
    option.textContent = letter;
    letterSelect.appendChild(option);
  }

  letterSelect.value = state.selectedLetter;
}

function updateLetterCard() {
  const data = LETTER_DATA[state.selectedLetter];
  letterForms.textContent = data.forms;
  letterHint.textContent = data.hint;

  wordButtons.innerHTML = "";
  for (const word of data.words) {
    const button = document.createElement("button");
    button.className = "word-btn";
    button.textContent = word;
    button.addEventListener("click", () => {
      arabicTextInput.value = word;
      addTextToBoard(word);
    });
    wordButtons.appendChild(button);
  }
}

function insertAtCursor(input, value) {
  const start = input.selectionStart ?? input.value.length;
  const end = input.selectionEnd ?? input.value.length;
  const before = input.value.slice(0, start);
  const after = input.value.slice(end);
  input.value = `${before}${value}${after}`;
  const cursor = start + value.length;
  input.setSelectionRange(cursor, cursor);
  input.focus();
}

function buildHarakatButtons() {
  for (const symbol of HARAKAT) {
    const button = document.createElement("button");
    button.className = "harakat-btn";
    button.type = "button";
    button.textContent = symbol;
    button.title = `إضافة ${symbol}`;
    button.addEventListener("click", () => {
      insertAtCursor(arabicTextInput, symbol);
    });
    harakatRow.appendChild(button);
  }
}

function bindEvents() {
  penBtn.addEventListener("click", () => setTool("pen"));
  eraserBtn.addEventListener("click", () => setTool("eraser"));

  undoBtn.addEventListener("click", undo);
  redoBtn.addEventListener("click", redo);
  clearBtn.addEventListener("click", clearBoard);
  saveBtn.addEventListener("click", saveImage);

  colorPicker.addEventListener("input", (event) => {
    state.color = event.target.value;
  });

  sizeRange.addEventListener("input", (event) => {
    state.size = Number(event.target.value);
  });

  smoothRange.addEventListener("input", (event) => {
    state.smoothing = Number(event.target.value) / 100;
  });

  letterSelect.addEventListener("change", (event) => {
    state.selectedLetter = event.target.value;
    updateLetterCard();
    redraw();
  });

  toggleGuideBtn.addEventListener("click", () => {
    state.guideVisible = !state.guideVisible;
    toggleGuideBtn.textContent = state.guideVisible ? "إخفاء التتبع" : "إظهار التتبع";
    redraw();
  });

  toggleLinesBtn.addEventListener("click", () => {
    state.linesVisible = !state.linesVisible;
    toggleLinesBtn.textContent = state.linesVisible ? "إخفاء سطور الكتابة" : "إظهار سطور الكتابة";
    redraw();
  });

  guideSizeRange.addEventListener("input", (event) => {
    state.guideSize = Number(event.target.value);
    redraw();
  });

  addTextBtn.addEventListener("click", () => {
    addTextToBoard(arabicTextInput.value);
  });

  arabicTextInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addTextToBoard(arabicTextInput.value);
    }
  });

  canvas.addEventListener("pointerdown", startStroke);
  canvas.addEventListener("pointermove", moveStroke);
  canvas.addEventListener("pointerup", endStroke);
  canvas.addEventListener("pointercancel", endStroke);
  canvas.addEventListener("pointerleave", (event) => {
    if (state.isDrawing && event.pointerId === state.pointerId) {
      endStroke(event);
    }
  });

  window.addEventListener("resize", resizeCanvas);
}

function init() {
  buildLetterOptions();
  buildHarakatButtons();
  updateLetterCard();
  bindEvents();
  toggleGuideBtn.textContent = state.guideVisible ? "إخفاء التتبع" : "إظهار التتبع";
  toggleLinesBtn.textContent = state.linesVisible ? "إخفاء سطور الكتابة" : "إظهار سطور الكتابة";
  resizeCanvas();
}

init();
