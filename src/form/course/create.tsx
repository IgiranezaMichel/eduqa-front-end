import { FC, ReactNode, useState } from "react";
import { ICourse } from "../../interface/course";
import { Button, TextField } from "@mui/material";
import { useCourseContext } from "../../context/course";
import { CourseDao } from "../../controller/courseDao";
import { toast, Toaster } from "sonner";
interface ICourseItem {
    course: ICourse,
    children: ReactNode

}
export const CreateCourse: FC<ICourseItem> = (prop) => {
    const [course, setCourse] = useState<ICourse>({
        name: prop.course.name,
        code: prop.course.code,
        departmentId: prop.course.departmentId,
        id: prop.course.id,
        credit: prop.course.credit
    })
    const {refresh}=useCourseContext();
    const saveCourse = (e:any) => {
        e.preventDefault();
        new CourseDao().registercourse(course).then(
            data=>{toast.success(data.data);refresh()}
        ).catch(err=>toast.error(err.response.data))
    }
    return <>
        <div>
            <div>
                {prop.children}
            </div>
            <form className="p-2" onSubmit={saveCourse}>
                <TextField required label='Module Code' value={course.code}
                    onChange={(e) => setCourse({ ...course, code: e.target.value })} className="mb-5" fullWidth />
                <TextField required label='Module name' value={course.name}
                    onChange={(e) => setCourse({ ...course, name: e.target.value })} className="mb-5" fullWidth />
                <TextField required label='Module Credit' value={course.credit}
                    onChange={(e) => setCourse({ ...course, credit: Number(e.target.value) })} className="mb-5" fullWidth />
{/*                 
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Select course Course Category</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={course.type}
                        label="Select course Course Category"
                    >
                        <MenuItem value={CourseCategory.GENERAL}>General Course</MenuItem>
                        <MenuItem value={CourseCategory.CORE}>Core Course</MenuItem>
                     </Select>
                </FormControl> */}
                <div className="py-2 ">
                    <Toaster/>
                <Button type="submit" className="bg-blue-950/90 w-full normal-case text-white p-3 font-bold text-xl">Add new course</Button>
                </div>
            </form>
        </div>

    </>

}