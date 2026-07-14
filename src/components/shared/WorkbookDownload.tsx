export default function WorkbookDownload() {
  return (
    <div className="rounded-lg border border-brand-200 bg-white p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="font-semibold text-slate-800">📊 training-impact-practice-data.xlsx</p>
          <p className="text-sm text-slate-500">
            420 learner records · 8 sheets · kèm Data Dictionary và lỗi dữ liệu thực hành có chủ đích
          </p>
        </div>
        <a
          href="/downloads/training-impact-practice-data.xlsx"
          download
          className="rounded-md bg-brand-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-800"
        >
          ⬇ Download workbook
        </a>
      </div>
    </div>
  );
}
