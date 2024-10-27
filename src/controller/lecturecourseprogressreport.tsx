import { ILectureCourseProgressReport } from "../interface/lecturecoursecontentreport";
import { Axios } from "../util/axios";

export class LectureCourseProgressReportDao{
    public async getAllCourseContent(lectureCourse: any) {
return Axios().get(`/lecture-course-progress-report/course/${lectureCourse}`)
    }
    public createLectureCourseProgressReport(data:ILectureCourseProgressReport){
        return Axios().post(`/lecture-course-progress-report/register`,data);
    }
    public async getCurrentChapter(lectureCourseContentId:string){
        return await Axios().get('/lecture-course-progress-report/current-chapter?lectureCourseId='+lectureCourseContentId+'');
    }
}