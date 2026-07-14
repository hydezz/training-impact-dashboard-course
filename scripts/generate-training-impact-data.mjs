/**
 * Generates the practice workbook (public/downloads/training-impact-practice-data.xlsx)
 * and the clean dashboard dataset (src/data/training-impact-data.json) from ONE
 * seeded data source, so Excel and JSON stay consistent.
 *
 * The Excel "Learner Records" sheet intentionally contains a controlled set of
 * data-quality issues for practice. The JSON is the clean version.
 *
 * Run: npm run generate-training-data
 */
import ExcelJS from "exceljs";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

/* ---------------------------------------------------------------- seeded rng */
function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rand = mulberry32(20260714);
const pick = (arr) => arr[Math.floor(rand() * arr.length)];
const between = (min, max) => min + rand() * (max - min);
const intBetween = (min, max) => Math.round(between(min, max));
const chance = (p) => rand() < p;
const round1 = (n) => Math.round(n * 10) / 10;

/* ------------------------------------------------------------------- lookups */
const FIRST = ["An", "Binh", "Chi", "Dung", "Giang", "Hanh", "Hieu", "Huong", "Khanh", "Lan", "Linh", "Long", "Mai", "Minh", "Nam", "Ngoc", "Phong", "Phuong", "Quan", "Quynh", "Son", "Thao", "Thanh", "Trang", "Trung", "Tuan", "Van", "Vy", "Xuan", "Yen"];
const LAST = ["Nguyen", "Tran", "Le", "Pham", "Hoang", "Vu", "Vo", "Dang", "Bui", "Do", "Ho", "Ngo", "Duong", "Ly", "Phan"];

const DEPARTMENTS = ["Sales", "Operations", "Customer Service", "Production", "Supply Chain", "Human Resources"];
const BUSINESS_UNITS = ["Feed Division", "Farm Division", "Food Division", "Corporate Office"];
const REGIONS = ["North", "Central", "South"];
const JOB_LEVELS = ["Staff", "Supervisor", "Manager"];
const FACILITATORS = ["Tony Ha", "Mai Pham", "David Tran", "Linh Vo"];
const DELIVERY = ["Classroom", "Virtual", "Blended"];

const PROGRAMS = [
  {
    id: "PRG-001",
    name: "Coaching Skills for Frontline Managers",
    audience: "Frontline Managers",
    durationHours: 16,
    learners: 120,
    costPerLearner: [180, 260],
    objective: "Improve monthly coaching quality and frequency so that team performance and retention improve.",
    behavior: "Manager holds at least one structured coaching conversation per employee per month.",
    kpi: "Application Rate >= 70% at 90 days; Team performance +8%",
    jobLevels: ["Supervisor", "Manager"],
    preRange: [45, 70],
    gain: [15, 30],
    applyBase: 0.62,
    perfGain: [4, 12],
    impactPerLearner: [800, 2400],
  },
  {
    id: "PRG-002",
    name: "Data Literacy Fundamentals",
    audience: "Staff and Supervisors in all functions",
    durationHours: 12,
    learners: 100,
    costPerLearner: [120, 200],
    objective: "Reduce reporting errors and manual rework by improving basic data skills.",
    behavior: "Employee validates data sources and applies standard checks before submitting reports.",
    kpi: "Error reduction 15%; Application Rate >= 65% at 90 days",
    jobLevels: ["Staff", "Supervisor"],
    preRange: [40, 65],
    gain: [18, 35],
    applyBase: 0.58,
    perfGain: [3, 10],
    impactPerLearner: [500, 1800],
  },
  {
    id: "PRG-003",
    name: "Customer Service Excellence",
    audience: "Customer-facing staff",
    durationHours: 8,
    learners: 110,
    costPerLearner: [90, 160],
    objective: "Improve customer satisfaction and first-contact resolution.",
    behavior: "Staff applies the service recovery framework in every complaint interaction.",
    kpi: "CSAT +0.4 points; First-contact resolution +10%",
    jobLevels: ["Staff", "Supervisor"],
    preRange: [50, 72],
    gain: [12, 26],
    applyBase: 0.66,
    perfGain: [4, 11],
    impactPerLearner: [400, 1500],
  },
  {
    id: "PRG-004",
    name: "Safety Leadership in Operations",
    audience: "Production and operations supervisors",
    durationHours: 16,
    learners: 90,
    costPerLearner: [200, 300],
    objective: "Reduce recordable safety incidents through proactive safety conversations.",
    behavior: "Supervisor completes weekly safety walk and logs at least two safety conversations.",
    kpi: "Safety incidents -20%; Application Rate >= 75% at 90 days",
    jobLevels: ["Supervisor", "Manager"],
    preRange: [48, 68],
    gain: [16, 30],
    applyBase: 0.7,
    perfGain: [5, 13],
    impactPerLearner: [900, 2600],
  },
];

