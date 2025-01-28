/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArrowRight, Close, FileCopy, People } from "@mui/icons-material"
import { ReactNode, useEffect, useState } from "react"
import { LectureCourseDao } from "../../../controller/lecturecourses"
import { IPage } from "../../../interface/page"
import { toast } from "sonner"
import { Dialog, IconButton, LinearProgress } from "@mui/material"
import { CourseDetail } from "../../../form/course/coursedetail"
import { LectureCourseProgressReportProvider } from "../../../context/lecturecourseprogressreport"
export const RecentCourse = (prop: { semester: any, child: ReactNode }) => {
    const [page, setPage] = useState<IPage>({
        pageNumber: 0, pageSize: 10, search: '', sortBy: 'id'
    })
    const [courses, setCourses] = useState<any>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [lectureCourse, setLectureCourse] = useState<any>({});
    const [showDiialog, setShowDialog] = useState(false);
    useEffect(
        () => {
            if (prop.semester) {
                new LectureCourseDao().getAllLectureCoursePage(page, prop.semester.id)
                    .then(data => {
                        setCourses(data.data);;
                        setIsLoading(false);
                    })
                    .catch(err => {
                        toast.error(err.message); setIsLoading(false);
                    });
            }
        }, [prop.semester,page]

    );
    return <>
        <div className="flex justify-between my-3">
            <div className="font-bold text-xl">Your Recent Course </div>
            <div className="flex gap-2">
                {prop.child}
                <button className="rounded-md p-2 font-bold border border-blue-950 hover:bg-blue-600">View all <ArrowRight /></button>
            </div>
        </div>
        <div className="flex flex-col">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                    <div className="border  border-gray-700 md:rounded-lg">
                        <table className="min-w-full divide-y  divide-gray-700">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500">
                                        <div className="flex items-center gap-x-3">
                                            <button className="flex items-center gap-x-2">
                                                <span>#</span>
                                            </button>
                                        </div>
                                    </th>

                                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                                        Course
                                    </th>
                                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                                        Detail
                                    </th>
                                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                                        Student
                                    </th>
                                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                                        Group
                                    </th>
                                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                                        Progress
                                    </th>
                                </tr>
                            </thead>
                            {!isLoading && <tbody className="bg-white divide-y  divide-gray-700">
                                {courses != undefined && courses.data != undefined && courses.data.map((data: any, index: number) => <tr>
                                    <td key={index + data.id} className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                        <div className="inline-flex items-center gap-x-3">
                                            <span>{index + 1}</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                                        <div className="flex items-center gap-x-2">
                                            <div className="object-cover w-8 h-8 rounded-full" >
                                                <FileCopy />
                                            </div>
                                            <div>
                                                <h2 className="text-sm font-medium text-gray-800 ">{data.lectureCourseCode}</h2>
                                                <p className="text-xs font-normal text-gray-600">{data.lectureCourseName}</p>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                                        <h2 className="text-sm font-medium text-gray-800  ">Credit : {data.lectureCourseCredit}</h2>
                                        <h2 className="text-sm font-medium text-gray-800  ">Duration : {data.lectureCourseDuration} hrs</h2>
                                    </td>
                                    <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap tec">
                                        <People /> {data.totalStudent}
                                    </td>
                                    <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap tec">
                                        {data.lectureCourseGroup}
                                    </td>
                                    <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                                        <div className="float-end">
                                            {data.currentChapter != null ? (data.currentChapter) : 0}/{data.totalChapter}
                                        </div>
                                        <div className="clear-both">
                                            {data.totalChapter == null ? 'No content' : <LinearProgress variant="determinate" value={data.currentChapter != null ? ((data.currentChapter / data.totalChapter) * 100) : 0} />}
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                        <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-emerald-500 bg-emerald-100/60 bg-gray-800">
                                            <h2 className="text-sm font-normal hover:cursor-pointer" onClick={() => { setLectureCourse(data); setShowDialog(true) }}>view</h2>
                                        </div>
                                    </td>


                                </tr>)}
                                <tr>
                                    <td colSpan={9}>
                                        <div className="flex border-t gap-4 items-center border-gray-200 bg-white px-4 py-3 sm:px-6">
                                            <div>{courses.pageNumber + 1} page out of {courses.totalPage} in {courses.size} records</div>
                                            <div className="flex gap-3">
                                                <select onChange={e => setPage({ ...page, pageSize: Number(e.target.value) })} className="border border-gray-300 rounded-md text-sm">
                                                    <option value="10">10</option>
                                                    <option value="20">20</option>
                                                    <option value="30">30</option>
                                                </select>
                                                <div>
                                                    <button onClick={() => { setPage({ ...page, pageNumber: courses.pageNumber - 1 }) }}
                                                        disabled={courses.pageNumber == 0}
                                                        className="border border-gray-300 px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100">Previous</button>
                                                </div>
                                                <button onClick={() => { setPage({ ...page, pageNumber: courses.pageNumber + 1 }) }} disabled={courses.pageNumber + 1 == courses.totalPage} className="border border-gray-300 px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100">Next</button>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>}
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <Dialog open={showDiialog}>
            <LectureCourseProgressReportProvider lectureCourseId={lectureCourse.lectureCourseId}>
                <CourseDetail lectureCourse={lectureCourse}>
                    <div className="flex justify-between items-center bg-blue-950 p-1">
                        <div>
                            <h2 className="text-lg font-medium  text-white">
                                {lectureCourse.lectureCourseCode}
                            </h2>
                            <h2 className="text-sm text-white">
                                {lectureCourse.lectureCourseName}
                            </h2>
                        </div>
                        <IconButton onClick={() => setShowDialog(false)} className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                            <Close />
                        </IconButton>
                    </div>
                </CourseDetail>
            </LectureCourseProgressReportProvider>
        </Dialog>
    </>
}