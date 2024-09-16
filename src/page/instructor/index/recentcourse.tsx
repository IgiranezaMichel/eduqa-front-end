import { ArrowRight, FileCopy } from "@mui/icons-material"
import { useEffect, useState } from "react"
import { LectureCourseDao } from "../../../controller/lecturecourses"
import { IPage } from "../../../interface/page"
import { toast } from "sonner"

export const RecentCourse=()=>{
    const [page,setPage]=useState<IPage>({
        pageNumber:0,pageSize:10,search:'',sortBy:'id'
    })
    const [courses,setCourses]=useState<any>([]);
    const [isLoading,setIsLoading]=useState(true)
    useEffect(
        ()=>{
            new LectureCourseDao().getAllLectureCourse(page)
            .then(data=>setCourses(data.data))
            .catch(err=>toast.error(err.message))
        }
        
    )
    return <>
    <div className="flex justify-between my-3">
        <div className="font-bold text-xl">Your Recent Course </div>
        <button className="rounded-md p-2 font-bold border border-blue-950 hover:bg-blue-600">View all <ArrowRight/></button>
    </div>
    <div className="flex flex-col">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="border border-gray-200 dark:border-gray-700 md:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-800">
                            <tr>
                                <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <div className="flex items-center gap-x-3">
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
                                   Lecture
                                </th>
                                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    Department
                                </th>
                                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    Duration
                                </th>
                                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    Status
                                </th>
                                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    Suggestion
                                </th>
                          
                            </tr>
                        </thead>
                       {isLoading&&<tbody  className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                            {courses!=undefined&&courses.data!=undefined&&courses.data.map ((data:any,index:number)=><tr>
                                <td key={index+data.id} className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                                    <div className="inline-flex items-center gap-x-3">
                                        <span>{index+1}</span>
                                    </div>
                                </td>
                                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                <div className="flex items-center gap-x-2">
                                        <div className="object-cover w-8 h-8 rounded-full" >
                                            <FileCopy/>
                                        </div>
                                        <div>
                                            <h2 className="text-sm font-medium text-gray-800 dark:text-white ">{data.code}</h2>
                                            <p className="text-xs font-normal text-gray-600 dark:text-gray-400">{data.name}</p>
                                        </div>
                                    </div>
                                </td>
                               
                                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                            <h2 className="text-sm text-center font-medium text-gray-800 dark:text-white ">{data.credit}</h2>
                                </td>
                                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                            <h2 className="text-sm text-center font-medium text-gray-800 dark:text-white ">{data.credit}</h2>
                                </td>
                                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                            <h2 className="text-sm text-center font-medium text-gray-800 dark:text-white ">{data.credit}</h2>
                                </td>
                                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                            <h2 className="text-sm text-center font-medium text-gray-800 dark:text-white ">{data.credit}</h2>
                                </td>
                                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">Monthly subscription</td>
                                <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                    <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-emerald-500 bg-emerald-100/60 dark:bg-gray-800">
                                        <h2 className="text-sm font-normal">{data.timeStamp}</h2>
                                    </div>
                                </td>

                             
                            </tr>)}
                            <tr>
                                <td colSpan={9}>
                                    <div className="flex border-t gap-4 items-center border-gray-200 bg-white px-4 py-3 sm:px-6">
                                            <div>{courses.pageNumber+1} page out of {courses.totalPage} in {courses.size} records</div>
                                            <div className="flex gap-3">
                                            <select onChange={e => setPage({ ...page, pageSize: Number(e.target.value) })} className="border border-gray-300 rounded-md text-sm">
                                                     <option value="10">10</option>
                                                     <option value="20">20</option>
                                                     <option value="30">30</option>
                                                 </select>
                                                <div>
                                                    <button onClick={()=>{setPage({...page,pageNumber:courses.pageNumber-1})}}
                                                    disabled={courses.pageNumber==0}
                                                    className="border border-gray-300 px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100">Previous</button>
                                                </div>
                                                <button onClick={()=>{setPage({...page,pageNumber:courses.pageNumber+1})}} disabled={courses.pageNumber+1==courses.totalPage} className="border border-gray-300 px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100">Next</button>
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
    </>
}