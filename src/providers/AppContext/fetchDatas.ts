import apiSAP from "../../middlewares/handleRequest.middleware";
import {
  IItemsResponse,
  IBusinessResponse,
  ISalesPersonResponse,
  IUsageResponse,
  IProjectResponse,
} from "./@types";

export const fetchItems = async (link: string): Promise<IItemsResponse> => {
  const response = await apiSAP.get<IItemsResponse>(link);
  return response.data;
};

export const fetchBusinessPartners = async (
  link: string
): Promise<IBusinessResponse> => {
  const response = await apiSAP.get<IBusinessResponse>(link);
  return response.data;
};

export const fetchSalesPersons = async (
  link: string
): Promise<ISalesPersonResponse> => {
  const response = await apiSAP.get<ISalesPersonResponse>(link);
  return response.data;
};

export const fetchProjects = async (
  link: string
): Promise<IProjectResponse> => {
  const response = await apiSAP.get<IProjectResponse>(link);
  return response.data;
};

export const fetchMainUsage = async (link: string): Promise<IUsageResponse> => {
  const response = await apiSAP.get<IUsageResponse>(link);
  return response.data;
};
