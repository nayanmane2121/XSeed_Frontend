import { UserRole } from "../enums/user-role-enum";

export type LoginRequest = {
  username: string;
  password: string;
};

export interface LoginCredentials {
  email: string;
  password: string;
  team?: string;
}

export interface LoginResponse {
  token: string;
  user: {
    email: string;
    role: UserRole;
    id: number;
    userRole: UserRole;
  };
}

export type AccessToken = {
  token: string;
  expiresAt: Date;
  expiresAtTicks: number;
};

export type RefreshToken = {
  hasExpired: boolean;
  createdAt: Date;
  revokedAt: Date | null;
  isActive: boolean;
  token: string;
  expiresAt: Date;
  expiresAtTicks: number;
};

// export type LoginResponse = {
//   token: string;
//   tokenType: string;
//   expiresIn: number;
// };

// export enum UserRole {
//   Admin = "Admin",
//   User = "User"
// }

export type Tokens = Omit<Partial<LoginResponse>, "userAccountId">;

// export type AuthenticationState = {
//   isLoggedIn?: boolean;
//   userAccountId?: number;
//   userRole?: UserRole;
//   userName?: string;
// };

export const ROLE_IDENTITY_CLAIM = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";

export type DecodedToken = {
  aud: string;
  sub: string;
  exp: number;
  [ROLE_IDENTITY_CLAIM]: UserRole;
  iss: string;
  userAccessRights: string[];
  name: string;
};

export type OnSuccessfulLoginFn = (loginResponse: LoginResponse) => void | undefined;

export type RefreshTokenRequest = LoginResponse;

export type RefreshTokenResponse = LoginResponse;

export type LogoutRequest = {
  userAccountId: number;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type RefreshTokenHandlerFn = (failedRequest: any) => Promise<RefreshTokenResponse>;

export type OnRefreshTokenFailedFn = () => void;

export type AccessRightType = {
  userRole: UserRole;
  accessRightTypeId: number;
  shortName: string;
  description: string;
};
