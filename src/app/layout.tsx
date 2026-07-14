import type { Metadata } from "next";
import "./globals.css";
import { ProgressProvider } from "@/hooks/useProgress";
import Header from "@/components/shared/Header";

export const metadata: Metadata = {
  title: "Measure Training Impact with Kirkpatrick, Excel and AI",
  description:
    "Khóa học 120 phút: xây Measurement Plan, tính KPI đào tạo, phân tích dữ liệu bằng Excel và AI, và hoàn thành Learning Impact Dashboard cho management.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body>
        <ProgressProvider>
          <Header />
          <main>{children}</main>
          <footer className="no-print mt-16 border-t border-slate-200 bg-white py-8">
            <div className="mx-auto max-w-7xl px-4 text-center text-sm text-slate-500">
              <p className="font-medium text-slate-700">Measure Training Impact with Kirkpatrick, Excel and AI</p>
              <p className="mt-1">
                Instructor: Nhan Ha (Tony), MBA, SHRM-CP · Learning &amp; Talent Development Leader
              </p>
              <p className="mt-1 text-xs">Dữ liệu thực hành là dữ liệu giả lập — không chứa thông tin cá nhân thật.</p>
            </div>
          </footer>
        </ProgressProvider>
      </body>
    </html>
  );
}
