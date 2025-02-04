import { useMutation } from "@tanstack/react-query";
import { apiHandler, ID_PLACEHOLDER } from "@/api/apiHandler";

export const useDeleteData = (apiEndPoint: string, id: number | string) => {
  const url = apiEndPoint.replace(ID_PLACEHOLDER, id.toString());
  return useMutation({
    mutationFn: async (): Promise<void> => {
      return await apiHandler<void>("DELETE", url);
    },
  });
};
