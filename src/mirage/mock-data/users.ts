import { User } from "@/types/api/user-types";
import { UserRole } from "@/types/enums/user-role-enum";

export const users: User[] = [
  {
    id: "1",
    name: "Archit Bamborikar",
    email: "archit@gmail.com",
    userRole: UserRole.CANDIDATE
  },
  {
    id: "2",
    name: "Sufiyan Shaikh",
    email: "sufiyan@gmail.com",
    userRole: UserRole.RECRUITER_TEAMLEAD,
    team: "india"
  },
  {
    id: "3",
    name: "Sneha barapatre",
    email: "sneha@gmail.com",
    userRole: UserRole.RECRUITER_MEMBER,
    team: "india"
  },
  {
    id: "4",
    name: "Nupur Patil",
    email: "nupur@gmail.com",
    userRole: UserRole.SUPER_ADMIN
  },
  {
    id: "5",
    name: "Albert Flores",
    email: "albert@gmail.com",
    userRole: UserRole.CANDIDATE
  }
];
