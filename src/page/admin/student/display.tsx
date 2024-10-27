import { Add, Close, ContactEmergency, People, Search } from "@mui/icons-material";
import { useUserContext } from "../../../context/user"
import { CreateStudent } from "../../../form/student/create";
import { Dialog, IconButton, InputAdornment, TextField } from "@mui/material";
import { IUser } from "../../../interface/user";
import { useEffect, useState } from "react";
import { Role } from "../../../enum/role";
import { IPage } from "../../../interface/page";
import { UserStatus } from "../../../enum/userStatus";
import { ResettingUserPasswordForm } from "../../../form/student/resetpassword";
import { ViewLectureCourse } from "../../../form/lecturecourse/view";
import { ChangeUserStatusForm } from "../../../form/userstatus/create";

export const DisplayStudent = () => {
    const { content, update, refresh } = useUserContext();
    console.log(content);
    const [openDialog, setOpenDialog] = useState({ open: false, type: 'create' });
    const [student, setStudent] = useState<IUser>(
        {
            name: '',
            email: '',
            phoneNumber: '',
            gender: '',
            picture: '',
            id: '',
            password: '',
            role: Role.ROLE_STUDENT,
            status: UserStatus.ACTIVE,
            code: ''
        }
    );
    const [page, setPage] = useState<IPage>({ pageNumber: 0, pageSize: 10, search: '', sortBy: 'id' });
    useEffect(
        () => {
            update(page);
        }, [page, refresh]
    )
    return <section className=" overflow-hidden h-full">
        <div className="float-end py-1 flex gap-3">
            <button className="p-1 bg-green-800/80 text-white">Export</button>
            <button onClick={() => setOpenDialog({ type: 'create', open: true })} className="p-1 bg-blue-950/90 text-white  hover:bg-blue-600"><Add /> Add Student</button>
        </div>
        <div className="flex items-center justify-between clear-both py-1">
            <section className="flex items-center">
                <div className="items-center p-2 bg-green-800/10 text-black font-bold mx-2 hover:bg-blue-600">
                    <div className="text-xl"><People className="text-3xl" />{content.size}</div>
                </div>
                <section>
                    <div className="font-bold text-xl">
                        List of Student
                    </div>
                    <div className="text-gray-500 text-sm">
                        This table contains all the student in the department
                    </div>
                </section>
            </section>
            <section>
                <select onChange={e => e.target.value != '' && refresh(e.target.value)} name="" id="" className="p-1">
                    <option value="">select status</option>
                    <option value={UserStatus.ACTIVE}>active</option>
                    <option value={UserStatus.INACTIVE}>inactive</option>
                </select>
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
        </div>
        <section className="container  mx-auto">
            <div className="flex flex-col ">
                <div className="-mx-4 -my-2 overflow-x-auto overflow-auto mb- h-80 sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden border border-gray-200 :border-gray-700 md:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200 :divide-gray-700 ">
                                <thead className="bg-gray-50 :bg-gray-800 sticky top-0">
                                    <tr>
                                        <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 :text-gray-400">
                                            <div className="flex items-center gap-x-3">
                                                <button className="flex items-center gap-x-2">
                                                    <span>Id</span>
                                                </button>
                                            </div>
                                        </th>

                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 :text-gray-400">
                                            Student
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

                                        <th scope="col" className="relative py-3.5 px-4">
                                            <span className="sr-only">Actions</span>
                                        </th>
                                    </tr>
                                </thead>
                                {content != undefined && content.data != undefined && content.data.length != 0 && <tbody className="bg-white divide-y divide-gray-200 :divide-gray-700 :bg-gray-900">
                                    {content.data.map((data: any, index: number) => <tr>
                                        <td key={index + data.id} className="px-4 py-4 text-sm font-medium text-gray-700 :text-gray-200 whitespace-nowrap">
                                            <div className="inline-flex items-center gap-x-3">
                                                <span>{data.code}</span>
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
                                                <ContactEmergency />
                                                <div>
                                                    <h2 className="text-sm font-medium text-gray-800 :text-white ">{data.email}</h2>
                                                    <p className="text-xs font-normal text-gray-600 :text-gray-400">{data.phoneNumber}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 text-sm text-gray-500 :text-gray-300 whitespace-nowrap">{data.departmentName}</td>
                                        <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                            <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-emerald-500 bg-emerald-100/60 :bg-gray-800">
                                                <h2 className="text-sm font-normal">{data.timeStamp}</h2>
                                            </div>
                                        </td>

                                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                                            <div className="flex items-center gap-x-6">
                                                <button onClick={() => { setStudent(data); setOpenDialog({ type: 'delete', open: true }) }} className="text-blue-500 transition-colors duration-200 hover:text-indigo-500 focus:outline-none">
                                                    Delete
                                                </button>
                                                <button onClick={() => { setStudent(data); setOpenDialog({ type: 'reset', open: true }) }} className="text-blue-500 transition-colors duration-200 hover:text-indigo-500 focus:outline-none">
                                                    Reset
                                                </button>
                                                <button onClick={() => { setStudent(data); setOpenDialog({ type: 'update', open: true }) }} className="text-blue-500 transition-colors duration-200 hover:text-indigo-500 focus:outline-none">
                                                    Edit
                                                </button>
                                                <button onClick={() => { setStudent(data); setOpenDialog({ type: 'view', open: true }) }} className="text-blue-500 transition-colors duration-200 hover:text-indigo-500 focus:outline-none">
                                                    View
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                    )}

                                </tbody>}
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <td colSpan={9}>
            <div className="flex border-t gap-4 items-center border-gray-200 bg-white px-4 py-3 sm:px-6">
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
        <Dialog maxWidth='xs' PaperProps={{ className: 'w-full', style: { maxHeight: '90dvh', overflow: 'auto' } }} open={openDialog.open&&openDialog.type=='create'} disablePortal>
            <CreateStudent refereEntity="student" student={student}>
                <section className="flex justify-between p-2 items-center mb-4">
                    <div>
                        {openDialog.type == 'create' ? <>
                            <div className="text-blue-900/80 font-bold text-lg">Add new Student</div>
                            <div className="text-sm text-slate-600">
                                Add new student to the list of student fill the form below

                            </div>
                        </> : <>Update Course</>}
                    </div>
                    <IconButton className="bg-blue-200/50" onClick={() => setOpenDialog({ ...openDialog, open: false })}><Close /></IconButton>

                </section>
            </CreateStudent>
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