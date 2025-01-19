import { IAttendance } from "../interface/attendance"
import { IAttendanceRecord } from "../interface/attendanceRecord";
import { IPage } from "../interface/page";
import { Axios } from "../util/axios"

export class AttendanceRecordController {
public createAttendanceRecord = async (attendance:IAttendanceRecord) => {    
    return Axios().post("/attendance-record/create",attendance);
}
public getAttendanceRecordList = async (page:IPage,attendanceId:string,lectureCourseId:string) => {
    return Axios().post(`/attendance-record/list/${attendanceId}/${lectureCourseId}`,page);
}
public getAttendanceById = async (id:string) => {
    return Axios().get(`/attendance/${id}`);
}
public updateAttendance = async (id:string,attendance:IAttendance) => {
    return Axios().put(`/attendance/${id}`,attendance);
}
}