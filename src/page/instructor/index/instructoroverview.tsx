/* eslint-disable @typescript-eslint/no-explicit-any */
import { Feedback, HistoryEduSharp, People } from "@mui/icons-material"
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { DashboardCard } from "../../hod/index/component/DashboardCard";
import { LectureCourseDao } from "../../../controller/lecturecourses";
import { StudentRegisterCourseDao } from "../../../controller/studentregistercourse";

export const InstructorOverview = (prop: { semester: any }) => {
    const [totalStudents, setTotalStudents] = useState(0)
    const [totalCourses, setTotalCourses] = useState(0)
    useEffect(() => {
        new StudentRegisterCourseDao().getTotalStudentToughtByLecture(prop.semester.id).then((res) => {
            setTotalStudents(res.data)
        }).catch((err) => {
            toast.error(err.message);
        });
        new LectureCourseDao().countCourse().then((res) => {
            setTotalCourses(res.data)
        }).catch((err) => {
            toast.error(err.message);
        })
    }, [])
    return <>
        <div className="flex items-center justify-between border-t-4 border-t-blue-900 mt-5 p-2 border border-b-4 border-b-blue-200/50">
            <div className="border-r border-r-blue-200 pe-2">
                <div className="text-slate-600 font-bold mb-2 ">
                    Semester  {prop.semester.semNumber == 1 ? 'I' : prop.semester.semNumber == 2 ? 'II' : prop.semester.semNumber == 3 ? 'III' : prop.semester.semNumber == 4 ? 'IV' : prop.semester.semNumber == 5 ? 'V' : prop.semester.semNumber == 6 ? 'VI' : prop.semester.semNumber == 7 ? 'VII' : prop.semester.semNumber == 8 ? 'VIII' : ''}
                </div>
                <div className="text-sm font-bold">{prop.semester.semesterName}</div>
            </div>
            <DashboardCard icon={<People />} title="Students"
                path="/instructor/student"
                className="border-r border-r-blue-200 px-5" total={totalStudents} />
            <DashboardCard icon={<HistoryEduSharp />} path="/instructor/courses"
                className="border-r border-r-blue-200 px-5" title="Courses" total={totalCourses} />
            <DashboardCard icon={<Feedback />}
                path="/instructor/suggestions"
                title="Suggestions" total={15} />
        </div></>
}