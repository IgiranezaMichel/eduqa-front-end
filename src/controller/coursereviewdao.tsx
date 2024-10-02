import { ICourseReview } from "../interface/coursereview";
import { Axios } from "../util/axios";

export class CourseReviewDao{
public async createCourseReview(input:ICourseReview){
    const form=new FormData();
    form.append('id',input.id);
    form.append('lectureCourseId',input.lectureCourseId);
    form.append('marks',input.marks as any);
    return await Axios().post(`/course-review/register`,form)
}
public async getStudentCourseReview(){
    return await Axios().get(`/course-review/student/review`);
}
}