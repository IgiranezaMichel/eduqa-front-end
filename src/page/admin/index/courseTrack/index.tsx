import { useEffect, useState } from "react"
import { SemesterDao } from "../../../../controller/semesterdao";
import { LectureCourseProgressReportDao } from "../../../../controller/lecturecourseprogressreport";
import { Book, BookTwoTone } from "@mui/icons-material";
import { LinearProgress } from "@mui/material";

export const CourseOnTrack=()=>{
    const [semester, setSemester] = useState<any>({});
    const [courseList, setCourseList] = useState<any>([])
    useEffect(
        () => {
            new SemesterDao().getCurrentSemester().then(data => {
                setSemester(data.data); console.log(data.data);

            })
            if (Object.keys(semester).length != 0) {
                new LectureCourseProgressReportDao().findAllLatestLectureProgressReport(semester.id)
                    .then(data => {
                        setCourseList(data.data)
                    });
            }
        }, [semester.id]
    )
    return <section>
  <section className="mb-3">
  <div className="font-bold text-xl">
        Course on track
    </div>
    <div className="text-sm">
        Course progress report in a semester
    </div>
  </section>
    {
        courseList!=undefined&&courseList.length!=0&&courseList.map((items:any)=><>
        <div className="flex w-full  border items-center">
           <BookTwoTone className="text-5xl"/> 
           <div className="text-sm w-full">
           <div className="flex w-full justify-between">
           <div>{items.courseName}</div> {items.duration} hr
           </div>
           <LinearProgress variant="determinate" value={items.currentChapter} className="w-[100%]" />
           </div>
        </div>
        </>)
    }
    </section>
}