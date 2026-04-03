export function formatKr(n: number): string {
  return `${n.toFixed(2)} kr`;
}

export function formatStarRating(rating: number): string {
  const r = Math.min(5, Math.max(0, Math.round(rating * 2) / 2));
  const full = Math.floor(r);
  const half = r % 1 === 0.5;
  const empty = 5 - full - (half ? 1 : 0);
  const stars = "★".repeat(full) + (half ? "½" : "") + "☆".repeat(empty);
  return `${stars} ${rating.toFixed(1)}`;
}
