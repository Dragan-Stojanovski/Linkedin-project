import { IAddUserPostResponse } from "../../domain/usecases/content/userPosts";
import instance from "../../infra/http";

/**
 * Fetches a specific post by its id.
 * 
 * @param postId - The if of the post to be fetched.
 * @returns A promise that resolves to the specific post data.
 */
export async function getSpecificPost(postId:string):Promise<IAddUserPostResponse> {
  const result:IAddUserPostResponse= await instance.get(`/post?id=${postId}`)
    return result
}