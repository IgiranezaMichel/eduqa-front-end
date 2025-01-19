/* eslint-disable @typescript-eslint/no-explicit-any */
import { Close,Email, Phone, Visibility } from "@mui/icons-material"
import { Avatar, IconButton, Modal } from "@mui/material"
import { useState } from "react"
import { AttendanceRecordController } from "../../../../../../controller/attendanceRecordController";
import { IAttendanceRecord } from "../../../../../../interface/attendanceRecord";
import { toast, Toaster } from "sonner";
import { AttendanceRecordHistoryProvider, useAttendanceRecordHistoryContext } from "../../../../../../context/attendanceRecordHistory";

export const ViewAttendanceHistory = (prop: { attendance: any }) => {
    const [open, setOpen] = useState(false)
    return <>
        <button onClick={() => setOpen(true)} className="p-2 bg-blue-950/60">
            <Visibility />
        </button>
        <Modal open={open} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <AttendanceRecordHistoryProvider lectureCourseId={prop.attendance.lectureCourseId} attendanceId={prop.attendance.id} >
                <div className="flex flex-col gap-2 p-4 items-center w-max-[90%] h-max-[90%] bg-white">
                    <section className="flex justify-between items-center w-full">
                        <div>{prop.attendance.course.name}</div>
                        <IconButton onClick={() => setOpen(false)}><Close /></IconButton>
                    </section>
                    <DisplayAttendanceList attendanceId={prop.attendance.id} />
                </div>
            </AttendanceRecordHistoryProvider>

        </Modal>
    </>
}

const DisplayAttendanceList = (prop: { attendanceId: any }) => {
    const { content, refresh } = useAttendanceRecordHistoryContext();
    console.log(content);

    const handleAttendance = (attendance: IAttendanceRecord) => {
        new AttendanceRecordController().createAttendanceRecord(attendance)
            .then((res) => {
                toast.success(res.data);
                refresh();
            }).catch(e => { toast.error(e.response.message); console.error(e) });
    }
    return <>
        <main className="grid grid-cols-5 gap-2 items-center border p-1 rounded-md w-full h-full bg-blue-900/50 py-4">
            <div className="border-r">Student</div>
            <div className="border-r">Contacts</div>
            <div className="border-r">Faculty</div>
            <div className="border-r">Attendance status</div>
            <div >Action</div>
        </main>
        {Object.keys(content).length != 0 && content.data != undefined && <div>
            {content.data.length != 0 && content.data.map(
                (data: any) => <div className="grid grid-cols-5 gap-2 items-center border p-1 rounded-md w-full h-full">
                    <div className="flex gap-2 items-center">
                        <Avatar src={data.picture} />
                        <div>
                            <div>{data.student.name}</div>
                            <div>{data.student.gender}</div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="flex gap-2 items-center"><Email className="text-sm" />{data.student.email}</div>
                        <div className="flex gap-2 items-center"><Phone className="text-sm" />{data.student.phoneNumber}</div>
                    </div>
                    <div>
                        {data.student.departmentName}
                    </div>
                    <div>
                        {data.isPresent != null ? <div >
                            {data.isPresent ? <div className="bg-green-500 text-white p-1 rounded-md flex">Present</div> : <div className="bg-red-500 text-white p-1 rounded-md flex">Absent</div>}
                        </div> :
                            <div >Not set</div>}
                    </div>
                    <div className="flex gap-2 items-center justify-center">
                        {data.isPresent != null ? <div >
                            {data.isPresent ?
                                <button className="bg-blue-500 text-white p-1 rounded-md"
                                    onClick={() => {
                                        handleAttendance({
                                            id: data.id,
                                            present: false,
                                            studentCourseId: data.studentCourseId,
                                            attendanceId: prop.attendanceId
                                        })
                                    }}
                                >Absent</button> :
                                <button onClick={() => {
                                    handleAttendance({
                                        id: data.id,
                                        present: true,
                                        studentCourseId: data.studentCourseId,
                                        attendanceId: prop.attendanceId
                                    })
                                }} className="bg-blue-950 text-white p-1 rounded-md">Present</button>}
                        </div> :
                            <div className="flex gap-2 items-center justify-center">
                                <button className="bg-blue-950 text-white p-1 rounded-md"
                                    onClick={() => {
                                        handleAttendance({
                                            id: data.id,
                                            present: true,
                                            studentCourseId: data.studentCourseId,
                                            attendanceId: prop.attendanceId
                                        })
                                    }}>Present</button>
                                <button className="bg-blue-500 text-white p-1 rounded-md"
                                    onClick={() => {
                                        handleAttendance({
                                            id: data.id,
                                            present: false,
                                            studentCourseId: data.studentCourseId,
                                            attendanceId: prop.attendanceId
                                        })
                                    }}>Absent</button>
                            </div>
                        }
                    </div>
                </div>)}
            {content.data.length == 0 && <section className="text-center">
                No data found
            </section>}
        </div>}
        <Toaster />
    </>
}
