import { Role } from "../enum/role"
import { UserStatus } from "../enum/userStatus"

export interface IUser{
    id:string
    name:string
    code:string
    gender:string
    phoneNumber:string
    email:string
    password:string
    picture:string
    role:Role
    status:UserStatus
    departmentId?:string
}