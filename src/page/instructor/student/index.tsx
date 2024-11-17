import { Navigation } from "../../../component/navigation"
import { StudentRegisterCourseProvider } from "../../../context/studentregistercourse"
import { InstructorMenu } from "../../../util/instructorMenu"
import { LectureReviews } from "../../component/reviews"
import { DisplayStudent } from "./display"
export const InstructorManageStudent = () => {
  return <Navigation items={InstructorMenu} additionalNavInfo={<LectureReviews/>}>
  <StudentRegisterCourseProvider semesterId="">
    <DisplayStudent selectStatus/>
  </StudentRegisterCourseProvider>
  </Navigation>
}