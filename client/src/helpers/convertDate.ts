export function convertDatestringToDate(string: string): string {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const format = new Intl.DateTimeFormat("ru", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    timeZone,
  }).format;
  const date = new Date(string);
  const result = format(
    new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()))
  );
  return result;
}
