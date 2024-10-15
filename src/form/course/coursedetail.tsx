import { ReactNode, useEffect, useState } from "react"
import { LectureCourseDao } from "../../controller/lecturecourses";

export const CourseDetail=(prop:{lectureCourse:any,children:ReactNode})=>{
    const [courseContent,setCourseCountent]=useState<any>({});
    useEffect(
        ()=>{
            new LectureCourseDao().getLectureCourseContent(prop.lectureCourse)
            .then(data=>setCourseCountent(data.data)).catch(err=>console.log(err));
        }
    )
    return <>
    <div>{prop.children}</div>
    <div dangerouslySetInnerHTML={{__html:courseContent.description}}/>
    </>
}