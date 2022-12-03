export interface ISignUp {
    email: string;
    fullName: string;
    password: string;
    address: string; 
    city: string;
    country: string;
    phone: string;
}

export interface ILogIn {
    email: string;
    password: string;
}