/**
 * Generates a one-page, ATS-friendly PDF resume from the portfolio content.
 * Run with: npm run resume
 */
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const output = resolve(here, "../public/avula-vamshidhar-resume.pdf");

const PAGE_W = 595.28;
const PAGE_H = 841.89;
const MARGIN = 50;
const CONTENT_W = PAGE_W - MARGIN * 2;

const ink = rgb(0.07, 0.08, 0.1);
const muted = rgb(0.35, 0.37, 0.42);
const faint = rgb(0.5, 0.52, 0.57);
const accent = rgb(0.13, 0.4, 0.93);
const rule = rgb(0.85, 0.87, 0.91);

const clean = (value) =>
  value
    .replace(/[\u2014\u2013]/g, "-")
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/\u00b7/g, "|")
    .replace(/\u2026/g, "...")
    .replace(/[^\x20-\x7E]/g, "");

const doc = await PDFDocument.create();
doc.setTitle("Avula Vamshidhar - Software Developer & Data Science Student");
doc.setAuthor("Avula Vamshidhar");
doc.setSubject("Resume");
doc.setKeywords([
  "Software Developer",
  "Data Science",
  "Python",
  "FastAPI",
  "Machine Learning",
]);

const page = doc.addPage([PAGE_W, PAGE_H]);
const regular = await doc.embedFont(StandardFonts.Helvetica);
const bold = await doc.embedFont(StandardFonts.HelveticaBold);
const italic = await doc.embedFont(StandardFonts.HelveticaOblique);

let y = PAGE_H - MARGIN;

const wrap = (text, font, size, maxWidth) => {
  const words = clean(text).split(/\s+/);
  const lines = [];
  let line = "";

  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (font.widthOfTextAtSize(candidate, size) > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  }
  if (line) lines.push(line);
  return lines;
};

const draw = (
  text,
  { size = 9, font = regular, color = ink, leading = 12.6, x = MARGIN, width = CONTENT_W } = {},
) => {
  for (const line of wrap(text, font, size, width)) {
    page.drawText(line, { x, y, size, font, color });
    y -= leading;
  }
};

const space = (amount) => {
  y -= amount;
};

const section = (label) => {
  y -= 12;
  page.drawText(label.toUpperCase(), {
    x: MARGIN,
    y,
    size: 8,
    font: bold,
    color: accent,
  });
  y -= 6;
  page.drawLine({
    start: { x: MARGIN, y },
    end: { x: PAGE_W - MARGIN, y },
    thickness: 0.6,
    color: rule,
  });
  y -= 14;
};

const row = (left, right, { leading = 12.4, leftSize = 9.5 } = {}) => {
  page.drawText(clean(left), {
    x: MARGIN,
    y,
    size: leftSize,
    font: bold,
    color: ink,
  });
  if (right) {
    const rightSize = 8.4;
    const width = regular.widthOfTextAtSize(clean(right), rightSize);
    page.drawText(clean(right), {
      x: PAGE_W - MARGIN - width,
      y,
      size: rightSize,
      font: regular,
      color: muted,
    });
  }
  y -= leading;
};

const bullet = (text) => {
  page.drawText("-", {
    x: MARGIN + 2,
    y,
    size: 9,
    font: regular,
    color: accent,
  });
  draw(text, { x: MARGIN + 12, width: CONTENT_W - 12, size: 8.8, leading: 11.8 });
};

/* ---------------------------------------------------------------- */
/* Header                                                            */
/* ---------------------------------------------------------------- */
page.drawText("AVULA VAMSHIDHAR", {
  x: MARGIN,
  y,
  size: 23,
  font: bold,
  color: ink,
});
y -= 19;

page.drawText("SOFTWARE DEVELOPER & DATA SCIENCE STUDENT", {
  x: MARGIN,
  y,
  size: 8.2,
  font: bold,
  color: accent,
});
y -= 14;

page.drawText(
  "vamshib986@gmail.com  |  +91 80743 50349  |  Hyderabad, Telangana, India",
  { x: MARGIN, y, size: 8.4, font: regular, color: muted },
);
y -= 11.5;

page.drawText(
  "github.com/AvulaVamshidhar  |  linkedin.com/in/avula-vamshidhar-414694330",
  { x: MARGIN, y, size: 8.4, font: regular, color: muted },
);

