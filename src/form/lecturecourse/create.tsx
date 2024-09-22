import { FC, ReactNode, useEffect, useState } from "react";
import { ILectureCourse } from "../../interface/lecturecourse";
import { CourseDao } from "../../controller/courseDao";
import { Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { SemesterDao } from "../../controller/semesterdao";
import { IUser } from "../../interface/user";
import { LectureCourseDao } from "../../controller/lecturecourses";
import { toast, Toaster } from "sonner";
export interface ICreateLectureCourseForm {
    lecture: IUser
    children: ReactNode
}
export const LectureCourseCreateForm: FC<ICreateLectureCourseForm> = (prop) => {

    const [courseList, setCourseList] = useState<any>([]);
    const [semester, setSemester] = useState<any>({});
    const [lectureCourses, setLectureCourses] = useState<ILectureCourse>({
        courseId: '',
        group: '',
        userId: prop.lecture.id,
        id: '',
        semesterId: semester.id
    });
    useEffect(
        () => {
            new CourseDao().getAllCourses().then((courses) => {
                setCourseList(courses.data);
            });
            new SemesterDao().getCurrentSemester().then((semester) => {
                setLectureCourses({...lectureCourses,semesterId:semester.data.id})
                setSemester(semester.data);
            })
                .catch((err) => {
                    console.log(err);
                })
        },[]
    )
    const submitLectureCourse=(e:any)=>{
        e.preventDefault();
        new LectureCourseDao().createLectureCourse(lectureCourses)
        .then(data=>toast.success(data.data))
        .catch(err=>toast.error(err.response.message))
    }
    return <form onSubmit={submitLectureCourse} className="p-2">
        <div className="mb-4 flex items-center">{prop.children}</div>
        <div>
            <div className="font-bold ">
                {semester.name}
            </div>

            <FormControl fullWidth className="mb-4">
                <InputLabel id="gender-simple-select-label">Select Course</InputLabel>
                <Select labelId="gender-simple-select-label"
                    id="gender-simple-select"
                    value={lectureCourses.courseId}
                    label="Select Course"
                    onChange={(e) => setLectureCourses({ ...lectureCourses, courseId: e.target.value as string })}
                >
                    {courseList!=undefined&&courseList.length!=0&&courseList.map((data: any) => <MenuItem className="flex justify-between" key={data.id} value={data.id}>
                    <div>{data.code}</div>
                    <div className="text-sm">{data.name}</div>
                    </MenuItem>)}
                </Select>
            </FormControl>
           
            <FormControl fullWidth className="mb-4">
                <InputLabel id="gender-simple-select-label">Select Group</InputLabel>
                <Select labelId="gender-simple-select-label"
                    id="gender-simple-select"
                    value={lectureCourses.group}
                    label="Select Course"
                    onChange={(e) => setLectureCourses({ ...lectureCourses, group: e.target.value as string })}
                >
                    {['A', 'B', 'C', 'D', 'E','F','G','H','I','J','K','L'].
                    map((data: any) => <MenuItem key={data} value={data}>{data}</MenuItem>)}
                </Select>
            </FormControl>
            <div className="py-2 ">
                <Button type="submit" className="bg-blue-950/90 w-full normal-case text-white p-3 font-bold text-xl">Confirm Course</Button>
            </div>
        </div>
        <Toaster/>
    </form>
}