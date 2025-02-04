import { cookies } from "next/headers";

export async function getUserRoleFromServer(): Promise<string | null> {
  const cookieStore = cookies();
  return cookieStore.get("user_type")?.value || null;
}
