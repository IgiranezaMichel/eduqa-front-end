import { useEffect, useState } from "react"
import { Navigation } from "../../../component/navigation"
import { AdminMenu } from "../../../util/admin"
import { HodOverview } from "../../hod/index/component/overview"
import { SemesterDao } from "../../../controller/semesterdao"
import { toast } from "sonner"
import { DisplaySemesterCourses } from "./courses"
import { DisplayStudent } from "./student"
import { Role } from "../../../enum/role"
export const AdminManageSemester = () => {
    const [semesterList, setSemesterList] = useState([]);
    const [currentSemester, setCurrentSemester] = useState<any>({});
    useEffect(
        () => {
            new SemesterDao().getAllSemester().then((res) => {
                setSemesterList(res.data)
            }).catch((err) => {
                toast.error(err.message);
            });
        },[]
    )
    useEffect(
        () => {
            
            new SemesterDao().getCurrentSemester()
            .then((res) => {
                setCurrentSemester(res.data)
            }).catch((err) => {
                toast.error(err.message);
            })
        }, []
    );
    const handleSemesterChange = (e:any) => {
        new SemesterDao().getSemester(e.target.value).then(data=>
        setCurrentSemester(data.data))
    }
    const [activeBtn,setActiveBtn] = useState("student");
    const activeClass= "bg-blue-900 text-white border border-gray-300 p-2 rounded";
    const inactiveClass = "border border-gray-300 p-2 rounded";
    return <Navigation items={AdminMenu}>
        <div className="flex items-center justify-between clear-both pt-3">
            <section>
                <div className="font-bold text-xl">
                    Semesters
                </div>
            </section>
            <section className="flex items-center gap-3">
               
            </section>
        </div>
        <HodOverview />
        <section className="flex items-center justify-between  gap-2 bg-blue-200">
           <div>
           <button className={activeBtn === "student" ? activeClass : inactiveClass} onClick={() => setActiveBtn("student")}>Registered student</button>
            <button className={activeBtn==="lecture"?activeClass:inactiveClass} onClick={() => setActiveBtn("lecture")}>Available Lecture</button>
            <button className={activeBtn === "course" ? activeClass : inactiveClass} onClick={() => setActiveBtn("course")}>Available Courses</button>
           </div>
            <select onChange={handleSemesterChange} name="" id="" className="p-1 mx-1 rounded border border-gray-300">
                    <option value="">Semester filtering</option>
                    {semesterList.map((item: any, index: number) => <option key={item.id + index} value={item.id}>{item.semesterName}</option>)
                    }
                </select>
        </section>
        {activeBtn=='student'&&<DisplayStudent semester={currentSemester} role={Role.ROLE_STUDENT} />}
        {activeBtn=='lecture'&&<DisplayStudent semester={currentSemester} role={Role.ROLE_INSTRACTOR} />}
        {activeBtn=='course'&&<DisplaySemesterCourses />}
    </Navigation>
}