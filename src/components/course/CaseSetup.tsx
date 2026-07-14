"use client";

import { useProgress } from "@/hooks/useProgress";

export default function CaseSetup() {
  const { progress, update } = useProgress();
  const selected = progress.selectedCase;

  return (
    <div className="space-y-4">
      <label className="block">
        <span className="mb-1 block text-sm font-semibold text-slate-700">Tên của bạn (dùng cho chứng chỉ)</span>
        <input
          type="text"
          value={progress.learnerName}
          onChange={(e) => update({ learnerName: e.target.value })}
          placeholder="Ví dụ: Nguyen Van A"
          className="w-full max-w-md rounded-md border border-slate-300 px-3 py-2 text-sm"
        />
      </label>

      <fieldset>
        <legend className="mb-2 text-sm font-semibold text-slate-700">Chọn running case</legend>
        <div className="grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => update({ selectedCase: "sample" })}
            aria-pressed={selected === "sample"}
            className={`rounded-lg border-2 p-4 text-left ${
              selected === "sample" ? "border-accent-500 bg-accent-500/5" : "border-slate-300 bg-white hover:border-brand-600"
            }`}
          >
            <p className="font-semibold text-slate-800">📘 Sample case (khuyến nghị)</p>
            <p className="mt-1 text-sm text-slate-600">
              Coaching Skills cho 120 Frontline Managers — dùng dữ liệu thực hành có sẵn, mọi bước đều có gợi ý điền sẵn.
            </p>
          </button>
          <button
            type="button"
            onClick={() => update({ selectedCase: "own" })}
            aria-pressed={selected === "own"}
            className={`rounded-lg border-2 p-4 text-left ${
              selected === "own" ? "border-accent-500 bg-accent-500/5" : "border-slate-300 bg-white hover:border-brand-600"
            }`}
          >
            <p className="font-semibold text-slate-800">💼 Own training case</p>
            <p className="mt-1 text-sm text-slate-600">
              Áp dụng ngay vào một chương trình thật của tổ chức bạn — bạn tự điền các trường thay vì dùng gợi ý.
            </p>
          </button>
        </div>
      </fieldset>

      {selected && (
        <p className="rounded-md bg-brand-50 p-3 text-sm text-brand-800">
          {selected === "sample"
            ? "Bạn đang dùng sample case — các bước Portfolio sẽ có nút điền gợi ý sẵn."
            : "Bạn đang dùng case riêng — hãy điền thông tin chương trình của bạn ở các trường bên dưới."}
        </p>
      )}
    </div>
  );
}
