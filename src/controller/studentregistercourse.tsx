import { IPage } from "../interface/page";
import { IStudentRegisterCourse } from "../interface/studentregistercourse";
import { Axios } from "../util/axios";

export class StudentRegisterCourseDao {
     public  async addStudentCourse(courses:IStudentRegisterCourse) {
        return Axios().post(`/registered-student/create`,courses);
    }
    public  async getListregisteredStudentForLectureCourses(semesterId:string, page:IPage) {
        return Axios().post(`/registered-student/get/student/${semesterId}`,page);
    }
    public  async getStudentCourses(page:IPage) {
        return Axios().post(`/registered-student/get/student/courses`,page);
    }
    public async getStudentPrincipalCourses(){
        return Axios().get('/registered-student/get/student/courses')
    }
    public async getStudentPrincipalCompletedCourseHistory(){
        return Axios().get('/registered-student/getall/student/courses')
    }
    public async getAllStudentRegisteredCourseWithInAsemester(semesterId:string){
        return Axios().get(`/registered-student/getall/student/registered/courses/${semesterId}`)
    }
}
