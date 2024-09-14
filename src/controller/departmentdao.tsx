import { IDepartment } from "../interface/department";
import { Axios } from "../util/axios";

export class DepartmentDao{
    public static async getAllDepartments(){
       return await Axios().get('/department/get/all');
    }
    public createDepartment(data:IDepartment){
        const form=new FormData();
        form.append('id',data.id);
        form.append('name',data.name);
        return Axios().post('/department/register',form,{headers: {'Content-Type': 'application/json'}});
    }
}