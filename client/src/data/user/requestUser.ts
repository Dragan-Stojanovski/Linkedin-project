import { IRegisterUserRequestBody } from "../../domain/user/registerRequest";
import instance from "../../infra/http";
export async function registerNewUser(registerBody:IRegisterUserRequestBody) {
  const result = await instance.post('/register',registerBody)
        return result
}