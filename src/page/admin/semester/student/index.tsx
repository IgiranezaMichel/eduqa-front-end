
import { SemesterUserProvider } from "../../../../context/semesteruser"
import { Role } from "../../../../enum/role"
import StudentHomeTable from "./display"
 export const DisplayStudent = (prop:{role:Role,semester:any}) => {
     return <SemesterUserProvider role={prop.role} semesterId={prop.semester.id}>
       <StudentHomeTable semester={prop.semester}/>
    </SemesterUserProvider>
}