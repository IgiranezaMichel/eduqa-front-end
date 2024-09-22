import { useEffect, useState } from "react"
import { LectureCourseDao } from "../../controller/lecturecourses"
import { toast } from "sonner";
import { Email, PermIdentity, Phone, StarOutline, Wc } from "@mui/icons-material";

export const ViewLectureCourse=(prop:{lecture:any})=>{
    const [lectureCourseList,setLectureCourseList]=useState<any>([]);
    useEffect(
        ()=>{
            new LectureCourseDao().getLectureCourses(prop.lecture.id) 
            .then(data=>setLectureCourseList(data.data)) 
            .catch(err=>toast.error(err.response.message))      
        }
    )
    return <>
 <div className="mb-4">
          <div className="p-4 bg-blue-800 text-white">
            <div className="text-lg font-bold">{prop.lecture.name}</div>
            <small>{prop.lecture.departmentName}</small>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img src={prop.lecture.picture} alt="" />
            <div className="border-l-4 border-l-blue-900 p-4">
              <p className="mb-1"><PermIdentity className="bg-blue-900 text-white p-1 rounded-md mb-1" /> {prop.lecture.code}</p>
              <p className="mb-1"><Email className="bg-blue-900 text-white p-1 rounded-md mb-1" /> {prop.lecture.email}</p>
              <p className="mb-1"><Wc className="bg-blue-900 text-white p-1 rounded-md mb-1" /> {prop.lecture.gender}</p>
              <p className="mb-1"><Phone className="bg-blue-900 text-white p-1 rounded-md mb-1" /> {prop.lecture.phoneNumber}</p>
              <p className="mb-1"><StarOutline className="bg-blue-900 text-white p-1 rounded-md mb-1 normal-case" /> {prop.lecture.status}</p>
            </div>
          </div>
        </div>

        {lectureCourseList!}
    </>
}












