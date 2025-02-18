import axios from "axios";
import { loadAbort } from "../utilities";
import { LoginResponse } from "../models";

export const loginService = (email: string, password: string) => {
  const controller = loadAbort();
  return {
    call: axios.post<LoginResponse>(
      "https://reqres.in/api/login",
      { email, password },
      {
        signal: controller.signal,
      }
    ),
    controller,
  };
};
