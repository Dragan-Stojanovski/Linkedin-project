import instance from "../../infra/http";

/**
 * Deletes a post by its ID.
 *
 * @param postId - The ID of the post to be deleted.
 * @returns A promise that resolves to the result of the delete operation.
 */
export async function deleteUserPost(postId: string): Promise<void> {
    await instance.delete(`/post/${postId}`);
}