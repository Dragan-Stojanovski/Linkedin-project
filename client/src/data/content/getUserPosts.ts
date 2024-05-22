import { IAddUserPostResponse } from "../../domain/usecases/content/userPosts";
import instance from "../../infra/http";

/**
 * Fetches all user posts.
 * 
 * @returns A promise that resolves to a list of user posts.
 */
export async function getUserPosts(): Promise<IAddUserPostResponse[]> {
  const result = await instance.get<IAddUserPostResponse[]>('/posts');
  return result.data;
}