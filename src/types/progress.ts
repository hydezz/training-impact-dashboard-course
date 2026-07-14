/** Learner progress persisted in localStorage under a course-specific namespace. */

export interface CaseInfo {
  programName: string;
  businessContext: string;
  targetLearners: string;
  trainingObjective: string;
  businessQuestion: string;
}

export interface QuizScore {
  correct: number;
  total: number;
}

export interface ExecutiveReport {
  programName: string;
  businessObjective: string;
  learnerPopulation: string;
  measurementPeriod: string;
  keyResults: string;
  level1Insight: string;
  level2Insight: string;
  level3Insight: string;
  level4Insight: string;
  dataLimitations: string;
  businessInterpretation: string;
  recommendations: string;
  nextSteps: string;
}

export interface CertificateData {
  id: string;
  learnerName: string;
  issuedDate: string;
}

export interface CourseProgress {
  learnerName: string;
  selectedCase: "sample" | "own" | null;
  caseInfo: CaseInfo;
  /** step ids the learner has completed (viewed + finished any activity). */
  completedSteps: string[];
  /** stepId -> score for scored knowledge-check steps. */
  quizScores: Record<string, QuizScore>;
  /** portfolio field id -> learner's value. */
  portfolio: Record<string, string>;
  finalReport: ExecutiveReport;
  certificate: CertificateData | null;
}

export const PROGRESS_STORAGE_KEY = "training-impact-dashboard-course-progress-v1";

export const EMPTY_REPORT: ExecutiveReport = {
  programName: "",
  businessObjective: "",
  learnerPopulation: "",
  measurementPeriod: "",
  keyResults: "",
  level1Insight: "",
  level2Insight: "",
  level3Insight: "",
  level4Insight: "",
  dataLimitations: "",
  businessInterpretation: "",
  recommendations: "",
  nextSteps: "",
};

export const EMPTY_PROGRESS: CourseProgress = {
  learnerName: "",
  selectedCase: null,
  caseInfo: {
    programName: "",
    businessContext: "",
    targetLearners: "",
    trainingObjective: "",
    businessQuestion: "",
  },
  completedSteps: [],
  quizScores: {},
  portfolio: {},
  finalReport: EMPTY_REPORT,
  certificate: null,
};
