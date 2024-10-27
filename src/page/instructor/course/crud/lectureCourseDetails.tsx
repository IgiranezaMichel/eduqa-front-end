import { CourseContentForm } from "../../../../form/course/coursecontent"
import { useLectureCourseContentContext } from "../../../../context/lecturecoursecontent"
import { useEffect, useState } from "react";
import { AddCircle } from "@mui/icons-material";
import { Box, Step, StepLabel, Stepper } from "@mui/material";
import { LectureCourseDao } from "../../../../controller/lecturecourses";
import { LectureCourseProgressReportDao } from "../../../../controller/lecturecourseprogressreport";
export const LectureCourseContent = (prop: { lectureCourseContent: any }) => {
    const { content } = useLectureCourseContentContext();
    const [addCourse, setAddCourse] = useState(false) 
    const [courseContent,setCourseContent]=useState<any>({});
    const [currentChapter,setCurrentChapter]=useState<any>(0);
    useEffect(
        ()=>{
            new LectureCourseDao().getLectureCourseContent(prop.lectureCourseContent)
            .then(data=>setCourseContent(data.data)).catch(err=>console.log(err));            
        },[]
    )
    useEffect(
        ()=>{
            new LectureCourseProgressReportDao().getCurrentChapter(prop.lectureCourseContent)
            .then(data=>setCurrentChapter(data.data)).catch(err=>console.log(err));
        }
    )   
 return <section className="p-2">
        <div className="flex justify-between mb-5">
        </div>
        <div className="flex justify-between">
<div>
<Box sx={{ width: '100%' }}>
      <Stepper activeStep={currentChapter} alternativeLabel>
        {[...new Array(courseContent.totalChapter)].map((label) => (
          <Step key={label}>
            <StepLabel></StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
</div>
            {!addCourse ? <div className="flex gap-1">
                <button onClick={() => setAddCourse(true)} className="border p-1 m-1 bg-blue-950 text-white rounded-full">
                <AddCircle className="border-r-2"/> Add Course content</button>
                <button onClick={() => setAddCourse(true)} className="border p-1 m-1 bg-blue-950 text-white rounded-full">
                    <AddCircle className="border-r-2"/> Add Course progress report</button>
            </div>
                : <button onClick={() => setAddCourse(false)} className="bg-red-900 text-white p-1 m-1 rounded-full">close add course content</button>}
        </div>
       <>
        {Object.keys(content).length != 0 ? 
        <div className={`${addCourse ? 'hidden' : 'w-full'}`} dangerouslySetInnerHTML={{ __html: content.description }} />
            : <div>No course content Added yet</div>}
        {addCourse ? <CourseContentForm lectureCourseContent={prop.lectureCourseContent} className={'border p-2 bg-slate-400/10 mb-4 rounded-xl'} /> : <></>}
       </>
    </section>
}