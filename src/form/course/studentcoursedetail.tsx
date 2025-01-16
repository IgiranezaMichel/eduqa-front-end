import { ReactNode, useEffect, useState } from "react"
import { LectureCourseDao } from "../../controller/lecturecourses";
import { Avatar, Box, Dialog, IconButton, LinearProgress, Step, StepLabel, Stepper } from "@mui/material";
import { Check, Close, Message } from "@mui/icons-material";
import { LectureCourseProgressReportDao } from "../../controller/lecturecourseprogressreport";
import { ILectureCourseProgressReport } from "../../interface/lecturecoursecontentreport";
import { Toaster } from "sonner";
import { useLectureCourseProgressReportContext } from "../../context/lecturecourseprogressreport";
import { CourseContentComment } from "./coursecontentcomment";
export const StudentCourseDetail = (prop: { lectureCourse: any, children: ReactNode }) => {
  const [courseContent, setCourseContent] = useState<any>({});
  const [courseProgress, setCourseProgress] = useState<any>({});
  const [currentChapter, setCurrentChapter] = useState<any>(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [courseProgressReport, setCourseProgressReport] = useState<ILectureCourseProgressReport>({
    id: '', lectureCourseContentId: '', title: ''
  });
  const { content } = useLectureCourseProgressReportContext();
  useEffect(
    () => {
      new LectureCourseDao().getLectureCourseContent(prop.lectureCourse.lectureCourseId)
        .then(data => {
          setCourseContent(data.data);
          setCourseProgressReport({ ...courseProgressReport, lectureCourseContentId: data.data.id })
        }).catch(err => console.log(err.response.data));
    }, []
  )
  useEffect(
    () => {
      new LectureCourseProgressReportDao().getCurrentChapter(prop.lectureCourse.lectureCourseId)
        .then(data => { setCurrentChapter(data.data); }).catch(err => console.log(err));
    }, []
  )
  return <div>
    <div>{prop.children}</div>
    <div className="flex flex-col m-auto items-center p-2 border">
      <Avatar src={prop.lectureCourse.lecture.picture} className="m-auto w-40 h-40" />
      <div>
        <div>Lecture name: {prop.lectureCourse.lecture.name}</div>
        <div>Email : {prop.lectureCourse.lecture.email}</div>
        <div>Phone number: {prop.lectureCourse.lecture.phoneNumber}</div>
      </div>
    </div>
    {Object.keys(courseContent).length != 0 && <Box sx={{ width: '100%', mt: 3, mb: 2 }}>
      <Stepper activeStep={currentChapter} alternativeLabel>
        {[...new Array(courseContent.totalChapter)].map((label) => (
          <Step key={label}>
            <StepLabel></StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>}
    <section className="grid grid-cols-2 p-2 gap-2 border rounded-md">

      {courseContent != undefined && courseContent.description != undefined && courseContent.description.length != 0 ?
        <div>
          <div className="font-bold">
            Course content
          </div>
          <div className="p-1 border border-gray-300 rounded-md" dangerouslySetInnerHTML={{ __html: courseContent.description }} />
        </div>
        :
        <div className="border h-full w-full items-center flex justify-center">No course content Added yet</div>}
      <section >
        <div className="font-bold">Course progress</div>
        <div className="p-1 border border-gray-300 rounded-md">
          <section className="bg-blue-950 text-white p-2 rounded-md">
            <div className="flex justify-between items-center clear-both">

              <div className="font-bold">
                {Object.keys(courseContent).length == 0 && courseContent.totalChapter == null ? 'No course content found' :
                  <>
                    <div className="font-bold">
                      Completed Course content
                    </div>
                    <div className="float-end"> {currentChapter}/{courseContent.totalChapter}</div>
                    <LinearProgress variant="determinate" className="w-full" value={courseContent.currentChapter != null ? ((courseContent.currentChapter / courseContent.totalChapter) * 100) : 0} />
                    <b>Course Progress</b>
                  </>
                }
              </div>
            </div>
          </section>
          {content.map((data: any) => <section className="bg-slate-500 items-center">
            <div className="flex justify-between mb-1 mt-1">
              <div className="flex"><b className="bg-blue-950 text-white p-1">{data.currentChapter}.</b> {data.title}</div> <Check />
            </div>
            <div className="flex justify-between">
              <div className="bg-blue-950">
                <Message className="text-white p-1" onClick={() => { setCourseProgress(data); setOpenDialog(true) }} />
              </div>
              <div className="clear-both  text-sm">{data.timeStamp}</div>
            </div>
          </section>)}
        </div>
      </section>
    </section>
    <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
      <CourseContentComment lectureCourseProgress={courseProgress}>
        <div className="flex justify-between items-center gap-10 p-2 bg-blue-900 text-white font-bold sticky top-0 z-50">
          <section>
            <div>Course: {prop.lectureCourse.course.name}</div>
            <div>Course code: {prop.lectureCourse.course.code}</div>
            <div>Lecture : {prop.lectureCourse.lecture.name}</div>
          </section>
          <IconButton className="text-white" onClick={() => setOpenDialog(false)}>
            <Close />
          </IconButton>
        </div>
      </CourseContentComment>

      <Toaster />
    </Dialog>
  </div>
}