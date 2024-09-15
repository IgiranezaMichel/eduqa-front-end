import { FC, ReactNode, useState } from "react";
import { Button, TextField } from "@mui/material";
import { toast, Toaster } from "sonner";
import { IDepartment } from "../../interface/department";
import { DepartmentDao } from "../../controller/departmentdao";
interface IDepartmentItems {
    department: IDepartment,
    children: ReactNode

}
export const CreateDepartment: FC<IDepartmentItems> = (prop) => {
    const [department, setdepartment] = useState<IDepartment>({
        name: prop.department.name,
        id: prop.department.id,
    })
    const savedepartment = (e: any) => {
        e.preventDefault();
                new DepartmentDao().createDepartment(department).then(
                    data => { toast.success(data.data); }
                ).catch(err => {toast.error(err.response.data);console.log(err);
                })
    }
    return <>

        <div>
            <div>
                {prop.children}
            </div>
            <form className="p-2" onSubmit={savedepartment}>
                <TextField required label='department name' value={department.name}
                    onChange={e=>setdepartment({ ...department, name: e.target.value })} className="mb-5" fullWidth />
                <div className="py-2 ">
                    <Button type="submit" className="bg-blue-950/90 w-full normal-case text-white p-3 font-bold text-xl">Add new department</Button>
                </div>
                <Toaster />
            </form>
        </div>

    </>

}