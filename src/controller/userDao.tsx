import { Role } from "../enum/role";
import { IPage } from "../interface/page";
import { IUser } from "../interface/user";
import { Axios } from "../util/axios";

export class UserDao {
    public registerUser=(user:IUser)=>{
        const form=new FormData();
        form.append("name",user.name);
        form.append("gender",user.gender);
        form.append("picture",user.picture);
        form.append("role",user.role);
        form.append("email",user.email);
        form.append("password",user.password);
        form.append("phoneNumber",user.phoneNumber);
        if(user.departmentId)
        form.append("departmentId",user.departmentId);
        if(user.id){
            form.append("id",user.id);
        }
        return Axios().post("/user/register",form,{headers:{"Content-Type":"application/json"}});
    }
    public login=(email:string,password:string)=>{
        return Axios().post("/user/login",{email,password});
    }
    public getAllUserPage=(page:IPage,role:Role)=>{
        return Axios().post(`/user/get/all?role=${role}`,page);
    }
    public countUserByRole=(role:Role)=>{
        return Axios().get(`/user/get/total/by-role?role=${role}`);
    }
    
}