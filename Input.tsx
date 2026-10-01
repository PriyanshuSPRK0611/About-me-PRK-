import { useId, type InputHTMLAttributes } from "react";
type Props = InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string };
export function Input({ label, error, ...p }: Props) {
  const id = useId();
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium">{label}</label>
      <input id={id} aria-invalid={!!error} aria-describedby={error ? `${id}-e` : undefined}
        className="min-h-11 rounded-control border border-line bg-surface px-3" {...p} />
      {error && <p id={`${id}-e`} role="alert" className="text-sm text-danger">{error}</p>}
    </div>
  );
}
