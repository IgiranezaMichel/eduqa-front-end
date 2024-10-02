import { useEffect, useState } from "react"
import { LectureCourseDao } from "../../controller/lecturecourses"
import { toast } from "sonner";
import { Email, PermIdentity, Phone, StarOutline, Wc } from "@mui/icons-material";

export const ViewLectureCourse = (prop: { lecture: any }) => {
  const [lectureCourseList, setLectureCourseList] = useState<any>([]);
  useEffect(
    () => {
      new LectureCourseDao().getLectureCourses(prop.lecture.id)
        .then(data => setLectureCourseList(data.data))
        .catch(err => toast.error(err.response.message))
    }, []
  )
  return <>
    <div className="mb-4">
      <div className="p-4 bg-blue-800 text-white">
        <div className="text-lg font-bold">{prop.lecture.name}</div>
        <small>{prop.lecture.departmentName}</small>
      </div>
      <div className="flex">
        <img className="max-h-60" src={prop.lecture.picture} alt="" />
        <div className="border-l-1 border-l-blue-900 mt-2">
          <p className="mb-1"><PermIdentity className="bg-blue-900 text-white p-1 rounded-md mb-1" /> {prop.lecture.code}</p>
          <p className="mb-1"><Email className="bg-blue-900 text-white p-1 rounded-md mb-1" /> {prop.lecture.email}</p>
          <p className="mb-1"><Wc className="bg-blue-900 text-white p-1 rounded-md mb-1" /> {prop.lecture.gender}</p>
          <p className="mb-1"><Phone className="bg-blue-900 text-white p-1 rounded-md mb-1" /> {prop.lecture.phoneNumber}</p>
          <p className="mb-1"><StarOutline className="bg-blue-900 text-white p-1 rounded-md mb-1 normal-case" /> {prop.lecture.status}</p>
        </div>
      </div>
    </div>

    <section className="mb-2">
      <div className="text-sm m-2">Lecture Courses</div>
      {lectureCourseList != undefined && lectureCourseList.length > 0 &&
        lectureCourseList.map((data: any) => <div key={data.id} className="px-2">
          <div className="grid grid-cols-2 gap-4 mt-4 border rounded-md border-blue-950 p-1">
            <div>
              <div className="text-blue-950 font-bold text-lg uppercase">{data.code}</div>
              <div className="text-sm">{data.name}</div>
            </div>
            <section className="">
              <div className="text-blue-950 font-bold text-lg uppercase">credit {data.credit}</div>
              <div className="flex flex-col gap-1 text-sm">{data.timeStamp}</div>
            </section>
          </div>
        </div>)
      }
    </section>
  </>
}












