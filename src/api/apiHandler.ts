/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosRequestConfig } from "axios";

export const ID_PLACEHOLDER = "{id}";

export const buildEndpointUrl = (ids: ApiIds, apiEndPoint: string): string => {
  if (typeof apiEndPoint !== "string") {
    throw new Error("apiEndPoint must be a string");
  }

  const allIds = Array.isArray(ids) ? ids.map((id) => (typeof id === "string" ? id : id.toString())) : [ids];

  return allIds.reduce((accUrl: string, currentId) => {
    const idAsString = typeof currentId === "string" ? currentId : currentId.toString(); // Ensure it's always a string

    return accUrl.replace(ID_PLACEHOLDER, idAsString);
  }, apiEndPoint);
};

export const buildCacheKey = (ids: ApiIds, cacheKeyTemplate: string): string => {
  const allIds = Array.isArray(ids) ? ids : [ids];

  return allIds.reduce((accUrl: string, currentId) => {
    const idAsString = typeof currentId === "number" || !isNaN(Number(currentId)) ? currentId.toString() : String(currentId); // Ensure ID is always a string

    return accUrl.replace(ID_PLACEHOLDER, idAsString);
  }, cacheKeyTemplate);
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
  baseURL: "/api" ,// baseURL
  // withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "true" // Disable ngrok warning and errors
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
