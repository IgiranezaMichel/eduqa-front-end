import { Feedback, HistoryEduSharp, People } from "@mui/icons-material"
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { UserDao } from "../../../controller/userDao";
import { Role } from "../../../enum/role";
import { CourseDao } from "../../../controller/courseDao";
import { SemesterDao } from "../../../controller/semesterdao";
import { DashboardCard } from "../../hod/index/component/DashboardCard";
import { LectureCourseDao } from "../../../controller/lecturecourses";

export const InstructorOverview = () => {
    const [totalStudents, setTotalStudents] = useState(0)
    const [totalCourses, setTotalCourses] = useState(0)
    const [semester, setSemester] = useState<any>({})
    useEffect(() => {
        new UserDao().countUserByRole(Role.ROLE_STUDENT).then((res) => {
            setTotalStudents(res.data)
        }).catch((err) => {
            toast.error(err.message);
        });
        new LectureCourseDao().countCourse().then((res) => {
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
                    Semester
                </div>
                <div className="text-sm font-bold">{semester.semesterName}</div>
            </div>
            <DashboardCard icon={<People />} title="Students"
            path="/instructor/students"
             className="border-r border-r-blue-200 px-5" total={totalStudents} />
            <DashboardCard icon={<HistoryEduSharp />}  path="/instructor/courses"
            className="border-r border-r-blue-200 px-5" title="Courses" total={totalCourses} />
            <DashboardCard icon={<Feedback />} 
            path="/instructor/suggestions"
            title="Suggestions" total={15} />
        </div></>
}