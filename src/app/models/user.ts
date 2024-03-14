export interface User {
    id?: string;
    email?: string; 
    firstName?: string;
    lastName?: string; 
    tags?: string[];
    authProvider: string;
  }
  