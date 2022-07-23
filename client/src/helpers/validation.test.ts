import { validate } from "./validation";

describe("Validation", () => {
  test("empty password", () => {
    expect(validate("password", "")).toBe("Пожалуйста, введите пароль");
  });
  test("too short password", () => {
    expect(validate("password", "qwert")).toBe("Пароль должен содержать не менее 6 символов");
  });
  test("password whithout capital", () => {
    expect(validate("password", "qwerty1")).toBe("Пароль должен содержать хотя-бы 1 большую букву");
  });
  test("password whithout number", () => {
    expect(validate("password", "Qwerty")).toBe("Пароль должен содержать хотя-бы 1 цифру");
  });
  test("correct password", () => {
    expect(validate("password", "Qwerty2022")).toBe("");
  });

  test("empty name", () => {
    expect(validate("name", "")).toBe("Пожалуйста, введите имя");
  });
  test("too short name", () => {
    expect(validate("name", "na")).toBe("Имя должно быть длиннее 2 символов");
  });
  test("too long name", () => {
    expect(validate("name", "name_longer_then_20_character")).toBe("Имя должно быть короче 20 символов");
  });
  test("name with space", () => {
    expect(validate("name", "name whith space")).toBe("Имя не должно содержать пробелы");
  });
  test("correct name", () => {
    expect(validate("name", "name")).toBe("");
  });

  test("same passwords", () => {
    expect(validate("doubPass", "Qwerty2011 Qwerty2011")).toBe("");
  });
  test("not same passwords", () => {
    expect(validate("doubPass", "qwerty2011 Querty2011")).toBe("Пароли не совпадают");
  });
});
