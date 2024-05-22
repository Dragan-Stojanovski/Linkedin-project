import { IAddUserPostResponse } from "../../domain/usecases/content/userPosts";
import instance from "../../infra/http";

/**
 * Fetches all user posts.
 * 
 * @returns A promise that resolves to a list of user posts.
 */
export async function getUserPosts():Promise<IAddUserPostResponse> {
  const result:IAddUserPostResponse = await instance.get('/posts')
    return result
}