import { Role } from "../enum/role";
import { IPage } from "../interface/page";
import { IRegisterStudent } from "../interface/registerstudent";
import { Axios } from "../util/axios";

export class RegistrationDao{
    public  async registerStudent(data:IRegisterStudent){
        return Axios().post("/registration/register",data);
    }
    public async getAvailabelUserRegisteredForASemesterPage(page:IPage,semester:string,role:Role){
        return Axios().post(`/registration/get/available/by-semester/${semester}?role=${role}`,page,{withCredentials:true});
    }
}
