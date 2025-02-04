/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseUrl } from "@/config";
import axios, { AxiosRequestConfig } from "axios";

export const ID_PLACEHOLDER = "{id}";

export const buildEndpointUrl = (ids: ApiIds, apiEndPoint: string): string => {
  const allIds = Array.isArray(ids) ? ids : [ids];
  const numberIds = allIds.map((currentId) => (typeof currentId === "string" ? parseInt(currentId, 10) : currentId));

  return numberIds.reduce((accUrl, currentId) => accUrl.replace(ID_PLACEHOLDER, currentId.toString()), apiEndPoint);
};

export const buildUrlWithFilters = (ids: ApiIds, apiEndPoint: string, filters?: Record<string, unknown>): string => {
  let url = buildEndpointUrl(ids || [], apiEndPoint);

  if (filters) {
    const queryStringParams: { [key: string]: string } = {};
    Object.keys(filters).forEach((key) => {
      const value = filters[key];
      if (value && value.toString().length > 0) {
        queryStringParams[key] = value.toString();
      }
    });

    const params = new URLSearchParams(queryStringParams);
    if (params.toString().length > 0) {
      url += `?${params.toString()}`;
    }
  }

  return url;
};

export type ApiIds = number | string | (number | string)[];

const api = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json"
  }
});

export const apiHandler = async <T>(
  method: "GET" | "POST" | "PUT" | "DELETE",
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig
): Promise<T> => {
  try {
    const response = await api({
      method,
      url,
      data,
      ...config
    });
    console.log(response.data);
    return response.data;
  } catch (error: any) {
    console.error(`API ${method} request to ${url} failed:`, error.response || error);
    throw error.response?.data || error;
  }
};

export default api;
