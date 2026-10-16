const VARIANTS = {
  primary: "bg-lagoon text-white hover:bg-lagoon/90",
  secondary: "bg-white border border-slate-300 text-slate-700 hover:bg-slate-50",
  danger: "bg-red-600 text-white hover:bg-red-700",
  ghost: "text-lagoon hover:bg-lagoon/10",
};
const SIZES = { sm: "px-3 py-1.5 text-sm", md: "px-4 py-2", lg: "px-6 py-3" };

export default function Button({ variant = "primary", size = "md", loading = false, className = "", children, ...props }) {
  return (
    <button
      disabled={loading || props.disabled}
      className={"rounded-lg font-medium transition disabled:cursor-not-allowed disabled:opacity-50 " + VARIANTS[variant] + " " + SIZES[size] + " " + className}
      {...props}
    >
      {loading ? "Loading..." : children}
    </button>
  );
}

