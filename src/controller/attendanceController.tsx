import { IAttendance } from "../interface/attendance"
import { IPage } from "../interface/page";
import { Axios } from "../util/axios"

export class AttendanceController {
public createAttendance = async (attendance:IAttendance) => {
    return Axios().post("/attendance/create",attendance);
}
public getAttendanceList = async (page:IPage) => {
    return Axios().post("/attendance/list",page);
}
public getAttendanceById = async (id:string) => {
    return Axios().get(`/attendance/${id}`);
}
public updateAttendance = async (id:string,attendance:IAttendance) => {
    return Axios().put(`/attendance/${id}`,attendance);
}
}