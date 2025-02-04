import { useMutation } from "@tanstack/react-query";
import { apiHandler, ID_PLACEHOLDER } from "@/api/apiHandler";

export const useUpdateData = <T, U>(apiEndPoint: string, id: number | string) => {
  const url = apiEndPoint.replace(ID_PLACEHOLDER, id.toString());
  return useMutation({
    mutationFn: async (data: U): Promise<T> => {
      return await apiHandler<T>("PUT", url, data);
    },
  });
};
