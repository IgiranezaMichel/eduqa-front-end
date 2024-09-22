import axios from "axios";
import { Role } from "../enum/role";
import { IPage } from "../interface/page";
import { IUser } from "../interface/user";
import { Axios } from "../util/axios";
import { UserStatus } from "../enum/userStatus";

export class UserDao {
    public async changeUserStatus(id: any, userStatus: UserStatus) {
      return Axios().get(`/user/change/status/${id}?status=${userStatus}`)
    }
    public async successLogin() {
        return axios.get("http://localhost:8080/success-login",{withCredentials:true});
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
        form.append("code",user.code);
        if(user.id){
            form.append("id",user.id);
        }
        return Axios().post("/user/register",form,{headers:{"Content-Type":"application/json"},withCredentials:true});
    }
    public login=(username:string,password:string)=>{
        return axios.post(`http://localhost:8080/login?username=${username}&password=${password}`,{},{withCredentials:true});
    }
    public getAllUserPage=(page:IPage,role:Role,status:UserStatus)=>{
        return Axios().post(`/user/get/all?role=${role}&status=${status}`,page,{withCredentials:true});
    }
    public countUserByRole=(role:Role,status:UserStatus)=>{
        return Axios().get(`/user/get/total/by-role?role=${role}&status=${status}`,{withCredentials:true});
    }
    public   getAllUserByRoleAndStatus=async(role:Role,status:UserStatus)=>{
        return Axios().get(`/user/get/all/by-role-and-status?role=${role}&status=${status}`,{withCredentials:true});
    }
}