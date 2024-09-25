import { ILogin, IRegister } from "@/interface/login.interface";
import instance from "./api-instance";

export const userLogin = (payload: ILogin) => {
  return instance.post("/auth/login", payload);
};
export const userSignUp = (payload: IRegister) => {
  return instance.post("/auth/register", payload);
};
