const monthDict = ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"];

export function convertDatestringToDate(string: string): string {
  const date = new Date(string);
  let result = `${date.getDate()} ${monthDict[date.getMonth()]} ${date.getFullYear()}`;
  return result;
}
