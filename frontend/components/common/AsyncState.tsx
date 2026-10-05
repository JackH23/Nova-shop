import type { ReactNode } from "react";

import LoadingState from "./LoadingState";
import ErrorState from "./ErrorState";
import EmptyState from "./EmptyState";

type AsyncStateProps = {
  loading?: boolean;
  loadingMessage?: string;

  error?: string | null;
  emptyActionText?: string;
  emptyActionHref?: string;

  isEmpty?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;

  children: ReactNode;
};

export default function AsyncState({
  loading = false,
  loadingMessage = "Loading...",
  error,
  isEmpty = false,
  emptyTitle = "No data found",
  emptyDescription = "There is no data available.",
  emptyActionText,
  emptyActionHref,
  children,
}: AsyncStateProps) {
  if (loading) {
    return (
      <div className="flex-1">
        <LoadingState message={loadingMessage} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1">
        <ErrorState message={error} />
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div className="flex-1">
        <EmptyState
          title={emptyTitle}
          description={emptyDescription}
          actionText={emptyActionText}
          actionHref={emptyActionHref}
        />
      </div>
    );
  }

  return <>{children}</>;
}