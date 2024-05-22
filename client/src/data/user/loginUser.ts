import { ILoginRequest } from "../../domain/user/loginRequest";
import instance from "../../infra/http";

/**
 * Logs in a user with the provided credentials.
 * 
 * @param registerBody - The login credentials of the user.
 * @returns A promise that resolves to the result of the login attempt.
 */
export async function loginUser(registerBody:ILoginRequest) {
  const result = await instance.post('/login',registerBody)
        return result
}