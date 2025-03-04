import { IPage } from "../interface/page";
import { StudentCourseStatus } from "../interface/StudentCourseStatus";
import { Axios } from "../util/axios";

export class StudentRegisterCourseDao {
    public async changeStudentCourseStatus(id: string, status: StudentCourseStatus) {
       return Axios().get(`/registered-student/updateStudentStatus/${id}?status=${status}`)
    }
     public  async addStudentCourse(lectureCourseId:string,semesterId:string,status:StudentCourseStatus) {
        return Axios().get(`/registered-student/register/${semesterId}?lectureCourseId=${lectureCourseId}&status=${status}`);
    }
    public  async getListregisteredStudentForLectureCourses(semesterId:string, page:IPage) {
        return Axios().post(`/registered-student/get/student-list/${semesterId}`,page);
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
    public async getTotalStudentToughtByLecture(semesterId:string){
        return Axios().get("/registered-student/total-student/join-lecture/"+semesterId)
    }
}
