import { useMutation } from "@tanstack/react-query";
import { apiHandler, buildEndpointUrl } from "@/api/apiHandler";

export const useDeleteData = (apiEndPoint: string) => {
  return useMutation({
    mutationFn: async (ids: (string | number)[]): Promise<void> => {
      const url = buildEndpointUrl(ids, apiEndPoint); // Dynamically replace placeholders
      return await apiHandler<void>("DELETE", url);
    },
  });
};
