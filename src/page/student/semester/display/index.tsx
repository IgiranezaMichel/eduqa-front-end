import { useEffect, useState } from "react";
import { useStudentRegistrationHistoryContext } from "../../../../context/studentregistrationhistory";
import { toast } from "sonner";
import { SemesterDao } from "../../../../controller/semesterdao";
import { Tooltip } from "@mui/material";

export const DisplaySemester = () => {
    const { content } = useStudentRegistrationHistoryContext();
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
    return <>
        <section>
          <section className="mb-5 flex justify-between items-center">
         <section>
         <div className="font-bold text-xl">
                Latest of semester
            </div>
            <div className="text-gray-500 text-sm">
                This table contains all the Course in the department
            </div>
         </section>
            <Tooltip title='View Semester details' className="border p-2 rounded-sm cursor-pointer" arrow placement="top">
            <div>
            <b className="text-sm">{semester.semesterName}</b> 
            {' '}{semester.semNumber=1?'I':semester.semNumber=2?'II':semester.semNumber=3?'III':semester.semNumber=4?'IV':semester.semNumber=5?'V':semester.semNumber=6?'VI':semester.semNumber=7?'VII':semester.semNumber=8?'VIII':''}          
            </div>
            </Tooltip>
          </section>
         
           <div className="grid grid-cols-6 gap-3">
            {content!=undefined&&content.data!=undefined&&content.data.map((item:any, index:number) => {
                return <section key={item.id+index} className="border py-4 text-center shadow-md shadow-blue-950 cursor-pointer hover:bg-blue-900 hover:text-white">
                <div className="text-xl font-bold">{item.semester.semesterName}</div>
                <div className="text-sm mt-5">{item.semester.timeStamp}</div>
                </section>
            })
            }
           </div>
        </section>
    </>
}