/** Course content model — everything the module player renders is data-driven. */

export type StepKind = "learn" | "example" | "activity" | "check" | "portfolio";

export interface ChoiceOption {
  text: string;
  correct: boolean;
  explanation: string;
}

export interface SingleChoiceActivity {
  type: "single-choice";
  question: string;
  options: ChoiceOption[];
}

export interface TrueFalseStatement {
  text: string;
  answer: boolean;
  explanation: string;
}

export interface TrueFalseActivity {
  type: "true-false";
  intro?: string;
  statements: TrueFalseStatement[];
}

export interface ClassificationItem {
  text: string;
  category: string;
  explanation: string;
}

export interface ClassificationActivity {
  type: "classification";
  intro?: string;
  categories: string[];
  items: ClassificationItem[];
}

export interface MatchingPair {
  left: string;
  right: string;
}

export interface MatchingActivity {
  type: "matching";
  intro?: string;
  pairs: MatchingPair[];
}

export interface FormulaActivity {
  type: "formula";
  prompt: string;
  formulaHint: string;
  inputLabel: string;
  answer: number;
  tolerance: number;
  unit: string;
  explanation: string;
}

export interface ChecklistActivity {
  type: "checklist";
  intro?: string;
  items: string[];
  minChecked: number;
  completionNote: string;
}

export type Activity =
  | SingleChoiceActivity
  | TrueFalseActivity
  | ClassificationActivity
  | MatchingActivity
  | FormulaActivity
  | ChecklistActivity;

export interface PortfolioField {
  id: string;
  label: string;
  placeholder: string;
  /** Pre-filled value when the learner chose the sample Coaching Skills case. */
  sampleValue: string;
  multiline?: boolean;
}

export type VisualKey =
  | "kirkpatrick-pyramid"
  | "journey-map"
  | "activity-vs-impact"
  | "level1-dimensions"
  | "pre-post-flow"
  | "transfer-timeline"
  | "leading-lagging"
  | "kpi-families"
  | "data-quality-flow"
  | "dashboard-anatomy"
  | "report-structure";

export interface Step {
  id: string;
  title: string;
  kind: StepKind;
  minutes: number;
  objective: string;
  /** 80–180 words of core content, as short paragraphs. */
  content: string[];
  bullets?: string[];
  example?: { title: string; body: string[] };
  tip?: string;
  warning?: string;
  visual?: VisualKey;
  activity?: Activity;
  /** Whether this step's activity counts toward the knowledge-check score. */
  scored?: boolean;
  portfolioFields?: PortfolioField[];
  /** Special interactive step rendered by a dedicated component. */
  special?: "case-setup" | "workbook-download" | "report-builder";
  takeaway: string;
}

export interface CourseModule {
  id: string;
  order: number;
  title: string;
  titleVi: string;
  phase: "Define" | "Measure" | "Analyze" | "Visualize" | "Explain" | "Recommend";
  minutes: number;
  description: string;
  portfolioOutput: string;
  steps: Step[];
}
