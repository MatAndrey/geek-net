export function convertDatestringToDate(string: string): string {
  const format = new Intl.DateTimeFormat("ru", { year: "numeric", month: "short", day: "2-digit", hour: "2-digit", minute: "2-digit" }).format;
  const result = format(new Date(string));
  return result;
}