/* ------------------------------------------------------------ record builder */
function isoDate(d) {
  return d.toISOString().slice(0, 10);
}
function quarterOf(d) {
  return `${d.getUTCFullYear()}-Q${Math.floor(d.getUTCMonth() / 3) + 1}`;
}

const records = [];
let seq = 0;

for (const prog of PROGRAMS) {
  for (let i = 0; i < prog.learners; i++) {
    seq += 1;
    const learnerId = `L-${String(seq).padStart(4, "0")}`;
    const name = `${pick(FIRST)} ${pick(FIRST)} ${pick(LAST)}`.split(" ").reverse().join(" ");
    const department =
      prog.id === "PRG-003"
        ? pick(["Customer Service", "Sales", "Operations"])
        : prog.id === "PRG-004"
          ? pick(["Production", "Operations", "Supply Chain"])
          : pick(DEPARTMENTS);
    const businessUnit = pick(BUSINESS_UNITS);
    const region = pick(REGIONS);
    const jobLevel = pick(prog.jobLevels);
    const facilitator = pick(FACILITATORS);
    const delivery = pick(DELIVERY);

    // training dates spread across Jul 2025 – Mar 2026
    const start = Date.UTC(2025, 6, 7);
    const end = Date.UTC(2026, 2, 27);
    const trainingDate = new Date(start + rand() * (end - start));
    trainingDate.setUTCHours(0, 0, 0, 0);
    const enrollmentDate = new Date(trainingDate.getTime() - intBetween(10, 30) * 86400000);

    const attended = chance(0.92);
    const completed = attended && chance(0.94);

    const preTest = attended ? intBetween(prog.preRange[0], prog.preRange[1]) : null;
    const gain = intBetween(prog.gain[0], prog.gain[1]);
    const postTest = completed ? Math.min(100, preTest + gain) : null;

    const satisfaction = completed ? round1(between(3.4, 5)) : null;
    const relevance = completed ? round1(between(3.2, 5)) : null;
    const confidenceBefore = attended ? round1(between(2.2, 3.6)) : null;
    const confidenceAfter = completed ? round1(Math.min(5, confidenceBefore + between(0.6, 1.6))) : null;

    const managerSupport = completed ? round1(between(2.5, 5)) : null;
    // application probability rises with manager support and decays slightly over time windows
    const supportBoost = managerSupport ? (managerSupport - 3.5) * 0.08 : 0;
    const p30 = prog.applyBase + supportBoost;
    const applied30 = completed ? chance(p30) : null;
    const applied60 = completed ? (applied30 ? chance(0.9) : chance(0.35)) : null;
    const applied90 = completed ? (applied60 ? chance(0.92) : chance(0.3)) : null;

    const managerObservation = completed && chance(0.85) ? round1(between(2.5, 5)) : null;

    const performanceBefore = attended ? round1(between(58, 82)) : null;
    const applyLift = applied90 ? 1.0 : applied60 ? 0.7 : 0.4;
    const performanceAfter = completed
      ? round1(Math.min(100, performanceBefore + between(prog.perfGain[0], prog.perfGain[1]) * applyLift))
      : null;

    const trainingCost = Math.round(between(prog.costPerLearner[0], prog.costPerLearner[1]));
    const businessImpactValue = completed
      ? Math.round(between(prog.impactPerLearner[0], prog.impactPerLearner[1]) * applyLift)
      : null;

    records.push({
      learnerId,
      learnerName: name,
      department,
      businessUnit,
      region,
      jobLevel,
      trainingProgram: prog.name,
      facilitator,
      deliveryMethod: delivery,
      enrollmentDate: isoDate(enrollmentDate),
      trainingDate: isoDate(trainingDate),
      quarter: quarterOf(trainingDate),
      attended,
      completed,
      preTest,
      postTest,
      satisfaction,
      relevance,
      confidenceBefore,
      confidenceAfter,
      applied30,
      applied60,
      applied90,
      managerObservation,
      performanceBefore,
      performanceAfter,
      trainingCost,
      businessImpactValue,
      managerSupport,
    });
  }
}

/* --------------------------------------------------- clean JSON for dashboard */
const cleanJson = records.map((r) => ({
  learnerId: r.learnerId,
  department: r.department,
  businessUnit: r.businessUnit,
  region: r.region,
  jobLevel: r.jobLevel,
  trainingProgram: r.trainingProgram,
  facilitator: r.facilitator,
  deliveryMethod: r.deliveryMethod,
  trainingDate: r.trainingDate,
  quarter: r.quarter,
  attended: r.attended,
  completed: r.completed,
  preTest: r.preTest,
  postTest: r.postTest,
  satisfaction: r.satisfaction,
  relevance: r.relevance,
  confidenceBefore: r.confidenceBefore,
  confidenceAfter: r.confidenceAfter,
  applied30: r.applied30,
  applied60: r.applied60,
  applied90: r.applied90,
  managerObservation: r.managerObservation,
  performanceBefore: r.performanceBefore,
  performanceAfter: r.performanceAfter,
  trainingCost: r.trainingCost,
  businessImpactValue: r.businessImpactValue,
  managerSupport: r.managerSupport,
}));

