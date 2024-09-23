import { Add, Close, ContactEmergency } from "@mui/icons-material"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { Dialog, IconButton } from "@mui/material"
import { HodOverview } from "../index/component/overview"
import { CreateDepartment } from "../../../form/department/create"
import { IDepartment } from "../../../interface/department"
import { DepartmentDao } from "../../../controller/departmentdao"
import { useDepartmentContext } from "../../../context/department"

export const HodDisplayDepartment = () => {
    const [departmentList, setdepartmentList] = useState([])
    const [department, setDepartment] = useState<IDepartment>({
        id:'',
        name:''
    })
    useEffect(
        ()=>{
            new DepartmentDao().getAlldepartment().then((res) => {
                setdepartmentList(res.data)
            }).catch((err) => {
                toast.error(err.message);
            })
        },[]
    )
    const [openDialog, setOpenDialog] = useState({ open: false, type: 'create' });
    const {content}=useDepartmentContext();
    console.log(content)
    return <div >

        <div className="flex items-center justify-between clear-both py-3">
            <section>
                <div className="font-bold text-xl">
                    Department
                </div>
            </section>
            <section className="flex items-center gap-3">
                <select name="" id="" className="p-2 rounded border border-gray-300">
                    <option value="">Department filtering</option>
                    {departmentList.map((item:any, index:number) => <option key={item.id+index} value={item.id}>{item.departmentName}</option>)
                    }
                </select>
                <button onClick={() => setOpenDialog({ open: true, type: 'create'})} className="bg-blue-900 text-white p-2 rounded-md"><Add/></button>
            </section>
        </div>
        <HodOverview/>
        <section className="container  mx-auto">
            <div className="flex flex-col ">
                <div className="-mx-4 -my-2 overflow-x-auto  overflow-auto h-80 mb-20 sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 ">
                                <thead className="bg-gray-50 dark:bg-gray-800 sticky top-0 ">
                                    <tr>
                                        <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                            <div className="flex items-center gap-x-3">
                                                <button className="flex items-center gap-x-2">
                                                    <span>#</span>
                                                </button>
                                            </div>
                                        </th>

                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                            Department
                                        </th>
                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                            Total student
                                        </th>
                                    
                                        <th scope="col" className="relative py-3.5 px-4">
                                            <span className="sr-only">Actions</span>
                                        </th>
                                    </tr>
                                </thead>
                                {content != undefined &&  <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                                    {content.map(([departmentName, numberOfStudents]:any,index:number) => 
                                    <>
                                    <tr>
                                        <td key={departmentName} className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                            <div className="inline-flex items-center gap-x-3">
                                                <span>{index+1}</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                            <div className="flex items-center gap-x-2">
                                                <div>
                                                    <h2 className="text-sm font-medium text-gray-800 dark:text-white ">{departmentName}</h2>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                            <div className="flex items-center gap-x-2">
                                                <ContactEmergency />
                                                <div>
                                                    <h2 className="text-sm font-medium text-gray-800 dark:text-white ">{numberOfStudents}</h2>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                                            <div className="flex items-center gap-x-6">
                                                <button className="text-gray-500 transition-colors duration-200 dark:hover:text-indigo-500 dark:text-gray-300 hover:text-indigo-500 focus:outline-none">
                                                    delete
                                                </button>

                                                <button onClick={() => { setDepartment(departmentName); setOpenDialog({ type: 'update', open: true }) }} className="text-blue-500 transition-colors duration-200 hover:text-indigo-500 focus:outline-none">
                                                    Edit
                                                </button> 
                                            </div>
                                        </td>
                                    </tr>
                                     <tr>
                                 </tr>
                                 </>
                                    )}
                 
                                </tbody>}
                                
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <Dialog maxWidth='xs' PaperProps={{ className: 'w-full' }} open={openDialog.open}>
            <CreateDepartment department={department}>
                <section className="flex justify-between p-2 items-center mb-4">
                    <div>
                        {openDialog.type == 'create' ? <>
                            <div className="text-blue-900/80 font-bold text-lg">Add new Course</div>
                            <div className="text-sm text-slate-600">
                                Add new student to the list of student fill the form below

                            </div>
                        </> : <>Update Course</>}
                    </div>
                    <IconButton className="bg-blue-200/50" onClick={() => setOpenDialog({ ...openDialog, open: false })}><Close /></IconButton>
                </section>
            </CreateDepartment>
        </Dialog>
    </div>
}