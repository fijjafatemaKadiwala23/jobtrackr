export default function EmptyState({ title, description, action }) {
  return (
    <div className="rounded-lg border border-dashed border-slate-300 bg-white px-6 py-10 text-center">
      <h3 className="font-display text-lg font-semibold text-harbor">{title}</h3>
      {description && <p className="mx-auto mt-1 max-w-sm text-sm text-slate-600">{description}</p>}
      {action && <div className="mt-4 flex justify-center">{action}</div>}
    </div>
  );
}
