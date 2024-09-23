import { IPage } from "../interface/page";
import { ISemester } from "../interface/semester";
import { Axios } from "../util/axios";

export class SemesterDao {
    public async getSemester(value: any) {
      return await Axios().get(`/semester/get/${value}`);
    }
    public registerSemester=(Semester:ISemester)=>{
        const form=new FormData();
        form.append("name",Semester.name);
        form.append("endDate",Semester.endDate);
        form.append("startingDate",Semester.startingDate);
        form.append("semNumber",Semester.semNumber as any);
        if(Semester.id){
            form.append("id",Semester.id);
        }
        return Axios().post("/semester/register",form,{headers:{"Content-Type":"application/json"},withCredentials:true});
    }
    public getAllSemesterPage=(page:IPage)=>{
        return Axios().post("/semester/all/page",page);
    }
    public getAllSemester=()=>{
        return Axios().get("/semester/all");
    }
    public getCurrentSemester=()=>{
        return Axios().get("/semester/get/current-semester");
    }
    
}