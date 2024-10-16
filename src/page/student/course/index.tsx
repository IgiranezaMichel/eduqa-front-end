import { Navigation } from "../../../component/navigation"
import { StudentMenu } from "../../../util/studentMenu"
import { SemesterDao } from "../../../controller/semesterdao"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { DisplayCourse } from "./display/all"
import { OnQueueCourses } from "./display/queu"
import { DisplaySemesterCourses } from "./display/semester"

export  const StudentCourse = () => {
    const [semester,setSemester]=useState<any>({})
    useEffect(
        ()=>{
            new SemesterDao().getCurrentSemester().then((res) => {
                setSemester(res.data)
            }).catch((err) => {
                toast.error(err.message);
            })
        },[]
    )
    const [active,setActive]=useState("all")
    const activeClass="p-1 border bg-blue-900 text-white    "
    const inactiveClass="p-1 border"
    return (
        <Navigation items={StudentMenu}>
            <div className="mb-3 mt-10">
            <h1 className="font-bold text-blue-950 text-xl">List Course of courses</h1>
            <div className="text-sm">This table contains list of courses</div>
            </div>
             
             <div className="flex gap-4 mb-2 py-1 border-b-2 border-b-blue-950">
                <button onClick={()=>setActive("all")} className={active=='all'?activeClass:inactiveClass}>All</button>
                <button onClick={()=>setActive("queue")} className={active=='queue'?activeClass:inactiveClass}>Completed Courses</button>
                <button onClick={()=>setActive("sem")} className={active=='sem'?activeClass:inactiveClass}>
                <i className="text-sm">{semester.semesterName}</i> 
            {' '}{semester.semNumber=1?'I':semester.semNumber==2?'II':semester.semNumber==3?'III':semester.semNumber==4?'IV':semester.semNumber==5?'V':semester.semNumber==6?'VI':semester.semNumber==7?'VII':semester.semNumber==8?'VIII':''} courses        

                </button>
             </div>
             
             {active=='all'&&<DisplayCourse/>}
             {active=='queue'&&<OnQueueCourses/>}
             {active=='sem'&&<DisplaySemesterCourses semesterId={semester.id}/>}
        </Navigation>
    )
}