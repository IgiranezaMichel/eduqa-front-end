import { Axios } from "../util/axios";

export class LectureCourseProgressReportDao{
    public createLectureCourseProgressReport(currentChapter:number,lectureCourseContentId:number){
        return Axios().post(`/lecture-course-progress-report/${lectureCourseContentId}?currentChapter=${currentChapter}`);
    }
    public async getCurrentChapter(){
        return await Axios().get('/lecture-course-progress-report/current-chapter');
    }
}