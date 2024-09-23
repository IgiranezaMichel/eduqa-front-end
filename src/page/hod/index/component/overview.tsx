import { Feedback, HistoryEduSharp, People } from "@mui/icons-material"
import { DashboardCard } from "./DashboardCard"
import { useEffect, useState } from "react";
import { UserDao } from "../../../../controller/userDao";
import { CourseDao } from "../../../../controller/courseDao";
import { Role } from "../../../../enum/role";
import { toast } from "sonner";
import { SemesterDao } from "../../../../controller/semesterdao";
import { UserStatus } from "../../../../enum/userStatus";

export const HodOverview = () => {
    const [totalStudents, setTotalStudents] = useState(0)
    const [totalCourses, setTotalCourses] = useState(0)
    const [totalLecture, setTotalLecture] = useState(0)
    const [semester, setSemester] = useState<any>({})
    useEffect(() => {
        new UserDao().countUserByRole(Role.ROLE_STUDENT,UserStatus.ACTIVE).then((res) => {
            setTotalStudents(res.data)
        }).catch((err) => {
            toast.error(err.message);
        });
        new UserDao().countUserByRole(Role.ROLE_INSTRACTOR,UserStatus.ACTIVE).then((res) => {
            setTotalLecture(res.data)
        }).catch((err) => {
            toast.error(err.message);
        })
        new CourseDao().countCourse().then((res) => {
            setTotalCourses(res.data)
        }).catch((err) => {
            toast.error(err.message);
        })
        new SemesterDao().getCurrentSemester().then((res) => {
            setSemester(res.data)
        }).catch((err) => {
            toast.error(err.message);
        })
    },[])
  return <>
  <div className="flex items-center justify-between border-t-4 border-t-blue-900 mt-5 p-2 border border-b-4 border-b-blue-200/50">
            <div className="border-r border-r-blue-200 pe-2">
                <div className="text-slate-600 font-bold mb-2 ">
                    Semester {semester.semNumber=1?'I':semester.semNumber=2?'II':semester.semNumber=3?'III':semester.semNumber=4?'IV':semester.semNumber=5?'V':semester.semNumber=6?'VI':semester.semNumber=7?'VII':semester.semNumber=8?'VIII':''}
                </div>
                <div className="text-sm font-bold">{semester.semesterName}</div>
            </div>
            <DashboardCard icon={<People />} title="Students"
            path="/hod/students"
             className="border-r border-r-blue-200 px-5" total={totalStudents} />
            <DashboardCard icon={<HistoryEduSharp />}  path="/hod/courses"
            className="border-r border-r-blue-200 px-5" title="Courses" total={totalCourses} />
            <DashboardCard icon={<People />} path="/hod/lectures"
             className="border-r border-r-blue-200 ps-5" title="Lecturers" total={totalLecture} />
            <DashboardCard icon={<Feedback />} 
            path="/hod/suggestions"
            title="Suggestions" total={15} />
        </div></>
}