const jsonDir = path.join(root, "src", "data");
fs.mkdirSync(jsonDir, { recursive: true });
fs.writeFileSync(
  path.join(jsonDir, "training-impact-data.json"),
  JSON.stringify(cleanJson, null, 1),
  "utf8"
);

/* --------------------------------------- dirty copy for the practice workbook */
// Clone and inject a CONTROLLED set of data-quality issues (documented in the
// Data Dictionary sheet) so learners can practice cleaning without breaking
// the dataset.
const dirty = records.map((r) => ({ ...r }));
const usedIdx = new Set();
function freshIdx(n) {
  const out = [];
  while (out.length < n) {
    const i = Math.floor(rand() * dirty.length);
    if (!usedIdx.has(i)) {
      usedIdx.add(i);
      out.push(i);
    }
  }
  return out;
}

// 1. duplicate Learner_IDs (5 rows share another row's id)
for (const i of freshIdx(5)) dirty[i].learnerId = dirty[(i + 17) % dirty.length].learnerId;
// 2. inconsistent department spelling
for (const i of freshIdx(6)) {
  const map = {
    Sales: "sales ",
    Operations: "OPERATIONS",
    "Customer Service": "Customer service",
    Production: "Production ",
    "Supply Chain": "supply chain",
    "Human Resources": "HR",
  };
  dirty[i].department = map[dirty[i].department] ?? dirty[i].department;
}
// 3. missing post-test on completed rows
for (const i of freshIdx(7)) if (dirty[i].completed) dirty[i].postTest = null;
// 4. out-of-range scores
for (const i of freshIdx(3)) if (dirty[i].postTest !== null) dirty[i].postTest = 112;
for (const i of freshIdx(2)) if (dirty[i].satisfaction !== null) dirty[i].satisfaction = 6.5;
// 5. inconsistent date formats
for (const i of freshIdx(6)) {
  const [y, m, d] = dirty[i].trainingDate.split("-");
  dirty[i].trainingDate = `${d}/${m}/${y}`;
}
// 6. missing application data
for (const i of freshIdx(8)) {
  dirty[i].applied30 = null;
  dirty[i].applied60 = null;
}
// 7. near-duplicate program names
for (const i of freshIdx(5)) {
  if (dirty[i].trainingProgram === "Coaching Skills for Frontline Managers")
    dirty[i].trainingProgram = "Coaching Skills for Front-line Managers";
  else if (dirty[i].trainingProgram === "Data Literacy Fundamentals")
    dirty[i].trainingProgram = "Data Literacy Fundamental";
}
// 8. abnormal training costs
for (const i of freshIdx(3)) dirty[i].trainingCost = dirty[i].trainingCost * 10;
// 9. extra missing manager observation
for (const i of freshIdx(6)) dirty[i].managerObservation = null;

/* -------------------------------------------------------------- workbook build */
const wb = new ExcelJS.Workbook();
wb.creator = "Training Impact Dashboard Course";
wb.created = new Date("2026-07-14T00:00:00Z");

const HEADER_FILL = { type: "pattern", pattern: "solid", fgColor: { argb: "FF1E3A5F" } };
const HEADER_FONT = { bold: true, color: { argb: "FFFFFFFF" } };

function styleHeader(ws) {
  const row = ws.getRow(1);
  row.eachCell((cell) => {
    cell.fill = HEADER_FILL;
    cell.font = HEADER_FONT;
    cell.alignment = { vertical: "middle", wrapText: true };
  });
  row.height = 28;
  ws.views = [{ state: "frozen", ySplit: 1 }];
}

const yn = (b) => (b === null ? "" : b ? "Yes" : "No");

