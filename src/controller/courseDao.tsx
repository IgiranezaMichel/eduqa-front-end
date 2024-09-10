import { Role } from "../enum/role";
import { ICourse } from "../interface/course";
import { IPage } from "../interface/page";
import { Axios } from "../util/axios";

export class CourseDao {
    public registercourse=(course:ICourse)=>{
        const form=new FormData();
        form.append("name",course.name);
        form.append("code",course.code);
        form.append("credit",course.credit as any);
        if(course.departmentId)
        form.append("departmentId",course.departmentId);
        if(course.id)
        form.append("id",course.id);

        return Axios().post("/course/register",form,{headers:{"Content-Type":"application/json"}});
    }
    public getAllCoursePage=(page:IPage)=>{
        return Axios().post("/course/get/all",page);
    }
    public countCourse=()=>{
        return Axios().get(`/course/get/tatal`);
    }
    public countCourseByDepartment=(role:Role)=>{
        return Axios().get(`/course/get/total/by-department?department=${role}`);
    }
    
}