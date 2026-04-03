export default function ProductImagePlaceholder({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      className={`absolute inset-0 flex items-center justify-center text-(--text-muted) ${className}`}
    >
      No image
    </div>
  );
}
