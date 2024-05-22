import { IAddUserPostResponse } from "../../domain/usecases/content/userPosts";
import instance from "../../infra/http";
export async function getUserPosts():Promise<IAddUserPostResponse> {
  const result:IAddUserPostResponse = await instance.get('/posts')
    return result
}