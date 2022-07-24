import { Request } from "express";

export type roles = "ADMIN" | "USER" | "GUEST";

export interface Req extends Request {
  user: {
    role: roles;
    id?: number;
  };
}
