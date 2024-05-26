import { IUserResponse } from "../../domain/usecases/store/rootState";
import instance from "../../infra/http";

/**
 * Fetches the profile information of a user by their userId.
 * 
 * @param userId - The ID of the user whose profile is to be fetched.
 * @returns A promise that resolves to the user's profile information.
 */
export async function getUserProfile(userId: string): Promise<IUserResponse> {
  const response = await instance.get<IUserResponse>(`/user/${userId}`);
  return response.data;
}