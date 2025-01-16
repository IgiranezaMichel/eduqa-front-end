import { useEffect, useState } from "react"
import { Navigation } from "../../../../component/navigation"
import { StudentMenu } from "../../../../util/studentMenu"
import { DocumentScannerRounded, RateReview, StarRate } from "@mui/icons-material"
import { CourseReviewDao } from "../../../../controller/coursereviewdao"

export const StudentSurvey=()=>{
    const [allCourse, setAllCourse] = useState<any>([])
    const [isLoading, setIsLoading] = useState(true)
    useEffect(
        () => {
            new CourseReviewDao().getStudentCourseReview()
            .then(data => { setAllCourse(data.data);console.log(data.data);
             setIsLoading(false) })
            .catch(err => { console.log(err); setIsLoading(false) })
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

                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-700">

                                    {!isLoading && allCourse != undefined && allCourse.length == 0 && <td colSpan={6} className="px-4 py-4 text-center text-sm font-medium text-gray-700 whitespace-nowrap">
                                        No data  found !!
                                    </td>}
                                    {!isLoading && allCourse != undefined && allCourse.map((items: any, index: number) => <tr key={items.lectuureEmail}>
                                        <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                            <div className="inline-flex items-center gap-x-3">
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
                                        <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap flex justify-between">
                                            <div>
                                            {[...new Array(5)].map((_,index:number)=>{
                                                return <StarRate className={`${index<items.totalReviews ? 'text-yellow-400' : 'text-gray-300'}`}/>
                                            })}
                                            </div>
                                            <div>
                                                {items.totalReviews}/5
                                            </div>
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