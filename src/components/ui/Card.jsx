export default function Card({ as: Tag = "div", className = "", children, ...props }) {
  return (
    <Tag className={"rounded-lg border border-slate-200 bg-white p-4 sm:p-6 " + className} {...props}>
      {children}
    </Tag>
  );
}
