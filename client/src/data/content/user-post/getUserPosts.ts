import { IAddUserPostResponse } from "../../../domain/usecases/content/userPosts";
import instance from "../../../infra/http";

/**
 * Fetches the posts for a specific user by user ID.
 * 
 * @param userId - The ID of the user whose posts are to be fetched.
 * @returns A promise that resolves to the list of user posts.
 */
export async function getUserPosts(userId: string): Promise<IAddUserPostResponse[]> {
  const response = await instance.get<IAddUserPostResponse[]>(`/posts/${userId}`);
  return response.data;
}