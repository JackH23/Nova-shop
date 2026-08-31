type FormErrorProps = {
  message?: string | null;
};

export default function FormError({
  message,
}: FormErrorProps) {
  if (!message) {
    return null;
  }

  return (
    <p className="text-xs text-red-500">
      {message}
    </p>
  );
}