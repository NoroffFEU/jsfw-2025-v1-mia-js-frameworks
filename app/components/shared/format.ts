export function formatKr(n: number): string {
  return `${n.toFixed(2)} kr`;
}

export function formatStarRating(rating: number): string {
  const r = Math.min(5, Math.max(0, rating));
  const full = Math.floor(r);
  const empty = 5 - full;
  const stars = "★".repeat(full) + "☆".repeat(empty);
  return `${stars} ${rating.toFixed(1)}`;
}
