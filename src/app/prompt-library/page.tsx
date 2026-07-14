import { promptLibrary } from "@/data/prompts";
import PromptCard from "@/components/prompts/PromptCard";

export const metadata = { title: "Prompt Library · Training Impact Course" };

export default function PromptLibraryPage() {
  const categories = ["Define", "Measure", "Analyze", "Visualize", "Explain", "Recommend"] as const;

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-2xl font-bold text-slate-900">AI Prompt Library</h1>
      <p className="mt-2 text-slate-600">
        {promptLibrary.length} prompt templates dùng với Claude — xếp theo learner journey. Copy, thay các biến trong
        [ngoặc vuông], và dán vào Claude. Luôn ẩn danh dữ liệu trước khi chia sẻ với AI.
      </p>

      {categories.map((cat) => {
        const prompts = promptLibrary.filter((p) => p.category === cat);
        if (prompts.length === 0) return null;
        return (
          <section key={cat} className="mt-8">
            <h2 className="text-sm font-bold uppercase tracking-widest text-accent-600">
              {cat} · {prompts.length} prompts
            </h2>
            <div className="mt-3 space-y-4">
              {prompts.map((p) => (
                <PromptCard key={p.id} template={p} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
