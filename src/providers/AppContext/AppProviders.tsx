import { createContext, useState } from "react";
import { IAppContext, IAppProviderProps, ILoading } from "./@types";
import { TLoginForm } from "../../pages/SAPLogin/components/LoginForm/schema";
import { AxiosError } from "axios";
import { apiSAP } from "../../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useMsal } from "@azure/msal-react";
import {
  IBusinessPartner,
  IBusinessResponse,
  IItem,
  IItemsResponse,
  ISalesPerson,
  ISalesPersonResponse,
} from "../AppContext/@types";
import { AccountInfo } from "@azure/msal-browser";

export const AppContext = createContext({} as IAppContext);

export const AppProvider = ({ children }: IAppProviderProps) => {
  const [loading, setLoading] = useState<ILoading | boolean>(false);
  const [group, setGroup] = useState<string>("");
  const [newPurchaseNumber, setNewPurchaseNumber] = useState<number>();
  const [user, setUser] = useState<AccountInfo | null>(null);
  const [items, setItems] = useState<IItem[]>([]);
  const [salesPerson, setSalesPerson] = useState<ISalesPerson>(
    {} as ISalesPerson
  );
  const { accounts } = useMsal();

  const navigate = useNavigate();

  const setSessionCookie = (sessionId: string) => {
    document.cookie = `B1SESSION=${sessionId}; path=/; HttpOnly`;
    document.cookie = "ROUTEID=.node0; path=/b1s";
  };

  const fetchItems = async (link: string): Promise<IItemsResponse> => {
    const response = await apiSAP.get<IItemsResponse>(link);
    return response.data;
  };

  const fetchBusinessPartners = async (
    link: string
  ): Promise<IBusinessResponse> => {
    const response = await apiSAP.get<IBusinessResponse>(link);
    return response.data;
  };

  const fetchSalesPersons = async (
    link: string
  ): Promise<ISalesPersonResponse> => {
    const response = await apiSAP.get<ISalesPersonResponse>(link);
    return response.data;
  };

  const getItems = async () => {
    const allItems: IItem[] = [];
    let nextLink: string | undefined =
      "Items?$select=ItemName,ItemCode&$filter=Valid eq 'tYES'";

    try {
      while (nextLink) {
        const response = await fetchItems(nextLink);
        const { value } = response;
        nextLink = response["odata.nextLink"];

        allItems.push(...value);
      }

      localStorage.setItem("@items", JSON.stringify(allItems));
    } catch (error: AxiosError | any) {
      console.error(error);
    }
  };

  const getBusinessPartner = async () => {
    const allBusinessPartners: IBusinessPartner[] = [];
    let nextLink: string | undefined =
      "BusinessPartners?$select=CardCode, CardName, FederalTaxID&$filter= Valid eq 'tYES'";
    try {
      while (nextLink) {
        const response = await fetchBusinessPartners(nextLink);
        const { value } = response;
        nextLink = response["odata.nextLink"];

        allBusinessPartners.push(...value);
      }

      localStorage.setItem(
        "@businesspartners",
        JSON.stringify(allBusinessPartners)
      );
    } catch (error: AxiosError | any) {
      console.error(error);
    }
  };

  const getSalesPersons = async () => {
    const allSalesPerson: ISalesPerson[] = [];
    let nextLink: string | undefined =
      "SalesPersons?$select=SalesEmployeeCode, SalesEmployeeName&$filter = Active eq 'tYES'";
    try {
      while (nextLink) {
        const response = await fetchSalesPersons(nextLink);
        const { value } = response;
        nextLink = response["odata.nextLink"];

        allSalesPerson.push(...value);
      }

      localStorage.setItem("@salespersons", JSON.stringify(allSalesPerson));
    } catch (error: AxiosError | any) {
      console.error(error);
    }
  };

  const getLastPurchaseRequest = async () => {
    try {
      const response = await apiSAP.get(
        `/PurchaseRequests?$select=DocNum &$orderby=DocNum desc&$top=1`
      );
      const newPurchaseRequest = response.data.value[0].DocNum + 1;
      setNewPurchaseNumber(newPurchaseRequest);
    } catch (error: AxiosError | any) {
      console.error(error);
    }
  };

  const setActiveUser = () => {
    const activeUser = accounts[0];
    if (activeUser) {
      setUser(activeUser);
    }
  };

  const appLogin = async (formData: TLoginForm) => {
    try {
      setLoading(true);

      const response = await apiSAP.post("/Login", formData);

      const sessionId = response.data.SessionId;
      localStorage.setItem("@session", sessionId);
      setSessionCookie(sessionId);

      toast.success("Login feito com sucesso");

      if (sessionId && accounts && accounts.length > 0) {
        setActiveUser();

        const checkAndFetchData = async (
          key: string,
          fetchDataFunc: () => Promise<void>
        ) => {
          const data = localStorage.getItem(key);
          if (!data) {
            await fetchDataFunc();
          }
        };

        await checkAndFetchData("@items", getItems);
        await checkAndFetchData("@businesspartners", getBusinessPartner);
        await checkAndFetchData("@salespersons", getSalesPersons);

        await getLastPurchaseRequest();
      }
    } catch (error: AxiosError | any) {
      if (error.response?.status === 401) {
        toast.error("Usuário sem acesso a base solicitada.");
      } else {
        toast.error("Usuário ou senha inválidos.");
      }
    } finally {
      navigate("/dashboard");
      setLoading(false);
    }
  };

  return (
    <AppContext.Provider
      value={{
        setLoading,
        loading,
        group,
        setGroup,
        items,
        user,
        setUser,
        salesPerson,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
