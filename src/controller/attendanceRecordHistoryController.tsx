import { IPage } from "../interface/page";
import { Axios } from "../util/axios"

export class AttendanceRecordHistoryController {
public getAttendanceRecordList = async (page:IPage,attendanceId:string,lectureCourseId:string) => {
    return Axios().post(`/attendance-record/list/${attendanceId}/${lectureCourseId}`,page);
}

}