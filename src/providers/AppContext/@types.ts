import { TLoginForm } from "../../pages/SAPLogin/components/LoginForm/schema";

export interface IAppProviderProps {
  children: React.ReactNode;
}

export interface ILoading {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IAppContext {
  loading: ILoading | boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean | ILoading>>;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  appLogin: (formData: TLoginForm) => Promise<void>;
  group: string;
  setGroup: React.Dispatch<React.SetStateAction<string>>;
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
  toggleTheme: () => void;
}
