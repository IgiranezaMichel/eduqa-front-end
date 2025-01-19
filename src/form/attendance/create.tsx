/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, ReactNode, useEffect, useState } from "react";
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { toast, Toaster } from "sonner";
import { IAttendance } from "../../interface/attendance";
import { useAttendanceContext } from "../../context/attendance";
import { AttendanceController } from "../../controller/attendanceController";
import { LectureCourseDao } from "../../controller/lecturecourses";
interface IAttendanceItem {
    attendance: IAttendance,
    children: ReactNode

}
export const CreateAttendance: FC<IAttendanceItem> = (prop) => {
    const [attendance, setAttendance] = useState<IAttendance>({
        id: prop.attendance.id,
        date: prop.attendance.date,
        lectureCourseId: prop.attendance.lectureCourseId
    })
    const {refresh}=useAttendanceContext();
    const [lectureCourses,setLectureCourses]=useState<any>([])
    useEffect(
        ()=>{
            new LectureCourseDao().getLecturePrincipleCourses().then(
                data=>setLectureCourses(data.data)
            )
        },[]
    )
    const saveAttendance = (e:any) => {
        e.preventDefault();
        new AttendanceController().createAttendance(attendance).then(
            data=>{toast.success(data.data);refresh();handleReset()}
        ).catch(err=>toast.error(err.response.data))
    }
    const handleReset=()=>{
        setAttendance({
            id: '',
            date: "",
            lectureCourseId: prop.attendance.lectureCourseId,
        })
    }
    return <>
        <div>
            <div>
                {prop.children}
            </div>
            <form className="p-2 mt-4" onSubmit={saveAttendance}>
                <TextField required label='Recording Date' value={attendance.date} type="datetime-local" InputLabelProps={{shrink: true}}
                    onChange={(e) => setAttendance({ ...attendance, date: e.target.value })} className="mb-5" fullWidth />
              <FormControl fullWidth>
                <InputLabel>Select course</InputLabel>
               <Select required label='Module' value={attendance.lectureCourseId} onChange={(e) => setAttendance({ ...attendance, lectureCourseId: e.target.value })} className="mb-5" fullWidth>
                    {lectureCourses!=undefined&&lectureCourses.length!=0&&lectureCourses.map((lectureCourse: any) => {
                        return <MenuItem key={lectureCourse.id} value={lectureCourse.id}>{lectureCourse.course.name}</MenuItem>
                    })}
               </Select>
               </FormControl>
                  <div className="py-2 ">
                    <Toaster/>
                <Button type="submit" className="bg-blue-950/90 w-full normal-case text-white p-3 font-bold text-xl">Add new attendance</Button>
                </div>
            </form>
        </div>

    </>

}