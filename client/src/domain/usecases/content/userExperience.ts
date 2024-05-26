
export interface IUserExperienceRequest {
    companyName: string;
    position: string;
    startDate: string; 
    endDate?: string; 
    description?: string; 
  }


  export interface IUserExperienceResponse {
    _id: string;
    userId: string;
    companyName: string;
    position: string;
    startDate: string;
    endDate?: string;
    description?: string;
    createdAt: string;
    updatedAt: string;
  }