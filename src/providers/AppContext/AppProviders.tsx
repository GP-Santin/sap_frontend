import { createContext, useState } from "react";
import { IAppContext, IAppProviderProps, ILoading, IUsage } from "./@types";
import { TLoginForm } from "../../pages/SAPLogin/components/LoginForm/schema";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useMsal } from "@azure/msal-react";
import { IBusinessPartner, IItem, ISalesPerson } from "../AppContext/@types";
import {
  fetchBusinessPartners,
  fetchItems,
  fetchMainUsage,
  fetchProjects,
  fetchSalesPersons,
} from "./fetchDatas";
import apiSAP from "../../middlewares/handleRequest.middleware";
import { IProject } from "@/src/components/Projects/@types";

export const AppContext = createContext({} as IAppContext);

export const AppProvider = ({ children }: IAppProviderProps) => {
  const [loading, setLoading] = useState<ILoading | boolean>(false);
  const [group, setGroup] = useState<string>("");
  const [, setNewPurchaseNumber] = useState<number>();
  const [items] = useState<IItem[]>([]);
  const [salesPerson] = useState<ISalesPerson>({} as ISalesPerson);
  const { accounts } = useMsal();

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
      "BusinessPartners?$select=CardCode,CardName,FederalTaxID&$filter=Valid eq 'tYES' and not substringof('C',CardCode)";
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
      localStorage.setItem("@usage", JSON.stringify(allUsages));
    } catch (error: AxiosError | any) {
      console.error(error);
    }
  };

  const getProjects = async () => {
    const allProjects: IProject[] = [];
    let nextLink: string | undefined =
      "Projects?$select=Code,Name&$filter=Active eq 'tYES'";
    try {
      while (nextLink) {
        const response = await fetchProjects(nextLink);
        const { value } = response;
        nextLink = response["odata.nextLink"];

        allProjects.push(...value);
        console.log(allProjects);
      }
      localStorage.setItem("@projects", JSON.stringify(allProjects));
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
        `ProfitCenters?$select= CenterCode, CenterName, U_SNT_IdGerencial&$filter= U_SNT_IdGerencial ne null`
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

  const getBranches = async () => {
    try {
      const response = await apiSAP.get(
        "/BusinessPlaces?$select = BPLID,DefaultWarehouseID, BPLName"
      );
      const branches = response.data.value;
      localStorage.setItem("@allbranches", JSON.stringify(branches));
    } catch (error: AxiosError | any) {
      console.error(error);
    }
  };

  const getFactorCode = async () => {
    try {
      const response = await apiSAP.get(
        "/DistributionRules?$filter=InWhichDimension eq 1 &$select=FactorCode"
      );
      const managerial = response.data.value;
      localStorage.setItem("@managerial", JSON.stringify(managerial));
    } catch (error: AxiosError | any) {
      console.error(error);
    }
  };

  const appLogin = async (formData: TLoginForm) => {
    try {
      setLoading(true);

      const response = await apiSAP.post("/Login", formData);
      const sessionId = response.data.SessionId;
      setSessionCookie(sessionId);
      localStorage.setItem("@session", sessionId);
      localStorage.setItem("@base", formData.CompanyDB.substring(7, 10));
      if (sessionId && accounts && accounts.length > 0) {
        await toast.promise(checkAndFetchData("@items", getItems), {
          pending: "Carregando itens...",
          error: "Erro ao carregar itens.",
        });

        await toast.promise(
          checkAndFetchData("@businesspartners", getBusinessPartner),
          {
            pending: "Carregando parceiros de negócios...",
            error: "Erro ao carregar parceiros de negócios.",
          }
        );

        await toast.promise(
          checkAndFetchData("@salespersons", getSalesPersons),
          {
            pending: "Carregando vendedores...",
            error: "Erro ao carregar vendedores.",
          }
        );

        await toast.promise(
          checkAndFetchData("@projectmanagements", getProjectManagements),
          {
            pending: "Carregando gerenciais...",
            error: "Erro ao carregar gerenciais.",
          }
        );

        await toast.promise(checkAndFetchData("@projects", getProjects), {
          pending: "Carregando projetos...",
          error: "Erro ao carregar projetos.",
        });

        await toast.promise(checkAndFetchData("@usage", getUsage), {
          pending: "Carregando usos...",
          error: "Erro ao carregar usos.",
        });

        toast.success("Dados carregados com sucesso");

        await getLastPurchaseRequest();
        await getBranches();
        await getFactorCode();
      }
      navigate("/dashboard");
    } catch (error: AxiosError | any) {
      console.error(error);
    } finally {
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
        salesPerson,
        appLogin,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
