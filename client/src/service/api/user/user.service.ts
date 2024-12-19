import { httpGet } from "../_req";
import { AxiosContracts } from "@/lib/axios/AxiosContracts";
import { LoggedInUserDto } from "./user.types";

export class UserService {
  static loggedInUserQuery() {
    return httpGet<LoggedInUserDto>('/users/me')
  }
}