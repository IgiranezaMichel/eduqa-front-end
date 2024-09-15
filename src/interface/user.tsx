import { Role } from "../enum/role"

export interface IUser{
    id:string
    name:string
    gender:string
    phoneNumber:string
    email:string
    password:string
    picture:string
    role:Role
    departmentId?:string
}