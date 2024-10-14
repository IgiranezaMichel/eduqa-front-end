import { ILectureCourse } from "../interface/lecturecourse";
import { IPage } from "../interface/page";
import { Axios } from "../util/axios";

export class LectureCourseDao {
    public async getLectureCourses(id: any) {
        return Axios().get(`/lecture-course/all/${id}`);
    }
    public async createLectureCourse(lectureCourses: ILectureCourse) {
        return Axios().post('/lecture-course/register', lectureCourses)
    }
    public async getAllLectureCoursePage(page: IPage, semesterId: string) {
        return Axios().post(`/lecture-course/detail/${semesterId}`, page, { withCredentials: true })
    }
public async getAllLectureCourseAvailableWitnInASemester(semesterId:string){
    return Axios().get(`/lecture-course/semester/${semesterId}`)
}
    public async countCourse() {
        return Axios().get(`/lecture-course/total/courses`)
    }
    public async getAllActiveCourseGroups(courseId:string,semesterId:string) {
        return Axios().get(`/lecture-course/find/groups/${courseId}?semesterId=${semesterId}`)
    }

}