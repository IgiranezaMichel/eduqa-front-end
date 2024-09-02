import { CourseCategory } from "../enum/coursecategory"

export interface IStudent{
    id?:string
    firstName:string
    lastName:string
    regNumber:string
    gender:CourseCategory
    email:string
    semester:string
    profile:string
}