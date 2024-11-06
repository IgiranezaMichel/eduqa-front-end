/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { LectureCourseDao } from "../../../../../controller/lecturecourses";

export const DisplaySemesterCourseHome = (prop: { semester: any }) => {
    const [courses, setCourses] = useState<any>([]);
    useEffect(
        () => {
            new LectureCourseDao().getLectureCoursesBySemesterId(prop.semester.id)
                .then(data => setCourses(data.data))
                .catch(err => console.log(err))
        }, [prop.semester.id]
    )
    return <div>
        <div className="flex justify-between items-center py-2 bg-blue-200 p-1 mt-1 mb-2">
            <div>
                <h1><b>semester </b> {prop.semester.semesterName}</h1>
                <h1><b>starting date </b> {prop.semester.startingDate}</h1>
                <h1><b>ending date </b> {prop.semester.endDate}</h1>
            </div>
            <img className="w-20" src="../../auca.png" alt="" />
        </div>

        <section className="container  mx-auto overflow-hidden">
            <div className="flex flex-col">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden border border-gray-200 :border-gray-700 md:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200 :divide-gray-700">
                                <thead className="bg-gray-300">
                                    <tr>
                                        <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 :text-gray-400">
                                            <div className="flex items-center gap-x-3">
                                                <input type="checkbox" className="text-blue-500 border-gray-300 rounded :bg-gray-900 :ring-offset-gray-900 :border-gray-700" />
                                                <button className="flex items-center gap-x-2">
                                                    <span>#</span>
                                                </button>
                                            </div>
                                        </th>

                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 :text-gray-400">
                                            Lecturer
                                        </th>
                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 :text-gray-400">
                                            Course
                                        </th>


                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 :text-gray-400">
                                            Credit
                                        </th>
                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 :text-gray-400">
                                            duration
                                        </th>
                                        <th scope="col" className="relative py-3.5 px-4">
                                            <span className="sr-only">Actions</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200 :divide-gray-700 :bg-gray-900">
                                    {courses != undefined && courses.length != 0 && courses.map((data: any) => <tr>
                                        <td className="px-4 py-4 text-sm font-medium text-gray-700 :text-gray-200 whitespace-nowrap">
                                            <div className="inline-flex items-center gap-x-3">
                                                <input type="checkbox" className="text-blue-500 border-gray-300 rounded :bg-gray-900 :ring-offset-gray-900 :border-gray-700" />

                                                <span>{data.code}</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 text-sm text-gray-500 :text-gray-300 whitespace-nowrap">
                                            <div className="flex items-center gap-x-2">
                                                <img className="object-cover w-8 h-8 rounded-full" src={data.profile} />
                                                <div>
                                                    <h2 className="text-sm font-medium text-gray-800 :text-white ">
                                                        {data.name}
                                                    </h2>
                                                    <p className="text-xs font-normal text-gray-600 :text-gray-400">{data.email}</p>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-4 py-4 text-sm text-gray-500 :text-gray-300 whitespace-nowrap">
                                            <div className="flex items-center gap-x-2">
                                                <div>{data.course.code}</div>
                                                <div>
                                                    <h2 className="text-sm font-medium text-gray-800 :text-white ">
                                                        {data.course.name}
                                                    </h2>
                                                    <p className="text-xs font-normal text-gray-600 :text-gray-400">
                                                        {data.course.code}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 text-sm text-gray-500 :text-gray-300 whitespace-nowrap">
                                            {data.course.credit}
                                        </td>
                                        <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                            <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-emerald-500 bg-emerald-100/60 :bg-gray-800">
                                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                </svg>

                                                <h2 className="text-sm font-normal">{data.course.duration} hrs</h2>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                                            <div className="flex items-center gap-x-6">
                                                <button className="text-gray-500 transition-colors duration-200 :hover:text-indigo-500 :text-gray-300 hover:text-indigo-500 focus:outline-none">
                                                    delete
                                                </button>

                                                <button className="text-blue-500 transition-colors duration-200 hover:text-indigo-500 focus:outline-none">
                                                    Edit
                                                </button>
                                            </div>
                                        </td>
                                    </tr>)}
                                    {courses!=undefined&&courses.length==0&&<tr>
                                        <td colSpan={5} className="text-center p-5">No data found !</td>
                                        </tr>}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
}