import { Close, FileCopy, Visibility } from "@mui/icons-material";
import { useLectureCourseContext } from "../../../../context/lecturecourse"
import { ReactNode, useEffect, useState } from "react";
import { IPage } from "../../../../interface/page";
import { Dialog, IconButton } from "@mui/material";
import { CourseAction } from "../crud";
import { LectureCourseContentProvider } from "../../../../context/lecturecoursecontent";
import { StudentList } from "./studentlist";

export const DisplayCourse = (prop: { content: ReactNode,semester:any }) => {
    const { content, update } = useLectureCourseContext();
    const [page, setPage] = useState<IPage>({
        pageNumber: 0, pageSize: 10, search: '', sortBy: 'id'
    });
    const [lectureCourseContent, setLectureCourseContent] = useState<any>({});
    const [openDialog, setOpenDialog] = useState({ open: false, type: '' });
    useEffect(() => {
        update(page);
    }, [page])
    return <>
        <section className="flex justify-between my-4 items-center">
            <div>
                <div className="font-bold text-xl">List of Course </div>
                <div className="text-sm">This table contains Courses assigned to you</div>
            </div>
            <div className="flex gap-4 ">
                {prop.content}
            </div>
        </section>

        <div className="flex flex-col">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                    <div className="border border-gray-200 :border-gray-700 md:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200 :divide-gray-700">
                            <thead className="bg-gray-50 :bg-gray-800">
                                <tr>
                                    <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right">
                                        <div className="flex items-center gap-x-3">
                                            <button className="flex items-center gap-x-2">
                                                <span>#</span>
                                            </button>
                                        </div>
                                    </th>

                                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right">
                                        Course
                                    </th>
                                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right">
                                        Credit
                                    </th>

                                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right">
                                        Duration
                                    </th>
                                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right">
                                        Group
                                    </th>
                                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right">
                                        Review
                                    </th>
                                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right">
                                        Total student
                                    </th>
                                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right">
                                        Suggestion
                                    </th>

                                </tr>
                            </thead>
                            <tbody className=" divide-y divide-gray-200  ">
                                {content != undefined && content.data != undefined && content.data.map((data: any, index: number) => <tr>
                                    <td key={index + data.id} className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                        <div className="inline-flex items-center gap-x-3">
                                            <span>{index + 1}</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 text-sm whitespace-nowrap">
                                        <div className="flex items-center gap-x-2">
                                            <div className="object-cover w-8 h-8 rounded-full" >
                                                <FileCopy />
                                            </div>
                                            <div>
                                                <h2 className="text-sm font-medium   ">{data.lectureCourseCode
                                                }</h2>
                                                <p className="text-xs font-normal text-gray-600">{data.lectureCourseName}</p>
                                            </div>
                                        </div>
                                    </td>


                                    <td className="px-4 py-4 text-sm whitespace-nowrap">
                                        <h2 className="text-sm text-center font-medium text-gray-800 ">{data.lectureCourseCredit}</h2>
                                    </td>
                                    <td className="px-4 py-4 text-sm whitespace-nowrap">
                                        <h2 className="text-sm text-center font-medium text-gray-800 ">{data.lectureCourseDuration} hr</h2>
                                    </td>
                                    <td className="px-4 py-4 text-sm whitespace-nowrap">{data.lectureCourseGroup}</td>
                                    <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                        <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-emerald-500 bg-emerald-100/60">
                                            <h2 className="text-sm font-normal">{data.timeStamp}</h2>
                                        </div>
                                    </td>
                                    <td className="text-center"><div className="flex gap-2 items-center justify-center">{data.totalStudent}
                                        <Visibility onClick={() => { setLectureCourseContent(data); setOpenDialog({ open: true, type: 'view-student' }) }}
                                            className="text-md bg-green-800 text-white rounded-full p-1" />
                                    </div>
                                    </td>
                                    <td className="px-4 py-4 text-sm whitespace-nowrap">
                                        <button onClick={() => { setLectureCourseContent(data); setOpenDialog({ open: true, type: 'suggestion' }) }} className="border border-gray-300 text-gray-600 rounded-md px-3 py-1 hover:bg-gray-100">view suggestion</button>
                                    </td>

                                </tr>)}
                                {content != undefined && content.data != undefined && content.data.length == 0 && <tr>
                                    <td colSpan={7} className="text-center p-4">No data found !!</td>
                                </tr>}
                                <tr>
                                    <td colSpan={9}>
                                        <div className="flex border-t gap-4 items-center border-gray-200 bg-white px-4 py-3 sm:px-6">
                                            <div>{content.pageNumber + 1} page out of {content.totalPage} in {content.size} records</div>
                                            <div className="flex gap-3">
                                                <select
                                                    onChange={e => setPage({ ...page, pageSize: Number(e.target.value) })}
                                                    className="border border-gray-300 rounded-md text-sm">
                                                    <option value="10">10</option>
                                                    <option value="20">20</option>
                                                    <option value="30">30</option>
                                                </select>
                                                <div>
                                                    <button onClick={() => { setPage({ ...page, pageNumber: content.pageNumber - 1 }) }}
                                                        disabled={content.pageNumber == 0}
                                                        className="border border-gray-300 px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100">Previous</button>
                                                </div>
                                                <button onClick={() => { setPage({ ...page, pageNumber: content.pageNumber + 1 }) }} disabled={content.pageNumber + 1 == content.totalPage} className="border border-gray-300 px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100">Next</button>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <Dialog open={openDialog.open && openDialog.type == 'view-student'} PaperProps={{className:'w-full overflow-x-hidden'}} onClose={() => setOpenDialog({ open: false, type: '' })}>
            <StudentList semester={prop.semester}>
                <div className="flex items-center justify-between bg-blue-950 w-full text-white rounded-none p-1">
                    <div>
                        <div className="text-xl font-bold">{lectureCourseContent.lectureCourseCode}</div>
                        <div>{lectureCourseContent.lectureCourseName}</div>
                    </div>
                    <IconButton className="text-white" onClick={()=>setOpenDialog({ open: false, type: '' })}><Close /></IconButton>
                </div>
            </StudentList>
        </Dialog>
        <Dialog open={openDialog.open && openDialog.type == 'suggestion'} onClose={() => setOpenDialog({ open: false, type: '' })}>
            <LectureCourseContentProvider>
                <CourseAction lectureCourseContent={lectureCourseContent}>
                    <IconButton onClick={() => setOpenDialog({ open: false, type: '' })}><Close /></IconButton>
                </CourseAction>
            </LectureCourseContentProvider>
        </Dialog>
    </>
}