import { FC, ReactNode, useEffect, useState } from "react";
import { Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { toast, Toaster } from "sonner";
import { IStudentRegisterCourse } from "../../interface/studentregistercourse";
import { useStudentRegisterCourseWithInSemesterContext } from "../../context/studentregisteredcourseinsemester";
import { StudentRegisterCourseDao } from "../../controller/studentregistercourse";
import { LectureCourseDao } from "../../controller/lecturecourses";
import { Person } from "@mui/icons-material";
interface IStudentRegisterCourseItem {
    StudentRegistercourse: IStudentRegisterCourse,
    semester:any
    children: ReactNode

}
export const CreateStudentStudentRegisterCourse: FC<IStudentRegisterCourseItem> = (prop) => {
    const [StudentRegistercourse, setStudentRegisterCourse] = useState<IStudentRegisterCourse>({
        id: prop.StudentRegistercourse.id,
        lectureCourseId: prop.StudentRegistercourse.lectureCourseId,
        registrationId: prop.StudentRegistercourse.registrationId,
    });
    const [lectureDetails,setLectureDetails]=useState<any>({});
    const [lectureCourseList,setLectureCourseList]=useState<any>([]);
    const [group,setGroup]=useState<any>([]);
    const {refresh}=useStudentRegisterCourseWithInSemesterContext();
    const saveStudentRegisterCourse = (e:any) => {
        e.preventDefault(); 
        new StudentRegisterCourseDao().addStudentCourse(StudentRegistercourse).then(
            data=>{toast.success(data.data);refresh()}
        ).catch(err=>toast.error(err.response.data))
    }
    useEffect(
    ()=>{
   new LectureCourseDao().getAllLectureCourseAvailableWitnInASemester(prop.semester)
   .then(data=>setLectureCourseList(data.data));
    },[]
    )
    const findGroup=(courseId:string)=>{
        new LectureCourseDao().getAllActiveCourseGroups(courseId,prop.semester)
        .then(data=>setGroup(data.data)).catch(err=>console.log(err));
    }
    return <>
        <div>
            <div>
                {prop.children}
            </div>
            <form className="p-2" onSubmit={saveStudentRegisterCourse}>
                {Object.keys(lectureDetails).length!=0&&<div className="flex gap-3 mb-5">
                    <img src={lectureDetails.picture} alt="" />
                    <section>
                    <div className="flex gap-2 items-center mb-2"><Person/>{lectureDetails.code}</div>
                    <div className="flex gap-2 items-center mb-2"><Person/>{lectureDetails.name}</div>
                    <div className="flex gap-2 items-center mb-2"><Person/>{lectureDetails.gender}</div>
                    <div className="flex gap-2 items-center mb-2"><Person/>{lectureDetails.phoneNumber}</div>
                    <div className="flex gap-2 items-center mb-2"><Person/>{lectureDetails.email}</div>
                    <div className="flex gap-2 items-center mb-2"><Person/>{lectureDetails.departmentName}</div>
                    <div className="flex gap-2 items-center mb-2"><Person/>{lectureDetails.status}</div>
                    </section>
                    </div>}
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Select Course</InputLabel>
                    <Select
                        labelId="Select Course"
                        id="demo-simple-select"
                        onChange={(e)=>findGroup(e.target.value as string)}
                        label="Select Course"
                    >
                       {lectureCourseList!=undefined&&lectureCourseList.length!=0&&
                       lectureCourseList.map ((data:any)=><MenuItem key={data.id} value={data.course.id}>
                       {data.course.name}
                       </MenuItem>)}
                     </Select>
                </FormControl>
                {group!=undefined&&group.length!=0&&<FormControl fullWidth className="mt-4">
                    <InputLabel id="demo-simple-select-label">Select Group</InputLabel>
                    <Select
                        labelId="Select Course"
                        id="demo-simple-select"
                        onChange={(e)=>{setLectureDetails(e.target.value);setStudentRegisterCourse({...StudentRegistercourse,lectureCourseId:lectureDetails.id})}}
                        label="Select Course"
                    >
                       {group!=undefined&&group.length!=0&&
                       group.map ((data:any)=><MenuItem key={data.id} value={data}>
                       {data.group}
                       </MenuItem>)}
                     </Select>
                </FormControl>}
                <div className="py-2 ">
                    <Toaster/>
                <Button type="submit" className="bg-blue-950/90 w-full normal-case text-white p-3 font-bold text-xl">Add new StudentRegistercourse</Button>
                </div>
            </form>
        </div>

    </>

}