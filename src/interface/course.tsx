import { CourseCategory } from "../enum/coursecategory"

export interface ICourse{
    id?:string
    name:string,
    type:CourseCategory
    departmentId?:string

}