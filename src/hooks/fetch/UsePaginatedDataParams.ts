import { useQuery } from "@tanstack/react-query";
import { apiHandler, ApiIds, buildEndpointUrl } from "@/api/apiHandler";
import { ApiError, PaginatedApiResponse } from "@/types/api/api-types";

interface UsePaginatedDataParams<TFilters> {
  apiEndPoint: string; // The API endpoint
  queryKey: string; // Cache key
  ids?: ApiIds,
  filters?: TFilters; // Generic type for filters
  pagination: { pageNo: number; pageSize: number }; // Pagination params
  enabled?: boolean,
}

export const usePaginatedData = <TData, TFilters = Record<string, unknown>>({
  apiEndPoint,
  queryKey,
  ids = [],
  filters = {} as TFilters,
  pagination,
  enabled = true,
}: UsePaginatedDataParams<TFilters>) => {
  const fetchPaginatedData = async (): Promise<PaginatedApiResponse<TData>> => {
    const params = {
      ...filters,
      pageNo: pagination.pageNo,
      pageSize: pagination.pageSize
    };
    const updatedApiEndPointWithIds = buildEndpointUrl(ids, apiEndPoint);
    const url = `${updatedApiEndPointWithIds}?${new URLSearchParams(params as Record<string, string>).toString()}`;

    return await apiHandler<PaginatedApiResponse<TData>>("GET", url);
  };

  const { data, isLoading, error, refetch } = useQuery<PaginatedApiResponse<TData>, ApiError>({
    queryKey: [queryKey, filters, pagination],
    queryFn: fetchPaginatedData,
    keepPreviousData: true,
    enabled
  });

  return {
    data: data?.responseData || [],
    totalCount: data?.totalCount || 0,
    totalPages: data?.totalPages || 0,
    currentPage: data?.currentPage || 0,
    isLoading,
    error,
    refetch
  };
};
