import type { CourseModule, Step } from "@/types/course";
import { orientation } from "./orientation";
import { module1 } from "./module1";
import { module2 } from "./module2";
import { module3 } from "./module3";
import { module4 } from "./module4";
import { module5 } from "./module5";
import { module6 } from "./module6";
import { module7 } from "./module7";
import { module8 } from "./module8";
import { module9 } from "./module9";

export const COURSE_TITLE = "Measure Training Impact with Kirkpatrick, Excel and AI";
export const COURSE_TITLE_VI = "Đo lường hiệu quả đào tạo bằng Kirkpatrick, Excel và AI";
export const CERTIFICATE_TITLE = "Certificate in Training Measurement and Learning Analytics";
export const CERTIFICATE_TITLE_VI = "Chứng nhận Đo lường Đào tạo và Phân tích Học tập";
export const INSTRUCTOR_NAME = "Nhan Ha (Tony), MBA, SHRM-CP";
export const INSTRUCTOR_ROLE = "Learning & Talent Development Leader";
export const PASSING_SCORE = 70;

export const courseModules: CourseModule[] = [
  orientation,
  module1,
  module2,
  module3,
  module4,
  module5,
  module6,
  module7,
  module8,
  module9,
];

export const totalCourseMinutes = courseModules.reduce((sum, m) => sum + m.minutes, 0);

export const allSteps: Step[] = courseModules.flatMap((m) => m.steps);

export function getModule(id: string): CourseModule | undefined {
  return courseModules.find((m) => m.id === id);
}

export function getModuleForStep(stepId: string): CourseModule | undefined {
  return courseModules.find((m) => m.steps.some((s) => s.id === stepId));
}

/** Steps whose activity contributes to the certificate score. */
export const scoredSteps: Step[] = allSteps.filter((s) => s.scored);

export function moduleMinutesDone(m: CourseModule, completedSteps: string[]): number {
  return m.steps.filter((s) => completedSteps.includes(s.id)).reduce((sum, s) => sum + s.minutes, 0);
}
