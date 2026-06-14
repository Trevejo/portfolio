export function getYears(start: number): number[] {
  const currentYear = new Date().getFullYear();
  const years: number[] = [];
  for (let y = currentYear; y >= start; y--) {
    years.push(y);
  }
  return years;
}
