export function Field({
  label,
  required,
  children,
  hint,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <div>
      <label className="block font-label text-xs font-semibold text-on-surface-variant dark:text-gray-400 uppercase tracking-wide mb-1.5">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
      {hint && (
        <p className="mt-1 text-xs text-on-surface-variant dark:text-gray-500">
          {hint}
        </p>
      )}
    </div>
  );
}
