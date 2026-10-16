import { forwardRef, useId } from "react";

const Textarea = forwardRef(function Textarea({ label, error, className = "", id, rows = 4, ...props }, ref) {
  const autoId = useId();
  const textId = id || autoId;
  const errorId = textId + "-error";

  return (
    <div className={className}>
      {label && (
        <label htmlFor={textId} className="mb-1 block text-sm font-medium text-harbor">
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        id={textId}
        rows={rows}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        className={
          "w-full rounded-md border px-3 py-2 text-sm text-harbor placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-lagoon " +
          (error ? "border-red-500" : "border-slate-300")
        }
        {...props}
      />
      {error && (
        <p id={errorId} className="mt-1 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
});

export default Textarea;
