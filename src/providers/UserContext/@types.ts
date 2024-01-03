export interface IUserProviderProps {
  children: React.ReactNode;
}

export interface IFormResponse {
  UserName: string;
}

export interface IUserContext {
  user: string;
  setUser: React.Dispatch<React.SetStateAction<string>>;
  getActiveUserSAP: (email: string) => Promise<void>;
  apiLogin: () => Promise<void>;
  getItems: () => Promise<void>;
}
