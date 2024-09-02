import { Add, Article, Close, Search } from "@mui/icons-material"
import { Navigation } from "../../../component/navigation"
import { HodMenu } from "../../../util/hodMenu"
import { Dialog, IconButton, InputAdornment, TextField } from "@mui/material"
import { useState } from "react"
import { CreateCourse } from "../../../form/course/create"
import { ICourse } from "../../../interface/course"
import { CourseCategory } from "../../../enum/coursecategory"

export const HodManageCourses=()=>{
const [openDialog,setOpenDialog]=useState({open:false,type:'create'});
const [course,setCourse]=useState<ICourse>({
    name:'',
    type:CourseCategory.GENERAL,
    departmentId:'',
    id:''
})








    return <Navigation items={HodMenu}>
        <div className="float-end py-3 ">
           <button onClick={()=>setOpenDialog({type:'create',open:true })} className="p-1 bg-blue-950/90 text-white  hover:bg-blue-600"><Add/> Add Course</button>
        </div>
        <div className="flex items-center justify-between clear-both py-3">
            <section>
                <div className="font-bold text-xl">
                    List of Courses
                </div>
                <div className="text-gray-500 text-sm">
                    This table contains all the Courses in the department 
               </div>
            </section>
            <section>
                <label htmlFor="">Status</label><br />
                <select name="" id="" className="p-2">
                    <option value="">select status</option>
                    <option value="">active</option>
                    <option value="">inactive</option>
                </select>
            </section>
        </div>  
        <div className="flex justify-between items-center py-4">
        <div> 
            <TextField
                sx={{'& .MuiInputBase-root': { height: '40px', }, }}
                placeholder="Search"
                InputProps={{
                startAdornment: (
                <InputAdornment position="start">
                    < Search/>
                </InputAdornment> ), }} />
        </div>
        <section>
            <button className="p-1 bg-green-800/80">Export</button>
        </section>
        </div>
 
 <section className="container  mx-auto overflow-hidden">
    <div className="flex flex-col">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-800">
                            <tr>
                                <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <div className="flex items-center gap-x-3">
                                        <input type="checkbox" className="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700"/>
                                        <button className="flex items-center gap-x-2">
                                            <span>#</span>
                                        </button>
                                    </div>
                                </th>

                                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                   Course  
                                </th>
                                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    Credit                                
                                </th>

                                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                   Lecturer
                                </th>
                                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    Department
                                </th>
                                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    Duration                                
                                </th>
                                <th scope="col" className="relative py-3.5 px-4">
                                    <span className="  ">Progress</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
          

                            <tr>
                                <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                    <div className="inline-flex items-center gap-x-3">
                                        <input type="checkbox" className="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700"/>

                                        <span>#3064</span>
                                    </div>
                                </td>
                                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                <div className="flex items-center gap-x-2">
                                        <div className="bg-blue-200/50 p-1">
                                            <Article/>
                                        </div>                                         <div>
                                            <h2 className="text-sm font-medium text-gray-800 dark:text-white ">Course id</h2>
                                            <p className="text-xs font-normal text-gray-600 dark:text-gray-400">Course name</p>
                                        </div>
                                    </div>
                                </td>
                               
                                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                    <div className="flex items-center gap-x-2">
                                        <img className="object-cover w-8 h-8 rounded-full" src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=761&q=80" alt=""/>
                                        <div>
                                            <h2 className="text-sm font-medium text-gray-800 dark:text-white ">Kate Morrison</h2>
                                            <p className="text-xs font-normal text-gray-600 dark:text-gray-400">kate@example.com</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">Monthly subscription</td>
                                <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                    <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-emerald-500 bg-emerald-100/60 dark:bg-gray-800">
                                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>

                                        <h2 className="text-sm font-normal">done</h2>
                                    </div>
                                </td>
                                <td>
                                    grade
                                </td>
                                <td className="px-4 py-4 text-sm whitespace-nowrap">
                                    <div className="flex items-center gap-x-6">
                                        <button className="text-gray-500 transition-colors duration-200 dark:hover:text-indigo-500 dark:text-gray-300 hover:text-indigo-500 focus:outline-none">
                                            delete
                                        </button>

                                        <button className="text-blue-500 transition-colors duration-200 hover:text-indigo-500 focus:outline-none">
                                            Edit
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
 </section>
 <Dialog maxWidth='xs' PaperProps={{className:'w-full'}} open={openDialog.open}>
    <CreateCourse course={course}>
        <section className="flex justify-between p-2 items-center mb-4">
            <div>
                {openDialog.type=='create'?<>
                <div className="text-blue-900/80 font-bold text-lg">Add new Course</div>
                <div className="text-sm text-slate-600">
                    Add new course to the list of courses fill the form below
                    
                    </div>                
                </>:<>Update Course</>}
            </div>
            <IconButton className="bg-blue-200/50" onClick={()=>setOpenDialog({...openDialog,open:false})}><Close/></IconButton>

        </section>
    </CreateCourse>                
 </Dialog>







 </Navigation>
}