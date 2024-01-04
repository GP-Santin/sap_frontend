import { createContext, useEffect, useState } from "react";
import {
  IBusinessPartner,
  IBusinessResponse,
  IItem,
  IItemsResponse,
  ISalesPerson,
  IUserContext,
  IUserProviderProps,
} from "./@types";
import { AxiosError } from "axios";
import { apiSAP, apiSantin } from "../../services/api";
import { useMsal } from "@azure/msal-react";
import { AccountInfo } from "@azure/msal-browser";

export const UserContext = createContext({} as IUserContext);

export const UserProvider = ({ children }: IUserProviderProps) => {
  const [user, setUser] = useState<AccountInfo | null>(null);
  const [items, setItems] = useState<IItem[]>([]);
  const [salesPerson, setSalesPerson] = useState<ISalesPerson>(
    {} as ISalesPerson
  );
  const { accounts } = useMsal();

  const setActiveUser = () => {
    const activeUser = accounts[0];
    if (activeUser) {
      setUser(activeUser);
    }
  };

  const apiLogin = async () => {
    try {
      const response = await apiSantin.post("/auth", {
        user: import.meta.env.VITE_API_LOGIN,
        password: import.meta.env.VITE_API_PASSWORD,
      });
      localStorage.setItem("@santinAPI", response.data.token);
    } catch (error: AxiosError | any) {
      console.error("Erro ao fazer login:", error);
    }
  };

  const getActiveUserSAP = async (email: string) => {
    try {
      const response = await apiSAP.get(
        `/EmployeesInfo?$filter= eMail eq '${email}'`
      );
      const salesPersonCode = response.data.value[0].SalesPersonCode;

      const responseSalesPerson = await apiSAP.get(
        `SalesPersons(${salesPersonCode})`
      );
      const salesPerson = responseSalesPerson.data;
      setSalesPerson(salesPerson);
    } catch (error) {
      console.error("Erro ao consultar empregado:", error);
    }
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

  useEffect(() => {
    if (accounts && accounts.length > 0) {
      setActiveUser();
      const items = localStorage.getItem("@items");
      if (!items) {
        getItems();
      }
      const businessPartner = localStorage.getItem("@businesspartners");
      if (!businessPartner) {
        getBusinessPartner();
      }
    }
  }, [accounts]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        getActiveUserSAP,
        apiLogin,
        getItems,
        salesPerson,
        items,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
