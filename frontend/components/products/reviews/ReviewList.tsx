import type { ProductReview } from "@/lib/products";
import { getFileUrl } from "@/lib/fileUrl"; // adjust path if different

type ReviewListProps = {
  reviews: ProductReview[];
};

export default function ReviewList({
  reviews,
}: ReviewListProps) {
  if (reviews.length === 0) {
    return (
      <p className="text-sm text-slate-500">
        No reviews yet.
      </p>
    );
  }

  return (
    <div className="space-y-6">
      {reviews.map((review) => {
        const profileImageUrl = getFileUrl(
          review.user?.profileImage,
        );

        return (
          <div
            key={review.id}
            className="border-b border-slate-200 pb-6 last:border-b-0"
          >
            {/* User */}
            <div className="flex items-center gap-3">
              {/* Profile image */}
              {profileImageUrl ? (
                <img
                  src={profileImageUrl}
                  alt={review.user?.fullName ?? "User"}
                  className="h-10 w-10 rounded-full object-cover"
                />
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-sm font-semibold text-slate-600">
                  {review.user?.fullName
                    ?.charAt(0)
                    .toUpperCase() ?? "U"}
                </div>
              )}

              {/* Name + Date */}
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  {review.user?.fullName ?? "Anonymous"}
                </p>

                <p className="text-xs text-slate-400">
                  {new Date(
                    review.created_at,
                  ).toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Rating */}
            <div className="mt-3 flex items-center gap-2">
              <div className="text-sm text-yellow-500">
                {"★".repeat(review.rating)}

                <span className="text-slate-300">
                  {"★".repeat(5 - review.rating)}
                </span>
              </div>

              {review.is_verified_purchase && (
                <span className="text-xs font-medium text-green-600">
                  Verified Purchase
                </span>
              )}
            </div>

            {/* Title */}
            {review.title && (
              <h4 className="mt-2 text-sm font-semibold text-slate-900">
                {review.title}
              </h4>
            )}

            {/* Comment */}
            <p className="mt-2 text-sm leading-6 text-slate-600">
              {review.comment}
            </p>
          </div>
        );
      })}
    </div>
  );
}