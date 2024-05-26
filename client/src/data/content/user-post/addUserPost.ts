import { IAddUserPostRequest } from "../../../domain/usecases/content/userPosts";
import instance from "../../../infra/http";

/**
 * Adds a new user post.
 * 
 * @param registerBody - The body of the post to be added.
 * @returns A promise that resolves to the result of the post creation.
 */
export async function addUserPost(registerBody:IAddUserPostRequest) {
  const result = await instance.post('/posts',registerBody)
        return result
}