import instance from "../../infra/http";
import { IEditUserRequest } from "../../presentation/pages/user-pages/user-profile-page/components/user-edit-modal";

export async function editUserInfo(requestBody:IEditUserRequest) {
  const result = await instance.patch('/userown', requestBody)
        return result
}