/* Sheet 1: Learner Records (dirty practice data) */
{
  const ws = wb.addWorksheet("Learner Records");
  ws.columns = [
    { header: "Learner_ID", key: "learnerId", width: 10 },
    { header: "Learner_Name", key: "learnerName", width: 22 },
    { header: "Department", key: "department", width: 16 },
    { header: "Business_Unit", key: "businessUnit", width: 16 },
    { header: "Region", key: "region", width: 9 },
    { header: "Job_Level", key: "jobLevel", width: 11 },
    { header: "Training_Program", key: "trainingProgram", width: 34 },
    { header: "Facilitator", key: "facilitator", width: 12 },
    { header: "Delivery_Method", key: "deliveryMethod", width: 13 },
    { header: "Enrollment_Date", key: "enrollmentDate", width: 13 },
    { header: "Training_Date", key: "trainingDate", width: 13 },
    { header: "Attendance_Status", key: "attendance", width: 14 },
    { header: "Completion_Status", key: "completion", width: 14 },
    { header: "Pre_Test_Score", key: "preTest", width: 11 },
    { header: "Post_Test_Score", key: "postTest", width: 11 },
    { header: "Satisfaction_Score", key: "satisfaction", width: 12 },
    { header: "Relevance_Score", key: "relevance", width: 12 },
    { header: "Confidence_Before", key: "confidenceBefore", width: 12 },
    { header: "Confidence_After", key: "confidenceAfter", width: 12 },
    { header: "Application_30_Days", key: "applied30", width: 13 },
    { header: "Application_60_Days", key: "applied60", width: 13 },
    { header: "Application_90_Days", key: "applied90", width: 13 },
    { header: "Manager_Observation_Score", key: "managerObservation", width: 15 },
    { header: "Performance_Before", key: "performanceBefore", width: 13 },
    { header: "Performance_After", key: "performanceAfter", width: 13 },
    { header: "Training_Cost", key: "trainingCost", width: 11 },
    { header: "Business_Impact_Value", key: "businessImpactValue", width: 14 },
    { header: "Manager_Support_Score", key: "managerSupport", width: 14 },
  ];
  for (const r of dirty) {
    ws.addRow({
      ...r,
      attendance: r.attended ? "Attended" : "No-show",
      completion: r.completed ? "Completed" : r.attended ? "Incomplete" : "Not started",
      applied30: yn(r.applied30),
      applied60: yn(r.applied60),
      applied90: yn(r.applied90),
      preTest: r.preTest ?? "",
      postTest: r.postTest ?? "",
      satisfaction: r.satisfaction ?? "",
      relevance: r.relevance ?? "",
      confidenceBefore: r.confidenceBefore ?? "",
      confidenceAfter: r.confidenceAfter ?? "",
      managerObservation: r.managerObservation ?? "",
      performanceBefore: r.performanceBefore ?? "",
      performanceAfter: r.performanceAfter ?? "",
      businessImpactValue: r.businessImpactValue ?? "",
      managerSupport: r.managerSupport ?? "",
    });
  }
  styleHeader(ws);
  ws.autoFilter = { from: "A1", to: "AB1" };
}

/* Sheet 2: Program Summary */
{
  const ws = wb.addWorksheet("Program Summary");
  ws.columns = [
    { header: "Program_ID", key: "id", width: 10 },
    { header: "Program_Name", key: "name", width: 36 },
    { header: "Target_Audience", key: "audience", width: 32 },
    { header: "Duration_Hours", key: "duration", width: 12 },
    { header: "Delivery_Method", key: "delivery", width: 22 },
    { header: "Number_of_Learners", key: "learners", width: 14 },
    { header: "Program_Cost_USD", key: "cost", width: 14 },
    { header: "Business_Objective", key: "objective", width: 60 },
    { header: "Target_Behavior", key: "behavior", width: 60 },
    { header: "Target_KPI", key: "kpi", width: 45 },
  ];
  for (const p of PROGRAMS) {
    const progRecords = records.filter((r) => r.trainingProgram === p.name);
    const totalCost = progRecords.reduce((s, r) => s + r.trainingCost, 0);
    ws.addRow({
      id: p.id,
      name: p.name,
      audience: p.audience,
      duration: p.durationHours,
      delivery: "Classroom / Virtual / Blended",
      learners: p.learners,
      cost: totalCost,
      objective: p.objective,
      behavior: p.behavior,
      kpi: p.kpi,
    });
  }
  styleHeader(ws);
}

