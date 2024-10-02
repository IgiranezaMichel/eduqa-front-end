import { ReactNode, useEffect } from "react"
import { LectureCourseContent } from "./lectureCourseDetails"
import { useLectureCourseContentContext } from "../../../../context/lecturecoursecontent"

export const CourseAction = (prop: { lectureCourseContent: any, children: ReactNode }) => {
    const {update}=useLectureCourseContentContext();
        
    useEffect(
        ()=>{
            update(prop.lectureCourseContent.lectureCourseId)
        },[prop.lectureCourseContent.lectureCourseId]
    )
    return <>
        <div className="flex justify-between bg-blue-950 text-white sticky top-0 p-1">
            <div>
                <div className="text-xl font-bold">{prop.lectureCourseContent.lectureCourseCode}</div>
                <div className="text-sm">{prop.lectureCourseContent.lectureCourseName}</div>
            </div>
            {prop.children}
        </div>
        <div className="flex gap-3 border-b mb-3 pb-1">
            <button className="border p-1">Content</button>
            <button className="border p-1">Suggestions</button>
        </div>
       {prop.lectureCourseContent.lectureCourseId!=undefined&& <LectureCourseContent lectureCourseContent={prop.lectureCourseContent} />}
    </>
}