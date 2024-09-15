import { FC, ReactNode, useEffect, useState } from "react";
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { IUser } from "../../interface/user";
import { Role } from "../../enum/role";
import { UserDao } from "../../controller/userDao";
import { toast, Toaster } from "sonner";
import { useUserContext } from "../../context/user";
import { DepartmentDao } from "../../controller/departmentdao";
interface IStudentItem {
    student: IUser,
    refereEntity:string
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
        role: prop.student.role,

    })
    console.log(student);
    
    const [departments, setDepartments] = useState<any>([])
    useEffect(
        () => {
            new DepartmentDao().getAlldepartment()
                .then((res) => {
                    setDepartments(res.data)
                })
        },[]
    )
    const handleImageChange = (e: any) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setStudent({ ...student, picture: reader.result as string });
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };
    const { refresh } = useUserContext();
    const saveStudent = (e: any) => {
        e.preventDefault();
        new UserDao().registerUser(student).then(
            data => { toast.success(data.data); refresh() }
        ).catch(err => toast.error(err))
    }

    return <>

        <div>
            <div className="sticky top-0 bg-white z-50">
                {prop.children}
            </div>
            <form className="p-2" onSubmit={saveStudent}>
                <TextField required label='First Name' value={student.name}
                    onChange={(e) => setStudent({ ...student, name: e.target.value })} className="mb-5" fullWidth />
                <FormControl fullWidth className="mb-4">
                    <InputLabel id="gender-simple-select-label">Select gender</InputLabel>
                    <Select
                        labelId="gender-simple-select-label"
                        id="gender-simple-select"
                        value={student.gender}
                        label="Select gender"
                        onChange={(e) => setStudent({ ...student, gender: e.target.value as string })}
                    >
                        <MenuItem value={'Male'}>Male</MenuItem>
                        <MenuItem value={'Female'}>Female</MenuItem>
                    </Select>
                </FormControl>
                <TextField type="email" required label='Email' value={student.email}
                    onChange={(e) => setStudent({ ...student, email: e.target.value })} className="mb-5" fullWidth />

                <TextField required label='Phone Number' value={student.phoneNumber}
                    onChange={(e) => setStudent({ ...student, phoneNumber: e.target.value })} className="mb-5" fullWidth />

                <TextField required label='Profile Picture' type="file"
                    onChange={handleImageChange} className="mb-5" fullWidth InputLabelProps={{ shrink: true }} />
                <FormControl fullWidth className="mb-4">
                    <InputLabel id="gender-simple-select-label">Select department</InputLabel>
                    <Select
                        labelId="gender-simple-select-label"
                        id="gender-simple-select"
                        label="Select department"
                        onChange={(e) => setStudent({ ...student, departmentId: e.target.value as string })}
                    >
                        {departments.map((data:any)=><MenuItem key={data.id} value={data.id}>{data.name}</MenuItem>)}
                    </Select>
                </FormControl>
                <div className="py-2 ">
                    <Button type="submit" className="bg-blue-950/90 w-full normal-case text-white p-3 font-bold text-xl">Add new {prop.refereEntity}</Button>
                </div>
                <Toaster />
            </form>
        </div>

    </>

}