/* Sheet 3: KPI Dictionary */
{
  const ws = wb.addWorksheet("KPI Dictionary");
  ws.columns = [
    { header: "KPI_Name", key: "name", width: 26 },
    { header: "Definition", key: "def", width: 50 },
    { header: "Formula", key: "formula", width: 55 },
    { header: "Kirkpatrick_Level", key: "level", width: 14 },
    { header: "Data_Source", key: "source", width: 32 },
    { header: "Reporting_Frequency", key: "freq", width: 16 },
    { header: "Target", key: "target", width: 16 },
    { header: "Interpretation", key: "interp", width: 55 },
    { header: "Limitation", key: "limit", width: 55 },
  ];
  const kpis = [
    ["Participation Rate", "Share of enrolled learners who attended the training.", "Attendees / Enrolled x 100", "Level 1", "LMS enrollment and attendance log", "Per cohort", ">= 90%", "Low participation signals scheduling, communication or priority issues before learning even starts.", "Says nothing about learning or behavior; it is an activity metric."],
    ["Completion Rate", "Share of enrolled learners who completed all required components.", "Completed / Enrolled x 100", "Level 1", "LMS completion records", "Per cohort", ">= 85%", "Gaps between attendance and completion often point to workload or content-length problems.", "Completion is not competence; treat as a hygiene metric."],
    ["Satisfaction Score", "Average learner rating of the overall experience (1-5).", "AVERAGE(Satisfaction_Score)", "Level 1", "Post-course survey", "Per cohort", ">= 4.0", "Very low scores predict poor word-of-mouth and drop-off in future cohorts.", "High satisfaction does not predict application; do not over-weight it."],
    ["Content Relevance Score", "Average rating of how relevant the content is to the learner's job (1-5).", "AVERAGE(Relevance_Score)", "Level 1", "Post-course survey", "Per cohort", ">= 4.0", "Relevance is a stronger transfer predictor than satisfaction.", "Self-reported; learners may not yet know what is relevant."],
    ["Knowledge Improvement %", "Relative gain from pre-test to post-test.", "(AVG(Post) - AVG(Pre)) / AVG(Pre) x 100", "Level 2", "Pre/post assessments", "Per cohort", ">= 25%", "Shows the program taught something new; compare across cohorts and facilitators.", "Test-retest effects and easy tests inflate the gain; scores are not on-the-job skill."],
    ["Pass Rate", "Share of assessed learners meeting the passing threshold.", "Passed / Assessed x 100", "Level 2", "Assessment platform", "Per cohort", ">= 80%", "Low pass rate with high satisfaction suggests an engaging but ineffective course.", "Depends entirely on threshold quality and assessment validity."],
    ["Application Rate", "Share of completers demonstrating the target behavior at a checkpoint (30/60/90 days).", "Demonstrating behavior / Assessed x 100", "Level 3", "Follow-up survey + manager confirmation", "30/60/90 days", ">= 70% at 90d", "The single most decision-relevant learning metric: did behavior actually change?", "Self-report bias; needs manager corroboration and a clear behavior definition."],
    ["Manager Observation Score", "Average manager rating of observed behavior quality (1-5).", "AVERAGE(Manager_Observation_Score)", "Level 3", "Manager observation checklist", "60-90 days", ">= 3.8", "Corroborates self-reported application with third-party evidence.", "Manager rating standards vary; calibrate with a rubric."],
    ["Manager Support Score", "Learner-rated support received from their manager to apply the skills (1-5).", "AVERAGE(Manager_Support_Score)", "Level 3 enabler", "Follow-up survey", "30-90 days", ">= 3.5", "Low support is the most common barrier to transfer; flags where to intervene.", "An enabler metric, not an outcome; interpret with application rate."],
    ["Performance Improvement %", "Relative change in the job performance indicator after training.", "(AVG(After) - AVG(Before)) / AVG(Before) x 100", "Level 4", "Performance management system", "Quarterly", ">= 8%", "Connects training to the performance outcome leadership cares about.", "Many non-training factors move performance; report as contribution, not attribution."],
    ["Training Cost per Learner", "Total direct training cost divided by participants.", "Total cost / Participants", "Efficiency", "Finance / L&D budget", "Per cohort", "Within budget", "Enables cost-effectiveness comparison across programs and delivery methods.", "Excludes indirect costs (time off the job); not a value metric on its own."],
    ["Business Impact Value", "Estimated operational value linked to applied behavior (e.g. error-cost avoided, productivity value).", "SUM(Business_Impact_Value) per learner estimates", "Level 4", "Operations / finance estimates", "Quarterly", "Positive trend", "Gives leadership an order-of-magnitude view of value created.", "An ESTIMATE built on assumptions; always show the assumptions and limitations."],
  ];
  for (const k of kpis) ws.addRow({ name: k[0], def: k[1], formula: k[2], level: k[3], source: k[4], freq: k[5], target: k[6], interp: k[7], limit: k[8] });
  styleHeader(ws);
}

