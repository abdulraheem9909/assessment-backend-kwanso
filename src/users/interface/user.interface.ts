export interface IUser {
  id: string;
  email: string;
  password?: string;
}

export interface ILogin {
  access_token: string;
}
