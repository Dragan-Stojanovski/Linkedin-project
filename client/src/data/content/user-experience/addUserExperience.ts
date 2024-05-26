import { IUserExperienceRequest, IUserExperienceResponse } from "../../../domain/usecases/content/userExperience";
import instance from "../../../infra/http";

/**
 * Adds a new user experience.
 * 
 * @param experienceData - {@link IUserExperienceRequest} The data of the experience to be added.
 * @returns A promise that resolves to the newly created experience.
 */
export async function addUserExperience(registerBody:IUserExperienceRequest):Promise<IUserExperienceResponse[]> {
  const result:IUserExperienceResponse[] = await instance.post('/experiences',registerBody)
return result
}