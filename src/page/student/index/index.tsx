import { Navigation } from "../../../component/navigation"
import { StudentMenu } from "../../../util/studentMenu"
import { IndexOverviewHeading } from "../../component"
import { DisplayCourse } from "../course/display/all"

export const StudentIndex = () => {
  return <Navigation items={StudentMenu}>
    <div><IndexOverviewHeading/></div>
    <div className="pt-4">
      <div className="font-bold text-md mb-3">
        Course to be studied
      </div>
    <DisplayCourse/>
    </div>
  </Navigation>
}