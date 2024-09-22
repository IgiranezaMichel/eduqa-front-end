import { useState } from "react";
import { Add, Close, Phone } from "@mui/icons-material"
import { Dialog, IconButton } from "@mui/material"
import { RegistrationForm } from "../../../../../form/registration";
import { useSemesterUserContext } from "../../../../../context/semesteruser";
import RegistrationStatusPieChart from "../../../../../component/chart";
import { Role } from "../../../../../enum/role";

 const StudentHomeTable=(prop:{semester:any})=>{
    const [openDialog, setOpenDialog] = useState({ open: false, type: 'create' });
    const {content}=useSemesterUserContext()
    console.log(content);
    
    return <>
    <section className="py-4">
    <div className="flex justify-between gap-2 items-center">
    <div>List of registered student</div>
    <button onClick={() => setOpenDialog({ open: true, type: 'register'})} 
    className="bg-blue-900 text-white p-1 rounded-md">
        <Add/>
    </button>
    </div>
</section>
        <section>
         <div>
    <div className="flex justify-between items-center py-2">
        <div className="flex gap-2 items-center">        
            <RegistrationStatusPieChart role={Role.ROLE_STUDENT} semesterId={prop.semester.id}/>
<div>
<h1><b>semester </b> {prop.semester.semesterName}</h1>
        <h1><b>starting date </b> {prop.semester.startingDate}</h1>
        <h1><b>ending date </b> {prop.semester.endDate}</h1>
</div>
        </div>
        <img className="w-20" src="../../auca.png" alt="" />
    </div>

    <section className="container  mx-auto overflow-hidden">
{content!=undefined&&content.data!=undefined&&<div className="flex flex-col">
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
                               Lecture
                            </th>
                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                Contact
                            </th>

                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                               Faculty
                            </th>
           
                     
                            <th scope="col" className="relative py-3.5 px-4">
                                <span className="sr-only">Actions</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                       {content.data.length!= 0&&content.data.map((items:any)=><tr>
                            <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                <div className="inline-flex items-center gap-x-3">
                                    <input type="checkbox" className="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700"/>

                                    <span>{items.code}</span>
                                </div>
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                            <div className="flex items-center gap-x-2">
                                    <img className="object-cover w-8 h-8 rounded-full" src={items.picture}/>
                                    <div>
                                        <h2 className="text-sm font-medium text-gray-800 dark:text-white ">{items.name}</h2>
                                        <p className="text-xs font-normal text-gray-600 dark:text-gray-400">{items.email}</p>
                                    </div>
                                </div>
                            </td>
                           
                            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                <div className="flex items-center gap-x-2">
                                    <div>
                                        <h2 className="text-sm font-medium text-gray-800 dark:text-white ">
                                            <Phone/> {items.phoneNumber}
                                        </h2>
                                    </div>
                                </div>
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                {items.departmentName}
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
                        </tr>)}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>}
</section>
</div>
        </section>
   

<Dialog maxWidth='sm' PaperProps={{sx:{maxHeight:'90dvh',overflowY:'auto'}}} open={openDialog.open&&openDialog.type=='register'}>
  <RegistrationForm>
  <section className="flex justify-between p-2 items-center mb-4">
                    <div>
                     <>
                            <div className="text-blue-900/80 font-bold text-lg">Register student in upcoming semester</div>
                            <div className="text-sm text-slate-600">
                               Register Student to the list of registered student fill the form below

                            </div>
                        </> 
                    </div>
                    <IconButton className="bg-blue-200/50" onClick={() => setOpenDialog({ ...openDialog, open: false })}><Close /></IconButton>
                </section>
  </RegistrationForm>
  </Dialog>
    </>
}
export default StudentHomeTable;