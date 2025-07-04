export interface QRFormType {
  url: string;
  text: string;
  email: {
    to: string;
    subject: string;
    body: string;
  };
  wifi: {
    ssid: string;
    password: string;
    type: string;
    hidden: boolean;
  };
  vCard: {
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
  };
}
