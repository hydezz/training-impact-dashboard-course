"use client";

import { useState } from "react";
import type { PromptTemplate } from "@/data/prompts";

export default function PromptCard({ template }: { template: PromptTemplate }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(template.prompt);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Copy thủ công đoạn prompt sau:", template.prompt);
    }
  };

  return (
    <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <span className="rounded-full bg-brand-100 px-2.5 py-0.5 text-xs font-semibold text-brand-800">
            {template.category}
          </span>
          <h2 className="mt-2 font-bold text-slate-900">{template.name}</h2>
          <p className="mt-1 text-sm text-slate-600">{template.purpose}</p>
          <p className="mt-1 text-xs text-slate-500">
            <strong>Khi nào dùng:</strong> {template.useWhen}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={copy}
            className="rounded-md bg-brand-700 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-800"
          >
            {copied ? "✓ Đã copy" : "📋 Copy"}
          </button>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:border-brand-600"
          >
            {open ? "Thu gọn" : "Xem chi tiết"}
          </button>
        </div>
      </div>

      {open && (
        <div className="mt-4 space-y-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Prompt hoàn chỉnh</p>
            <pre className="mt-1 overflow-x-auto whitespace-pre-wrap rounded-lg bg-slate-900 p-4 text-xs leading-relaxed text-slate-100">
              {template.prompt}
            </pre>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Biến cần thay thế</p>
            <div className="mt-1 flex flex-wrap gap-1.5">
              {template.variables.map((v) => (
                <code key={v} className="rounded bg-amber-soft px-2 py-0.5 text-xs text-amber-900">
                  [{v}]
                </code>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Ví dụ đầu ra</p>
            <p className="mt-1 text-sm text-slate-600">{template.exampleOutput}</p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Quality checklist</p>
            <ul className="mt-1 space-y-1">
              {template.checklist.map((c) => (
                <li key={c} className="flex gap-2 text-sm text-slate-700">
                  <span aria-hidden className="text-accent-600">☑</span> {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </article>
  );
}
