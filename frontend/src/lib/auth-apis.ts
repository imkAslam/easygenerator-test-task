import { ILogin } from "@/interface/login.interface";
import instance from "./api-instance";

export const userLogin = (payload: ILogin) => {
  return instance.post("/auth/login", payload);
};
