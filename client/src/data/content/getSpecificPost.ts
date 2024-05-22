import { IAddUserPostResponse } from "../../domain/usecases/content/userPosts";
import instance from "../../infra/http";

/**
 * Fetches a specific post by its title.
 * 
 * @param postTitle - The title of the post to be fetched.
 * @returns A promise that resolves to the specific post data.
 */
export async function getSpecificPost(postTitle:string):Promise<IAddUserPostResponse> {
  const result:IAddUserPostResponse= await instance.get(`/post?title=${postTitle}`)
    return result
}