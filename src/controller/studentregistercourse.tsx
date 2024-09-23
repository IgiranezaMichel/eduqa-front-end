import { IPage } from "../interface/page";
import { Axios } from "../util/axios";

export class StudentRegisterCourseDao {
    public  async getListregisteredStudentForLectureCourses(semesterId:string, page:IPage) {
        return Axios().post(`/registered-student/get/student/${semesterId}`,page);
    }
    public  async getStudentCourses(page:IPage) {
        return Axios().post(`/registered-student/get/student/courses`,page);
    }
}
