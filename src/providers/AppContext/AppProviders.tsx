import { createContext, useEffect, useState } from "react";
import { IAppContext, IAppProviderProps, ILoading } from "./@types";
import { TLoginForm } from "../../pages/SAPLogin/components/LoginForm/schema";
import { AxiosError } from "axios";
import { apiSAP } from "../../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useMsal } from "@azure/msal-react";
import { IBusinessPartner, IItem, ISalesPerson } from "../AppContext/@types";
import { AccountInfo } from "@azure/msal-browser";
import {
  fetchBusinessPartners,
  fetchItems,
  fetchSalesPersons,
} from "./fetchDatas";

export const AppContext = createContext({} as IAppContext);

export const AppProvider = ({ children }: IAppProviderProps) => {
  const [loading, setLoading] = useState<ILoading | boolean>(false);
  const [group, setGroup] = useState<string>("");
  const [, setNewPurchaseNumber] = useState<number>();
  const [user, setUser] = useState<AccountInfo | null>(null);
  const [items] = useState<IItem[]>([]);
  const [salesPerson] = useState<ISalesPerson>({} as ISalesPerson);
  const { accounts } = useMsal();
  // Depósitos /b1s/v1/Deposits
  const navigate = useNavigate();

  const setSessionCookie = (sessionId: string) => {
    document.cookie = `B1SESSION=${sessionId}; path=/; HttpOnly`;
    document.cookie = "ROUTEID=.node0; path=/b1s";
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

  const getProjects = async () => {
    try {
      const response = await apiSAP.get(`/Projects?$filter=Active eq 'tYES'`);
      const projects = response.data.value;
      localStorage.setItem("@projects", JSON.stringify(projects));
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

  const getActiveUserSAP = async (email: string) => {
    try {
      const response = await apiSAP.get(
        `/EmployeesInfo?$filter= eMail eq '${email}'`
      );
    } catch (error) {
      console.error("Erro ao consultar empregado:", error);
    }
  };

  const checkAndFetchData = async (
    key: string,
    fetchDataFunc: () => Promise<void>
  ) => {
    const data = localStorage.getItem(key);
    if (!data) {
      await fetchDataFunc();
    }
  };

  const getProjectManagements = async () => {
    try {
      const response = await apiSAP.get(
        `/DistributionRules?$select= FactorCode, InWhichDimension, FactorDescription`
      );
      const projectManagements = response.data.value;
      localStorage.setItem(
        "@projectmanagements",
        JSON.stringify(projectManagements)
      );
    } catch (error: AxiosError | any) {
      console.error(error);
    }
  };

  const getDeposits = async () => {
    try {
      const response = await apiSAP.get(
        `/Deposits?$select=DepositCode, DepositName&$filter=Active eq 'tYES'`
      );
      const deposits = response.data.value;
      localStorage.setItem("@deposits", JSON.stringify(deposits));
    } catch (error: AxiosError | any) {
      console.error(error);
    }
  };

  const appLogin = async (formData: TLoginForm) => {
    try {
      setLoading(true);

      const response = await apiSAP.post("/Login", formData);
      const sessionId = response.data.SessionId;
      localStorage.setItem("@session", sessionId);
      setSessionCookie(sessionId);

      if (sessionId && accounts && accounts.length > 0) {
        setActiveUser();

        await toast.promise(checkAndFetchData("@items", getItems), {
          pending: "Carregando itens...",
          success: "Itens carregados com sucesso!",
          error: "Erro ao carregar itens.",
        });

        await toast.promise(
          checkAndFetchData("@businesspartners", getBusinessPartner),
          {
            pending: "Carregando parceiros de negócios...",
            success: "Parceiros de negócios carregados com sucesso!",
            error: "Erro ao carregar parceiros de negócios.",
          }
        );

        await toast.promise(
          checkAndFetchData("@salespersons", getSalesPersons),
          {
            pending: "Carregando vendedores...",
            success: "Vendedores carregados com sucesso!",
            error: "Erro ao carregar vendedores.",
          }
        );

        await getLastPurchaseRequest();
      }
    } catch (error: AxiosError | any) {
      if (error.response?.status === 401) {
        toast.error("Usuário sem acesso à base solicitada.");
      } else {
        toast.error("Usuário ou senha inválidos.");
      }
    } finally {
      navigate("/dashboard");
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
        appLogin,
        getActiveUserSAP,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
