const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");

const workspace = document.getElementById("workspace");
const teacherPanel = document.getElementById("teacherPanel");
const togglePanelBtn = document.getElementById("togglePanelBtn");
const beautifyBadge = document.getElementById("beautifyBadge");

const penBtn = document.getElementById("penBtn");
const eraserBtn = document.getElementById("eraserBtn");
const undoBtn = document.getElementById("undoBtn");
const redoBtn = document.getElementById("redoBtn");
const clearBtn = document.getElementById("clearBtn");
const saveBtn = document.getElementById("saveBtn");
const toggleGuideBtn = document.getElementById("toggleGuideBtn");
const toggleLinesBtn = document.getElementById("toggleLinesBtn");

const colorPicker = document.getElementById("colorPicker");
const sizeRange = document.getElementById("sizeRange");
const smoothRange = document.getElementById("smoothRange");
const beautifyModeBtn = document.getElementById("beautifyModeBtn");
const beautifyRange = document.getElementById("beautifyRange");

const letterSelect = document.getElementById("letterSelect");
const guideSizeRange = document.getElementById("guideSizeRange");
const letterForms = document.getElementById("letterForms");
const letterHint = document.getElementById("letterHint");
const wordButtons = document.getElementById("wordButtons");

const arabicTextInput = document.getElementById("arabicTextInput");
const addTextBtn = document.getElementById("addTextBtn");
const harakatRow = document.getElementById("harakatRow");

const HARAKAT = ["َ", "ِ", "ُ", "ّ", "ْ", "ً", "ٍ", "ٌ", "ٰ", "ـ"];
const GRID_STEP = 40;
const GRID_OFFSET = 28;

const LETTER_DATA = {
  "ا": { forms: "ا  ـا  ـا  ا", hint: "مثال: أسد", words: ["أمل", "أسد", "أمان"] },
  "ب": { forms: "ب  بـ  ـبـ  ـب", hint: "مثال: باب", words: ["باب", "بيت", "بحر"] },
  "ت": { forms: "ت  تـ  ـتـ  ـت", hint: "مثال: تفاح", words: ["تمر", "تفاح", "تعاون"] },
  "ث": { forms: "ث  ثـ  ـثـ  ـث", hint: "مثال: ثمر", words: ["ثمر", "ثقة", "ثوب"] },
  "ج": { forms: "ج  جـ  ـجـ  ـج", hint: "مثال: جمل", words: ["جمل", "جميل", "جامعة"] },
  "ح": { forms: "ح  حـ  ـحـ  ـح", hint: "مثال: حرف", words: ["حلم", "حب", "حديقة"] },
  "خ": { forms: "خ  خـ  ـخـ  ـخ", hint: "مثال: خبز", words: ["خريطة", "خيمة", "خلق"] },
  "د": { forms: "د  ـد  ـد  د", hint: "مثال: درس", words: ["درس", "دفتر", "دقيق"] },
  "ذ": { forms: "ذ  ـذ  ـذ  ذ", hint: "مثال: ذهب", words: ["ذهب", "ذراع", "ذكي"] },
  "ر": { forms: "ر  ـر  ـر  ر", hint: "مثال: ريشة", words: ["رسم", "رائع", "ربيع"] },
  "ز": { forms: "ز  ـز  ـز  ز", hint: "مثال: زهرة", words: ["زيت", "زهر", "زيارة"] },
  "س": { forms: "س  سـ  ـسـ  ـس", hint: "مثال: سمك", words: ["سماء", "سلم", "سفينة"] },
  "ش": { forms: "ش  شـ  ـشـ  ـش", hint: "مثال: شمس", words: ["شمس", "شجرة", "شرح"] },
  "ص": { forms: "ص  صـ  ـصـ  ـص", hint: "مثال: صبر", words: ["صبر", "صوت", "صورة"] },
  "ض": { forms: "ض  ضـ  ـضـ  ـض", hint: "مثال: ضوء", words: ["ضوء", "ضمير", "ضبط"] },
  "ط": { forms: "ط  طـ  ـطـ  ـط", hint: "مثال: طريق", words: ["طريق", "طالب", "طائر"] },
  "ظ": { forms: "ظ  ظـ  ـظـ  ـظ", hint: "مثال: ظرف", words: ["ظرف", "ظلال", "وظيفة"] },
  "ع": { forms: "ع  عـ  ـعـ  ـع", hint: "مثال: علم", words: ["علم", "عين", "عصفور"] },
  "غ": { forms: "غ  غـ  ـغـ  ـغ", hint: "مثال: غيم", words: ["غيم", "غابة", "غزال"] },
  "ف": { forms: "ف  فـ  ـفـ  ـف", hint: "مثال: فم", words: ["فم", "فكرة", "فصل"] },
  "ق": { forms: "ق  قـ  ـقـ  ـق", hint: "مثال: قلم", words: ["قلم", "قمر", "قصة"] },
  "ك": { forms: "ك  كـ  ـكـ  ـك", hint: "مثال: كتاب", words: ["كتاب", "كرة", "كريم"] },
  "ل": { forms: "ل  لـ  ـلـ  ـل", hint: "مثال: لغة", words: ["لغة", "لعب", "لبن"] },
  "م": { forms: "م  مـ  ـمـ  ـم", hint: "مثال: مدرسة", words: ["مدرسة", "ماء", "مفتاح"] },
  "ن": { forms: "ن  نـ  ـنـ  ـن", hint: "مثال: نور", words: ["نور", "نهر", "نجاح"] },
  "ه": { forms: "ه  هـ  ـهـ  ـه", hint: "مثال: هدية", words: ["هدية", "هلال", "هواء"] },
  "و": { forms: "و  ـو  ـو  و", hint: "مثال: ورد", words: ["ورد", "وطن", "وقت"] },
  "ي": { forms: "ي  يـ  ـيـ  ـي", hint: "مثال: يد", words: ["يد", "يوم", "يقين"] }
};

