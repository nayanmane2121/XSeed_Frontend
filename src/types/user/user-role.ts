import { UserRole } from "../enums/user-role-enum";

type RolePermissions = {
  [role in UserRole]: {
    allowedPaths: string[];
    permissions: {
      canView: boolean;
      canEdit: boolean;
      canDelete: boolean;
    };
  };
};

export const rolePermissions: RolePermissions = {
  [UserRole.SUPER_ADMIN]: {
    allowedPaths: ["/admin", "/recruiter", "/candidate"],
    permissions: {
      canView: true,
      canEdit: true,
      canDelete: true
    }
  },
  [UserRole.RECRUITER_TEAMLEAD]: {
    allowedPaths: ["/recruiter"],
    permissions: {
      canView: true,
      canEdit: true,
      canDelete: true
    }
  },
  [UserRole.RECRUITER_MEMBER]: {
    allowedPaths: ["/recruiter"],
    permissions: {
      canView: true,
      canEdit: false,
      canDelete: false
    }
  },
  [UserRole.CANDIDATE]: {
    allowedPaths: ["/candidate"],
    permissions: {
      canView: true,
      canEdit: false,
      canDelete: false
    }
  }
};
