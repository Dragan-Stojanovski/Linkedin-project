export interface IUserResponse {
  username: string;
  email: string;
  password: string;
}

export interface IRootState {
  user: IUserResponse;
}
