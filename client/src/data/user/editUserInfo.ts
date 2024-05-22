import instance from "../../infra/http";
import { IEditUserRequest } from "../../presentation/pages/user-pages/user-profile-page/components/user-edit-modal";

/**
 * Edits the information of the current user.
 * 
 * @param requestBody - The updated user information.
 * @returns A promise that resolves to the result of the user information update.
 */
export async function editUserInfo(requestBody:IEditUserRequest) {
  const result = await instance.patch('/userown', requestBody)
        return result
}