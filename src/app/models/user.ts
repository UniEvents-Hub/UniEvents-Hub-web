export interface User {
    id?: string;
    email?: string;
    phoneNumber?: string;
    firstName?: string;
    lastName?: string; 
    tags?: string[];
    authProvider: string;
  }
  