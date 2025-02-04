import { UserRole } from "@/types/enums/user-role-enum";
import { rolePermissions } from "@/types/user/user-role";
import { atom } from "recoil";

export const userPermissionsState = atom({
  key: "userPermissionsState",
  default: {
    role: UserRole.CANDIDATE,
    permissions: rolePermissions[UserRole.CANDIDATE].permissions,
    allowedPaths: rolePermissions[UserRole.CANDIDATE].allowedPaths,
  },
});
