import { FC, ReactNode, useEffect, useState } from "react";
import { ILectureCourse } from "../../interface/lecturecourse";
import { CourseDao } from "../../controller/courseDao";
import { Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { SemesterDao } from "../../controller/semesterdao";
import { IUser } from "../../interface/user";
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
                setCourseList(courses);
            });
            new SemesterDao().getCurrentSemester().then((semester) => {
                setSemester(semester);
            })
                .catch((err) => {
                    console.log(err);
                })
        }
    )
    return <>
        <div className="mb-4">{prop.children}</div>
        <div>
            <div className="font-bold">
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
                    {courseList.map((data: any) => <MenuItem key={data.id} value={data.id}>{data.name}</MenuItem>)}
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
    </>
}