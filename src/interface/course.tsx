import { CourseCategory } from "../enum/coursecategory"

export interface ICourse{
    id?:string
    name:string,
    code:string,
    credit:number
    departmentId?:string

}