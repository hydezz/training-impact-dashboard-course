"use client";

import { useMemo, useState } from "react";
import type {
  Activity,
  ChecklistActivity,
  ClassificationActivity,
  FormulaActivity,
  MatchingActivity,
  SingleChoiceActivity,
  TrueFalseActivity,
} from "@/types/course";

interface RunnerProps {
  activity: Activity;
  /** Called once when the learner has finished the activity. score = số câu đúng ở lần trả lời ĐẦU TIÊN. */
  onComplete: (score: { correct: number; total: number }) => void;
}

function Feedback({ ok, children }: { ok: boolean; children: React.ReactNode }) {
  return (
    <div
      role="status"
      className={`mt-2 rounded-md border p-3 text-sm ${
        ok ? "border-green-300 bg-green-50 text-green-900" : "border-red-300 bg-red-50 text-red-900"
      }`}
    >
      <span className="font-semibold">{ok ? "✓ Chính xác. " : "✗ Chưa đúng. "}</span>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------- single choice */
function SingleChoice({ activity, onComplete }: { activity: SingleChoiceActivity; onComplete: RunnerProps["onComplete"] }) {
  const [selected, setSelected] = useState<number | null>(null);
  const [firstTryCorrect, setFirstTryCorrect] = useState<boolean | null>(null);
  const [done, setDone] = useState(false);

  const choose = (i: number) => {
    if (done) return;
    setSelected(i);
    const correct = activity.options[i].correct;
    if (firstTryCorrect === null) setFirstTryCorrect(correct);
    if (correct) {
      setDone(true);
      onComplete({ correct: firstTryCorrect === null ? (correct ? 1 : 0) : firstTryCorrect ? 1 : 0, total: 1 });
    }
  };

  return (
    <fieldset>
      <legend className="mb-3 font-medium text-slate-800">{activity.question}</legend>
      <div className="space-y-2">
        {activity.options.map((opt, i) => {
          const isSel = selected === i;
          return (
            <div key={i}>
              <button
                type="button"
                onClick={() => choose(i)}
                disabled={done && !isSel}
                aria-pressed={isSel}
                className={`w-full rounded-lg border p-3 text-left text-sm transition-colors ${
                  isSel
                    ? opt.correct
                      ? "border-green-500 bg-green-50"
                      : "border-red-400 bg-red-50"
                    : "border-slate-300 bg-white hover:border-brand-600 hover:bg-brand-50"
                } ${done && !isSel ? "opacity-60" : ""}`}
              >
                {opt.text}
              </button>
              {isSel && <Feedback ok={opt.correct}>{opt.explanation}</Feedback>}
            </div>
          );
        })}
      </div>
      {selected !== null && !activity.options[selected].correct && !done && (
        <p className="mt-2 text-sm text-slate-500">Hãy thử lại — chọn một đáp án khác.</p>
      )}
    </fieldset>
  );
}

/* ---------------------------------------------------------------- true/false */
function TrueFalse({ activity, onComplete }: { activity: TrueFalseActivity; onComplete: RunnerProps["onComplete"] }) {
  const [answers, setAnswers] = useState<Record<number, boolean>>({});
  const [reported, setReported] = useState(false);

  const answer = (i: number, val: boolean) => {
    if (answers[i] !== undefined) return;
    const next = { ...answers, [i]: val };
    setAnswers(next);
    if (Object.keys(next).length === activity.statements.length && !reported) {
      setReported(true);
      const correct = activity.statements.filter((s, j) => next[j] === s.answer).length;
      onComplete({ correct, total: activity.statements.length });
    }
  };

  return (
    <div>
      {activity.intro && <p className="mb-3 font-medium text-slate-800">{activity.intro}</p>}
      <div className="space-y-4">
        {activity.statements.map((s, i) => {
          const given = answers[i];
          const answered = given !== undefined;
          return (
            <div key={i} className="rounded-lg border border-slate-200 bg-white p-3">
              <p className="text-sm text-slate-800">{s.text}</p>
              <div className="mt-2 flex gap-2">
                {([true, false] as const).map((val) => (
                  <button
                    key={String(val)}
                    type="button"
                    onClick={() => answer(i, val)}
                    disabled={answered}
                    className={`rounded-md border px-4 py-2 text-sm font-medium ${
                      answered && given === val
                        ? val === s.answer
                          ? "border-green-500 bg-green-50 text-green-800"
                          : "border-red-400 bg-red-50 text-red-800"
                        : "border-slate-300 bg-white text-slate-700 hover:border-brand-600 disabled:opacity-50"
                    }`}
                  >
                    {val ? "Đúng" : "Sai"}
                  </button>
                ))}
              </div>
              {answered && <Feedback ok={given === s.answer}>{s.explanation}</Feedback>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------ classification */
function Classification({ activity, onComplete }: { activity: ClassificationActivity; onComplete: RunnerProps["onComplete"] }) {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [reported, setReported] = useState(false);

  const answer = (i: number, cat: string) => {
    if (answers[i] !== undefined) return;
    const next = { ...answers, [i]: cat };
    setAnswers(next);
    if (Object.keys(next).length === activity.items.length && !reported) {
      setReported(true);
      const correct = activity.items.filter((it, j) => next[j] === it.category).length;
      onComplete({ correct, total: activity.items.length });
    }
  };

  return (
    <div>
      {activity.intro && <p className="mb-3 font-medium text-slate-800">{activity.intro}</p>}
      <div className="space-y-4">
        {activity.items.map((item, i) => {
          const given = answers[i];
          const answered = given !== undefined;
          return (
            <div key={i} className="rounded-lg border border-slate-200 bg-white p-3">
              <p className="text-sm text-slate-800">{item.text}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {activity.categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => answer(i, cat)}
                    disabled={answered}
                    className={`rounded-md border px-3 py-2 text-sm font-medium ${
                      answered && given === cat
                        ? cat === item.category
                          ? "border-green-500 bg-green-50 text-green-800"
                          : "border-red-400 bg-red-50 text-red-800"
                        : "border-slate-300 bg-white text-slate-700 hover:border-brand-600 disabled:opacity-50"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              {answered && (
                <Feedback ok={given === item.category}>
                  {given !== item.category && (
                    <span className="font-medium">Đáp án đúng: {item.category}. </span>
                  )}
                  {item.explanation}
                </Feedback>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ matching */
function Matching({ activity, onComplete }: { activity: MatchingActivity; onComplete: RunnerProps["onComplete"] }) {
  // stable shuffle of the right side so pairs are not aligned
  const rights = useMemo(() => {
    const arr = activity.pairs.map((p, i) => ({ text: p.right, idx: i }));
    // deterministic rotation avoids hydration issues vs random shuffle
    const rot = Math.max(1, Math.floor(arr.length / 2));
    return [...arr.slice(rot), ...arr.slice(0, rot)];
  }, [activity.pairs]);

  const [selectedLeft, setSelectedLeft] = useState<number | null>(null);
  const [matches, setMatches] = useState<Record<number, number>>({}); // leftIdx -> rightIdx
  const [wrongFlash, setWrongFlash] = useState<number | null>(null);
  const [mistakes, setMistakes] = useState(0);
  const [reported, setReported] = useState(false);

  const pickRight = (rightIdx: number) => {
    if (selectedLeft === null) return;
    if (rightIdx === selectedLeft) {
      const next = { ...matches, [selectedLeft]: rightIdx };
      setMatches(next);
      setSelectedLeft(null);
      if (Object.keys(next).length === activity.pairs.length && !reported) {
        setReported(true);
        const correct = Math.max(0, activity.pairs.length - mistakes);
        onComplete({ correct, total: activity.pairs.length });
      }
    } else {
      setMistakes((m) => m + 1);
      setWrongFlash(rightIdx);
      window.setTimeout(() => setWrongFlash(null), 700);
    }
  };

  const allDone = Object.keys(matches).length === activity.pairs.length;

  return (
    <div>
      {activity.intro && <p className="mb-3 font-medium text-slate-800">{activity.intro}</p>}
      <p className="mb-3 text-xs text-slate-500">Chọn một mục bên trái, sau đó chọn mục tương ứng bên phải.</p>
      <div className="grid gap-3 md:grid-cols-2">
        <div className="space-y-2">
          {activity.pairs.map((p, i) => {
            const matched = matches[i] !== undefined;
            return (
              <button
                key={i}
                type="button"
                onClick={() => !matched && setSelectedLeft(i)}
                disabled={matched}
                aria-pressed={selectedLeft === i}
                className={`w-full rounded-lg border p-3 text-left text-sm ${
                  matched
                    ? "border-green-400 bg-green-50 text-green-900"
                    : selectedLeft === i
                      ? "border-brand-600 bg-brand-50 ring-2 ring-brand-600"
                      : "border-slate-300 bg-white hover:border-brand-600"
                }`}
              >
                {matched && <span aria-hidden>✓ </span>}
                {p.left}
              </button>
            );
          })}
        </div>
        <div className="space-y-2">
          {rights.map((r) => {
            const matched = matches[r.idx] !== undefined;
            return (
              <button
                key={r.idx}
                type="button"
                onClick={() => !matched && pickRight(r.idx)}
                disabled={matched || selectedLeft === null}
                className={`w-full rounded-lg border p-3 text-left text-sm ${
                  matched
                    ? "border-green-400 bg-green-50 text-green-900"
                    : wrongFlash === r.idx
                      ? "border-red-400 bg-red-50"
                      : "border-slate-300 bg-white enabled:hover:border-brand-600 disabled:opacity-70"
                }`}
              >
                {matched && <span aria-hidden>✓ </span>}
                {r.text}
              </button>
            );
          })}
        </div>
      </div>
      {allDone && (
        <div role="status" className="mt-3 rounded-md border border-green-300 bg-green-50 p-3 text-sm text-green-900">
          ✓ Hoàn thành! Bạn đã ghép đúng cả {activity.pairs.length} cặp
          {mistakes > 0 ? ` (sau ${mistakes} lần thử sai)` : " ngay lần đầu"}.
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------- formula */
function Formula({ activity, onComplete }: { activity: FormulaActivity; onComplete: RunnerProps["onComplete"] }) {
  const [value, setValue] = useState("");
  const [attempted, setAttempted] = useState(false);
  const [firstTryCorrect, setFirstTryCorrect] = useState<boolean | null>(null);
  const [solved, setSolved] = useState(false);

  const check = () => {
    const num = Number(value.replace(",", "."));
    if (Number.isNaN(num)) return;
    const ok = Math.abs(num - activity.answer) <= activity.tolerance;
    setAttempted(true);
    if (firstTryCorrect === null) setFirstTryCorrect(ok);
    if (ok && !solved) {
      setSolved(true);
      onComplete({ correct: (firstTryCorrect ?? ok) ? 1 : 0, total: 1 });
    }
  };

  return (
    <div>
      <p className="font-medium text-slate-800">{activity.prompt}</p>
      <p className="mt-1 text-sm text-slate-500">
        Gợi ý công thức: <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs">{activity.formulaHint}</code>
      </p>
      <div className="mt-3 flex flex-wrap items-end gap-2">
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">{activity.inputLabel}</span>
          <div className="flex items-center gap-1">
            <input
              type="number"
              inputMode="decimal"
              step="any"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && check()}
              disabled={solved}
              className="w-36 rounded-md border border-slate-300 px-3 py-2 text-sm"
            />
            <span className="text-sm text-slate-500">{activity.unit}</span>
          </div>
        </label>
        <button
          type="button"
          onClick={check}
          disabled={solved || value.trim() === ""}
          className="rounded-md bg-brand-700 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-800 disabled:opacity-50"
        >
          Kiểm tra
        </button>
      </div>
      {attempted && (
        <Feedback ok={solved}>
          {solved ? activity.explanation : "Chưa đúng — kiểm tra lại tử số và mẫu số trong công thức rồi thử lại."}
        </Feedback>
      )}
    </div>
  );
}

/* ----------------------------------------------------------------- checklist */
function Checklist({ activity, onComplete }: { activity: ChecklistActivity; onComplete: RunnerProps["onComplete"] }) {
  const [checked, setChecked] = useState<boolean[]>(() => activity.items.map(() => false));
  const [reported, setReported] = useState(false);

  const toggle = (i: number) => {
    const next = checked.map((c, j) => (j === i ? !c : c));
    setChecked(next);
    const count = next.filter(Boolean).length;
    if (count >= activity.minChecked && !reported) {
      setReported(true);
      onComplete({ correct: 1, total: 1 });
    }
  };

  const count = checked.filter(Boolean).length;

  return (
    <div>
      {activity.intro && <p className="mb-3 font-medium text-slate-800">{activity.intro}</p>}
      <ul className="space-y-2">
        {activity.items.map((item, i) => (
          <li key={i}>
            <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-slate-200 bg-white p-3 text-sm hover:border-brand-600">
              <input
                type="checkbox"
                checked={checked[i]}
                onChange={() => toggle(i)}
                className="mt-0.5 h-4 w-4 accent-brand-700"
              />
              <span className={checked[i] ? "text-slate-500 line-through" : "text-slate-800"}>{item}</span>
            </label>
          </li>
        ))}
      </ul>
      <p className="mt-2 text-sm text-slate-500">
        {count}/{activity.items.length} hoàn thành (cần tối thiểu {activity.minChecked}).
      </p>
      {count >= activity.minChecked && (
        <div role="status" className="mt-2 rounded-md border border-green-300 bg-green-50 p-3 text-sm text-green-900">
          ✓ {activity.completionNote}
        </div>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------- runner */
export default function ActivityRunner({ activity, onComplete }: RunnerProps) {
  switch (activity.type) {
    case "single-choice":
      return <SingleChoice activity={activity} onComplete={onComplete} />;
    case "true-false":
      return <TrueFalse activity={activity} onComplete={onComplete} />;
    case "classification":
      return <Classification activity={activity} onComplete={onComplete} />;
    case "matching":
      return <Matching activity={activity} onComplete={onComplete} />;
    case "formula":
      return <Formula activity={activity} onComplete={onComplete} />;
    case "checklist":
      return <Checklist activity={activity} onComplete={onComplete} />;
  }
}
