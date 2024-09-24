import { TextField } from "@mui/material"
import { Navigation } from "../../../component/navigation"
import { StudentMenu } from "../../../util/studentMenu"
import { DisplayCourse } from "./display"
import { SemesterDao } from "../../../controller/semesterdao"
import { useEffect, useState } from "react"
import { toast } from "sonner"

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
             <div className="flex items-center justify-between mb-1 pb-2 border-b-2 border-b-blue-950">
                <TextField 
                sx={{ '& .MuiInputBase-root': { height: '40px', }, }}
                    placeholder="Search"/>
                    
                <div className="flex gap-3">
                <select name="" id="" className="p-2">
                    <option value="">Select Semester</option>
                </select>
                <select name="" id="">
                    <option value="">Select Semester Number</option>
                </select>
                </div>
             </div>
             <div className="flex gap-4 mb-4">
                <button onClick={()=>setActive("all")} className={active=='all'?activeClass:inactiveClass}>All</button>
                <button onClick={()=>setActive("sem")} className={active=='sem'?activeClass:inactiveClass}>
                <i className="text-sm">{semester.semesterName}</i> 
            {' '}{semester.semNumber=1?'I':semester.semNumber=2?'II':semester.semNumber=3?'III':semester.semNumber=4?'IV':semester.semNumber=5?'V':semester.semNumber=6?'VI':semester.semNumber=7?'VII':semester.semNumber=8?'VIII':''} courses        

                </button>
             </div>
             <DisplayCourse/>
        </Navigation>
    )
}