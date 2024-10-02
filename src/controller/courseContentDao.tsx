import { ILectureCourseContent } from "../interface/lecturecoursecontent";
import { Axios } from "../util/axios";

export class CourseContentDao {
    public async getLectureCourseContent(lectureCourse: string) {
        return Axios().get("/lecture-course-content/get/course-content/" + lectureCourse);
    }

    public async createCourseContent(courseContent: ILectureCourseContent) {
        return Axios().post('/lecture-course-content/register', courseContent)
    }
}