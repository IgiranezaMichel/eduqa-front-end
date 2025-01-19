import { Navigation } from "../../../component/navigation"
import { AttendanceProvider } from "../../../context/attendance"
import { InstructorMenu } from "../../../util/instructorMenu"
import { LectureReviews } from "../../component/reviews"
import { DisplayAttendance } from "./components/ui/table"

export const Attendance=()=>{
    return <Navigation items={InstructorMenu} additionalNavInfo={<LectureReviews/>}>
      <AttendanceProvider>
        <DisplayAttendance/>
      </AttendanceProvider>
      </Navigation>
}