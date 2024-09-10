import { Add, Feedback, HistoryEduSharp, People } from "@mui/icons-material"
import { DashboardCard } from "../index/component/DashboardCard"
import { Suggestions } from "../index/component/suggestions"
import { CourseOnTrack } from "../index/component/courseontrack"
import { useEffect, useState } from "react"
import { UserDao } from "../../../controller/userDao"
import { Role } from "../../../enum/role"
import { toast } from "sonner"
import { CourseDao } from "../../../controller/courseDao"
import { SemesterDao } from "../../../controller/semesterdao"


export const HodDisplaySemester = () => {
    const [totalStudents, setTotalStudents] = useState(0)
    const [totalCourses, setTotalCourses] = useState(0)
    const [totalLecture, setTotalLecture] = useState(0)
    const [semester, setSemester] = useState([])
    useEffect(() => {
        new UserDao().countUserByRole(Role.ROLE_STUDENT).then((res) => {
            setTotalStudents(res.data)
        }).catch((err) => {
            toast.error(err.message);
        });
        new UserDao().countUserByRole(Role.ROLE_INSTRACTOR).then((res) => {
            setTotalLecture(res.data)
        }).catch((err) => {
            toast.error(err.message);
        })
        new CourseDao().countCourse().then((res) => {
            setTotalCourses(res.data)
        }).catch((err) => {
            toast.error(err.message);
        })
        new SemesterDao().getAllSemester().then((res) => {
            setSemester(res.data)
        }).catch((err) => {
            toast.error(err.message);
        })
    })
    
    return <div >

        <div className="flex items-center justify-between clear-both py-3">
            <section>
                <div className="font-bold text-xl">
                    Semesters
                </div>
            </section>
            <section className="flex items-center gap-3">
                <select name="" id="" className="p-2 rounded border border-gray-300">
                    <option value="">Semester filtering</option>
                    {semester.map((item:any, index:number) => <option key={item.id+index} value={item.id}>{item.name}</option>)
                    }
                </select>
                <button className="bg-blue-900 text-white p-2 rounded-md"><Add/></button>
            </section>
        </div>

        <div className="flex items-center justify-between border-t-4 border-t-blue-900 mt-5 p-2 border border-b-4 border-b-blue-200/50">
            <DashboardCard icon={<People />} title="Students" className="border-r border-r-blue-200/50 px-5" total={totalStudents} />
            <DashboardCard icon={<HistoryEduSharp />} className="border-r border-r-blue-200/50 px-5" title="Courses" total={totalCourses} />
            <DashboardCard icon={<People />} className="border-r border-r-blue-200/50 px-5" title="Lecturers" total={totalLecture} />
            <DashboardCard icon={<Feedback />} title="Suggestions" total={15} />
        </div>

        <section>
            <div className="flex justify-between mt-5 gap-6">
                <section className=" w-[60%]">
                    <Suggestions />
                </section>
                <section className=" w-[40%]">
                    <CourseOnTrack />
                </section>
            </div>
        </section>
    </div>
}