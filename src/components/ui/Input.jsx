import { forwardRef, useId } from "react";

const Input = forwardRef(function Input({ label, error, className = "", id, ...props }, ref) {
  const autoId = useId();
  const inputId = id || autoId;
  const errorId = inputId + "-error";

  return (
    <div className={className}>
      {label && (
        <label htmlFor={inputId} className="mb-1 block text-sm font-medium text-harbor">
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={inputId}
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

export default Input;
