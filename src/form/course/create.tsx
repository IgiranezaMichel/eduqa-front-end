import { FC, ReactNode, useState } from "react";
import { ICourse } from "../../interface/course";
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { CourseCategory } from "../../enum/coursecategory";
interface ICourseItem {
    course: ICourse,
    children: ReactNode

}


export const CreateCourse: FC<ICourseItem> = (prop) => {
    const [course, setCourse] = useState<ICourse>({
        name: prop.course.name,
        type: prop.course.type,
        departmentId: prop.course.departmentId,
        id: prop.course.id
    })



    return <>

        <div>
            <div>
                {prop.children}
            </div>
            <form className="p-2">
                <TextField required label='Module Code' value={course.name}
                    onChange={(e) => setCourse({ ...course, name: e.target.value })} className="mb-5" fullWidth />
                <TextField required label='Module name' value={course.name}
                    onChange={(e) => setCourse({ ...course, name: e.target.value })} className="mb-5" fullWidth />
                <TextField required label='Module Credit' value={course.name}
                    onChange={(e) => setCourse({ ...course, name: e.target.value })} className="mb-5" fullWidth />
                <TextField required label='Course Semester' value={course.name}
                    onChange={(e) => setCourse({ ...course, name: e.target.value })} className="mb-5" fullWidth />
                <TextField required label='Assing Course' value={course.name}
                    onChange={(e) => setCourse({ ...course, name: e.target.value })} className="mb-5" fullWidth />


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
                </FormControl>
                <div className="py-2 ">
                <Button className="bg-blue-950/90 w-full normal-case text-white p-3 font-bold text-xl">Add new course</Button>
                </div>
            </form>
        </div>

    </>

}