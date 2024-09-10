import { FC, ReactNode, useState } from "react";
import { Button,TextField } from "@mui/material";
import { toast, Toaster } from "sonner";
import { useUserContext } from "../../context/user";
import { ISemester } from "../../interface/semester";
import { SemesterDao } from "../../controller/semesterdao";
interface ISemesterItem {
    semester: ISemester,
    children: ReactNode

}
export const Createsemester: FC<ISemesterItem> = (prop) => {
    const [semester, setsemester] = useState<ISemester>({
        name: prop.semester.name, 
        id: prop.semester.id,
        endDate: prop.semester.endDate,
        startingDate: prop.semester.startingDate,
    })
 const {refresh}=useUserContext();
const savesemester = (e:any) => {
    e.preventDefault();
    new SemesterDao().registerSemester(semester).then(
        data=>{toast.success(data.data);refresh()}
    ).catch(err=>toast.error(err))
}
    return <>

        <div>
            <div>
                {prop.children}
            </div>
            <form className="p-2" onSubmit={savesemester}>
                <TextField required label='Semester year' value={semester.name}
                    onChange={(e) => setsemester({ ...semester, name: e.target.value })} className="mb-5" fullWidth />
           
                <TextField type="date" required label='Starting Date' value={semester.startingDate}
                    onChange={(e) => setsemester({ ...semester, startingDate: e.target.value })} className="mb-5" fullWidth />

                <TextField required label='End Date' value={semester.endDate}
                    onChange={(e) => setsemester({ ...semester, endDate: e.target.value })} className="mb-5" fullWidth />
                <div className="py-2 ">
                    <Button type="submit" className="bg-blue-950/90 w-full normal-case text-white p-3 font-bold text-xl">Add new semester</Button>
                </div>
                <Toaster/>
            </form>
        </div>

    </>

}