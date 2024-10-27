import { ReactNode, useEffect, useState } from "react"
import { StudentRegisterCourseDao } from "../../../../controller/studentregistercourse";
import { IPage } from "../../../../interface/page";
import { FileCopy } from "@mui/icons-material";

export const StudentList = (prop: { children: ReactNode, semester: any }) => {
    const [students, setStudents] = useState<any>([]);
    const [page, setPage] = useState<IPage>({
        pageNumber: 0, pageSize: 10, search: '', sortBy: 'id'
    });
    useEffect(
        () => {
            new StudentRegisterCourseDao().getListregisteredStudentForLectureCourses(prop.semester.id, page)
                .then(data => {
                    setStudents(data.data); console.log(data.data);
                })
                .catch(err => console.log(err.message))
        }, []
    )
    return <>
        <div className="w-full flex flex-col">{prop.children}</div>
        <div className="flex flex-col">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                    <div className="border border-gray-200 :border-gray-700 md:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200 :divide-gray-700">
                            <thead className="bg-gray-50 :bg-gray-800">
                                <tr>
                                    <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right">
                                        <div className="flex items-center gap-x-3">
                                            <button className="flex items-center gap-x-2">
                                                <span>#</span>
                                            </button>
                                        </div>
                                    </th>

                                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right">
                                        Student
                                    </th>
                                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right">
                                        Contact
                                    </th>
                                </tr>
                            </thead>
                            <tbody className=" divide-y divide-gray-200  ">
                                {students != undefined && students.data != undefined && students.data.length != 0 && students.data.map((data: any, index: number) =>
                                    <tr>
                                        <td key={index + data.id} className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                            <div className="inline-flex items-center gap-x-3">
                                                <span>{index + 1}</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                                            <div className="flex items-center gap-x-2">
                                                <div className="object-cover w-8 h-8 rounded-full" >
                                                    <img src={data.image} className="w-full h-full rounded-full" alt="" />
                                                </div>
                                                <div>
                                                    <h2 className="text-sm font-medium   ">{data.name
                                                    }</h2>
                                                    <p className="text-xs font-normal text-gray-600">{data.gender}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 text-sm whitespace-nowrap flex items-center gap-x-2">
                                            <FileCopy />
                                            <div className="">
                                                <h2 className="text-sm text-center font-medium text-gray-800 ">{data.email}</h2>
                                                <h2 className="text-sm text-center font-medium text-gray-800 ">{data.phoneNumber}</h2>
                                            </div>
                                        </td>
                                    </tr>)}
                                {/* {content != undefined && content.data != undefined && content.data.length == 0 && <tr>
                            <td colSpan={7} className="text-center p-4">No data found !!</td>
                        </tr>} */}
                                {/* <tr>
                            <td colSpan={9}>
                                <div className="flex border-t gap-4 items-center border-gray-200 bg-white px-4 py-3 sm:px-6">
                                    <div>{content.pageNumber + 1} page out of {content.totalPage} in {content.size} records</div>
                                    <div className="flex gap-3">
                                        <select
                                            onChange={e => setPage({ ...page, pageSize: Number(e.target.value) })}
                                            className="border border-gray-300 rounded-md text-sm">
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
                        </tr> */}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </>
}
