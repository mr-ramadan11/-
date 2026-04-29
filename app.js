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
const colorPicker = document.getElementById("colorPicker");
const sizeRange = document.getElementById("sizeRange");
const smoothRange = document.getElementById("smoothRange");
const beautifyModeBtn = document.getElementById("beautifyModeBtn");
const beautifyRange = document.getElementById("beautifyRange");

const letterSelect = document.getElementById("letterSelect");
const toggleGuideBtn = document.getElementById("toggleGuideBtn");
const toggleLinesBtn = document.getElementById("toggleLinesBtn");
const guideSizeRange = document.getElementById("guideSizeRange");
const letterForms = document.getElementById("letterForms");
const letterHint = document.getElementById("letterHint");
const wordButtons = document.getElementById("wordButtons");

const arabicTextInput = document.getElementById("arabicTextInput");
const addTextBtn = document.getElementById("addTextBtn");
const harakatRow = document.getElementById("harakatRow");

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
  size: 9,
  smoothing: 0.72,
  beautifyEnabled: true,
  beautifyStrength: 0.85,
  guideSize: 280,
  guideVisible: true,
  linesVisible: true,
  selectedLetter: "ا",
  panelOpen: window.innerWidth > 1120,
  actions: [],
  redoStack: [],
  currentStroke: null,
  isDrawing: false,
  pointerId: null,
  pixelRatio: 1,
  canvasWidth: 1,
  canvasHeight: 1,
  nextTextY: 105
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

function normalizeAngle(radians) {
  let output = radians;
  while (output > Math.PI) {
    output -= Math.PI * 2;
  }
  while (output < -Math.PI) {
    output += Math.PI * 2;
  }
  return output;
}

function getWritingGuides() {
  const upper = state.canvasHeight * 0.44;
  const baseline = state.canvasHeight * 0.64;
  const descender = state.canvasHeight * 0.8;
  return { upper, baseline, descender };
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

  const alpha = 0.58 - smoothStrength * 0.38;
  return {
    x: previousPoint.x + (rawPoint.x - previousPoint.x) * alpha,
    y: previousPoint.y + (rawPoint.y - previousPoint.y) * alpha,
    t: rawPoint.t
  };
}

function computeWidth(point, previousPoint, baseSize, smoothStrength, isEraser) {
  const coreSize = isEraser ? baseSize * 1.65 : baseSize;
  if (!previousPoint) {
    return coreSize;
  }

  const dt = Math.max(point.t - previousPoint.t, 7);
  const distance = Math.hypot(point.x - previousPoint.x, point.y - previousPoint.y);
  const speed = distance / dt;
  const speedFactor = clamp(1.32 - speed * 2.9, 0.45, 1.55);
  const target = coreSize * speedFactor;
  return previousPoint.w + (target - previousPoint.w) * (0.22 + smoothStrength * 0.28);
}

