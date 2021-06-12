export interface IAddressPayload {
  street: string;
  number: string;
  district: string;
  cep: string;
  complement?: string;
  city?: any;
  city_id: number;
  default: boolean;
  user: any;
}