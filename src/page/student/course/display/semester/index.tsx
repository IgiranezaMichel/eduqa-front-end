import { useEffect, useState } from "react"
import { Close, DocumentScannerRounded, History, HistoryEdu, RateReview } from "@mui/icons-material"
import { StudentRegisterCourseDao } from "../../../../../controller/studentregistercourse"
import { RegistrationDao } from "../../../../../controller/registrationdao"
import { Dialog, IconButton, TextField } from "@mui/material"
import { CreateStudentStudentRegisterCourse } from "../../../../../form/course/createStudentCourses"
import { StudentRegisterCourseWithInSemesterProvider } from "../../../../../context/studentregisteredcourseinsemester"

export const DisplaySemesterCourses = (prop: { semesterId: string }) => {
    const [allCourse, setAllCourse] = useState<any>([])
    const [isLoading, setIsLoading] = useState(true)
    const [registration, setRegistration] = useState<any>({});
    const [studentRegistercourse, setStudentRegisterCourse] = useState<any>({})
    const [openDialog, setOpenDialog] = useState({ open: false, type: 'create' });
    useEffect(
        () => {
            new StudentRegisterCourseDao().getAllStudentRegisteredCourseWithInAsemester(prop.semesterId)
                .then(data => { setAllCourse(data.data); console.log(data.data); setIsLoading(false) })
                .catch(err => { console.log(err); setIsLoading(false) })
            new RegistrationDao().getStudentCurrentSemesterRegistration()
                .then(data => {
                    setRegistration(data.data); console.log(data.data);
                })
            // .catch(err=>toast.error(err.response.data))     
        }, []
    )
    return <>
        <div className="flex justify-between mb-2">
            <div className="flex items-center justify-between mb-1">
                <TextField
                    sx={{ '& .MuiInputBase-root': { height: '40px', }, }}
                    placeholder="Search" />
            </div>

            {Object.keys(registration).length != 0 ?
                <button onClick={() => { setOpenDialog({ open: true, type: 'create' }) }} className="text-white font-bold border bg-blue-900">Add course</button> :
                <div className="text-blue-900 font-bold">Contact School admin to register you in this semester</div>}
        </div>
        <section className="container  mx-auto overflow-hidden">
            <div className="flex flex-col">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden border  border-gray-700 md:rounded-lg">
                            <table className="min-w-full divide-y  divide-gray-700">
                                <thead className=" ">
                                    <tr>
                                        <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 ">
                                            <div className="flex items-center gap-x-3">
                                                <input type="checkbox" className="text-blue-500 rounded bg-gray-900 ring-offset-gray-900 border-gray-700" />
                                                <button className="flex items-center gap-x-2">
                                                    <span>#</span>
                                                </button>
                                            </div>
                                        </th>

                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                                            Course
                                        </th>
                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                                            Lecture
                                        </th>

                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                                            hour
                                        </th>
                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 ">
                                            Credit
                                        </th>
                                        <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">status</th>

                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-700">

                                    {!isLoading && allCourse != undefined && allCourse.length == 0 && <td colSpan={6} className="px-4 py-4 text-center text-sm font-medium text-gray-700 whitespace-nowrap">
                                        No data  found !!
                                    </td>}
                                    {!isLoading && allCourse != undefined && allCourse.map((items: any, index: number) => <tr key={items.lectuureEmail}>
                                        <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                            <div className="inline-flex items-center gap-x-3">
                                                <input type="checkbox" className="text-blue-500 rounded bg-gray-900 ring-offset-gray-900 border-gray-700" />

                                                <span>{index + 1}</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 text-sm  text-gray-300 whitespace-nowrap">
                                            <div className="flex items-center gap-x-2">
                                                <DocumentScannerRounded />
                                                <div>
                                                    <h2 className="text-sm font-medium text-gray-800  ">{items.course.code}</h2>
                                                    <p className="text-xs font-normal text-gray-600">{items.course.name}</p>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                                            <div className="flex items-center gap-x-2">
                                                <img className="object-cover w-8 h-8 rounded-full" src={items.lecture.picture} alt="" />
                                                <div>
                                                    <h2 className="text-sm font-medium text-gray-800">{items.lecture.name}</h2>
                                                    <p className="text-xs font-normal text-gray-600">{items.lecture.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">{items.course.duration} hr</td>
                                        <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                            <h2 className="text-sm font-normal">{items.course.credit}</h2>
                                        </td>
                                        <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                            <h2 className="text-sm font-normal">
                                                <IconButton>
                                                    <RateReview />
                                                </IconButton>
                                                <IconButton>
                                                    <HistoryEdu />
                                                </IconButton>
                                            </h2>
                                        </td>
                                    </tr>)}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <Dialog sx={{ maxHeight: '90dvh', overflowY: 'auto' }} open={openDialog.open && openDialog.type == 'create'}>
            <StudentRegisterCourseWithInSemesterProvider semesterId={prop.semesterId}>
                <CreateStudentStudentRegisterCourse semester={prop.semesterId} StudentRegistercourse={studentRegistercourse}>
                    <div className="flex justify-between p-2 items-center text-blue-950 font-bold">
                        Student course registration
                        <IconButton onClick={() => { setOpenDialog({ open: false, type: 'create' }) }}>
                            <Close />
                        </IconButton>
                    </div>
                </CreateStudentStudentRegisterCourse>
            </StudentRegisterCourseWithInSemesterProvider>
        </Dialog>
    </>
}