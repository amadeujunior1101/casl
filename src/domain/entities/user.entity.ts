export enum RoleTypes {
  SysAdmin = "sysAdmin",
  Admin = "admin",
  User = "user",
}

export class User {
  id: string;
  role: RoleTypes;
  isAdmin: boolean;
}
