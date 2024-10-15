import { ReactNode, useEffect, useState } from "react"
import { LectureCourseDao } from "../../controller/lecturecourses";
import { Box, Step, StepLabel, Stepper } from "@mui/material";
import { LectureCourseProgressReportDao } from "../../controller/lecturecourseprogressreport";

export const CourseDetail=(prop:{lectureCourse:any,children:ReactNode})=>{
    const [courseContent,setCourseContent]=useState<any>({});
    const [currentChapter,setCurrentChapter]=useState<any>(0);
    useEffect(
        ()=>{
            new LectureCourseDao().getLectureCourseContent(prop.lectureCourse)
            .then(data=>setCourseContent(data.data)).catch(err=>console.log(err));            
        },[]
    )
    useEffect(
        ()=>{
            new LectureCourseProgressReportDao().getCurrentChapter()
            .then(data=>setCurrentChapter(data.data)).catch(err=>console.log(err));
        }
    )
    return <div>
    <div>{prop.children}</div>
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={currentChapter} alternativeLabel>
        {[...new Array(courseContent.totalChapter)].map((label) => (
          <Step key={label}>
            <StepLabel></StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
    <section className="flex flex-col gap-2">
    <div dangerouslySetInnerHTML={{__html:courseContent.description}}/>
    <section>

    </section>
    </section>
    </div>
}