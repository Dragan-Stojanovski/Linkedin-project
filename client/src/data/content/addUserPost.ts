import { IAddUserPostRequest } from "../../domain/usecases/content/userPosts";
import instance from "../../infra/http";
export async function addUserPost(registerBody:IAddUserPostRequest) {
  const result = await instance.post('/posts',registerBody)
        return result
}