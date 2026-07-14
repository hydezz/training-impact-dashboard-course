"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import {
  EMPTY_PROGRESS,
  PROGRESS_STORAGE_KEY,
  type CourseProgress,
  type ExecutiveReport,
  type QuizScore,
} from "@/types/progress";
import { allSteps, courseModules, scoredSteps, totalCourseMinutes, PASSING_SCORE } from "@/data/course";

interface ProgressApi {
  progress: CourseProgress;
  loaded: boolean;
  update: (patch: Partial<CourseProgress>) => void;
  completeStep: (stepId: string) => void;
  recordQuiz: (stepId: string, score: QuizScore) => void;
  setPortfolioField: (fieldId: string, value: string) => void;
  setReport: (report: ExecutiveReport) => void;
  resetProgress: () => void;
  /** derived */
  completedMinutes: number;
  remainingMinutes: number;
  coursePct: number;
  modulePct: (moduleId: string) => number;
  isModuleComplete: (moduleId: string) => boolean;
  totalScore: { correct: number; total: number; pct: number };
  certificateEligible: boolean;
  certificateBlockers: string[];
}

const ProgressContext = createContext<ProgressApi | null>(null);

function load(): CourseProgress {
  if (typeof window === "undefined") return EMPTY_PROGRESS;
  try {
    const raw = window.localStorage.getItem(PROGRESS_STORAGE_KEY);
    if (!raw) return EMPTY_PROGRESS;
    const parsed = JSON.parse(raw) as Partial<CourseProgress>;
    return { ...EMPTY_PROGRESS, ...parsed, finalReport: { ...EMPTY_PROGRESS.finalReport, ...parsed.finalReport } };
  } catch {
    return EMPTY_PROGRESS;
  }
}

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<CourseProgress>(EMPTY_PROGRESS);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setProgress(load());
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      window.localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // storage full or unavailable — progress simply won't persist
    }
  }, [progress, loaded]);

  const update = useCallback((patch: Partial<CourseProgress>) => {
    setProgress((p) => ({ ...p, ...patch }));
  }, []);

  const completeStep = useCallback((stepId: string) => {
    setProgress((p) =>
      p.completedSteps.includes(stepId) ? p : { ...p, completedSteps: [...p.completedSteps, stepId] }
    );
  }, []);

  const recordQuiz = useCallback((stepId: string, score: QuizScore) => {
    setProgress((p) => {
      const prev = p.quizScores[stepId];
      // keep the best score so retries never punish the learner
      if (prev && prev.correct >= score.correct) return p;
      return { ...p, quizScores: { ...p.quizScores, [stepId]: score } };
    });
  }, []);

  const setPortfolioField = useCallback((fieldId: string, value: string) => {
    setProgress((p) => ({ ...p, portfolio: { ...p.portfolio, [fieldId]: value } }));
  }, []);

  const setReport = useCallback((finalReport: ExecutiveReport) => {
    setProgress((p) => ({ ...p, finalReport }));
  }, []);

  const resetProgress = useCallback(() => {
    setProgress(EMPTY_PROGRESS);
    try {
      window.localStorage.removeItem(PROGRESS_STORAGE_KEY);
    } catch {
      // ignore
    }
  }, []);

  const api = useMemo<ProgressApi>(() => {
    const completedSet = new Set(progress.completedSteps);
    const completedMinutes = allSteps
      .filter((s) => completedSet.has(s.id))
      .reduce((sum, s) => sum + s.minutes, 0);

    const modulePct = (moduleId: string) => {
      const m = courseModules.find((mod) => mod.id === moduleId);
      if (!m || m.steps.length === 0) return 0;
      const done = m.steps.filter((s) => completedSet.has(s.id)).length;
      return Math.round((done / m.steps.length) * 100);
    };

    const isModuleComplete = (moduleId: string) => modulePct(moduleId) === 100;

    let correct = 0;
    let total = 0;
    for (const s of scoredSteps) {
      const sc = progress.quizScores[s.id];
      const activity = s.activity;
      const max =
        activity?.type === "true-false"
          ? activity.statements.length
          : 1;
      total += max;
      correct += Math.min(sc?.correct ?? 0, max);
    }
    const scorePct = total > 0 ? Math.round((correct / total) * 100) : 0;

    const allStepsDone = allSteps.every((s) => completedSet.has(s.id));
    const allChecksDone = scoredSteps.every((s) => progress.quizScores[s.id] !== undefined);
    const reportDone =
      progress.finalReport.programName.trim() !== "" &&
      progress.finalReport.keyResults.trim() !== "" &&
      progress.finalReport.recommendations.trim() !== "";

    const blockers: string[] = [];
    if (!allStepsDone)
      blockers.push(`Hoàn thành tất cả learning steps (còn ${allSteps.length - completedSet.size} step).`);
    if (!allChecksDone) blockers.push("Hoàn thành tất cả knowledge checks.");
    if (scorePct < PASSING_SCORE) blockers.push(`Đạt tối thiểu ${PASSING_SCORE}% tổng điểm (hiện tại: ${scorePct}%).`);
    if (!reportDone) blockers.push("Hoàn thành Executive Report trong Final Challenge.");

    return {
      progress,
      loaded,
      update,
      completeStep,
      recordQuiz,
      setPortfolioField,
      setReport,
      resetProgress,
      completedMinutes,
      remainingMinutes: Math.max(0, totalCourseMinutes - completedMinutes),
      coursePct: Math.round((completedSet.size / allSteps.length) * 100),
      modulePct,
      isModuleComplete,
      totalScore: { correct, total, pct: scorePct },
      certificateEligible: blockers.length === 0,
      certificateBlockers: blockers,
    };
  }, [progress, loaded, update, completeStep, recordQuiz, setPortfolioField, setReport, resetProgress]);

  return <ProgressContext.Provider value={api}>{children}</ProgressContext.Provider>;
}

export function useProgress(): ProgressApi {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress must be used within ProgressProvider");
  return ctx;
}
