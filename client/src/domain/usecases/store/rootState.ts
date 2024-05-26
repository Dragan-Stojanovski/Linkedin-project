export interface IUserResponse {
  _id?:string;
  username: string;
  email: string;
  password: string;
}

export interface IRootState {
  user: IUserResponse;
}