const state = {
  tool: "pen",
  color: "#111111",
  size: 8,
  smoothing: 0.68,
  beautifyEnabled: true,
  beautifyStrength: 0.88,
  linesVisible: true,
  guideVisible: false,
  guideSize: 260,
  selectedLetter: "ا",
  panelOpen: false,
  pixelRatio: 1,
  canvasWidth: 1,
  canvasHeight: 1,
  actions: [],
  redoStack: [],
  currentStroke: null,
  isDrawing: false,
  pointerId: null,
  nextTextY: 84
};

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function midpoint(a, b) {
  return { x: (a.x + b.x) * 0.5, y: (a.y + b.y) * 0.5 };
}

function normalizeAngle(rad) {
  let out = rad;
  while (out > Math.PI) {
    out -= 2 * Math.PI;
  }
  while (out < -Math.PI) {
    out += 2 * Math.PI;
  }
  return out;
}

function getPoint(event) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top,
    t: performance.now()
  };
}

function stabilizePoint(rawPoint, previousPoint, smoothStrength) {
  if (!previousPoint) {
    return { ...rawPoint };
  }

  const alpha = 0.56 - smoothStrength * 0.36;
  return {
    x: previousPoint.x + (rawPoint.x - previousPoint.x) * alpha,
    y: previousPoint.y + (rawPoint.y - previousPoint.y) * alpha,
    t: rawPoint.t
  };
}

function computeWidth(point, previousPoint, baseSize, smoothStrength, isEraser) {
  const effectiveSize = isEraser ? baseSize * 1.7 : baseSize;
  if (!previousPoint) {
    return effectiveSize;
  }

  const dt = Math.max(point.t - previousPoint.t, 7);
  const distance = Math.hypot(point.x - previousPoint.x, point.y - previousPoint.y);
  const speed = distance / dt;
  const speedFactor = clamp(1.32 - speed * 2.9, 0.44, 1.56);
  const target = effectiveSize * speedFactor;
  return previousPoint.w + (target - previousPoint.w) * (0.24 + smoothStrength * 0.28);
}

