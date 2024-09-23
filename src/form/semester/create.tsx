import { FC, ReactNode, useState } from "react";
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { toast, Toaster } from "sonner";
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
        semNumber:prop.semester.semNumber
    })
    const yearRegx = /^\d{4}-\d{4}$/;
    const savesemester = (e: any) => {
        e.preventDefault();
        if (yearRegx.test(semester.name)) {
            if (Number(semester.name.split("-")[0]) < Number(semester.name.split("-")[1])) {
                new SemesterDao().registerSemester(semester).then(
                    data => { toast.success(data.data); }
                ).catch(err => toast.error(err.message))
            }
            else {
                toast.error("Invalid year format " + semester.name.split("-")[0] + " cant't be greater than " + semester.name.split("-")[1])
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
            setsemester({ ...semester, name: inputValue });
        }
    };

    return <>

        <div>
            <div>
                {prop.children}
            </div>
            <form className="p-2" onSubmit={savesemester}>
                <TextField required label='Semester year' value={semester.name}
                    onChange={handleYear} className="mb-5" fullWidth />
                    <FormControl fullWidth className="mb-4">
                    <InputLabel id="gender-simple-select-label">Select semester number</InputLabel>
                    <Select
                        labelId="gender-simple-select-label"
                        id="gender-simple-select"
                        value={semester.semNumber}
                        label="Select semester number"
                        onChange={(e) => setsemester({ ...semester, semNumber: Number(e.target.value)})}
                    >
                        <MenuItem value={1}>I</MenuItem>
                        <MenuItem value={2}>II</MenuItem>
                        <MenuItem value={3}>III</MenuItem>
                        <MenuItem value={4}>IV</MenuItem>
                    </Select>
                </FormControl>
                
                <TextField type="date" InputLabelProps={{ shrink: true }} required label='Starting Date' value={semester.startingDate}
                    onChange={e => setsemester({ ...semester, startingDate: e.target.value })} className="mb-5" fullWidth />

                <TextField required type="date" InputLabelProps={{ shrink: true }} label='End Date' value={semester.endDate}
                    onChange={(e) => setsemester({ ...semester, endDate: e.target.value })} className="mb-5" fullWidth />
                <div className="py-2 ">
                    <Button type="submit" className="bg-blue-950/90 w-full normal-case text-white p-3 font-bold text-xl">Add new semester</Button>
                </div>
                <Toaster />
            </form>
        </div>

    </>

}