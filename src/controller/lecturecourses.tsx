import { IPage } from "../interface/page";
import { Axios } from "../util/axios";

export class LectureCourseDao{
    public async getAllLectureCourse(page:IPage){
        return Axios().post(`/lecture-course/all/courses`,page)
    }
    
    public async countCourse() {
        return Axios().get(`/lecture-course/total/courses`)
    }
}