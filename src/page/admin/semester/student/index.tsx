
import { useEffect, useState } from "react"
import { SemesterUserProvider } from "../../../../context/semesteruser"
import { Role } from "../../../../enum/role"
import { SemesterDao } from "../../../../controller/semesterdao"
import StudentHomeTable from "./display"
 export const DisplayStudent = () => {
const [role, setRole] = useState<Role>(Role.ROLE_STUDENT)
const [semester, setSemester] =useState<any>({});
useEffect(
  ()=>{
      new SemesterDao().getCurrentSemester().then((semester)=>{
          setSemester(semester.data);
      })
  },[]
)  
     return <SemesterUserProvider role={role} semesterId={semester.id}>
       <StudentHomeTable semester={semester}/>
    </SemesterUserProvider>
}