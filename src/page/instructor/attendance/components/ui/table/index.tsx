/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {  useEffect, useState } from "react"
import { InputAdornment, TextField } from "@mui/material"
import { CourseReviewDao } from "../../../../../../controller/coursereviewdao"
import { People, Search, StarRate, Visibility } from "@mui/icons-material"
// import { useAuthenticationContext } from "../../../../../../context/authentication"
import { IPage } from "../../../../../../interface/page"
import { useAttendanceContext } from "../../../../../../context/attendance"
import { AddNewAttendance } from "../../actions/addAttendance"
import { ViewAttendanceList } from "../table-actions/viewAttendanceList"
import { ViewAttendanceHistory } from "../table-actions/attendanceHistory"

export const DisplayAttendance = () => {
    const [page, setPage] = useState<IPage>({ pageNumber: 0, pageSize: 10, search: '', sortBy: 'id' })
    const [reviews, setReviews] = useState<any>(0);
    // const user = useAuthenticationContext();    
    useEffect(
        () => {
            new CourseReviewDao().getAllLectureReview().then(data => {
                setReviews(data.data)
            })
        }, []
    )
    const { content, update } = useAttendanceContext();
    console.log(content);

    useEffect(
        () => {
            update(page);
        }, [page]
    )
    // const printReport = () => {
    //     generateReport(user.content.name + " students report", ["Reg Number", "Student name", "Email", "Department", "Time stamp"], Array.from(studentList.data, (data: any) => [data.code, data.name + "\n" + data.gender, data.email + "\n" + data.phoneNumber, data.departmentName, data.timeStamp]), user.content.name);
    // }
    return <section className=" overflow-hidden h-full">

        <div className="flex items-center justify-between clear-both py-1">
            <section className="flex items-center">
                <div className="items-center p-2 bg-green-800/10 text-black font-bold mx-2 hover:bg-blue-600">
                    <div className="text-xl"><People className="text-3xl" />{content.size}</div>
                </div>
                <section>
                    <div className="font-bold text-xl">
                        List of Attendance
                    </div>
                    <div className="text-gray-500 text-sm">
                        This table contains all attendance list
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
            <div className="flex gap-2">
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
            <AddNewAttendance />
        </div>

        {Object.keys(content).length != 0 &&
            content.data != undefined && <div>
                <div>
                    <div className="grid grid-cols-4 p-2 border rounded-md bg-blue-900/50 gap-1">
                        <div className="border-r border-gray-300 p-2">Course</div>
                        <div className="border-r border-gray-300 p-2">Attendance Time</div>
                        <div className="border-r border-gray-300 p-2">Recorded Date</div>
                        <div>Action</div>
                    </div>
                    {content.data.length != 0 && content.data.length != 0 &&
                        content.data.map((item: any, index: number) => {
                            return <div key={index} className="grid grid-cols-4 p-2 border rounded-md mt-2 items-center gap-1">
                                <div className="flex justify-center gap-2">
                                    <div className="bg-blue-300 p-1 flex items-center">
                                        {item.course.code}
                                    </div>
                                    <section>
                                        <div className="bg-blue-300 p-1 items-center text-sm">{item.course.name}</div>
                                        <div><b>credit:</b>{item.course.credit}</div>
                                        <div><b>Duration :</b>{item.course.duration} hrs/week</div>
                                    </section>
                                </div>
                                <div>
                                    {item.date}
                                </div>
                                <div>
                                    {item.timeStamp}
                                </div>
                                <div className="flex gap-3">
                                    <ViewAttendanceList attendance={item}/>
                                    <ViewAttendanceHistory attendance={item}/>
                                </div>
                            </div>
                        })

                    }
                </div>
                {content.data.length == 0 && <section className="text-center p-4">
                    No attendance data found
                </section>}
            </div>}
    </section>
}