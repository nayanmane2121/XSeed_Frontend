import { useQuery } from "@tanstack/react-query";
import { apiHandler } from "@/api/apiHandler";
import { ApiIds, buildUrlWithFilters } from "@/api/apiHandler";
import { ApiResponse } from "@/types/api/api-types"; // Importing ApiResponse type

export const useFetchData = <T>(
  apiEndPoint: string,
  cacheKey: string,
  ids: ApiIds = [],
  queryParams?: Record<string, unknown>,
  enabled: boolean = true,
  keepPreviousData: boolean = false,
  triggerKey?: string | number
) => {
  const getData = async (): Promise<ApiResponse<T>> => {
    const url = buildUrlWithFilters(ids, apiEndPoint, queryParams);
    return await apiHandler<ApiResponse<T>>("GET", url);
  };

  const { isLoading, isFetching, data, error, refetch } = useQuery({
    queryKey: [cacheKey, ids, queryParams, triggerKey],
    queryFn: getData,
    enabled,
    keepPreviousData,
  });

  return {
    isLoadingData: isLoading || isFetching,
    isLoading,
    data: data?.responseData, // Safely accessing `responseData`
    error,
    refetch,
  };
};
