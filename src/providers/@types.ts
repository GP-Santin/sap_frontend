export interface IAppProviderProps {
  children: React.ReactNode;
}

export interface ILoading {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IAppContext {
  loading : ILoading | boolean ;
  isOpen: boolean;
  setIsOpen : React.Dispatch<React.SetStateAction<boolean>>
}