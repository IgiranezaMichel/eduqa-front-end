import { Add, Close, FileCopy, Search } from "@mui/icons-material";
import { Dialog, IconButton, InputAdornment, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { IPage } from "../../../interface/page";
import { ICourse } from "../../../interface/course";
import { CreateCourse } from "../../../form/course/create";
import { useCourseContext } from "../../../context/course";
import { generateReport } from "../../../component/generatereport";
import { useAuthenticationContext } from "../../../context/authentication";

export const DisplayCourse=()=>{
    const {content,update}=useCourseContext();
    const [openDialog, setOpenDialog] = useState({ open: false, type: 'create' });
    const [course, setCourse] = useState<ICourse>({
        name: '',
        code:'',
        departmentId:'',
        id: '',
        credit:0
    })
    const [page,setPage]=useState<IPage>({pageNumber:0,pageSize:10,search:'',sortBy:'id'});
    useEffect(
        ()=>{
            update(page);
        },[page]
    )
    const user=useAuthenticationContext();
    const printReport = () => {        
        generateReport("School courses", ["Course code", "Course name", "Course credit", "Added time"], Array.from(content.data,(data:any)=>[data.code,data.name,data.credit,data.timeStamp]),user.content.name);
    }
    return <div className="overflow-y-hidden h-full">
      <div className="float-end py-1 ">
            </div>
            <div className="flex items-center justify-between clear-both py-1">
                <section>
                    <div className="font-bold text-xl">
                        List of Course
                    </div>
                    <div className="text-gray-500 text-sm">
                        This table contains all the Course in the department
                    </div>
                </section>
                <button onClick={() => setOpenDialog({ type: 'create', open: true })} className="p-1 bg-blue-950/90 text-white  hover:bg-blue-600"><Add /> Add Course</button>
            </div>
       <div className="flex justify-between items-center py-2">
        <div> 
            <TextField
            onChange={e=>setPage({...page,search:e.target.value})}
                sx={{'& .MuiInputBase-root': { height: '40px', }, }}
                placeholder="Search"
                InputProps={{
                startAdornment: (
                <InputAdornment position="start">
                    < Search/>
                </InputAdornment> ), }} />
        </div>
        <section>
            <button onClick={()=>printReport()} className="p-1 bg-green-800/80 text-white font-bold">Export</button>
        </section>
        </div>
        
     <section className="container  mx-auto bg-white overflow-y-auto w-full overflow-x-auto h-[calc(100vh-10rem)] pb-20">
    <div className="flex flex-col">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="border border-gray-200  :border-gray-700 md:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200  :divide-gray-700">
                        <thead className="bg-gray-50  :bg-gray-800">
                            <tr>
                                <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500  :text-gray-400">
                                    <div className="flex items-center gap-x-3">
                                        <button className="flex items-center gap-x-2">
                                            <span>#</span>
                                        </button>
                                    </div>
                                </th>

                                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500  :text-gray-400">
                                  Course
                                </th>
                                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500  :text-gray-400">
                                    Credit
                                </th>

                                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500  :text-gray-400">
                                   Lecture
                                </th>
                                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500  :text-gray-400">
                                    Department
                                </th>
                                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500  :text-gray-400">
                                    Duration
                                </th>
                                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500  :text-gray-400">
                                    registered time
                                </th>
                                <th scope="col" className="relative py-3.5 px-4">
                                    <span className="sr-only">Actions</span>
                                </th>
                            </tr>
                        </thead>
                       {content!=undefined&&content.data!=undefined&&content.data.length!=0&&<tbody  className="bg-white divide-y divide-gray-200  :divide-gray-700  :bg-gray-900">
                            {content.data.map ((data:any,index:number)=><tr>
                                <td key={index+data.id} className="px-4 py-4 text-sm font-medium text-gray-700  :text-gray-200 whitespace-nowrap">
                                    <div className="inline-flex items-center gap-x-3">
                                        <span>{index+1}</span>
                                    </div>
                                </td>
                                <td className="px-4 py-4 text-sm text-gray-500  :text-gray-300 whitespace-nowrap">
                                <div className="flex items-center gap-x-2">
                                        <div className="object-cover w-8 h-8 rounded-full" >
                                            <FileCopy/>
                                        </div>
                                        <div>
                                            <h2 className="text-sm font-medium text-gray-800  :text-white ">{data.code}</h2>
                                            <p className="text-xs font-normal text-gray-600  :text-gray-400">{data.name}</p>
                                        </div>
                                    </div>
                                </td>
                               
                                <td className="px-4 py-4 text-sm text-gray-500  :text-gray-300 whitespace-nowrap">
                                            <h2 className="text-sm text-center font-medium text-gray-800  :text-white ">{data.credit}</h2>
                                </td>
                                <td className="px-4 py-4 text-sm text-gray-500  :text-gray-300 whitespace-nowrap">
                                            <h2 className="text-sm text-center font-medium text-gray-800  :text-white ">{data.credit}</h2>
                                </td>
                                <td className="px-4 py-4 text-sm text-gray-500  :text-gray-300 whitespace-nowrap">
                                            <h2 className="text-sm text-center font-medium text-gray-800  :text-white ">{data.credit}</h2>
                                </td>
                                <td className="px-4 py-4 text-sm text-gray-500  :text-gray-300 whitespace-nowrap">
                                            <h2 className="text-sm text-center font-medium text-gray-800  :text-white ">{data.credit}</h2>
                                </td>
                                <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                    <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-emerald-500 bg-emerald-100/60  :bg-gray-800">
                                        <h2 className="text-sm font-normal">{data.timeStamp}</h2>
                                    </div>
                                </td>

                                <td className="px-4 py-4 text-sm whitespace-nowrap">
                                    <div className="flex items-center gap-x-6">
                                        <button onClick={()=>{setCourse(data);setOpenDialog({ type: 'update', open: true })}} className="text-blue-500 transition-colors duration-200 hover:text-indigo-500 focus:outline-none">
                                            Edit
                                        </button>
                                    </div>
                                </td>
                            </tr>)}
                            <tr>
                                <td colSpan={9}>
                                    <div className="flex border-t gap-4 items-center border-gray-200 bg-white px-4 py-3 sm:px-6">
                                            <div>{content.pageNumber+1} page out of {content.totalPage} in {content.size} records</div>
                                            <div className="flex gap-3">
                                            <select onChange={e => setPage({ ...page, pageSize: Number(e.target.value) })} className="border border-gray-300 rounded-md text-sm">
                                                     <option value="10">10</option>
                                                     <option value="20">20</option>
                                                     <option value="30">30</option>
                                                 </select>
                                                <div>
                                                    <button onClick={()=>{setPage({...page,pageNumber:content.pageNumber-1})}}
                                                    disabled={content.pageNumber==0}
                                                    className="border border-gray-300 px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100">Previous</button>
                                                </div>
                                                <button onClick={()=>{setPage({...page,pageNumber:content.pageNumber+1})}} disabled={content.pageNumber+1==content.totalPage} className="border border-gray-300 px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100">Next</button>
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
 </section>
 <Dialog maxWidth='xs' PaperProps={{ className: 'w-full' }} open={openDialog.open}>

<CreateCourse course={course}>
    <section className="flex justify-between p-2 items-center mb-4">
        <div>
            {openDialog.type == 'create' ? <>
                <div className="text-blue-900/80 font-bold text-lg">Add new Course</div>
                <div className="text-sm text-slate-600">
                    Add new Course to the list of Course fill the form below
                </div>
            </> : <>Update Course</>}
        </div>
        <IconButton className="bg-blue-200/50" onClick={() => setOpenDialog({ ...openDialog, open: false })}><Close /></IconButton>

    </section>
</CreateCourse>
</Dialog>
    </div>
}