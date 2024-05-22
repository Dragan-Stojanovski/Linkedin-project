import { IRegisterUserRequestBody } from "../../domain/user/registerRequest";
import instance from "../../infra/http";

/**
 * Registers a new user with the provided information.
 * 
 * @param registerBody - The registration details of the new user.
 * @returns A promise that resolves to the result of the user registration.
 */
export async function registerNewUser(registerBody:IRegisterUserRequestBody) {
  const result = await instance.post('/register',registerBody)
        return result
}