import { notFound } from "next/navigation";
import ModulePlayer from "@/components/course/ModulePlayer";
import { courseModules, getModule } from "@/data/course";

export function generateStaticParams() {
  return courseModules.filter((m) => m.id !== "orientation").map((m) => ({ moduleId: m.id }));
}

export const dynamicParams = false;

export default async function ModulePage({ params }: { params: Promise<{ moduleId: string }> }) {
  const { moduleId } = await params;
  const mod = getModule(moduleId);
  if (!mod || mod.id === "orientation") notFound();
  return <ModulePlayer module={mod} />;
}