function simplifyByDistance(points, threshold) {
  if (points.length <= 2) {
    return points.slice();
  }

  const simplified = [points[0]];
  let last = points[0];

  for (let i = 1; i < points.length - 1; i += 1) {
    const point = points[i];
    const distance = Math.hypot(point.x - last.x, point.y - last.y);
    if (distance >= threshold) {
      simplified.push(point);
      last = point;
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
      sampled.push({
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
  const lastSampled = sampled[sampled.length - 1];
  if (Math.hypot(lastSampled.x - lastOriginal.x, lastSampled.y - lastOriginal.y) > 0.3) {
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

      output.push({
        x: 0.5 * (
          (2 * p1.x) +
          (-p0.x + p2.x) * t +
          (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * t2 +
          (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * t3
        ),
        y: 0.5 * (
          (2 * p1.y) +
          (-p0.y + p2.y) * t +
          (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * t2 +
          (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * t3
        ),
        w: 0.5 * (
          (2 * p1.w) +
          (-p0.w + p2.w) * t +
          (2 * p0.w - 5 * p1.w + 4 * p2.w - p3.w) * t2 +
          (-p0.w + 3 * p1.w - 3 * p2.w + p3.w) * t3
        ),
        t: p2.t
      });
    }
  }

  return output;
}

function coarseBeautify(points, strength) {
  if (points.length < 3) {
    return points.slice();
  }

  let result = simplifyByDistance(points, 0.45 + strength * 1.1);
  result = resamplePoints(result, 1.25 + (1 - strength) * 1.35);

  const passes = 1 + Math.round(strength * 2);
  for (let i = 0; i < passes; i += 1) {
    result = smoothPass(result, 0.28 + strength * 0.2);
  }

  result = catmullRom(result, 3 + Math.round(strength * 3));
  return result;
}

function snapPointsToArabicGuides(points, strength) {
  const { upper, baseline, descender } = getWritingGuides();
  const snapZone = 14 + state.size * 1.7;
  const output = [];

  for (let i = 0; i < points.length; i += 1) {
    const p = points[i];
    let y = p.y;

    const nearBaseline = Math.abs(y - baseline) <= snapZone;
    const nearUpper = Math.abs(y - upper) <= snapZone * 0.85;
    const nearDescender = Math.abs(y - descender) <= snapZone * 0.9;

    if (nearBaseline) {
      y = lerp(y, baseline, 0.16 + strength * 0.42);
    }

    if (nearUpper) {
      y = lerp(y, upper, 0.08 + strength * 0.26);
    }

    if (nearDescender) {
      y = lerp(y, descender, 0.08 + strength * 0.24);
    }

    output.push({ ...p, y });
  }

  return output;
}

function snapStrokeAngles(points, strength) {
  if (points.length < 3) {
    return points.slice();
  }

  const allowedAngles = [0, 12, -12, 24, -24, 37, -37, 52, -52, 90, -90]
    .map((deg) => (deg * Math.PI) / 180);

  const output = [points[0]];
  for (let i = 1; i < points.length; i += 1) {
    const prev = output[output.length - 1];
    const target = points[i];
    const dx = target.x - prev.x;
    const dy = target.y - prev.y;
    const segment = Math.hypot(dx, dy);

    if (segment < 0.1) {
      continue;
    }

    const rawAngle = Math.atan2(dy, dx);
    let snappedAngle = rawAngle;
    let smallest = Infinity;

    for (const angle of allowedAngles) {
      const diff = Math.abs(normalizeAngle(rawAngle - angle));
      if (diff < smallest) {
        smallest = diff;
        snappedAngle = angle;
      }
    }

    const blend = 0.12 + strength * 0.5;
    const finalAngle = rawAngle + normalizeAngle(snappedAngle - rawAngle) * blend;

    output.push({
      ...target,
      x: prev.x + Math.cos(finalAngle) * segment,
      y: prev.y + Math.sin(finalAngle) * segment
    });
  }

  if (output.length === 1) {
    output.push(points[points.length - 1]);
  }

  return output;
}

function applyCalligraphyWidths(points, strength) {
  if (points.length <= 1) {
    return points.slice();
  }

  const nibAngle = (-34 * Math.PI) / 180;
  const output = [];

  for (let i = 0; i < points.length; i += 1) {
    const prev = points[Math.max(0, i - 1)];
    const next = points[Math.min(points.length - 1, i + 1)];
    const angle = Math.atan2(next.y - prev.y, next.x - prev.x);
    const nibFactor = 0.7 + Math.abs(Math.sin(angle - nibAngle)) * (0.48 + strength * 0.24);
    const targetWidth = clamp(points[i].w * nibFactor, 1.2, 74);

    output.push({
      ...points[i],
      w: lerp(points[i].w, targetWidth, 0.35 + strength * 0.45)
    });
  }

  return output;
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

  for (const p of points) {
    minX = Math.min(minX, p.x);
    maxX = Math.max(maxX, p.x);
    minY = Math.min(minY, p.y);
    maxY = Math.max(maxY, p.y);
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

  const length = strokeLength(points);
  const bounds = getBounds(points);
  const maxSpan = Math.max(bounds.width, bounds.height);

  return length < state.size * 2.6 && maxSpan < state.size * 2.3;
}

function buildSmartArabicStroke(points, preview) {
  if (points.length < 2) {
    return points.slice();
  }

  const smartStrength = state.beautifyStrength * (preview ? 0.76 : 1);

  let output = coarseBeautify(points, 0.45 + state.smoothing * 0.55);
  output = snapPointsToArabicGuides(output, smartStrength);
  output = snapStrokeAngles(output, smartStrength);

  output = smoothPass(output, 0.21 + smartStrength * 0.2);
  output = smoothPass(output, 0.12 + smartStrength * 0.12);
  output = catmullRom(output, 4 + Math.round(smartStrength * 3));
  output = applyCalligraphyWidths(output, smartStrength);

  return output;
}

function finalizeStrokePath(rawPoints, tool, preview) {
  if (!rawPoints.length) {
    return [];
  }

  if (tool === "eraser") {
    return coarseBeautify(rawPoints, state.smoothing * 0.8);
  }

  if (isDotLikeStroke(rawPoints)) {
    const bounds = getBounds(rawPoints);
    return [{
      x: bounds.centerX,
      y: bounds.centerY,
      w: state.size * (1 + state.beautifyStrength * 0.42),
      t: rawPoints[rawPoints.length - 1].t
    }];
  }

  if (!state.beautifyEnabled) {
    return coarseBeautify(rawPoints, state.smoothing);
  }

  return buildSmartArabicStroke(rawPoints, preview);
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

function drawWritingLines() {
  const { upper, baseline, descender } = getWritingGuides();

  ctx.save();
  ctx.lineWidth = 1.3;

  ctx.strokeStyle = "rgba(59, 130, 246, 0.26)";
  ctx.beginPath();
  ctx.moveTo(0, upper);
  ctx.lineTo(state.canvasWidth, upper);
  ctx.stroke();

  ctx.strokeStyle = "rgba(5, 150, 105, 0.34)";
  ctx.beginPath();
  ctx.moveTo(0, baseline);
  ctx.lineTo(state.canvasWidth, baseline);
  ctx.stroke();

  ctx.strokeStyle = "rgba(220, 38, 38, 0.24)";
  ctx.beginPath();
  ctx.moveTo(0, descender);
  ctx.lineTo(state.canvasWidth, descender);
  ctx.stroke();

  ctx.fillStyle = "rgba(15, 23, 42, 0.46)";
  ctx.font = '12px "Cairo", sans-serif';
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.fillText("سطر علوي", 10, upper - 9);
  ctx.fillText("السطر الأساسي", 10, baseline - 9);
  ctx.fillText("سطر النزول", 10, descender - 9);

  ctx.restore();
}

function drawGuideLetter() {
  ctx.save();
  ctx.direction = "rtl";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = `700 ${state.guideSize}px "Aref Ruqaa Ink", serif`;

  ctx.globalAlpha = 0.1;
  ctx.fillStyle = "#1e3a8a";
  ctx.fillText(state.selectedLetter, state.canvasWidth * 0.5, state.canvasHeight * 0.5);

  ctx.globalAlpha = 0.22;
  ctx.strokeStyle = "#1d4ed8";
  ctx.lineWidth = 1.8;
  ctx.setLineDash([7, 6]);
  ctx.strokeText(state.selectedLetter, state.canvasWidth * 0.5, state.canvasHeight * 0.5);

  ctx.restore();
}

function redraw() {
  ctx.clearRect(0, 0, state.canvasWidth, state.canvasHeight);

  ctx.save();
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, state.canvasWidth, state.canvasHeight);
  ctx.restore();

  if (state.linesVisible) {
    drawWritingLines();
  }

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
  state.nextTextY = 105;
  redraw();
}

function updateCurrentStroke(preview) {
  if (!state.currentStroke) {
    return;
  }

  state.currentStroke.points = finalizeStrokePath(
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
  const baseWidth = state.tool === "eraser" ? state.size * 1.65 : state.size;

  state.currentStroke = {
    type: "stroke",
    tool: state.tool,
    color: state.tool === "eraser" ? "#111111" : state.color,
    composite: state.tool === "eraser" ? "destination-out" : "source-over",
    rawPoints: [{ ...point, w: baseWidth }],
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

  const raw = getPoint(event);
  const rawPoints = state.currentStroke.rawPoints;
  const lastPoint = rawPoints[rawPoints.length - 1];

  const stabilized = stabilizePoint(raw, lastPoint, state.smoothing);
  const width = computeWidth(stabilized, lastPoint, state.size, state.smoothing, state.tool === "eraser");

  rawPoints.push({ ...stabilized, w: width });
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

  const y = state.nextTextY;
  state.nextTextY += 58;
  if (state.nextTextY > state.canvasHeight - 70) {
    state.nextTextY = 110;
  }

  pushAction({
    type: "text",
    text: trimmed,
    x: state.canvasWidth * 0.5,
    y,
    size: clamp(42 + state.size * 1.4, 38, 82),
    color: state.color
  });
}

function saveImage() {
  const link = document.createElement("a");
  link.download = `smart-arabic-board-${Date.now()}.png`;
  link.href = canvas.toDataURL("image/png");
  link.click();
}

function updatePanelState() {
  workspace.classList.toggle("panel-collapsed", !state.panelOpen);
  togglePanelBtn.textContent = state.panelOpen ? "إخفاء لوحة الشرح" : "إظهار لوحة الشرح";
}

function updateBeautifyUI() {
  beautifyModeBtn.classList.toggle("active", state.beautifyEnabled);
  beautifyBadge.classList.toggle("on", state.beautifyEnabled);
  beautifyBadge.classList.toggle("off", !state.beautifyEnabled);
  beautifyBadge.textContent = state.beautifyEnabled
    ? `تحسين الخط: مفعل (${Math.round(state.beautifyStrength * 100)}%)`
    : "تحسين الخط: متوقف";
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

  beautifyModeBtn.addEventListener("click", () => {
    state.beautifyEnabled = !state.beautifyEnabled;
    updateBeautifyUI();
  });

  beautifyRange.addEventListener("input", (event) => {
    state.beautifyStrength = Number(event.target.value) / 100;
    updateBeautifyUI();
  });

  togglePanelBtn.addEventListener("click", () => {
    state.panelOpen = !state.panelOpen;
    updatePanelState();
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

  window.addEventListener("resize", () => {
    if (window.innerWidth <= 1120 && state.panelOpen && !teacherPanel.matches(":hover")) {
      state.panelOpen = false;
      updatePanelState();
    }
    resizeCanvas();
  });
}

function init() {
  buildLetterOptions();
  buildHarakatButtons();
  updateLetterCard();
  bindEvents();
  setTool("pen");
  updatePanelState();
  updateBeautifyUI();
  toggleGuideBtn.textContent = "إخفاء التتبع";
  toggleLinesBtn.textContent = "إخفاء سطور الكتابة";
  resizeCanvas();
}

init();
