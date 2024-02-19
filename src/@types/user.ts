export interface IUserData {
  id?: string;
  name: string,
  email: string,
  role: "admin" | "member"
}

export interface IEditMember {
  name?: string,
  email?: string,
  role?: string,
  password?: string
}