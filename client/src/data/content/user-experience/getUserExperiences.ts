import { IUserExperienceResponse } from "../../../domain/usecases/content/userExperience";
import instance from "../../../infra/http";

/**
 * Fetches the experiences for a specific user.
 * 
 * @param userId - The ID of the user whose experiences are to be fetched.
 * @returns A promise that resolves to the list of user experiences.
 */
export async function getUserExperiences(userId: string): Promise<IUserExperienceResponse[]> {
  const response = await instance.get<IUserExperienceResponse[]>(`/experiences/${userId}`);
  return response.data;
}