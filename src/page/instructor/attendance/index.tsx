import { Navigation } from "../../../component/navigation"
import { StudentRegisterCourseProvider } from "../../../context/studentregistercourse"
import { InstructorMenu } from "../../../util/instructorMenu"
import { LectureReviews } from "../../component/reviews"
import { DisplayAttendance } from "./components/ui/table"

export const Attendance=()=>{
    return <Navigation items={InstructorMenu} additionalNavInfo={<LectureReviews/>}>
      <StudentRegisterCourseProvider semesterId="">
        <DisplayAttendance selectStatus/>
      </StudentRegisterCourseProvider>
      </Navigation>
}