/* Sheet 4: Data Dictionary */
{
  const ws = wb.addWorksheet("Data Dictionary");
  ws.columns = [
    { header: "Column_Name", key: "col", width: 26 },
    { header: "Meaning", key: "meaning", width: 55 },
    { header: "Data_Type", key: "type", width: 12 },
    { header: "Example", key: "example", width: 24 },
    { header: "Allowed_Values", key: "allowed", width: 40 },
    { header: "Data_Quality_Notes", key: "notes", width: 60 },
  ];
  const rows = [
    ["Learner_ID", "Unique learner identifier", "Text", "L-0042", "L-0001 ... L-0420", "PRACTICE ISSUE: a few IDs are duplicated - deduplicate before counting learners."],
    ["Learner_Name", "Fictional learner name (synthetic data, no real persons)", "Text", "Nguyen Minh An", "Any", "Synthetic; do not treat as PII, but practice masking it before sharing with AI."],
    ["Department", "Learner's department", "Text", "Sales", "Sales, Operations, Customer Service, Production, Supply Chain, Human Resources", "PRACTICE ISSUE: inconsistent spelling/case ('sales ', 'HR') - standardize first."],
    ["Business_Unit", "Learner's business unit", "Text", "Feed Division", "Feed Division, Farm Division, Food Division, Corporate Office", "Clean."],
    ["Region", "Work region", "Text", "South", "North, Central, South", "Clean."],
    ["Job_Level", "Job level", "Text", "Supervisor", "Staff, Supervisor, Manager", "Clean."],
    ["Training_Program", "Program name", "Text", "Coaching Skills for Frontline Managers", "4 programs (see Program Summary)", "PRACTICE ISSUE: a few near-duplicate names ('Front-line', 'Fundamental') - map to canonical names."],
    ["Facilitator", "Lead facilitator", "Text", "Tony Ha", "Tony Ha, Mai Pham, David Tran, Linh Vo", "Clean."],
    ["Delivery_Method", "How the program was delivered", "Text", "Virtual", "Classroom, Virtual, Blended", "Clean."],
    ["Enrollment_Date", "Date the learner enrolled", "Date", "2025-08-04", "2025-06 to 2026-03", "ISO format yyyy-mm-dd."],
    ["Training_Date", "Date the learner attended", "Date", "2025-08-18", "2025-07 to 2026-03", "PRACTICE ISSUE: some rows use dd/mm/yyyy - normalize to one format."],
    ["Attendance_Status", "Whether the learner attended", "Text", "Attended", "Attended, No-show", "Clean."],
    ["Completion_Status", "Whether the learner completed", "Text", "Completed", "Completed, Incomplete, Not started", "Clean."],
    ["Pre_Test_Score", "Knowledge test before training (0-100)", "Number", "58", "0-100; blank if no-show", "Blank means not assessed, not zero."],
    ["Post_Test_Score", "Knowledge test after training (0-100)", "Number", "81", "0-100; blank if not completed", "PRACTICE ISSUES: some completed rows missing; a few values > 100 are entry errors."],
    ["Satisfaction_Score", "Overall satisfaction (1-5)", "Number", "4.3", "1.0-5.0", "PRACTICE ISSUE: a few values > 5 are entry errors."],
    ["Relevance_Score", "Job relevance rating (1-5)", "Number", "4.1", "1.0-5.0", "Clean."],
    ["Confidence_Before", "Confidence to apply before training (1-5)", "Number", "2.8", "1.0-5.0", "Clean."],
    ["Confidence_After", "Confidence to apply after training (1-5)", "Number", "4.0", "1.0-5.0", "Clean."],
    ["Application_30_Days", "Demonstrated target behavior at 30 days", "Yes/No", "Yes", "Yes, No, blank", "PRACTICE ISSUE: some rows blank - decide how to treat missing follow-up."],
    ["Application_60_Days", "Demonstrated target behavior at 60 days", "Yes/No", "Yes", "Yes, No, blank", "Blank = not measured. Exclude from denominator."],
    ["Application_90_Days", "Demonstrated target behavior at 90 days", "Yes/No", "No", "Yes, No, blank", "Blank = not measured. Exclude from denominator."],
    ["Manager_Observation_Score", "Manager-observed behavior quality (1-5)", "Number", "3.9", "1.0-5.0; blank if not observed", "PRACTICE ISSUE: missing for a share of learners - report coverage alongside the average."],
    ["Performance_Before", "Job performance index before training (0-100)", "Number", "68.5", "0-100", "Composite performance index from the performance system."],
    ["Performance_After", "Job performance index ~90 days after training (0-100)", "Number", "75.2", "0-100; blank if not completed", "Affected by non-training factors - interpret as contribution."],
    ["Training_Cost", "Direct cost for this learner (USD)", "Number", "220", "~90-300 typical", "PRACTICE ISSUE: a few extreme values (10x) look like data-entry errors - investigate before averaging."],
    ["Business_Impact_Value", "Estimated operational value linked to applied behavior (USD)", "Number", "1450", ">= 0; blank if not completed", "An estimate built on operational assumptions; document them."],
    ["Manager_Support_Score", "Support from manager to apply skills (1-5)", "Number", "3.6", "1.0-5.0", "Key transfer enabler; analyze against application rate."],
  ];
  for (const r of rows) ws.addRow({ col: r[0], meaning: r[1], type: r[2], example: r[3], allowed: r[4], notes: r[5] });
  styleHeader(ws);
}

