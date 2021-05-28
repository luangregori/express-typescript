export interface TokenJWT {
  user: any;
  token: string;
}

export interface ITokenPayload {
  id: number;
  name: string;
  email: string;
}