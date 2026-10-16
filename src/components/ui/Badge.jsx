import { STATUS_STYLES } from "@/utils/constants";

export default function Badge({ status, children }) {
  return (
    <span className={"inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium " + (STATUS_STYLES[status] || "bg-slate-100 text-slate-700")}>
      {children || status}
    </span>
  );
}

