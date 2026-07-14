"use client";

import type { PortfolioField } from "@/types/course";
import { useProgress } from "@/hooks/useProgress";

export default function PortfolioFields({ fields }: { fields: PortfolioField[] }) {
  const { progress, setPortfolioField } = useProgress();
  const useSample = progress.selectedCase !== "own";

  const fillSample = () => {
    for (const f of fields) setPortfolioField(f.id, f.sampleValue);
  };

  return (
    <div className="space-y-4">
      {useSample && (
        <button
          type="button"
          onClick={fillSample}
          className="rounded-md border border-accent-500 bg-accent-500/10 px-3 py-2 text-sm font-medium text-accent-600 hover:bg-accent-500/20"
        >
          Điền gợi ý từ sample case (Coaching Skills)
        </button>
      )}
      {fields.map((f) => {
        const value = progress.portfolio[f.id] ?? "";
        return (
          <label key={f.id} className="block">
            <span className="mb-1 block text-sm font-semibold text-slate-700">{f.label}</span>
            {f.multiline ? (
              <textarea
                value={value}
                onChange={(e) => setPortfolioField(f.id, e.target.value)}
                placeholder={f.placeholder}
                rows={3}
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
              />
            ) : (
              <input
                type="text"
                value={value}
                onChange={(e) => setPortfolioField(f.id, e.target.value)}
                placeholder={f.placeholder}
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
              />
            )}
          </label>
        );
      })}
    </div>
  );
}
