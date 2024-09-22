import { ILectureCourse } from "../interface/lecturecourse";
import { IPage } from "../interface/page";
import { Axios } from "../util/axios";

export class LectureCourseDao{
    public async getLectureCourses(id: any) {
        return Axios().get(`/lecture-course/all/${id}`);
    }
    public async createLectureCourse (lectureCourses: ILectureCourse) {
        return Axios().post('/lecture-course/register',lectureCourses)
    }
    public async getAllLectureCourse(page:IPage){
        return Axios().post(`/lecture-course/all/courses`,page)
    }
    
    public async countCourse() {
        return Axios().get(`/lecture-course/total/courses`)
    }
    
}