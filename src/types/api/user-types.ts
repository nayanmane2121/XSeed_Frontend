import { UserRole } from "../enums/user-role-enum";

export interface User {
  id: string;
  email: string;
  team?: string;
  userRole: UserRole;
  name: string;
}
