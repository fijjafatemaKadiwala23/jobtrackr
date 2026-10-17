const VARIANTS = {
  primary:
    "bg-lagoon text-white hover:bg-lagoon/90 hover:shadow-lg hover:shadow-lagoon/20",
  secondary:
    "bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400 hover:shadow-md",
  danger:
    "bg-red-600 text-white hover:bg-red-700 hover:shadow-lg hover:shadow-red-600/20",
  ghost: "text-lagoon hover:bg-lagoon/10",
};

const SIZES = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2",
  lg: "px-6 py-3",
};

export default function Button({
  variant = "primary",
  size = "md",
  loading = false,
  className = "",
  children,
  ...props
}) {
  return (
    <button
      disabled={loading || props.disabled}
      className={`
        inline-flex items-center justify-center gap-2
        rounded-lg font-medium
        transition-all duration-200 ease-out
        hover:-translate-y-0.5
        active:translate-y-0 active:scale-[0.97]
        focus-visible:outline-none
        focus-visible:ring-2 focus-visible:ring-lagoon
        focus-visible:ring-offset-2
        disabled:cursor-not-allowed
        disabled:opacity-50
        disabled:hover:translate-y-0
        disabled:hover:shadow-none
        disabled:active:scale-100
        ${VARIANTS[variant]}
        ${SIZES[size]}
        ${className}
      `}
      {...props}
    >
      {loading ? (
        <>
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent" />
          Loading...
        </>
      ) : (
        children
      )}
    </button>
  );
}
