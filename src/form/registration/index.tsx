import { Autocomplete, Avatar, ListItem, ListItemAvatar, ListItemText, TextField } from "@mui/material";
import { ReactNode, useEffect, useState } from "react"
import { UserDao } from "../../controller/userDao";
import { UserStatus } from "../../enum/userStatus";
import { Role } from "../../enum/role";
import { Email, PermIdentity, Phone, StarOutline, Wc } from "@mui/icons-material";
import { SemesterDao } from "../../controller/semesterdao";
import { IRegisterStudent } from "../../interface/registerstudent";
import { RegistrationDao } from "../../controller/registrationdao";
import { toast, Toaster } from "sonner";

export const RegistrationForm = (prop: { children: ReactNode }) => {
  const [selectedOption, setSelectedOption] = useState<any>({});
  const [semester, setSemster] = useState<any>({});
  const [register, setRegister] = useState<IRegisterStudent>({ id: '', semesterId: semester.id, userId: selectedOption.id });
  const findActiveSemester = () => {
    new SemesterDao().getCurrentSemester().then(data => {
      setSemster(data.data);
      setRegister({ ...register, semesterId: data.data.id });
    });
  }
  const [student, setStudent] = useState<any>({});
  const handleChange = (event: React.SyntheticEvent, value: any | null) => {
    event;
    setSelectedOption(value);
    if (value) {
      setStudent(findStudentById(value.id) as any);
      setRegister({ ...register, userId: value.id });
      findActiveSemester();
    }
  };
  useEffect(() => {
    setRegister({ ...register, semesterId: semester.id, userId: selectedOption.id });
  }, [register, selectedOption, semester]);

  const filterOptions = (options: any, { inputValue }: any) => {
    return options.filter((option: any) =>
      option.name.toLowerCase().includes(inputValue.toLowerCase()) ||
      option.code.includes(inputValue)
    );
  };
  const [studentList, setStudentList] = useState([]);
  const findStudentById = (id: string) => {
    return studentList.find((student: any) => student.id === id);
  }
  useEffect(
    () => {
      new UserDao().getAllUserByRoleAndStatus(Role.ROLE_STUDENT, UserStatus.ACTIVE).then((students) => {
        setStudentList(students.data);
      }).catch((error) => {
        console.log(error);
      })
    }, []
  )
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    new RegistrationDao().registerStudent(register).then((response) => {
      toast.success(response.data);
    }).catch((error) => {
      toast.error(error.response.data);
    })
  }
  return <form onSubmit={handleSubmit}>
    <div className="sticky top-0 z-50 bg-white">{prop.children}</div>
    <div className="p-2">
      {
        Object.keys(student).length > 0 &&
        <div className="mb-4">
          <div className="p-4 bg-blue-800 text-white">
            <div className="text-lg font-bold">{student.name}</div>
            <small>{student.departmentName}</small>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img src={student.picture} alt="" />
            <div className="border-l-4 border-l-blue-900 p-4">
              <p className="mb-1"><PermIdentity className="bg-blue-900 text-white p-1 rounded-md mb-1" /> {student.code}</p>
              <p className="mb-1"><Email className="bg-blue-900 text-white p-1 rounded-md mb-1" /> {student.email}</p>
              <p className="mb-1"><Wc className="bg-blue-900 text-white p-1 rounded-md mb-1" /> {student.gender}</p>
              <p className="mb-1"><Phone className="bg-blue-900 text-white p-1 rounded-md mb-1" /> {student.phoneNumber}</p>
              <p className="mb-1"><StarOutline className="bg-blue-900 text-white p-1 rounded-md mb-1 normal-case" /> {student.status}</p>
            </div>
          </div>
        </div>
      }
      {Object.keys(semester).length > 0 && <div>
        <div className="p-2">
          <p className="py-2 bg-blue-800 font-bold text-lg text-white p-2">Semester : {semester.semesterName}</p>
          <div className="grid grid-cols-2">
            <p className="mb-2 text-lg">start date : {semester.startingDate}</p>
            <p className="mb-2 text-lg">end date : {semester.endDate}</p>
          </div>
          <p className="mb-2 text-lg">Registered date {semester.timeStamp}</p>
        </div>
      </div>
      }

      <Autocomplete
        options={studentList}
        getOptionLabel={(option: any) => option.name}
        onChange={handleChange}
        filterOptions={filterOptions}
        renderOption={(props, option: any) => (
          <ListItem {...props} key={option.id}>
            <ListItemAvatar>
              <Avatar src={option.picture} alt={option.name} />
            </ListItemAvatar>
            <ListItemText primary={option.name} />
          </ListItem>
        )}
        renderInput={(params) => (
          <TextField {...params} label="Search Student" variant="outlined" />
        )}
      />
      <div className=" my-5">
        {register.semesterId != undefined && register.userId != undefined &&
          <button className="bg-blue-900 text-white p-2 rounded-md w-full" type='submit'>Register</button>
        }
      </div>
    </div>
    <Toaster />
  </form>
}