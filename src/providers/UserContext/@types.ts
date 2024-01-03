export interface IUserProviderProps {
  children: React.ReactNode;
}

export interface IFormResponse {
  UserName: string;
}

export interface IUserContext {
  user: string;
  setUser: React.Dispatch<React.SetStateAction<string>>;
  getActiveUserSAP: () => Promise<void>;
  apiLogin: () => Promise<void>;
}
