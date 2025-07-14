export interface Address {
  id: number;
  street: string;
  number: string;
  complement?: string;
  city: string;
  state: string;
  zipCode: string;
  isMain: boolean;
}
