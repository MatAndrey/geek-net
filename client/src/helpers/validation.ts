type ValidationType = "password" | "name" | "doubPass";

export function validate(type: ValidationType, string: string): string {
  if (type === "name") {
    if (!/^(?!\s*$).+/.test(string)) return "Пожалуйста, введите имя";
    if (/\s/g.test(string)) return "Имя не должно содержать пробелы";
    if (!/(.{3,}$)/.test(string)) return "Имя должно быть длиннее 2 символов";
    if (!/(^.{3,20}$)/.test(string)) return "Имя должно быть короче 20 символов";
  }
  if (type === "password") {
    if (!/^(?!\s*$).+/.test(string)) return "Пожалуйста, введите пароль";
    if (!/.{6,}/.test(string)) return "Пароль должен содержать не менее 6 символов";
    if (!/(.*?[0-9])/.test(string)) return "Пароль должен содержать хотя-бы 1 цифру";
    if (!/(.*?[A-ZА-Я])/.test(string)) return "Пароль должен содержать хотя-бы 1 большую букву";
  }
  if (type === "doubPass") {
    const pass = string.split(" ")[0];
    const doubPass = string.split(" ")[1];
    if (pass !== doubPass) return "Пароли не совпадают";
  }
  return "";
}
