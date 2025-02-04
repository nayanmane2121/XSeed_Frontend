export const baseUrl = process.env.NEXT_PUBLIC_MOCK_DATA === "true" ? "/api" : process.env.NEXT_BASE_URL || "";
export const useMockData = process.env.NEXT_PUBLIC_MOCK_DATA === "true";