import Link from "next/link";

type EmptyStateProps = {
  title: string;
  description?: string;
  actionText?: string;
  actionHref?: string;
};

export default function EmptyState({
  title,
  description,
  actionText,
  actionHref,
}: EmptyStateProps) {
  return (
    <div className="flex min-h-[220px] flex-col items-center justify-center rounded-md border border-dashed border-slate-200 bg-slate-50 px-6 text-center">
      <h2 className="text-lg font-semibold text-slate-900">
        {title}
      </h2>

      {description && (
        <p className="mt-2 text-sm text-slate-500">
          {description}
        </p>
      )}

      {actionText && actionHref && (
        <Link
          href={actionHref}
          className="mt-5 text-sm font-medium text-indigo-600 transition hover:text-indigo-700"
        >
          {actionText}
        </Link>
      )}
    </div>
  );
}