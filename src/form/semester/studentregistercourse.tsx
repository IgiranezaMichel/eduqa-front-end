import { ReactNode, useEffect, useState } from "react"
import { IStudentRegisterCourse } from "../../interface/studentregistercourse";

export const StudentRegisterCourseForm=(prop:{children:ReactNode,registration:any})=>{
    const [registration,setRegistration]=useState(prop.registration);
    const [courseRegistration,setCourseRegistration]=useState<IStudentRegisterCourse>({
        id:prop.registration.id,
        lectureCourseId:'',
        registrationId:prop.registration.registrationId
    })
    useEffect(
        ()=>{
            
        },[]
    )
    return <>
    </>
}