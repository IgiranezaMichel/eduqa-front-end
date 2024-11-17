import React, { ReactNode, useEffect, useState } from "react"
import { StudentRegisterCourseDao } from "../../../../controller/studentregistercourse"
import { SemesterDao } from "../../../../controller/semesterdao"
import { IPage } from "../../../../interface/page"
import { ContactEmergency, GroupWork, People, Search, StarRate } from "@mui/icons-material"
import { Button, IconButton, InputAdornment, Menu, MenuItem, MenuList, TextField } from "@mui/material"
import { useStudentRegisterCourseContext } from "../../../../context/studentregistercourse"
import { CourseReviewDao } from "../../../../controller/coursereviewdao"
import { generateReport } from "../../../../component/generatereport"
import { useAuthenticationContext } from "../../../../context/authentication"
import { StudentCourseStatus } from "../../../../interface/StudentCourseStatus"
import { toast } from "sonner"

export const DisplayStudent = (prop: { selectStatus: ReactNode }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleAction=(status:StudentCourseStatus,id:string)=>{
            new StudentRegisterCourseDao().changeStudentCourseStatus(id,status)
            .then((data)=>toast.success(data.data))
            .catch(er=>toast.error(er.response.data));
        handleClose()
    }
    const [currentSemester, setCurrentSemester] = useState<any>({})
    const [page, setPage] = useState<IPage>({ pageNumber: 0, pageSize: 10, search: '', sortBy: 'id' })
    const [studentList, setStudentList] = useState<any>([]);
    const [reviews, setReviews] = useState<any>(0);
    console.log(studentList);
    const user = useAuthenticationContext();
    useEffect(
        () => {
            new SemesterDao().getCurrentSemester()
                .then((res) => {
                    setCurrentSemester(res.data)
                })
        }, []
    )
    useEffect(
        () => {
            if (currentSemester.id != undefined) {
                new StudentRegisterCourseDao()
                    .getListregisteredStudentForLectureCourses(currentSemester.id, page)
                    .then(data => {
                        setStudentList(data.data);
                    })
            }
        }, [currentSemester.id]
    )
    useEffect(
        () => {
            new CourseReviewDao().getAllLectureReview().then(data => {
                setReviews(data.data)
            })
        }, []
    )
    const { content, update } = useStudentRegisterCourseContext();
    useEffect(
        () => {
            update(page);
        }, [page]
    )
    const printReport = () => {
        generateReport(user.content.name + " students report", ["Reg Number", "Student name", "Email", "Department", "Time stamp"], Array.from(studentList.data, (data: any) => [data.code, data.name + "\n" + data.gender, data.email + "\n" + data.phoneNumber, data.departmentName, data.timeStamp]), user.content.name);
    }
    return <section className=" overflow-hidden h-full">

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
                        This table contains all the student
                    </div>
                </section>
            </section>
            <section className="flex">
                <div className="items-center p-2 bg-green-800/10 text-black font-bold mx-2 hover:bg-blue-600">
                    <div className="text-xl"><StarRate className="text-3xl" />{content.size}</div>
                </div>
                <div>
                    {[...new Array(5)].map((_, index: any) => <StarRate className={`${index < reviews ? 'text-yellow-300' : 'text-gray-300'}`} />)}
                    <p className="text-gray-500 text-sm">Overall reviews</p>
                </div>
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
                <select name="" id="" className="border border-gray-300 p-2 rounded-">
                    <option value="">select department</option>
                </select>
                <button className="p-1 bg-green-800/80" onClick={() => printReport()}>Export</button>
            </section>
        </div>
        <section className="container  mx-auto">
            <div className="flex flex-col ">
                <div className="-mx-4 -my-2 overflow-x-auto  overflow-auto h-[50dvh] mb-2 border-0 sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden border border-gray-200  md:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200  ">
                                <thead className="bg-gray-50 top-0 sticky">
                                    <tr>
                                        <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right">
                                            <div className="flex items-center gap-x-3">
                                                <button className="flex items-center gap-x-2">
                                                    <span>#</span>
                                                </button>
                                            </div>
                                        </th>

                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right">
                                            Reg Number
                                        </th>
                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right">
                                            Full Name
                                        </th>

                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right">
                                            Department
                                        </th>
                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right">
                                            Added timee
                                        </th>
                                        <th></th>
                                    </tr>
                                </thead>
                                {studentList != undefined && studentList.data != undefined && <tbody className="bg-white divide-y divide-gray-200">

                                    <>
                                        {studentList.data.length != 0 && studentList.data.map((data: any, index: number) => <tr>
                                            <td key={index + data.id} className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                <div className="inline-flex items-center gap-x-3">
                                                    <span> {data.code}</span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-500whitespace-nowrap">
                                                <div className="flex items-center gap-x-2">
                                                    <img className="object-cover w-8 h-8 rounded-full" src={data.picture} alt="" />
                                                    <div>
                                                        <h2 className="text-sm font-medium text-gray-800 ">{data.name}</h2>
                                                        <p className="text-xs font-normal text-gray-600">{data.gender}</p>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                                                <div className="flex items-center gap-x-2">
                                                    <ContactEmergency />
                                                    <div>
                                                        <h2 className="text-sm font-medium text-gray-800">{data.email}</h2>
                                                        <p className="text-xs font-normal text-gray-600">{data.phoneNumber}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 text-sm  whitespace-nowrap">{data.departmentName}</td>
                                            <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-emerald-500 bg-emerald-100/60 ">
                                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                    </svg>

                                                    <h2 className="text-sm font-normal">{data.timeStamp}</h2>
                                                </div>
                                            </td>
                                            <td>
                                                <div>
                                                    <IconButton
                                                        id="basic-button"
                                                        aria-controls={open ? 'basic-menu' : undefined}
                                                        aria-haspopup="true"
                                                        aria-expanded={open ? 'true' : undefined}
                                                        onClick={handleClick}
                                                    >
                                                        <GroupWork />
                                                    </IconButton>
                                                    <Menu
                                                        id="basic-menu"
                                                        anchorEl={anchorEl}
                                                        open={open}
                                                        onClose={handleClose}
                                                        MenuListProps={{
                                                            'aria-labelledby': 'basic-button',
                                                        }}
                                                    >
                                                        <MenuItem onClick={()=>handleAction(StudentCourseStatus.COMPLETE,data.id)}>Successed</MenuItem>
                                                        <MenuItem onClick={()=>handleAction(StudentCourseStatus.REPEAT,data.id)}>Failed</MenuItem>
                                                    </Menu>
                                                </div>
                                            </td>
                                        </tr>)
                                        }
                                        {
                                            studentList != undefined && studentList.data != undefined && studentList.data.length == 0 && <tr>
                                                <td colSpan={7} className="text-center py-4 text-gray-500">No Data found</td>
                                            </tr>
                                        }
                                    </>

                                    {studentList.data.length == 0 && <tr>
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
            {studentList != undefined && studentList.data != undefined && studentList.data.length != 0 &&
                <tr>
                    <td colSpan={9}>
                        <div className="flex  gap-4 items-center border-gray-200 bg-white px-4">
                            <div>{studentList.pageNumber + 1} page out of {studentList.totalPage} in {studentList.size} records</div>
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
        {/* <Dialog maxWidth='xs' PaperProps={{ style: { maxHeight: '90dvh', overflow: 'auto' } }} 
        open={openDialog.open&&openDialog.type=='create'}>

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
        <Dialog open={openDialog.open&&openDialog.type=='edit'}>
            <LectureCourseCreateForm lecture={student}>
          <div className="flex justify-between gap-2">
          <div>
          <div className="text-blue-900/80 font-bold text-lg">Assign Lecture Course</div>
          <div className="text-sm text-slate-600">To Assign lecture course fill the form below </div>
          </div>
          <IconButton className="bg-blue-200/50 rounded-none" onClick={() => setOpenDialog({ ...openDialog, open: false })}><Close /></IconButton>
          </div>
            </LectureCourseCreateForm>
        </Dialog> */}
    </section>
}