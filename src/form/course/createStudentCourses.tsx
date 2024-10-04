import { FC, ReactNode, useState } from "react";
import { Button, TextField } from "@mui/material";
import { toast, Toaster } from "sonner";
import { IStudentRegisterCourse } from "../../interface/studentregistercourse";
import { useStudentRegisterCourseWithInSemesterContext } from "../../context/studentregisteredcourseinsemester";
import { StudentRegisterCourseDao } from "../../controller/studentregistercourse";
interface IStudentRegisterCourseItem {
    StudentRegistercourse: IStudentRegisterCourse,
    children: ReactNode

}
export const CreateStudentStudentRegisterCourse: FC<IStudentRegisterCourseItem> = (prop) => {
    const [StudentRegistercourse, setStudentRegisterCourse] = useState<IStudentRegisterCourse>({
        id: prop.StudentRegistercourse.id,
        lectureCourseId: prop.StudentRegistercourse.lectureCourseId,
        registrationId: prop.StudentRegistercourse.registrationId,
    })
    const {refresh}=useStudentRegisterCourseWithInSemesterContext();
    const saveStudentRegisterCourse = (e:any) => {
        e.preventDefault();
        new StudentRegisterCourseDao().addStudentCourse(StudentRegistercourse).then(
            data=>{toast.success(data.data);refresh()}
        ).catch(err=>toast.error(err.response.data))
    }
    return <>
        <div>
            <div>
                {prop.children}
            </div>
            <form className="p-2" onSubmit={saveStudentRegisterCourse}>
                <TextField required label='Module Code' value={StudentRegistercourse.code}
                    onChange={(e) => setStudentRegisterCourse({ ...StudentRegistercourse, code: e.target.value })} className="mb-5" fullWidth />
                <TextField required label='Module name' value={StudentRegistercourse.name}
                    onChange={(e) => setStudentRegisterCourse({ ...StudentRegistercourse, name: e.target.value })} className="mb-5" fullWidth />
                <TextField required label='Module Credit' value={StudentRegistercourse.credit}
                    onChange={(e) => setStudentRegisterCourse({ ...StudentRegistercourse, credit: Number(e.target.value) })} className="mb-5" fullWidth />
{/*                 
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Select StudentRegistercourse StudentRegisterCourse Category</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={StudentRegistercourse.type}
                        label="Select StudentRegistercourse StudentRegisterCourse Category"
                    >
                        <MenuItem value={StudentRegisterCourseCategory.GENERAL}>General StudentRegisterCourse</MenuItem>
                        <MenuItem value={StudentRegisterCourseCategory.CORE}>Core StudentRegisterCourse</MenuItem>
                     </Select>
                </FormControl> */}
                <div className="py-2 ">
                    <Toaster/>
                <Button type="submit" className="bg-blue-950/90 w-full normal-case text-white p-3 font-bold text-xl">Add new StudentRegistercourse</Button>
                </div>
            </form>
        </div>

    </>

}