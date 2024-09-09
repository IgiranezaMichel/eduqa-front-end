import { FC, ReactNode, useState } from "react";
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { IUser } from "../../interface/user";
import { Role } from "../../enum/role";
interface IStudentItem {
    student: IUser,
    children: ReactNode

}


export const CreateStudent: FC<IStudentItem> = (prop) => {
    const [student, setStudent] = useState<IUser>({
        name: prop.student.name, 
        email: prop.student.email,
        gender: prop.student.gender,
        id: prop.student.id,
        password: prop.student.password,
        phoneNumber: prop.student.phoneNumber,
        picture: prop.student.picture,
        id: prop.student.id,
        role:Role.ROLE_STUDENT

    })



    return <>

        <div>
            <div>
                {prop.children}
            </div>
            <form className="p-2">
                <TextField required label='First Name' value={student.name}
                    onChange={(e) => setStudent({ ...student, name: e.target.value })} className="mb-5" fullWidth />

                {/* <TextField required label='First Name' value={student.firstName}
                    onChange={(e) => setStudent({ ...student, firstName: e.target.value })} className="mb-5" fullWidth /> */}
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
                <TextField type="email" required label='Email' value={student.email}
                    onChange={(e) => setStudent({ ...student, email: e.target.value })} className="mb-5" fullWidth />

                <TextField required label='First Name' value={student.phoneNumber}
                    onChange={(e) => setStudent({ ...student, firstName: e.target.value })} className="mb-5" fullWidth />

                <div className="py-2 ">
                    <Button className="bg-blue-950/90 w-full normal-case text-white p-3 font-bold text-xl">Add new Student</Button>
                </div>
            </form>
        </div>

    </>

}