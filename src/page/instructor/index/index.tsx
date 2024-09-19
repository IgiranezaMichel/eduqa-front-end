import { Navigation } from "../../../component/navigation"
import { InstructorMenu } from "../../../util/instructorMenu"
import { IndexOverviewHeading } from "../../component"
import { InstructorOverview } from "./instructoroverview"
import { RecentCourse } from "./recentcourse"

export const InstructorHome=()=>{
    return <Navigation items={InstructorMenu}>
        <IndexOverviewHeading/>
        <InstructorOverview/>
        <RecentCourse/>
    </Navigation>
}