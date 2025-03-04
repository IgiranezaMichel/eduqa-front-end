/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Add, BookmarkAdd, Close, Delete, Edit, People, PhoneAndroid, RemoveRedEye, Search } from "@mui/icons-material";
import { useUserContext } from "../../../context/user"
import { CreateStudent } from "../../../form/student/create";
import { Badge, Dialog, IconButton, InputAdornment, TextField, Tooltip } from "@mui/material";
import { IUser } from "../../../interface/user";
import { ReactNode, useEffect, useState } from "react";
import { Role } from "../../../enum/role";
import { IPage } from "../../../interface/page";
import { UserStatus } from "../../../enum/userStatus";
import { LectureCourseCreateForm } from "../../../form/lecturecourse/create";
import { ResettingUserPasswordForm } from "../../../form/student/resetpassword";
import { ViewLectureCourse } from "../../../form/lecturecourse/view";
import { ChangeUserStatusForm } from "../../../form/userstatus/create";
import { UserDao } from "../../../controller/userDao";
import { generateReport } from "../../../component/generatereport";
import { useAuthenticationContext } from "../../../context/authentication";

export const DisplayLecture = (prop: { selectStatus: ReactNode }) => {
    const { content, update } = useUserContext();
    const [openDialog, setOpenDialog] = useState({ open: false, type: 'create' });
    const auth=useAuthenticationContext()
    const [student, setStudent] = useState<IUser>(
        {
            name: '',
            email: '',
            phoneNumber: '',
            gender: '',
            picture: '',
            id: '',
            password: '',
            role: Role.ROLE_INSTRACTOR,
            status: UserStatus.ACTIVE,
            code: ''
        }
    );
    const [allLecture,setAllLectures]=useState([])
    const [page, setPage] = useState<IPage>({ pageNumber: 0, pageSize: 10, search: '', sortBy: 'id' });
    const [isProcessingReport,setIsProcessingReport]=useState(false)
    useEffect(
        () => {
            update(page);
        }, [page]
    )
    const getAllUsers=()=>{
        setIsProcessingReport(true);
        return new UserDao().getAllUserByRoleAndStatus(Role.ROLE_INSTRACTOR,UserStatus.ACTIVE).then(
            data=>{setAllLectures(data.data);
            ;setIsProcessingReport(false)}
        );
    }
    const printReport = () => {
        getAllUsers();
        !isProcessingReport&&allLecture!=undefined&&allLecture.length!=0&&generateReport("Lecture report", ["Name", "Email", "Phone Number", "Gender"], Array.from(allLecture,(data:any)=>[data.name,data.email,data.phoneNumber,data.gender]), auth.content.name);
    }
    return <section className=" overflow-hidden h-full">

        <div className="flex items-center justify-between m-0 p-0 clear-both py-1">
            <section className="flex items-center">
                <div className="items-center p-2 bg-green-800/10 text-black font-bold me-2 hover:bg-blue-600">
                    <Badge color="secondary" badgeContent={content.size}>
                        <div className="text-xl">
                            <People className="text-3xl" />
                        </div>
                    </Badge>
                </div>
                <section>
                    <div className="font-bold text-xl">
                        List of Lecture
                    </div>
                    <div className="text-gray-500 text-sm">
                        This table contains all the lecture in the department
                    </div>
                </section>
            </section>

        </div>
        <div className="flex justify-between items-center py-2">
            <div>
                <TextField
                    onChange={e => setPage({ ...page, search: e.target.value })}
                    sx={{ '& .MuiInputBase-root': { height: '40px', }, }}
                    placeholder="Search"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                < Search />
                            </InputAdornment>),
                    }} />
            </div>
            <section className="flex gap-2">
                {prop.selectStatus}
                <button onClick={() => setOpenDialog({ type: 'create', open: true })} className="p-1 bg-blue-950/90 text-white  hover:bg-blue-600"><Add /> Add Lecture</button>
                <button className="p-1 bg-green-800/80" onClick={()=>printReport()}>Export</button>
            </section>
        </div>
        <section className="container  mx-auto">
            <div className="flex flex-col ">
                <div className="-mx-4 -my-2 overflow-x-auto  overflow-auto h-[50dvh] mb-2 border-0 sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden border border-gray-200 :border-gray-700 md:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200 :divide-gray-700 ">
                                <thead className="bg-gray-50 :bg-gray-800  top-0 sticky">
                                    <tr>
                                        <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 :text-gray-400">
                                            <div className="flex items-center gap-x-3">
                                                <button className="flex items-center gap-x-2">
                                                    <span>#</span>
                                                </button>
                                            </div>
                                        </th>

                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 :text-gray-400">
                                            Lecture
                                        </th>
                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 :text-gray-400">
                                            Contacts
                                        </th>

                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 :text-gray-400">
                                            Department
                                        </th>
                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 :text-gray-400">
                                            Registration period
                                        </th>
                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 :text-gray-400">
                                            Total Course
                                        </th>

                                        <th scope="col" className="relative py-3.5 px-4">
                                            <span className="sr-only">Actions</span>
                                        </th>
                                    </tr>
                                </thead>
                                {content != undefined && content.data != undefined && <tbody className="bg-white divide-y divide-gray-200 :divide-gray-700 :bg-gray-900">

                                    <>
                                        {content.data.length != 0 && content.data.map((data: any, index: number) => <tr>
                                            <td key={index + data.id} className="px-4 py-4 text-sm font-medium text-gray-700 :text-gray-200 whitespace-nowrap">
                                                <div className="inline-flex items-center gap-x-3">
                                                    <span> {data.code}</span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-500 :text-gray-300 whitespace-nowrap">
                                                <div className="flex items-center gap-x-2">
                                                    <img className="object-cover w-8 h-8 rounded-full" src={data.picture} alt="" />
                                                    <div>
                                                        <h2 className="text-sm font-medium text-gray-800 :text-white ">{data.name}</h2>
                                                        <p className="text-xs font-normal text-gray-600 :text-gray-400">{data.gender}</p>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="px-4 py-4 text-sm text-gray-500 :text-gray-300 whitespace-nowrap">
                                                <div className="flex items-center gap-x-2">
                                                    <PhoneAndroid />
                                                    <div>
                                                        <h2 className="text-sm font-medium text-gray-800 :text-white ">{data.email}</h2>
                                                        <p className="text-xs font-normal text-gray-600 :text-gray-400">{data.phoneNumber}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-500 :text-gray-300 whitespace-nowrap">{data.departmentName}</td>
                                            <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-emerald-500 bg-emerald-100/60 :bg-gray-800">
                                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                    </svg>

                                                    <h2 className="text-sm font-normal">{data.timeStamp}</h2>
                                                </div>
                                            </td>
                                            <td className="text-center"><span className="px-2 rounded-full bg-gray-100 text-gray-600 text-sm font-bold mx-3">
                                                {data.totalCourse}</span></td>
                                            <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                <div className="flex items-center gap-x-6">
                                                    <div className=""><BookmarkAdd onClick={() => { setStudent(data); setOpenDialog({ type: 'edit', open: true }) }} className="bg-white rounded-full p-1 text-black transition-colors duration-200 :hover:text-indigo-500 hover:text-indigo-500 focus:outline-none" /></div>
                                                    <div className=""><Delete onClick={() => { setStudent(data); setOpenDialog({ type: 'delete', open: true }) }} className="bg-white rounded-full p-1 text-black transition-colors duration-200 :hover:text-indigo-500 hover:text-indigo-500 focus:outline-none" /></div>
                                                    <div className="" onClick={() => { setStudent(data); setOpenDialog({ type: 'view', open: true }) }}><RemoveRedEye className="bg-white rounded-full p-1 text-black transition-colors duration-200 :hover:text-indigo-500 hover:text-indigo-500 focus:outline-none" /></div>
                                                    <Tooltip title='Reset lecture password' placement="top" className="" onClick={() => { setStudent(data); setOpenDialog({ type: 'reset', open: true }) }}><Edit className="bg-white rounded-full p-1 text-black transition-colors duration-200 :hover:text-indigo-500 hover:text-indigo-500 focus:outline-none" /></Tooltip>
                                                </div>
                                            </td>
                                        </tr>)
                                        }
                                    </>

                                    {content.data.length == 0 && <tr>
                                        <td colSpan={7} className="text-center py-4 text-gray-500">No data found</td>
                                    </tr>}
                                </tbody>}

                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section>


        <div>
            {content != undefined && content.data != undefined && content.data.length != 0 &&
                <tr>
                    <td colSpan={9}>
                        <div className="flex  gap-4 items-center border-gray-200 bg-white px-4">
                            <div>{content.pageNumber + 1} page out of {content.totalPage} in {content.size} records</div>
                            <div className="flex gap-3">
                                <select onChange={e => setPage({ ...page, pageSize: Number(e.target.value) })} className="border border-gray-300 rounded-md text-sm">
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
            }
        </div>


        <Dialog maxWidth='xs' PaperProps={{ style: { maxHeight: '90dvh', overflow: 'auto' } }}
            open={openDialog.open && openDialog.type == 'create'}>

            <CreateStudent refereEntity="lecture" student={student}>
                <section className="flex justify-between p-2 items-center mb-4 sticky top-0 bg-black/10">
                    <div>
                        {openDialog.type == 'create' ? <>
                            <div className="text-blue-900/80 font-bold text-lg">Add new Lecture</div>
                            <div className="text-sm text-slate-600">
                                Add new student to the list of lecture fill the form below

                            </div>
                        </> : <>   <div className="text-blue-900/80 font-bold text-lg">Update Lecture</div>
                            <div className="text-sm text-slate-600">
                                Update lecture infromation fill the form below

                            </div></>}
                    </div>
                    <IconButton className="bg-blue-200/50" onClick={() => setOpenDialog({ ...openDialog, open: false })}><Close /></IconButton>
                </section>
            </CreateStudent>
        </Dialog>

        <Dialog open={openDialog.open && openDialog.type == 'edit'}>
            <LectureCourseCreateForm lecture={student}>
                <div className="flex justify-between gap-2">
                    <div>
                        <div className="text-blue-900/80 font-bold text-lg">Assign Lecture Course</div>
                        <div className="text-sm text-slate-600">To Assign lecture course fill the form below </div>
                    </div>
                    <IconButton className="bg-blue-200/50 rounded-none" onClick={() => setOpenDialog({ ...openDialog, open: false })}><Close /></IconButton>
                </div>
            </LectureCourseCreateForm>
        </Dialog>

        <Dialog open={openDialog.open && openDialog.type == 'reset'} onClose={() => setOpenDialog({ ...openDialog, open: false })}>
            <ResettingUserPasswordForm user={student} />
        </Dialog>

        <Dialog open={openDialog.open && openDialog.type == 'view'}
            PaperProps={{ style: { maxHeight: '90dvh', overflow: 'auto' } }}
            onClose={() => setOpenDialog({ ...openDialog, open: false })}>
            <ViewLectureCourse lecture={student} />
        </Dialog>

        <Dialog maxWidth='xs' open={openDialog.open && openDialog.type == 'delete'}
            PaperProps={{ style: { maxHeight: '90dvh', overflow: 'auto' } }}
            onClose={() => setOpenDialog({ ...openDialog, open: false })}>
            <ChangeUserStatusForm user={student} />
        </Dialog>
    </section>
}