function strokeLength(points) {
  if (points.length <= 1) {
    return 0;
  }

  let total = 0;
  for (let i = 1; i < points.length; i += 1) {
    total += Math.hypot(points[i].x - points[i - 1].x, points[i].y - points[i - 1].y);
  }
  return total;
}

function getBounds(points) {
  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;

  for (const point of points) {
    minX = Math.min(minX, point.x);
    maxX = Math.max(maxX, point.x);
    minY = Math.min(minY, point.y);
    maxY = Math.max(maxY, point.y);
  }

  return {
    minX,
    maxX,
    minY,
    maxY,
    width: maxX - minX,
    height: maxY - minY,
    centerX: (minX + maxX) * 0.5,
    centerY: (minY + maxY) * 0.5
  };
}

function isDotLikeStroke(points) {
  if (points.length <= 1) {
    return true;
  }

  const bounds = getBounds(points);
  return strokeLength(points) < state.size * 2.9 && Math.max(bounds.width, bounds.height) < state.size * 2.6;
}

function simplifyByDistance(points, threshold) {
  if (points.length <= 2) {
    return points.slice();
  }

  const output = [points[0]];
  let last = points[0];

  for (let i = 1; i < points.length - 1; i += 1) {
    const point = points[i];
    if (Math.hypot(point.x - last.x, point.y - last.y) >= threshold) {
      output.push(point);
      last = point;
    }
  }

  output.push(points[points.length - 1]);
  return output;
}

function smoothPass(points, strength) {
  if (points.length <= 2) {
    return points.slice();
  }

  const next = [points[0]];

  for (let i = 1; i < points.length - 1; i += 1) {
    const prev = points[i - 1];
    const current = points[i];
    const after = points[i + 1];

    next.push({
      x: current.x * (1 - strength) + ((prev.x + after.x) * 0.5) * strength,
      y: current.y * (1 - strength) + ((prev.y + after.y) * 0.5) * strength,
      w: current.w * (1 - strength * 0.72) + ((prev.w + after.w) * 0.5) * strength * 0.72,
      t: current.t
    });
  }

  next.push(points[points.length - 1]);
  return next;
}

