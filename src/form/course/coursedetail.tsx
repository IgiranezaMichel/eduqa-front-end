import { ReactNode, useEffect, useState } from "react"
import { LectureCourseDao } from "../../controller/lecturecourses";
import { Box, Button, Dialog, IconButton, Step, StepLabel, Stepper, TextField } from "@mui/material";
import { Add, Check, Close, Message } from "@mui/icons-material";
import { LectureCourseProgressReportDao } from "../../controller/lecturecourseprogressreport";
import { ILectureCourseProgressReport } from "../../interface/lecturecoursecontentreport";
import { toast, Toaster } from "sonner";
import { useLectureCourseProgressReportContext } from "../../context/lecturecourseprogressreport";
import { CourseContentComment } from "./coursecontentcomment";
export const CourseDetail = (prop: { lectureCourse: any, children: ReactNode }) => {
  const [courseContent, setCourseContent] = useState<any>({});
  const [currentChapter, setCurrentChapter] = useState<any>(0);
  const [openDialog, setOpenDialog] = useState({ open: false, type: '' });
  const [courseProgress, setCourseProgress] = useState<any>({});
  const [courseProgressReport, setCourseProgressReport] = useState<ILectureCourseProgressReport>({
    id: '', lectureCourseContentId: '', title: ''
  });
  const { content, refresh } = useLectureCourseProgressReportContext();
  useEffect(
    () => {
      new LectureCourseDao().getLectureCourseContent(prop.lectureCourse)
        .then(data => {
          setCourseContent(data.data);
          setCourseProgressReport({ ...courseProgressReport, lectureCourseContentId: data.data.id })
        }).catch(err => console.log(err.response.data));
    }, []
  )
  useEffect(
    () => {
      new LectureCourseProgressReportDao().getCurrentChapter(prop.lectureCourse)
        .then(data => { setCurrentChapter(data.data); }).catch(err => console.log(err));
    }, []
  )
  const handleSave = (e: any) => {
    e.preventDefault();
    new LectureCourseProgressReportDao().createLectureCourseProgressReport(courseProgressReport)
      .then(data => { refresh(); toast.success(data.data) })
      .catch(err => { toast.error(err.response.data) })
  }
  return <div>
    <div>{prop.children}</div>
    <Box sx={{ width: '100%', mt: 3, mb: 2 }}>
      <Stepper activeStep={currentChapter} alternativeLabel>
        {[...new Array(courseContent.totalChapter)].map((label) => (
          <Step key={label}>
            <StepLabel></StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
    <section className="grid grid-cols-2 p-2 gap-2">
      <div className="p-1 border border-gray-300 rounded-md" dangerouslySetInnerHTML={{ __html: courseContent.description }} />
      <section className="p-1 border border-gray-300 rounded-md">
        <section className="bg-blue-950 text-white p-2 rounded-md">
          <div className="float-end">
            {currentChapter}/{courseContent.totalChapter}
          </div>
          <div className="flex justify-between clear-both">
            <div className="font-bold">Progress</div>
            <div className="font-bold">
              <IconButton onClick={() => setOpenDialog({ type: 'progress', open: true })} className="text-white">
                <Add />
              </IconButton>
            </div>
          </div>
        </section>
        {content.map((data: any) => <section className="bg-slate-500 items-center">
          <div className="flex justify-between mb-1 mt-1">
            <div className="flex"><b className="bg-blue-950 text-white p-1">{data.currentChapter}.</b> {data.title}</div> <Check />
          </div>
          <div className="flex justify-between">
            <div className="bg-blue-950">
              <Message onClick={() => { setCourseProgress(data); setOpenDialog({ type: 'comment', open: false }) }} className="text-white p-1" />
            </div>
            <div className="clear-both  text-sm">{data.timeStamp}</div>
          </div>
        </section>)}
      </section>
    </section>
    <Dialog open={openDialog.open && openDialog.type == 'comment'} onClick={() => setOpenDialog({ ...openDialog, open: false })}>
      <CourseContentComment lectureCourseProgress={courseProgress}>
        <div className="flex justify-between items-center gap-10 bg-blue-900 text-white font-bold">
          <section>
            {/* <div>Course: {prop.lectureCourse.course.name}</div> */}
            {/* <div>Course code: {prop.lectureCourse.course.code}</div> */}
            {/* <div>Lecture : {prop.lectureCourse.lecture.name}</div> */}
          </section>
          <IconButton className="text-white" onClick={() => setOpenDialog({ ...openDialog, open: false })}>
            <Close />
          </IconButton>
        </div>
      </CourseContentComment>
    </Dialog>
    <Dialog open={openDialog.open && openDialog.type == 'progress'} onClose={() => setOpenDialog({ ...openDialog, open: false })}>
      <section className="">
        <div className="flex justify-between bg-blue-950 text-white p-2">
          <div className="font-bold">Track progress</div>
          <IconButton onClick={() => setOpenDialog({ ...openDialog, open: false })} className="font-bold text-white"><Close /></IconButton>
        </div>
        <form className="p-2" onSubmit={handleSave}>
          <TextField onChange={(e) => setCourseProgressReport({ lectureCourseContentId: courseContent.id, id: '', title: e.target.value })} placeholder="Enter chapter name" fullWidth />
          <div className="float-end">
            <Button variant="contained" type="submit" className="bg-blue-950 text-white p-2 mt-3 mb-3">Save</Button>
          </div>
        </form>
      </section>
      <Toaster />
    </Dialog>
  </div>
}