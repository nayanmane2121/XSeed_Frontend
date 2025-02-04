import { useMutation } from "@tanstack/react-query";
import { apiHandler, ApiIds, buildEndpointUrl } from "@/api/apiHandler";

export const usePostData = <T, U>(url: string, ids: ApiIds = []) => {
  return useMutation({
    mutationFn: async (data: U & { id?: string | number }): Promise<T> => {

      const apiEndPoint = buildEndpointUrl(ids, url);

      return await apiHandler<T>("POST", apiEndPoint, data);
    }
  });
};
