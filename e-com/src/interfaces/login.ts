export interface SuccessLogin {
  message: string;
  user: UserRes;
  token: string;
}
export interface UserRes {
  name: string;
  email: string;
  role: string;
}
export interface FailLogin {
  statusMsg: string;
  message: string;
}
