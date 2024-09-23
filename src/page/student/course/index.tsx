import { TextField } from "@mui/material"
import { Navigation } from "../../../component/navigation"
import { StudentMenu } from "../../../util/studentMenu"
import { DisplayCourse } from "./display"

export  const StudentCourse = () => {
    return (
        <Navigation items={StudentMenu}>
            <div className="mb-3 mt-10">
            <h1 className="font-bold text-blue-950 text-xl">List Course of courses</h1>
            <div className="text-sm">This table contains list of courses</div>
            </div>
             <div className="flex items-center justify-between mb-5">
                <TextField placeholder="search ...."/> 
                <div className="flex gap-3">
                <select name="" id="" className="p-2">
                    <option value="">Select Semester</option>
                </select>
                <select name="" id="">
                    <option value="">Select Semester Number</option>
                </select>
                </div>
             </div>
             <DisplayCourse/>
        </Navigation>
    )
}