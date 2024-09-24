export interface ToEmail {
  name: string;
  email: string;
}

export interface IEmail {
  to: ToEmail;
  subject: string;
  body: string;
}