/* ---------------------------------------------------------------- */
/* Profile                                                           */
/* ---------------------------------------------------------------- */
section("Profile");
draw(
  "Computer Science and Data Science developer with a strong foundation in backend development, data processing pipelines and statistical modeling. Skilled in Python, FastAPI and R, building reliable data-driven applications: REST APIs, event-driven architectures, financial risk models and computer vision pipelines. Focused on clean code, algorithmic efficiency and turning complex data into actionable insight.",
  { size: 8.9, leading: 12.4 },
);

/* ---------------------------------------------------------------- */
/* Education                                                         */
/* ---------------------------------------------------------------- */
section("Education");
row(
  "B.Tech - Computer Science Engineering (Data Science)",
  "3rd year | CGPA 7.72",
);
draw("Gurunanak Institutions of Technical Campus", {
  font: italic,
  size: 8.4,
  color: muted,
  leading: 11.6,
});
space(2);
row("Intermediate", "Grade 7.78");
draw("Vagdevi Junior College", {
  font: italic,
  size: 8.4,
  color: muted,
  leading: 11.6,
});
space(2);
row("10th Standard", "Grade 9.2");
draw("Providence High School", {
  font: italic,
  size: 8.4,
  color: muted,
  leading: 11.6,
});

/* ---------------------------------------------------------------- */
/* Technical skills                                                  */
/* ---------------------------------------------------------------- */
section("Technical Skills");
draw("Languages: Python, C, JavaScript, R", { size: 8.9, leading: 12.6 });
draw("Web: HTML, CSS, React, Node.js", { size: 8.9, leading: 12.6 });
draw("Data Science: Data analysis, statistics, data visualization, machine learning fundamentals", {
  size: 8.9,
  leading: 12.6,
});
draw("Tools: Git, GitHub, VS Code, Kali Linux", { size: 8.9, leading: 12.6 });
draw("Also worked with: Java, FastAPI, MySQL, MongoDB, GitLab", {
  size: 8.9,
  leading: 12.6,
});

/* ---------------------------------------------------------------- */
/* Projects                                                          */
/* ---------------------------------------------------------------- */
section("Projects");

draw("DocuHealth AI - Clinical Report Analyzer & Patient Health Literacy Engine", {
  size: 9.6,
  font: bold,
});
draw("Python | FastAPI | OCR | Tesseract | REST API | HTML | CSS", {
  size: 8.2,
  font: italic,
  color: accent,
  leading: 12,
});
bullet(
  "Full-stack health-tech app that ingests clinical reports as PDFs, images or text and translates dense lab data into plain-language insights.",
);
bullet(
  "OCR extraction digitizes scans; regex-based biomarker parsing validates results against clinical reference ranges.",
);
bullet(
  "Generates tailored questions for consultations, improving patient comprehension of diagnostic results.",
);
space(4);

draw("File Sharing Web Application", { size: 9.6, font: bold });
draw("React | Node.js | JavaScript | Vercel Blob", {
  size: 8.2,
  font: italic,
  color: accent,
  leading: 12,
});
bullet(
  "Temporary file-sharing platform: drag-and-drop uploads generate a unique, shareable download link with no account required.",
);
bullet(
  "Automatic 24-hour expiry removes uploads, keeping storage lean and privacy intact.",
);
bullet(
  "Responsive interface with a file management dashboard for viewing and deleting uploads.",
);

/* ---------------------------------------------------------------- */
/* Certifications                                                    */
/* ---------------------------------------------------------------- */
section("Certifications");
draw("MongoDB - GeeksforGeeks (2026)   |   IBM Data Fundamentals (2026)", {
  size: 8.9,
  leading: 12.6,
});

/* Footer */
page.drawText("Available for software development and data roles.", {
  x: MARGIN,
  y: Math.max(y - 14, 28),
  size: 7.8,
  font: italic,
  color: faint,
});

if (y < 40) {
  console.warn(`Warning: resume content may be tight (y=${y.toFixed(1)}).`);
}

const bytes = await doc.save();
mkdirSync(dirname(output), { recursive: true });
writeFileSync(output, bytes);
console.log(`Resume written to ${output} (${(bytes.length / 1024).toFixed(1)} kB)`);
