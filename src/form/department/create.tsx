import { FC, ReactNode, useState } from "react";
import { Button, TextField } from "@mui/material";
import { toast, Toaster } from "sonner";
import { IDepartment } from "../../interface/department";
import { DepartmentDao } from "../../controller/departmentdao";
interface IDepartmentItems {
    department: IDepartment,
    children: ReactNode

}
export const Createdepartment: FC<IDepartmentItems> = (prop) => {
    const [department, setdepartment] = useState<IDepartment>({
        name: prop.department.name,
        id: prop.department.id,
    })
    const yearRegx = /^\d{4}-\d{4}$/;
    const savedepartment = (e: any) => {
        e.preventDefault();
        if (yearRegx.test(department.name)) {
            if (Number(department.name.split("-")[0]) < Number(department.name.split("-")[1])) {
                new DepartmentDao().createDepartment(department).then(
                    data => { toast.success(data.data); }
                ).catch(err => toast.error(err.message))
            }
            else {
                toast.error("Invalid year format " + department.name.split("-")[0] + " cant't be greater than " + department.name.split("-")[1])
            }

        } else toast.error("Invalid year format")
    }

    const inputLegex = /^\d{0,4}(-\d{0,4})?$/;
    const handleYear = (e: any) => {
        let inputValue = e.target.value;
        if (inputLegex.test(inputValue)) {
            if (inputValue.length === 4 && inputValue.indexOf('-') === -1) {
                inputValue += "-";
            }
            setdepartment({ ...department, name: inputValue });
        }
    };

    return <>

        <div>
            <div>
                {prop.children}
            </div>
            <form className="p-2" onSubmit={savedepartment}>
                <TextField required label='department name' value={department.name}
                    onChange={handleYear} className="mb-5" fullWidth />
                <div className="py-2 ">
                    <Button type="submit" className="bg-blue-950/90 w-full normal-case text-white p-3 font-bold text-xl">Add new department</Button>
                </div>
                <Toaster />
            </form>
        </div>

    </>

}