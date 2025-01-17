import { IAttendance } from "../interface/attendance"
import { Axios } from "../util/axios"

export class AttendanceController {
public createAttendance = async (attendance:IAttendance) => {
    return Axios().post("/attendance/create",attendance);
}
public getAttendanceList = async () => {
    return Axios().get("/attendance/list");
}
public getAttendanceById = async (id:string) => {
    return Axios().get(`/attendance/${id}`);
}
public updateAttendance = async (id:string,attendance:IAttendance) => {
    return Axios().put(`/attendance/${id}`,attendance);
}
}