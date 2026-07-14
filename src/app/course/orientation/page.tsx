import ModulePlayer from "@/components/course/ModulePlayer";
import { orientation } from "@/data/course/orientation";

export const metadata = { title: "Orientation · Training Impact Course" };

export default function OrientationPage() {
  return <ModulePlayer module={orientation} />;
}
