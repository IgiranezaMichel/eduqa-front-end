import { useEffect, useState } from "react"
import { Navigation } from "../../../component/navigation"
import { LectureCourseProvider } from "../../../context/lecturecourse"
import { InstructorMenu } from "../../../util/instructorMenu"
import { DisplayCourse } from "./display"
import { SemesterDao } from "../../../controller/semesterdao"
import { CourseDao } from "../../../controller/courseDao"
import { generateReport } from "../../../component/generatereport"
import { useAuthenticationContext } from "../../../context/authentication"
import { Download } from "@mui/icons-material"

export const InstructureCourse=()=>{
    const [semester,setSemester]=useState<any>({});
    const [semesterList,setSemesterList]=useState<any>([]);
    useEffect(() => {
        new SemesterDao().getCurrentSemester().then(data => {
            setSemester(data.data);
        }
        )
    },[])
    useEffect(() => {
        new SemesterDao().getAllSemester().then(data => {
            setSemesterList(data.data);
            })
        },[]
        )
    const changeSemester=(e:any)=>{
        new SemesterDao().getSemester(e.target.value).then(data => {
            setSemester(data.data);            
        })
    }
    const {content}=useAuthenticationContext();
    const generateCourseReport=()=>{
        new CourseDao().getLectureCourseWithInSemester(semester.id).then(data=>{
          generateReport(semester.semesterName+" Course Report",["Course Name","Course Code","Course Credit","Course Duration","Course Semester"],Array.from(data.data).map((course:any)=>[course.courseName,course.courseCode,course.courseCredit,course.courseDuration,course.semester.semesterName]),content.name);
        }
        )
    }
    return <Navigation items={InstructorMenu}>
        <LectureCourseProvider semesterId={semester.id}>
            <div className="w-full h-full overflow-x-hidden">
            <DisplayCourse content={<>
                <div className="flex gap-3 items-center">
                    <h1 className="text-2xl font-bold">{semester.semesterName}</h1>
                    <div>
                        <div className="text-sm">{semester.startingDate}</div>
                        <div className="text-sm">{semester.endDate}</div>
                    </div>
                </div>
                <select onChange={changeSemester} className="border border-gray-300 rounded-md px-2 py-1">
                    <option value="">Select semester</option>
                     {semesterList.map((item:any)=>{
                        return <option value={item.id} key={item.id}>{item.semesterName}</option>
                    })
                     }
                </select>
                <button 
                onClick={()=>generateCourseReport()}
                className="border border-gray-300 rounded-md px-2 py-1 flex items-center gap-2 *:\ i"><Download /></button>
                </>}/>
            </div>
        </LectureCourseProvider>
    </Navigation>
}