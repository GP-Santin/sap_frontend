import { createContext, useState, useEffect, useMemo } from "react";
import {
  IAppContext,
  IAppProviderProps,
  ILoading,
  IUsage,
  IBusinessPartner,
  IItem,
  ISalesPerson,
} from "./@types";
import { TLoginForm } from "../../pages/SAPLogin/components/LoginForm/schema";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useMsal } from "@azure/msal-react";
import {
  fetchBusinessPartners,
  fetchItems,
  fetchMainUsage,
  fetchSalesPersons,
} from "./fetchDatas";
import apiSAP from "../../middleware/handleRequest.middleware";

export const AppContext = createContext({} as IAppContext);

export const AppProvider = ({ children }: IAppProviderProps) => {
  const [loading, setLoading] = useState<ILoading | boolean>(false);
  const [group, setGroup] = useState<string>("");
  const [items, setItems] = useState<IItem[]>([]);
  const [, setNewPurchaseNumber] = useState<
    number | undefined
  >();
  const [salesPerson, setSalesPerson] = useState<ISalesPerson>(
    {} as ISalesPerson
  );
  const { accounts } = useMsal();
  const navigate = useNavigate();

  const setSessionCookie = (sessionId: string) => {
    document.cookie = `B1SESSION=${sessionId}; path=/; HttpOnly`;
    document.cookie = "ROUTEID=.node0; path=/b1s";
  };

  const fetchDataFunc = async () => {
    await getItems();
    await getBusinessPartner();
    await getSalesPersons();
    await getProjectManagements();
    await getProjects();
    await getUsage();
  };

  const fetchData = async (key: string, fetchDataFunc: () => Promise<void>) => {
    const data = sessionStorage.getItem(key);
    if (!data) {
      await fetchDataFunc();
    }
  };

  const fetchDataFuncMemoized = useMemo(() => fetchDataFunc, []);

  useEffect(() => {
    fetchDataFuncMemoized();
  }, [fetchDataFuncMemoized]);

  const appLogin = async (formData: TLoginForm) => {
    try {
      setLoading(true);

      const response = await apiSAP.post("/Login", formData);
      const sessionId = response.data.SessionId;
      sessionStorage.setItem("@session", sessionId);
      setSessionCookie(sessionId);
      sessionStorage.setItem("@base", formData.CompanyDB.substring(7, 10));
      if (sessionId && accounts && accounts.length > 0) {
        await toast.promise(() => fetchData("@items", getItems), {
          pending: "Carregando itens...",
          error: "Erro ao carregar itens.",
        });

        await toast.promise(
          () => fetchData("@businesspartners", getBusinessPartner),
          {
            pending: "Carregando parceiros de negócios...",
            error: "Erro ao carregar parceiros de negócios.",
          }
        );

        await toast.promise(() => fetchData("@salespersons", getSalesPersons), {
          pending: "Carregando vendedores...",
          error: "Erro ao carregar vendedores.",
        });

        await toast.promise(
          () => fetchData("@projectmanagements", getProjectManagements),
          {
            pending: "Carregando gerenciais...",
            error: "Erro ao carregar gerenciais.",
          }
        );

        await toast.promise(() => fetchData("@projects", getProjects), {
          pending: "Carregando projetos...",
          error: "Erro ao carregar projetos.",
        });

        await toast.promise(() => fetchData("@usage", getUsage), {
          pending: "Carregando usos...",
          error: "Erro ao carregar usos.",
        });

        toast.success("Dados carregados com sucesso");

        await getLastPurchaseRequest();
        await getBranches();
      }
      navigate("/dashboard");
    } catch (error: AxiosError | any) {
      console.error(error);
    } finally {
      setLoading(false);
    }
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

      sessionStorage.setItem("@items", JSON.stringify(allItems));
    } catch (error: AxiosError | any) {
      console.error(error);
    }
  };

  const getBusinessPartner = async () => {
    const allBusinessPartners: IBusinessPartner[] = [];
    let nextLink: string | undefined =
      "BusinessPartners?$select=CardCode,CardName,FederalTaxID&$filter=Valid eq 'tYES' and not substringof('C',CardCode)";
    try {
      while (nextLink) {
        const response = await fetchBusinessPartners(nextLink);
        const { value } = response;
        nextLink = response["odata.nextLink"];

        allBusinessPartners.push(...value);
      }

      sessionStorage.setItem(
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

      sessionStorage.setItem("@salespersons", JSON.stringify(allSalesPerson));
    } catch (error: AxiosError | any) {
      console.error(error);
    }
  };

  const getProjectManagements = async () => {
    try {
      const response = await apiSAP.get(
        `ProfitCenters?$select= CenterCode, CenterName, U_SNT_IdGerencial&$filter= U_SNT_IdGerencial ne null`
      );
      const projectManagements = response.data.value;
      sessionStorage.setItem(
        "@projectmanagements",
        JSON.stringify(projectManagements)
      );
    } catch (error: AxiosError | any) {
      console.error(error);
    }
  };

  const getProjects = async () => {
    try {
      const response = await apiSAP.get(`/Projects?$filter=Active eq 'tYES'`);
      const projects = response.data.value;
      sessionStorage.setItem("@projects", JSON.stringify(projects));
    } catch (error: AxiosError | any) {
      console.error(error);
    }
  };

  const getUsage = async () => {
    const allUsages: IUsage[] = [];
    let nextLink: string | undefined =
      "NotaFiscalUsage?$select= ID, Usage&$orderby=ID asc";
    try {
      while (nextLink) {
        const response = await fetchMainUsage(nextLink);
        const { value } = response;
        nextLink = response["odata.nextLink"];
        allUsages.push(...value);
      }
      sessionStorage.setItem("@usage", JSON.stringify(allUsages));
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

  const getBranches = async () => {
    try {
      const response = await apiSAP.get(
        "/BusinessPlaces?$select = BPLID,DefaultWarehouseID, BPLName"
      );
      const branches = response.data.value;
      sessionStorage.setItem("@allbranches", JSON.stringify(branches));
    } catch (error: AxiosError | any) {
      console.error(error);
    }
  };

  const memoizedContextValue = useMemo(() => {
    return {
      setLoading,
      loading,
      group,
      setGroup,
      items,
      salesPerson,
      appLogin,
      setSalesPerson,
      setItems,
    };
  }, [setLoading, loading, group, setGroup, items, salesPerson, appLogin]);

  return (
    <AppContext.Provider value={memoizedContextValue}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
