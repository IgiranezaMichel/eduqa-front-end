/* eslint-disable @typescript-eslint/no-explicit-any */
import { ICourseReview } from "../interface/coursereview";
import { Axios } from "../util/axios";

export class CourseReviewDao{
public async createCourseReview(input:ICourseReview){
    
    return await Axios().post(`/course-review/register`,input)
}
public async getStudentReviewFromLectureCourse(lectureCourseId:string){
    return Axios().get('course-review/get/student-reviews/'+lectureCourseId)
}
public async getStudentCourseReview(){
    return Axios().get(`/course-review/student/review`);
}
public async listOfPrincipleLectureReviews(){
    return await Axios().get(`/course-review/review-details`);
}
public async getAllLectureReview(){
    return Axios().get(`/course-review/lecture/reviews`)
}
}