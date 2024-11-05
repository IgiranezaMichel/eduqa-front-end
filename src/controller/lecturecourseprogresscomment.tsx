import axios from "axios";
import { Axios } from "../util/axios";

export class LectureCourseProgressCommentDao {
    public async getLectureCoursesBySemesterId(lcpCommentId: any) {
      return Axios().get(`/lecture-course-progress-comment/get/chapter-comments/${lcpCommentId}`);
    }
    public async findLatestMessageForEachCourseContentReport(semesterId: any) {
      return axios.get(`http://localhost:8080/latest-comment/${semesterId}`,{withCredentials:true});
    }

}