export default function DiscountBadge({ percent }: { percent: number }) {
  return (
    <span className="absolute top-2 left-2 bg-(--sale) text-white text-xs font-bold uppercase tracking-wide px-2 py-1">
      −{percent}%
    </span>
  );
}
