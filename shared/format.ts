export function formatKr(n: number): string {
  return `${n.toFixed(2)} kr`;
}

export function formatStarRating(rating: number): string {
  return `★ ${rating.toFixed(1)}`;
}
