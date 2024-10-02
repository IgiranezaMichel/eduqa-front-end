import { Add, AddBox, AppRegistrationOutlined, Close, ContactEmergency, Search, Visibility } from "@mui/icons-material";
import { Dialog, IconButton, InputAdornment, TextField, Tooltip } from "@mui/material";
import { ReactNode, useEffect, useState } from "react";
import { useUserContext } from "../../../../context/user";
import { Role } from "../../../../enum/role";
import { UserStatus } from "../../../../enum/userStatus";
import { IUser } from "../../../../interface/user";
import { IPage } from "../../../../interface/page";
import { CreateStudent } from "../../../../form/student/create";
import { LectureCourseCreateForm } from "../../../../form/lecturecourse/create";
import { ViewLectureCourse } from "../../../../form/lecturecourse/view";
import { ChangeUserStatusForm } from "../../../../form/userstatus/create";


export const DisplayUserByRole = (prop: { content: ReactNode, role: Role }) => {
    const { content, update, refresh } = useUserContext();
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
            <div className="flex gap-2 p-2">
                {prop.content}
                {prop.role == Role.ROLE_STUDENT ? <button onClick={() => setOpenDialog({ type: 'create', open: true })} className="p-1 bg-blue-950/90 text-white  hover:bg-blue-600">
                    <Add /> Add Student
                </button> : prop.role == Role.ROLE_INSTRACTOR ?
                    <button onClick={() => { setStudent({ ...student, role: Role.ROLE_INSTRACTOR }); setOpenDialog({ type: 'create', open: true }) }} className="p-1 bg-blue-950/90 text-white  hover:bg-blue-600">
                        Add Instructor
                    </button>
                    : <button onClick={() => { setStudent({ ...student, role: Role.ROLE_HOD }); setOpenDialog({ type: 'create', open: true }) }} className="p-1 bg-blue-950/90 text-white  hover:bg-blue-600">
                        Add Hod
                    </button>}
            </div>
        </div>
        <section className="container  mx-auto">
            <div className="flex flex-col ">
                <div className="-mx-4 -my-2 overflow-x-auto overflow-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 ">
                                <thead className="bg-gray-50 dark:bg-gray-800 sticky top-0">
                                    <tr>
                                        <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                            <div className="flex items-center gap-x-3">
                                                <button className="flex items-center gap-x-2">
                                                    <span>Id</span>
                                                </button>
                                            </div>
                                        </th>

                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                            Student
                                        </th>
                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                            Contacts
                                        </th>

                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                            Department
                                        </th>
                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                            Registration period
                                        </th>

                                        <th scope="col" className="relative py-3.5 px-4">
                                            <span className="sr-only">Actions</span>
                                        </th>
                                    </tr>
                                </thead>
                                {content != undefined && content.data != undefined && content.data.length != 0 && <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                                    {content.data.map((data: any, index: number) => <tr>
                                        <td key={index + data.id} className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                            <div className="inline-flex items-center gap-x-3">
                                                <span>{data.code}</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                            <div className="flex items-center gap-x-2">
                                                <img className="object-cover w-8 h-8 rounded-full" src={data.picture} alt="" />
                                                <div>
                                                    <h2 className="text-sm font-medium text-gray-800 dark:text-white ">{data.name}</h2>
                                                    <p className="text-xs font-normal text-gray-600 dark:text-gray-400">{data.gender}</p>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                            <div className="flex items-center gap-x-2">
                                                <ContactEmergency />
                                                <div>
                                                    <h2 className="text-sm font-medium text-gray-800 dark:text-white ">{data.email}</h2>
                                                    <p className="text-xs font-normal text-gray-600 dark:text-gray-400">{data.phoneNumber}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{data.departmentName}</td>
                                        <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                            <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-emerald-500 bg-emerald-100/60 dark:bg-gray-800">
                                                <h2 className="text-sm font-normal">{data.timeStamp}</h2>
                                            </div>
                                        </td>

                                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                                            <div className="flex items-center gap-x-6">
                                                <Tooltip arrow placement="top" title="Change user status">
                                                    <button
                                                        onClick={() => { setStudent(data); setOpenDialog({ type: 'delete', open: true }) }}
                                                        className="text-gray-500 transition-colors duration-200 dark:hover:text-indigo-500 dark:text-gray-300 hover:text-indigo-500 focus:outline-none">
                                                        <AppRegistrationOutlined />
                                                    </button>
                                                </Tooltip>
                                                {prop.role == Role.ROLE_INSTRACTOR && <>
                                                    <Tooltip arrow placement="top" title="Assign lecture course">
                                                        <button onClick={() => { setStudent(data); setOpenDialog({ type: 'edit', open: true }) }} className="text-white">
                                                            <AddBox />
                                                        </button>
                                                    </Tooltip>
                                                    <Tooltip arrow placement="top" title="View lecture course">
                                                        <button onClick={() => { setStudent(data); setOpenDialog({ type: 'view', open: true }) }} className="text-white">
                                                            <Visibility />
                                                        </button>
                                                    </Tooltip>
                                                </>}
                                            </div>
                                        </td>
                                    </tr>
                                    )}
                                </tbody>}
                                {content != undefined && content.data != undefined && content.data.length == 0 &&
                                    <tr>
                                        <td colSpan={6} className="text-center p-2">No data found!</td>
                                    </tr>
                                }
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        {content.totalPage != 0 && <td colSpan={9}>
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
        </td>}
        <Dialog maxWidth='xs' PaperProps={{ className: 'w-full', style: { maxHeight: '90dvh', overflow: 'auto' } }}
            open={openDialog.open && openDialog.type == 'create'} onClose={() => setOpenDialog({ ...openDialog, open: false })} disablePortal>
            <CreateStudent refereEntity={prop.role==Role.ROLE_HOD?'Hod':prop.role==Role.ROLE_INSTRACTOR?'instractor':'student'} student={student}>
                <section className="flex justify-between p-2 items-center mb-4">
                    <div>
                        {openDialog.type == 'create' ? <>
                            <div className="text-blue-900/80 font-bold text-lg">{prop.role==Role.ROLE_STUDENT?'Add new Student':
                            prop.role==Role.ROLE_INSTRACTOR?'Add new Instructor':'Add new Hod'}</div>
                            <div className="text-sm text-slate-600">
                                {
                                prop.role==Role.ROLE_INSTRACTOR?'Add new instructor to the list of instructor fill the form below'
                                :prop.role==Role.ROLE_HOD?'Add new hod to the list of hod fill the form below':
                                'Add new student to the list of student fill the form below'
                                }

                            </div>
                        </> : <>Update User</>}
                    </div>
                    <IconButton className="bg-blue-200/50" onClick={() => setOpenDialog({ ...openDialog, open: false })}><Close /></IconButton>

                </section>
            </CreateStudent>
        </Dialog>

        <Dialog open={openDialog.open && openDialog.type == 'edit'} onClose={() => setOpenDialog({ ...openDialog, open: false })}>
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