import { CourseContentForm } from "../../../../form/course/coursecontent"
import { useLectureCourseContentContext } from "../../../../context/lecturecoursecontent"
import { useState } from "react";
import { LinearProgress } from "@mui/material";
export const LectureCourseContent = (prop: { lectureCourseContent: any }) => {
    const { content } = useLectureCourseContentContext();
    const [addCourse, setAddCourse] = useState(false) 
    console.log(prop.lectureCourseContent)       
    return <section className="p-2">
        <div className="flex justify-between mb-5">
            <div className="flex gap-5">
                <div className="bg-blue-950 text-white p-1 rounded-sm">Overal chapter <span className={`p-1 bg-white text-blue-950 rounded-md font-bold`}>{prop.lectureCourseContent.totalChapter==null?'table of content missing':prop.lectureCourseContent.totalChapter}</span></div>
                <div className="bg-blue-950/80 text-white p-1 rounded-sm">Current Chapter <span className={`p-1 bg-white text-blue-950 rounded-md font-bold`}>{prop.lectureCourseContent.totalChapter==null?'Initial':prop.lectureCourseContent.totalChapter}</span></div>
            </div>
            <div>
                <div className="text-sm">Course progress</div>
                <LinearProgress />
            </div>
        </div>
        <div className="flex justify-between">
<div></div>
            {!addCourse ? <button onClick={() => setAddCourse(true)} className="border p-1 m-1">Add Course content</button>
                : <button onClick={() => setAddCourse(false)}>close add course content</button>}
        </div>
        {Object.keys(content).length != 0 ? <div className={`${addCourse ? 'w-1/2' : 'w-full'}`} dangerouslySetInnerHTML={{ __html: content.description }} />
            : <div>No course content Added yet</div>}
        {addCourse ? <CourseContentForm lectureCourseContent={prop.lectureCourseContent} className={'border p-2 bg-slate-400/10 mb-4 rounded-xl'} /> : <></>}
    </section>
}