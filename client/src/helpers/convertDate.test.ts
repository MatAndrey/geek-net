import { convertDatestringToDate } from "./convertDate";

describe("Date convertation", () => {
  test("Date string", () => {
    expect(convertDatestringToDate("2022-04-06T19:09:54.331Z")).toBe("6 Апр 2022");
  });
  test("Literal date", () => {
    expect(convertDatestringToDate("6 April 2022")).toBe("6 Апр 2022");
  });
  test("Incorrect date", () => {
    expect(convertDatestringToDate("6-4-22")).not.toBe("6 Апр 2022");
  });
  test("Incorrect value", () => {
    expect(convertDatestringToDate("yesterday")).toBe("NaN undefined NaN");
  });
});
