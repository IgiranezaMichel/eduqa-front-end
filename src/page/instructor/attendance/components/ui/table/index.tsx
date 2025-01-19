/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ReactNode, useEffect, useState } from "react"
import {InputAdornment, TextField } from "@mui/material"
import { CourseReviewDao } from "../../../../../../controller/coursereviewdao"
import { generateReport } from "../../../../../../component/generatereport"
import { CalendarMonth, People, Search, StarRate } from "@mui/icons-material"
import { useAuthenticationContext } from "../../../../../../context/authentication"
import { IPage } from "../../../../../../interface/page"
import { useStudentRegisterCourseContext } from "../../../../../../context/studentregistercourse"

export const DisplayAttendance = (prop: { selectStatus: ReactNode }) => {
    const [page, setPage] = useState<IPage>({ pageNumber: 0, pageSize: 10, search: '', sortBy: 'id' })
    const [date,setDate] = useState<any>(new Date().getFullYear()+"-"+new Date().getMonth()+1+"-"+new Date().getDate()+" "+new Date().getHours()+":"+new Date().getMinutes()+":"+new Date().getSeconds());
    const [reviews, setReviews] = useState<any>(0);
    const user = useAuthenticationContext();
    useEffect(
        () => {
            new CourseReviewDao().getAllLectureReview().then(data => {
                setReviews(data.data)
            })
        }, []
    )
    const { content, update } = useStudentRegisterCourseContext();
    useEffect(
        () => {
            update(page);
        }, [page]
    )
    const printReport = () => {
        generateReport(user.content.name + " students report", ["Reg Number", "Student name", "Email", "Department", "Time stamp"], Array.from(studentList.data, (data: any) => [data.code, data.name + "\n" + data.gender, data.email + "\n" + data.phoneNumber, data.departmentName, data.timeStamp]), user.content.name);
    }
    return <section className=" overflow-hidden h-full">

        <div className="flex items-center justify-between clear-both py-1">
            <section className="flex items-center">
                <div className="items-center p-2 bg-green-800/10 text-black font-bold mx-2 hover:bg-blue-600">
                    <div className="text-xl"><People className="text-3xl" />{content.size}</div>
                </div>
                <section>
                    <div className="font-bold text-xl">
                        List of Student
                    </div>
                    <div className="text-gray-500 text-sm">
                        This table contains all the student
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
                    <TextField type="datetime-local" value={date}
                    onChange={e => setDate(e.target.value)}
                    sx={{ '& .MuiInputBase-root': { height: '40px', }, }}
                    placeholder="Search"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                < CalendarMonth />
                            </InputAdornment>),
                    }} />
            </div>
            <section className="flex gap-2">
                {prop.selectStatus}
                <select name="" id="" className="border border-gray-300 p-2 rounded-">
                    <option value="">select department</option>
                </select>
                <button className="p-1 bg-green-800/80" onClick={() => printReport()}>Export</button>
            </section>
        </div>
        <section className="container  mx-auto">
            <div className="flex flex-col ">
                <div className="-mx-4 -my-2 overflow-x-auto  overflow-auto h-[50dvh] mb-2 border-0 sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden border border-gray-200  md:rounded-lg">
                      
                        </div>
                    </div>
                </div>
            </div>
        </section>
   
    </section>
}