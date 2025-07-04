export interface VCardFormType {
  firstname: string;
  lastname: string;
  company: string;
  job: string;
  phoneNumber: string;
  mobileNumber: string;
  faxNumber: string;
  email: string;
  website: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  [key: string]: string;
}
