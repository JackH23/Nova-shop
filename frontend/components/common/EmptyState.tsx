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
    <div className="flex min-h-[220px] flex-col items-center justify-center rounded-md border border-dashed border-slate-200 bg-slate-50 px-6 text-center dark:border-slate-700 dark:bg-slate-900">
      <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
        {title}
      </h2>

      {description && (
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          {description}
        </p>
      )}

      {actionText && actionHref && (
        <Link
          href={actionHref}
          className="mt-5 text-sm font-medium text-indigo-600 transition hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
        >
          {actionText}
        </Link>
      )}
    </div>
  );
}