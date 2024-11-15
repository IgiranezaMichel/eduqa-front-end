import { useEffect, useState } from "react"
import { Navigation } from "../../../../component/navigation"
import { StudentMenu } from "../../../../util/studentMenu"
import { StudentRegisterCourseDao } from "../../../../controller/studentregistercourse"
import { DocumentScannerRounded } from "@mui/icons-material"
import { SemesterDao } from "../../../../controller/semesterdao"

export const StudentSurvey=()=>{
    const [allCourse, setAllCourse] = useState<any>([])
    const [isLoading, setIsLoading] = useState(true)
    const [semester,setSemester]=useState<any>({})
    useEffect(
        () => {
            new SemesterDao().getCurrentSemester()
            .then(data=>setSemester(data.data))
        //    if(Object.keys(semester).length!=0){
            new StudentRegisterCourseDao().getAllStudentRegisteredCourseWithInAsemester(semester.id)
            .then(data => { setAllCourse(data.data); setIsLoading(false) })
            .catch(err => { console.log(err); setIsLoading(false) })
        //    }
        }, []
    )
    return <Navigation items={StudentMenu} >
     <>
     <div className="font-bold mt-10 mb-2 text-lg">
        My latest course survey
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
                                            My Overall Review
                                        </th>
                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 ">
                                            Suggestion
                                        </th>
                                        <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"></th>

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

                                                <span>{index+1}</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 text-sm  text-gray-300 whitespace-nowrap">
                                            <div className="flex items-center gap-x-2">
                                                <DocumentScannerRounded/>
                                                <div>
                                                    <h2 className="text-sm font-medium text-gray-800  ">{items.courseCode}</h2>
                                                    <p className="text-xs font-normal text-gray-600">{items.courseName}</p>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                                            <div className="flex items-center gap-x-2">
                                                <img className="object-cover w-8 h-8 rounded-full" src={items.lecturePicture} alt="" />
                                                <div>
                                                    <h2 className="text-sm font-medium text-gray-800">{items.lectureName}</h2>
                                                    <p className="text-xs font-normal text-gray-600">{items.lectureEmail}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">{items.courseDuration} hr</td>
                                        <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                            <h2 className="text-sm font-normal">{items.courseCredit}</h2>
                                        </td>
                                        <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                            <h2 className="text-sm font-normal">{items.status}</h2>
                                        </td>
                                    </tr>)}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
    </Navigation>
}