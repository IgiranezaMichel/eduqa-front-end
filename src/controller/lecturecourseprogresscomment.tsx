import { Axios } from "../util/axios";

export class LectureCourseProgressCommentDao {
    public async getLectureCoursesBySemesterId(lcpCommentId: any) {
      return Axios().get(`/lecture-course-progress-comment/get/chapter-comments/${lcpCommentId}`);
    }
}