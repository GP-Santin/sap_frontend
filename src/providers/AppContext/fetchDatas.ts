import apiSAP from "../../middleware/handleRequest.middleware";
import { IItemsResponse, IBusinessResponse, ISalesPersonResponse } from "./@types";

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
