import { forwardRef, useId } from "react";

// Options ko children me do:  <Select label="Type"><option>..</option></Select>
const Select = forwardRef(function Select({ label, error, className = "", id, children, ...props }, ref) {
  const autoId = useId();
  const selectId = id || autoId;
  const errorId = selectId + "-error";

  return (
    <div className={className}>
      {label && (
        <label htmlFor={selectId} className="mb-1 block text-sm font-medium text-harbor">
          {label}
        </label>
      )}
      <select
        ref={ref}
        id={selectId}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        className={
          "w-full rounded-md border bg-white px-3 py-2 text-sm text-harbor focus:outline-none focus:ring-2 focus:ring-lagoon " +
          (error ? "border-red-500" : "border-slate-300")
        }
        {...props}
      >
        {children}
      </select>
      {error && (
        <p id={errorId} className="mt-1 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
});

export default Select;
