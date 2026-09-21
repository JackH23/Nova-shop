"use client";

import { useState } from "react";

export type ReviewFormData = {
  rating: number;
  title: string;
  comment: string;
};

type ReviewFormProps = {
  onSubmit: (data: ReviewFormData) => Promise<void>;
  loading?: boolean;
};

export default function ReviewForm({
  onSubmit,
  loading = false,
}: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    setError("");

    if (rating < 1 || rating > 5) {
      setError("Please select a rating.");
      return;
    }

    if (!comment.trim()) {
      setError("Please enter your review.");
      return;
    }

    try {
      await onSubmit({
        rating,
        title: title.trim(),
        comment: comment.trim(),
      });

      setRating(0);
      setTitle("");
      setComment("");
    } catch {
      setError("Failed to submit review.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-lg border border-slate-200 p-5"
    >
      <h3 className="text-base font-semibold text-slate-900">
        Write a Review
      </h3>

      {/* Rating */}
      <div className="mt-4">
        <p className="text-sm font-medium text-slate-700">
          Your rating
        </p>

        <div className="mt-2 flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className={`text-2xl ${
                star <= rating
                  ? "text-yellow-400"
                  : "text-slate-300"
              }`}
            >
              ★
            </button>
          ))}
        </div>
      </div>

      {/* Title */}
      <div className="mt-4">
        <label className="mb-1 block text-sm font-medium text-slate-700">
          Title
        </label>

        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Great gaming mouse"
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-600"
        />
      </div>

      {/* Comment */}
      <div className="mt-4">
        <label className="mb-1 block text-sm font-medium text-slate-700">
          Review
        </label>

        <textarea
          value={comment}
          onChange={(event) => setComment(event.target.value)}
          rows={4}
          placeholder="Tell us what you think about this product..."
          className="w-full resize-none rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-600"
        />
      </div>

      {error && (
        <p className="mt-3 text-sm text-red-600">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="mt-4 rounded-lg bg-indigo-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
}