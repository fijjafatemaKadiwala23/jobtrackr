import { useEffect } from "react";
import { X } from "lucide-react";

// Right side se khulne wala panel (candidate / application details ke liye)
export default function Drawer({ open, onClose, title, children }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40" onMouseDown={onClose}>
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="flex h-full w-full max-w-md flex-col bg-white shadow-xl"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <header className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <h2 className="font-display text-lg font-semibold text-harbor">{title}</h2>
          <button type="button" onClick={onClose} aria-label="Close" className="rounded-md p-1 text-slate-500 hover:bg-slate-100">
            <X size={20} />
          </button>
        </header>
        <div className="flex-1 overflow-y-auto px-5 py-4">{children}</div>
      </aside>
    </div>
  );
}
