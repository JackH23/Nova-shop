type LoadingStateProps = {
  message?: string;
  className?: string;
};

export default function LoadingState({
  message = "Loading...",
  className = "",
}: LoadingStateProps) {
  return (
    <div
      className={`flex min-h-[200px] items-center justify-center ${className}`}
      role="status"
    >
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-slate-900" />

        <p className="text-sm text-slate-500">{message}</p>
      </div>
    </div>
  );
}