import { useQuery } from "@tanstack/react-query";
import { apiHandler, buildCacheKey } from "@/api/apiHandler";
import { ApiIds, buildUrlWithFilters } from "@/api/apiHandler";
// import { ApiResponse } from "@/types/api/api-types"; // Importing ApiResponse type

export const useFetchData = <T>(
  apiEndPoint: string,
  cacheKey: string,
  ids: ApiIds = [],
  queryParams?: Record<string, unknown>,
  enabled: boolean = true,
  keepPreviousData: boolean = false,
  triggerKey?: string | number
) => {
  const getData = async (): Promise<T> => {
    const url = buildUrlWithFilters(ids, apiEndPoint, queryParams);
    return await apiHandler<T>("GET", url);
  };

  const updatedCacheKey = buildCacheKey(ids, cacheKey);

  const { isLoading, isFetching, data, error, refetch } = useQuery({
    queryKey: [updatedCacheKey, ids, queryParams, triggerKey],
    queryFn: getData,
    enabled,
    keepPreviousData
  });

  return {
    isLoadingData: isLoading || isFetching,
    isLoading,
    data, // Safely accessing `responseData`
    error,
    refetch
  };
};
