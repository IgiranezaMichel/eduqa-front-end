import { IPage } from "../interface/page";
import { ISemester } from "../interface/semester";
import { Axios } from "../util/axios";

export class SemesterDao {
    public registerSemester=(Semester:ISemester)=>{
        const form=new FormData();
        form.append("name",Semester.name);
        form.append("endDate",Semester.endDate);
        form.append("startingDate",Semester.startingDate);
        if(Semester.id){
            form.append("id",Semester.id);
        }
        return Axios().post("/semester/register",form,{headers:{"Content-Type":"application/json"}});
    }

    public getAllSemesterPage=(page:IPage)=>{
        return Axios().post("/semester/all/page",page);
    }
}