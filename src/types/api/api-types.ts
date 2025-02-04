/* eslint-disable @typescript-eslint/no-unused-vars */
import OrderByEnum from "@/types/enums/order-by-enum";
import { RefreshTokenResponse } from "./security-types";
import { SearchCriteria } from "../search-criteria-type";
import { useMockData } from "@/config";

// Environment-specific base URLs
const apiBillingAuthenticationBaseUrl = useMockData ? "" : process.env.NEXT_PUBLIC_BILLING_AUTHENTICATION_API_URL || "";
const apiCrmIndustryCoreBaseUrl = useMockData ? "" : process.env.NEXT_PUBLIC_CRM_INDUSTRY_API_URL || "";
const apiPaymentSettlementCoreBaseUrl = useMockData ? "" : process.env.NEXT_PUBLIC_PAYMENT_SETTLEMENT_API_URL || "";

// Define API endpoints
export const ApiEndPoint = {
  // LOGIN: `${apiBillingAuthenticationBaseUrl}/auth/login`,
  // LOGOUT: `${apiBillingAuthenticationBaseUrl}/auth/logout`,
  // REFRESH_TOKEN: `${apiBillingAuthenticationBaseUrl}/auth/refresh-token`,
  // FORGOT_PASSWORD: `${apiBillingAuthenticationBaseUrl}/auth/forgot-password`,
  // RESET_PASSWORD: `${apiBillingAuthenticationBaseUrl}/auth/reset-password`,
  LOGIN: "/auth/login",
  LOGOUT: "/auth/logout",
  REFRESH_TOKEN: "/auth/refresh-token",
  FORGOT_PASSWORD: "/auth/forgot-password",
  RESET_PASSWORD: "/auth/reset-password",
  GET_ALL_JOBS: "/all-jobs",
  GET_JOB_BY_ID: "/jobs/{id}",
  CREATE_JOB: "/jobs/create",
  UPDATE_JOB: "/jobs/{id}/update",
  DELETE_JOB: "/jobs/{id}/delete",
  
  GET_JOBS_SUGGESTED_CANDIDATES: "/jobs/{id}/suggested-candidates",
  GET_JOBS_ALL_SUGGESTED_CANDIDATES: "/jobs/{id}/all-suggested-candidates",
  UPDATE_JOBS_ASSOCIATE_CANDIDATES: "/jobs/{id}/associate-candidates",



  
  GET_ALL_CANDIDATES: "/candidates",
  GET_CANDIDATE_BY_ID: "/candidates/{id}",
  CREATE_CANDIDATE: "/candidates/create",
  UPDATE_CANDIDATE: "/candidates/{id}/upladate",
  DELETE_CANDIDATE: "/candidates/{id}/delete",

  GET_CUSTOMER_DETAILS: "/customers/{id}/details",
  UPDATE_CUSTOMER: "/customers/{id}/update",
  DELETE_CUSTOMER: "/customers/{id}/delete",
  GET_ALL_CUSTOMERS: "/customers",
  CREATE_CUSTOMER: "/customers/create",
  GET_USER_PROFILE: "/users/{id}/profile",
  UPDATE_USER_PROFILE: "/users/{id}/update",
  GET_ALL_USERS: "/users",
  CREATE_USER: "/users/create",
  DELETE_USER: "/users/{id}/delete"
  // Add other endpoints as needed
} as const;


// Type for API endpoints
export type ApiEndPoint = (typeof ApiEndPoint)[keyof typeof ApiEndPoint];

// Define API result structure
export type ApiResult<T> = {
  success: boolean;
  errorMessages?: string[];
  data?: T;
};

// Define API response structure
export type ApiResponse<T> = {
  responseData: T;
};

// Define paginated API response

export type PaginatedApiResponse<T> =  {
  responseData: T[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
}

// Define API request type
export type ApiRequest = {
  endPoint: ApiEndPoint;
};

// Define paginated API request type
export type PaginatedApiRequest = ApiRequest & {
  pageNo: number;
  pageSize: number;
  sortBy?: string | null;
  orderBy?: OrderByEnum | null;
  searchData: SearchCriteria | null;
};

// Define request type for fetching paginated data
export type FetchPaginatedDataRequest = Omit<PaginatedApiRequest, "endPoint">;

// Define API error type
export type ApiError = {
  statusCode?: number;
  message?: string;
};

// Define callback for handling API errors
export type OnErrorFn = (apiError: ApiError) => void;

// Define callback for handling token refresh
export type OnTokenRefreshed = (refreshTokenResponse: RefreshTokenResponse) => void;

// Pagination-related types
export type SortInfo = {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
};

export type Pageable = {
  sort: SortInfo;
  offset: number;
  pageNumber: number;
  pageSize: number;
  unpaged: boolean;
  paged: boolean;
};

export type PaginatedResponse<T> = {
  content: T[];
  pageable: Pageable;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  sort: SortInfo;
  first: boolean;
  numberOfElements: number;
  empty: boolean;
};