function resamplePoints(points, spacing) {
  if (points.length <= 2) {
    return points.slice();
  }

  const output = [points[0]];
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
      output.push({
        x: start.x + dx * t,
        y: start.y + dy * t,
        w: start.w + dw * t,
        t: end.t
      });
      cursor += spacing;
    }

    accumulated = segment - (cursor - spacing);
  }

  const lastOriginal = points[points.length - 1];
  const lastSampled = output[output.length - 1];
  if (Math.hypot(lastSampled.x - lastOriginal.x, lastSampled.y - lastOriginal.y) > 0.4) {
    output.push(lastOriginal);
  }

  return output;
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

      output.push({
        x: 0.5 * ((2 * p1.x) + (-p0.x + p2.x) * t + (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * t2 + (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * t3),
        y: 0.5 * ((2 * p1.y) + (-p0.y + p2.y) * t + (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * t2 + (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * t3),
        w: 0.5 * ((2 * p1.w) + (-p0.w + p2.w) * t + (2 * p0.w - 5 * p1.w + 4 * p2.w - p3.w) * t2 + (-p0.w + 3 * p1.w - 3 * p2.w + p3.w) * t3),
        t: p2.t
      });
    }
  }

  return output;
}

function softBeautify(points, strength) {
  let result = simplifyByDistance(points, 0.46 + strength * 1.12);
  result = resamplePoints(result, 1.3 + (1 - strength) * 1.4);

  const passes = 1 + Math.round(strength * 2);
  for (let i = 0; i < passes; i += 1) {
    result = smoothPass(result, 0.25 + strength * 0.2);
  }

  result = catmullRom(result, 3 + Math.round(strength * 2));
  return result;
}

function snapToWritingBands(points, strength) {
  const output = [];

  for (const point of points) {
    const nearestBand = Math.round((point.y - GRID_OFFSET) / GRID_STEP) * GRID_STEP + GRID_OFFSET;
    const distance = Math.abs(point.y - nearestBand);
    const zone = GRID_STEP * 0.34;

    let y = point.y;
    if (distance <= zone) {
      y = lerp(point.y, nearestBand, 0.1 + strength * 0.48);
    }

    output.push({ ...point, y });
  }

  return output;
}

function snapAngles(points, strength) {
  if (points.length < 3) {
    return points.slice();
  }

  const anchors = [0, 10, -10, 20, -20, 34, -34, 48, -48, 90, -90].map((deg) => (deg * Math.PI) / 180);
  const output = [points[0]];

  for (let i = 1; i < points.length; i += 1) {
    const prev = output[output.length - 1];
    const next = points[i];
    const dx = next.x - prev.x;
    const dy = next.y - prev.y;
    const length = Math.hypot(dx, dy);

    if (length < 0.16) {
      continue;
    }

    const rawAngle = Math.atan2(dy, dx);
    let snapped = rawAngle;
    let smallest = Infinity;

    for (const anchor of anchors) {
      const diff = Math.abs(normalizeAngle(rawAngle - anchor));
      if (diff < smallest) {
        smallest = diff;
        snapped = anchor;
      }
    }

    const blend = 0.1 + strength * 0.52;
    const finalAngle = rawAngle + normalizeAngle(snapped - rawAngle) * blend;

    output.push({
      ...next,
      x: prev.x + Math.cos(finalAngle) * length,
      y: prev.y + Math.sin(finalAngle) * length
    });
  }

  return output.length > 1 ? output : points.slice();
}

function applyCalligraphicWidth(points, strength) {
  if (points.length < 2) {
    return points.slice();
  }

  const nibAngle = (-34 * Math.PI) / 180;
  const output = [];

  for (let i = 0; i < points.length; i += 1) {
    const prev = points[Math.max(0, i - 1)];
    const next = points[Math.min(points.length - 1, i + 1)];
    const angle = Math.atan2(next.y - prev.y, next.x - prev.x);
    const nibFactor = 0.72 + Math.abs(Math.sin(angle - nibAngle)) * (0.42 + strength * 0.28);
    const targetWidth = clamp(points[i].w * nibFactor, 1.2, 74);

    output.push({
      ...points[i],
      w: lerp(points[i].w, targetWidth, 0.34 + strength * 0.46)
    });
  }

  return output;
}

function enhanceArabicStroke(points, preview) {
  if (points.length < 2) {
    return points.slice();
  }

  const power = state.beautifyStrength * (preview ? 0.72 : 1);

  let result = softBeautify(points, state.smoothing * 0.85 + 0.12);
  result = snapToWritingBands(result, power);
  result = snapAngles(result, power);

  result = smoothPass(result, 0.2 + power * 0.16);
  result = smoothPass(result, 0.12 + power * 0.12);
  result = catmullRom(result, 4 + Math.round(power * 3));
  result = applyCalligraphicWidth(result, power);

  return result;
}

function finalizeStroke(rawPoints, tool, preview) {
  if (!rawPoints.length) {
    return [];
  }

  if (tool === "eraser") {
    return softBeautify(rawPoints, state.smoothing * 0.8);
  }

  if (isDotLikeStroke(rawPoints)) {
    const bounds = getBounds(rawPoints);
    return [{
      x: bounds.centerX,
      y: bounds.centerY,
      w: state.size * (1 + state.beautifyStrength * 0.44),
      t: rawPoints[rawPoints.length - 1].t
    }];
  }

  if (!state.beautifyEnabled) {
    return softBeautify(rawPoints, state.smoothing);
  }

  return enhanceArabicStroke(rawPoints, preview);
}

function drawStroke(points, color, composite) {
  if (!points || !points.length) {
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
    ctx.arc(points[0].x, points[0].y, points[0].w * 0.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    return;
  }

  for (let i = 1; i < points.length; i += 1) {
    const previous = points[i - 1];
    const current = points[i];
    const start = i === 1 ? previous : midpoint(points[i - 2], previous);
    const end = midpoint(previous, current);

    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.quadraticCurveTo(previous.x, previous.y, end.x, end.y);
    ctx.lineWidth = (previous.w + current.w) * 0.5;
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
  ctx.font = `${action.size}px "Amiri", serif`;
  ctx.fillText(action.text, action.x, action.y);
  ctx.restore();
}

function drawGuideLetter() {
  ctx.save();
  ctx.direction = "rtl";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = `700 ${state.guideSize}px "Aref Ruqaa Ink", serif`;

  ctx.globalAlpha = 0.1;
  ctx.fillStyle = "#4f46e5";
  ctx.fillText(state.selectedLetter, state.canvasWidth * 0.5, state.canvasHeight * 0.54);

  ctx.globalAlpha = 0.2;
  ctx.strokeStyle = "#4338ca";
  ctx.lineWidth = 1.8;
  ctx.setLineDash([8, 8]);
  ctx.strokeText(state.selectedLetter, state.canvasWidth * 0.5, state.canvasHeight * 0.54);

  ctx.restore();
}

function drawNotebookLines() {
  ctx.save();
  ctx.lineWidth = 1;

  const total = Math.ceil((state.canvasHeight - GRID_OFFSET) / GRID_STEP);
  for (let i = 0; i <= total; i += 1) {
    const y = GRID_OFFSET + i * GRID_STEP;
    ctx.strokeStyle = i % 5 === 0 ? "rgba(148, 163, 184, 0.28)" : "rgba(148, 163, 184, 0.2)";
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(state.canvasWidth, y);
    ctx.stroke();
  }

  ctx.restore();
}

function redraw() {
  ctx.clearRect(0, 0, state.canvasWidth, state.canvasHeight);

  ctx.save();
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, state.canvasWidth, state.canvasHeight);
  ctx.restore();

  if (state.guideVisible) {
    drawGuideLetter();
  }

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
    drawNotebookLines();
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

function updatePanelState() {
  workspace.classList.toggle("panel-open", state.panelOpen);
  togglePanelBtn.textContent = state.panelOpen ? "إخفاء لوحة الحروف" : "لوحة الحروف";
}

function updateGuideButton() {
  toggleGuideBtn.classList.toggle("active", state.guideVisible);
  toggleGuideBtn.textContent = state.guideVisible ? "ح✓" : "ح";
}

function updateLinesButton() {
  toggleLinesBtn.classList.toggle("active", state.linesVisible);
  toggleLinesBtn.textContent = state.linesVisible ? "☰" : "☷";
}

function updateBeautifyUI() {
  beautifyModeBtn.classList.toggle("active", state.beautifyEnabled);
  beautifyBadge.classList.toggle("off", !state.beautifyEnabled);

  beautifyBadge.textContent = state.beautifyEnabled
    ? `تحسين الخط: مفعل (${Math.round(state.beautifyStrength * 100)}%)`
    : "تحسين الخط: متوقف";
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
  state.nextTextY = 84;
  redraw();
}

function updateCurrentStroke(preview) {
  if (!state.currentStroke) {
    return;
  }

  state.currentStroke.points = finalizeStroke(
    state.currentStroke.rawPoints,
    state.currentStroke.tool,
    preview
  );
}

function startStroke(event) {
  if (event.pointerType === "mouse" && event.button !== 0) {
    return;
  }

  event.preventDefault();
  const point = getPoint(event);
  const base = state.tool === "eraser" ? state.size * 1.7 : state.size;

  state.currentStroke = {
    type: "stroke",
    tool: state.tool,
    color: state.tool === "eraser" ? "#000000" : state.color,
    composite: state.tool === "eraser" ? "destination-out" : "source-over",
    rawPoints: [{ ...point, w: base }],
    points: [{ ...point, w: base }]
  };

  state.isDrawing = true;
  state.pointerId = event.pointerId;
  canvas.setPointerCapture(event.pointerId);
  redraw();
}

function moveStroke(event) {
  if (!state.isDrawing || !state.currentStroke || event.pointerId !== state.pointerId) {
    return;
  }

  const rawPoint = getPoint(event);
  const rawPoints = state.currentStroke.rawPoints;
  const lastPoint = rawPoints[rawPoints.length - 1];

  const stable = stabilizePoint(rawPoint, lastPoint, state.smoothing);
  const width = computeWidth(stable, lastPoint, state.size, state.smoothing, state.tool === "eraser");

  rawPoints.push({ ...stable, w: width });
  updateCurrentStroke(true);
  redraw();
}

function endStroke(event) {
  if (!state.isDrawing || !state.currentStroke || event.pointerId !== state.pointerId) {
    return;
  }

  updateCurrentStroke(false);

  const finalized = {
    type: "stroke",
    tool: state.currentStroke.tool,
    color: state.currentStroke.color,
    composite: state.currentStroke.composite,
    points: state.currentStroke.points
  };

  pushAction(finalized);
  state.currentStroke = null;
  state.isDrawing = false;
  state.pointerId = null;
}

function addTextToBoard(text) {
  const trimmed = text.trim();
  if (!trimmed) {
    return;
  }

  const y = state.nextTextY;
  state.nextTextY += 56;
  if (state.nextTextY > state.canvasHeight - 84) {
    state.nextTextY = 84;
  }

  pushAction({
    type: "text",
    text: trimmed,
    x: state.canvasWidth * 0.5,
    y,
    size: clamp(40 + state.size * 1.55, 38, 84),
    color: state.color
  });
}

function saveImage() {
  const link = document.createElement("a");
  link.download = `arabic-smart-board-${Date.now()}.png`;
  link.href = canvas.toDataURL("image/png");
  link.click();
}

function insertAtCursor(input, value) {
  const start = input.selectionStart ?? input.value.length;
  const end = input.selectionEnd ?? input.value.length;

  input.value = `${input.value.slice(0, start)}${value}${input.value.slice(end)}`;
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

function buildLetterOptions() {
  letterSelect.innerHTML = "";
  for (const letter of Object.keys(LETTER_DATA)) {
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
    button.type = "button";
    button.textContent = word;
    button.addEventListener("click", () => {
      arabicTextInput.value = word;
      addTextToBoard(word);
    });
    wordButtons.appendChild(button);
  }
}

function bindEvents() {
  penBtn.addEventListener("click", () => setTool("pen"));
  eraserBtn.addEventListener("click", () => setTool("eraser"));

  undoBtn.addEventListener("click", undo);
  redoBtn.addEventListener("click", redo);
  clearBtn.addEventListener("click", clearBoard);
  saveBtn.addEventListener("click", saveImage);

  toggleGuideBtn.addEventListener("click", () => {
    state.guideVisible = !state.guideVisible;
    updateGuideButton();
    redraw();
  });

  toggleLinesBtn.addEventListener("click", () => {
    state.linesVisible = !state.linesVisible;
    updateLinesButton();
    redraw();
  });

  togglePanelBtn.addEventListener("click", () => {
    state.panelOpen = !state.panelOpen;
    updatePanelState();
  });

  colorPicker.addEventListener("input", (event) => {
    state.color = event.target.value;
  });

  sizeRange.addEventListener("input", (event) => {
    state.size = Number(event.target.value);
  });

  smoothRange.addEventListener("input", (event) => {
    state.smoothing = Number(event.target.value) / 100;
  });

  beautifyModeBtn.addEventListener("click", () => {
    state.beautifyEnabled = !state.beautifyEnabled;
    updateBeautifyUI();
  });

  beautifyRange.addEventListener("input", (event) => {
    state.beautifyStrength = Number(event.target.value) / 100;
    updateBeautifyUI();
  });

  letterSelect.addEventListener("change", (event) => {
    state.selectedLetter = event.target.value;
    updateLetterCard();
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
  buildHarakatButtons();
  buildLetterOptions();
  updateLetterCard();
  bindEvents();

  setTool("pen");
  updatePanelState();
  updateGuideButton();
  updateLinesButton();
  updateBeautifyUI();

  resizeCanvas();
}

init();
