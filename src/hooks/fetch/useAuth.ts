/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSetRecoilState, useRecoilValue } from "recoil";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/api/apiHandler";
import { authState } from "@/atoms/authAtom";
import { userPermissionsState } from "@/atoms/userPermissionsAtom";
import { rolePermissions } from "@/types/user/user-role";
import { LoginCredentials, LoginResponse } from "@/types/api/security-types";
import { UserRole } from "@/types/enums/user-role-enum";
import toast from "react-hot-toast";

export const useAuth = () => {
  const setAuthState = useSetRecoilState(authState);
  const setUserPermissions = useSetRecoilState(userPermissionsState);
  const auth = useRecoilValue(authState);
  const router = useRouter();
  const queryClient = useQueryClient(); // For cache management

  // Mutation for login
  const loginMutation = useMutation({
    mutationFn: async (credentials: LoginCredentials): Promise<LoginResponse> => {
      const response = await api.post("/auth/login", { ...credentials, userName: credentials.email });
      return response.data;
    },
    onSuccess: (response) => {
      const { token, user } = response;
      const { userRole } = user;

      if (!rolePermissions[userRole]) {
        throw new Error("Invalid user role");
      }

      // Update Recoil states
      setAuthState({
        token,
        user: {
          email: user.email,
          role: user.role,
          userId: user.id,
          userRole
        }
      });

      setUserPermissions({
        role: userRole,
        permissions: rolePermissions[userRole].permissions,
        allowedPaths: rolePermissions[userRole].allowedPaths
      });

      // Show success toast
      toast.success("Login successful!");

      // Set cookies
      document.cookie = `auth_token=${token}; path=/`;
      document.cookie = `user_type=${userRole}; path=/`;

      // Redirect based on role
      switch (userRole) {
        case UserRole.SUPER_ADMIN:
          router.push("/admin/dashboard");
          break;
        case UserRole.RECRUITER_TEAMLEAD:
        case UserRole.RECRUITER_MEMBER:
          router.push("/recruiter/dashboard");
          break;
        case UserRole.CANDIDATE:
          router.push("/candidate/dashboard");
          break;
        default:
          throw new Error("Unknown user role");
      }
    },
    onError: (error: any) => {
      console.log("Login error:", error);
      toast.error(error.response?.data?.error || "Login failed. Please try again.");

      // throw error;
    }
  });

  // Mutation for logout
  const logoutMutation = useMutation({
    mutationFn: async () => {
      // Clear cookies and reset Recoil states
      document.cookie = "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
      document.cookie = "user_type=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
      setAuthState({ token: null, user: null });
      setUserPermissions({
        role: UserRole.CANDIDATE,
        permissions: rolePermissions[UserRole.CANDIDATE].permissions,
        allowedPaths: rolePermissions[UserRole.CANDIDATE].allowedPaths
      });

      // Invalidate React Query cache
      queryClient.clear();
      toast.success("Logout successful!");

      // Redirect to role-specific login page
      const userRole = auth?.user?.userRole;
      switch (userRole) {
        case UserRole.SUPER_ADMIN:
          router.push("/admin/login");
          break;
        case UserRole.RECRUITER_TEAMLEAD:
        case UserRole.RECRUITER_MEMBER:
          router.push("/recruiter/login");
          break;
        case UserRole.CANDIDATE:
          router.push("/candidate/login");
          break;
        default:
          router.push("/"); // Redirect to a generic home or login page
      }
    }
  });

  const login = async (credentials: LoginCredentials) => {
    await loginMutation.mutateAsync(credentials);
  };

  const logout = async () => {
    await logoutMutation.mutateAsync();
  };

  return { login, logout, loginMutation, logoutMutation };
};
