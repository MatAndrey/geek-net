export type roles = "USER" | "ADMIN" | "GUEST";

export default interface User {
  token: string;
  name: string;
  id: string;
  role: roles;
  avatar: string;
}
