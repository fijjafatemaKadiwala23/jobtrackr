export default function Card({
  as: Tag = "div",
  className = "",
  children,
  ...props
}) {
  return (
    <Tag
      className={`
        rounded-lg border border-slate-200 bg-white
        p-4 sm:p-6
        transition-all duration-300 ease-out
        hover:-translate-y-1
        hover:border-lagoon/30
        hover:shadow-lg hover:shadow-slate-200/50
        ${Tag === "button" ? "active:scale-[0.98]" : ""}
        ${className}
      `}
      {...props}
    >
      {children}
    </Tag>
  );
}
