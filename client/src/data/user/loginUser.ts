import { ILoginRequest } from "../../domain/user/loginRequest";
import instance from "../../infra/http";
export async function loginUser(registerBody:ILoginRequest) {
  const result = await instance.post('/login',registerBody)
        return result
}