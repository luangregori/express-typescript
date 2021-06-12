export interface ICardPayload {
  number: string;
  name: string;
  due_date: string;
  cvv: string;
  cpf: string;
  default: boolean;
  user: any;
}