import axios from "axios";
import { Role } from "../enum/role";
import { IPage } from "../interface/page";
import { IUser } from "../interface/user";
import { Axios } from "../util/axios";

export class UserDao {
    public async successLogin() {
        return axios.get("/success-login");
    }
    public registerUser=(user:IUser)=>{
        const form=new FormData();
        form.append("name",user.name);
        form.append("gender",user.gender);
        form.append("picture",user.picture);
        form.append("role",user.role);
        form.append("email",user.email);
        form.append("password",user.password);
        form.append("phoneNumber",user.phoneNumber);
        form.append("status",user.status);
        if(user.departmentId)
        form.append("departmentId",user.departmentId);
        if(user.id){
            form.append("id",user.id);
        }
        return Axios().post("/user/register",form,{headers:{"Content-Type":"application/json"},withCredentials:true});
    }
    public login=(username:string,password:string)=>{
        return axios.post(`http://localhost:8080/login?username=${username}&password=${password}`,{},{withCredentials:true});
    }
    public getAllUserPage=(page:IPage,role:Role)=>{
        return Axios().post(`/user/get/all?role=${role}`,page,{withCredentials:true});
    }
    public countUserByRole=(role:Role)=>{
        return Axios().get(`/user/get/total/by-role?role=${role}`,{withCredentials:true});
    }
    
}