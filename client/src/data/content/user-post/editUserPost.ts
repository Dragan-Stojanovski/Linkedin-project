import { IAddUserPostRequest } from "../../../domain/usecases/content/userPosts";
import instance from "../../../infra/http";

/**
 * Updates a post by its ID.
 *
 * @param postId - The ID of the post to be updated.
 * @param postTitle - The new title of the post.
 * @param postBody - The new body of the post.
 * @returns A promise that resolves to the result of the update operation.
 */
export async function editUserPost(postId: string, body: IAddUserPostRequest): Promise<void> {
    await instance.patch(`/post/${postId}`, body);
  }