/* Sheet 5: Measurement Plan template */
{
  const ws = wb.addWorksheet("Measurement Plan");
  ws.columns = [
    { header: "Kirkpatrick_Level", key: "level", width: 16 },
    { header: "What_We_Measure", key: "what", width: 40 },
    { header: "KPI", key: "kpi", width: 28 },
    { header: "Baseline", key: "baseline", width: 14 },
    { header: "Target", key: "target", width: 14 },
    { header: "Data_Source", key: "source", width: 32 },
    { header: "Collection_Timing", key: "timing", width: 24 },
    { header: "Owner", key: "owner", width: 20 },
    { header: "Limitation", key: "limitation", width: 50 },
  ];
  ws.insertRow(1, []);
  ws.insertRow(1, []);
  ws.getCell("A1").value = "TRAINING MEASUREMENT PLAN - TEMPLATE";
  ws.getCell("A1").font = { bold: true, size: 14 };
  ws.getCell("A2").value = "Business question: [Write the measurement question here]   |   Stakeholder: [Who needs this answer]";
  const header = ws.getRow(3);
  ["Kirkpatrick_Level", "What_We_Measure", "KPI", "Baseline", "Target", "Data_Source", "Collection_Timing", "Owner", "Limitation"].forEach((h, i) => {
    const cell = header.getCell(i + 1);
    cell.value = h;
    cell.fill = HEADER_FILL;
    cell.font = HEADER_FONT;
  });
  const tmpl = [
    ["Level 1", "[Reaction: relevance, confidence, intention to apply]", "[e.g. Relevance Score]", "[n/a]", "[e.g. >= 4.0]", "[Post-course survey]", "[End of course]", "[L&D]", "[Self-report]"],
    ["Level 2", "[Learning: knowledge / skill gain]", "[e.g. Knowledge Improvement %]", "[Pre-test avg]", "[e.g. >= 25%]", "[Pre/post test]", "[Before and end of course]", "[L&D]", "[Test <> job skill]"],
    ["Level 3", "[Behavior: target behavior on the job]", "[e.g. Application Rate]", "[Current %]", "[e.g. >= 70%]", "[Follow-up survey + manager check]", "[30 / 60 / 90 days]", "[L&D + line managers]", "[Self-report bias]"],
    ["Level 4", "[Results: business metric]", "[e.g. Error rate]", "[Current value]", "[e.g. -15%]", "[Operations report]", "[Quarterly]", "[Business owner]", "[Attribution limits]"],
  ];
  for (const t of tmpl) ws.addRow({ level: t[0], what: t[1], kpi: t[2], baseline: t[3], target: t[4], source: t[5], timing: t[6], owner: t[7], limitation: t[8] });
}

/* Sheet 6: Executive Report Template */
{
  const ws = wb.addWorksheet("Executive Report Template");
  ws.getColumn(1).width = 30;
  ws.getColumn(2).width = 100;
  const rows = [
    ["EXECUTIVE TRAINING IMPACT REPORT", ""],
    ["", ""],
    ["Section", "What to write (keep the whole report to one page)"],
    ["1. Program overview", "Program name, audience, size, timing, business objective. 2-3 sentences."],
    ["2. KPI summary", "The 5-7 KPIs leadership agreed to: result vs target, one line each."],
    ["3. Key insights", "Top 3 insights. Each: what the data shows + what it means. Lead with the most decision-relevant one."],
    ["4. Business interpretation", "What happened to behavior and results? Use 'associated with' / 'contributed to', not 'caused', unless you have a control group."],
    ["5. Limitations", "Data coverage, self-report bias, external factors, sample size. 2-4 honest bullets - this builds credibility."],
    ["6. Recommendations", "2-3 specific actions with owners (e.g. manager enablement for low-support teams)."],
    ["7. Next steps", "The next measurement checkpoint and what decision it will inform."],
  ];
  rows.forEach((r, i) => {
    const row = ws.addRow(r);
    if (i === 0) row.font = { bold: true, size: 14 };
    if (i === 2) {
      row.font = HEADER_FONT;
      row.eachCell((c) => (c.fill = HEADER_FILL));
    }
    row.alignment = { vertical: "top", wrapText: true };
  });
}

/* Sheet 7: Sample Completed Case */
{
  const ws = wb.addWorksheet("Sample Completed Case");
  ws.getColumn(1).width = 30;
  ws.getColumn(2).width = 110;
  const rows = [
    ["SAMPLE CASE: Coaching Skills for Frontline Managers", ""],
    ["", ""],
    ["Business question", "After the Coaching Skills program, did the share of managers holding monthly coaching conversations increase, and is that change associated with improvement in team performance?"],
    ["Stakeholder", "COO (sponsor), HR Director, Regional Operations Managers"],
    ["", ""],
    ["LEVEL 1 - REACTION", ""],
    ["Result", "Satisfaction 4.2/5; Relevance 4.1/5; Confidence to apply rose from 2.9 to 3.9 (survey at end of course)."],
    ["Reading", "The program felt relevant and useful. Reaction is necessary but not sufficient - it says nothing yet about behavior."],
    ["", ""],
    ["LEVEL 2 - LEARNING", ""],
    ["Result", "Pre-test avg 57 -> Post-test avg 79 = +22 points (Knowledge Improvement approx +39%). Pass rate 88%."],
    ["Reading", "Managers learned the coaching framework. Watch-out: quiz scores do not guarantee real conversations happen."],
    ["", ""],
    ["LEVEL 3 - BEHAVIOR", ""],
    ["Result", "Application Rate: 66% (30d) -> 71% (60d) -> 74% (90d). Manager Observation avg 3.9/5. Application is 18 points higher where Manager Support Score >= 4."],
    ["Reading", "Most managers are coaching monthly. The strongest lever is the manager's own boss: support drives transfer."],
    ["", ""],
    ["LEVEL 4 - RESULTS", ""],
    ["Result", "Team performance index +8.4% vs baseline in teams of applying managers, vs +2.1% in non-applying teams. Estimated operational value approx $180K (assumption-based)."],
    ["Reading", "Performance improved more where coaching happened. This is an ASSOCIATION - a sales-season effect and a new bonus scheme also ran in Q4, so we report contribution, not causation."],
    ["", ""],
    ["Limitations", "Self-reported application (corroborated for 85% by manager observation); no control group; 2 external initiatives overlapped; impact value is an estimate with documented assumptions."],
    ["Recommendations", "1) Run manager-enablement briefings in low-support regions. 2) Add coaching frequency to operations reviews. 3) Re-measure at 6 months before scaling to 300 managers."],
    ["Next step", "6-month follow-up focusing on behavior consistency and team retention; decision: scale or adjust."],
  ];
  rows.forEach((r, i) => {
    const row = ws.addRow(r);
    if (i === 0) row.font = { bold: true, size: 14 };
    if (["LEVEL 1 - REACTION", "LEVEL 2 - LEARNING", "LEVEL 3 - BEHAVIOR", "LEVEL 4 - RESULTS"].includes(r[0])) row.font = { bold: true };
    row.alignment = { vertical: "top", wrapText: true };
  });
}

