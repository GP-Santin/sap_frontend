export interface IUserProviderProps {
  children: React.ReactNode;
}

export interface IFormResponse {
  UserName: string;
}

export interface IUserContext {
  user: IFormResponse | null;
  setUser: React.Dispatch<React.SetStateAction<null>>;
}
