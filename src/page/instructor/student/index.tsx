import { Navigation } from "../../../component/navigation"
import { StudentRegisterCourseProvider } from "../../../context/studentregistercourse"
import { InstructorMenu } from "../../../util/instructorMenu"
import { DisplayStudent } from "./display"
export const InstructorManageStudent = () => {
  return <Navigation items={InstructorMenu}>
  <StudentRegisterCourseProvider semesterId="">
    <DisplayStudent selectStatus/>
  </StudentRegisterCourseProvider>
  </Navigation>
}