/* Sheet 8: Prompt Library */
{
  const ws = wb.addWorksheet("Prompt Library");
  ws.columns = [
    { header: "Prompt_Name", key: "name", width: 34 },
    { header: "Use_When", key: "when", width: 45 },
    { header: "Prompt", key: "prompt", width: 120 },
  ];
  const prompts = [
    ["Data Quality Audit", "Before any analysis of the Learner Records sheet", "You are a data quality analyst. Here is a sample of my training dataset with column descriptions: [PASTE COLUMNS + 20 SAMPLE ROWS]. Check for: duplicate IDs, inconsistent category names, missing values, out-of-range scores, mixed date formats, outliers in cost. For each issue: show affected examples, explain the risk if uncleaned, and recommend a fix. End with a cleaning checklist ordered by priority."],
    ["Excel Formula Recommendation", "When you know the KPI but not the Excel formula", "I have an Excel sheet named 'Learner Records' with columns: [PASTE COLUMN NAMES]. Write Excel formulas (AVERAGEIF/COUNTIFS style, no VBA) to calculate: [KPI LIST, e.g. Participation Rate by program, Knowledge Improvement % by department]. For each: give the formula, explain each part in plain language, and note how blanks should be handled so they don't distort the result."],
    ["Training Data Analysis", "After cleaning, to find patterns", "You are a learning analytics consultant. Analyze this cleaned training data summary: [PASTE PIVOT SUMMARY]. The business question is: [QUESTION]. Identify: 1) the 3 most decision-relevant patterns, 2) any segment differences (department, region, delivery method), 3) relationships between manager support and application rate, 4) what the data can NOT tell us. Use cautious language: association, not causation."],
    ["Insight Writing", "Turning numbers into insight sentences", "Rewrite these findings as executive insights: [PASTE FINDINGS]. Rules: one sentence of WHAT the data shows + one sentence of SO WHAT for the business. No jargon. Quantify. Never claim causation without a control group - use 'associated with' or 'contributed to'. Give me the top 3 in priority order for a COO."],
    ["Executive Report", "Drafting the one-page report", "Draft a one-page executive training impact report. Context: [PROGRAM, AUDIENCE, OBJECTIVE]. Results: [KPI RESULTS]. Limitations: [LIMITATIONS]. Structure: What happened / Why it matters / What we should do next. Tone: confident but honest about limitations. Max 350 words. End with 3 recommendations, each with an owner."],
    ["Full Master Prompt", "Continue the whole analysis in Claude", "You are my learning analytics partner. Program: [NAME] for [AUDIENCE]. Business question: [QUESTION]. Measurement plan: [L1-L4 KPIs, baselines, targets]. Data highlights: [KEY NUMBERS]. Known limitations: [LIMITATIONS]. Help me: 1) pressure-test my interpretation, 2) find alternative explanations, 3) sharpen my top-3 insights, 4) draft recommendations with owners, 5) design the next measurement cycle. Challenge weak causal claims."],
  ];
  for (const p of prompts) ws.addRow({ name: p[0], when: p[1], prompt: p[2] });
  styleHeader(ws);
  ws.eachRow((row, n) => {
    if (n > 1) row.alignment = { vertical: "top", wrapText: true };
  });
  ws.getCell("A9").value = "Full library (18 prompts) available on the course website: /prompt-library";
  ws.getCell("A9").font = { italic: true };
}

/* ----------------------------------------------------------------- write file */
const outDir = path.join(root, "public", "downloads");
fs.mkdirSync(outDir, { recursive: true });
const outPath = path.join(outDir, "training-impact-practice-data.xlsx");
await wb.xlsx.writeFile(outPath);

console.log(`Learner records generated: ${records.length}`);
console.log(`Workbook: ${path.relative(root, outPath)}`);
console.log(`Clean JSON: src/data/training-impact-data.json (${cleanJson.length} rows)`);
