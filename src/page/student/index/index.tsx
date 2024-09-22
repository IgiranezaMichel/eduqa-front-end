import { Navigation } from "../../../component/navigation"
import { StudentMenu } from "../../../util/studentMenu"
import { IndexOverviewHeading } from "../../component"

export const StudentIndex = () => {
  return <Navigation items={StudentMenu}>
    <div><IndexOverviewHeading/></div>
  </Navigation>
}