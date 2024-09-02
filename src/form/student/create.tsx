import { FC, ReactNode, useState } from "react";
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { IStudent } from "../../interface/student";
interface IStudentItem {
    student: IStudent,
    children: ReactNode

}


export const CreateStudent: FC<IStudentItem> = (prop) => {
    const [student, setStudent] = useState<IStudent>({
        firstName: prop.student.firstName,email: prop.student.email,
        lastName: prop.student.lastName,
        gender: prop.student.gender,
        regNumber: prop.student.regNumber,
        profile: prop.student.profile,
        semester: prop.student.semester,
        id:prop.student.id
 
    })



    return <>

        <div>
            <div>
                {prop.children}
            </div>
            <form className="p-2">
                <TextField required label='First Name' value={student.firstName}
                    onChange={(e) => setStudent({ ...student, firstName: e.target.value })} className="mb-5" fullWidth />

<TextField required label='First Name' value={student.firstName}
                    onChange={(e) => setStudent({ ...student, firstName: e.target.value })} className="mb-5" fullWidth />

<TextField required label='First Name' value={student.firstName}
                    onChange={(e) => setStudent({ ...student, firstName: e.target.value })} className="mb-5" fullWidth />

<TextField required label='First Name' value={student.firstName}
                    onChange={(e) => setStudent({ ...student, firstName: e.target.value })} className="mb-5" fullWidth />
 

                <FormControl fullWidth>
                    <InputLabel id="gender-simple-select-label">Select gender</InputLabel>
                    <Select
                        labelId="gender-simple-select-label"
                        id="gender-simple-select"
                        value={student.gender}
                        label="Select gender"
                    >
                        <MenuItem value={'Male'}>Male</MenuItem>
                        <MenuItem value={'Female'}>Female</MenuItem>
                     </Select>
                </FormControl>
                <div className="py-2 ">
                <Button className="bg-blue-950/90 w-full normal-case text-white p-3 font-bold text-xl">Add new Student</Button>
                </div>
            </form>
        </div>

    </>

}