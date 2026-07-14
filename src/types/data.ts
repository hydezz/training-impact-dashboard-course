/** Shape of one clean learner record used by the dashboard (src/data/training-impact-data.json). */
export interface LearnerRecord {
  learnerId: string;
  department: string;
  businessUnit: string;
  region: string;
  jobLevel: string;
  trainingProgram: string;
  facilitator: string;
  deliveryMethod: string;
  /** ISO date yyyy-mm-dd */
  trainingDate: string;
  /** Quarter label, e.g. "2025-Q3" */
  quarter: string;
  attended: boolean;
  completed: boolean;
  preTest: number | null;
  postTest: number | null;
  satisfaction: number | null;
  relevance: number | null;
  confidenceBefore: number | null;
  confidenceAfter: number | null;
  applied30: boolean | null;
  applied60: boolean | null;
  applied90: boolean | null;
  managerObservation: number | null;
  performanceBefore: number | null;
  performanceAfter: number | null;
  trainingCost: number;
  businessImpactValue: number | null;
  managerSupport: number | null;
}

export interface DashboardFilters {
  program: string;
  department: string;
  businessUnit: string;
  region: string;
  quarter: string;
  jobLevel: string;
  facilitator: string;
  deliveryMethod: string;
}

export const ALL = "All";

export const EMPTY_FILTERS: DashboardFilters = {
  program: ALL,
  department: ALL,
  businessUnit: ALL,
  region: ALL,
  quarter: ALL,
  jobLevel: ALL,
  facilitator: ALL,
  deliveryMethod: ALL,
};
