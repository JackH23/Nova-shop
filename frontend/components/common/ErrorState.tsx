type ErrorStateProps = {
  message?: string;
  onRetry?: () => void;
  className?: string;
};

export default function ErrorState({
  message = "Something went wrong.",
  onRetry,
  className = "",
}: ErrorStateProps) {
  return (
    <div
      className={`flex min-h-[200px] items-center justify-center ${className}`}
    >
      <div className="text-center">
        <p className="text-sm text-red-600">{message}</p>

        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="mt-3 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
          >
            Try again
          </button>
        )}
      </div>
    </div>
  );
}