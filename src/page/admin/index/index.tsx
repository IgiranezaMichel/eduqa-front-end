import { Navigation } from "../../../component/navigation"
import { AuthProvider } from "../../../context/authentication"
import { AdminMenu } from "../../../util/admin"
import { IndexOverviewHeading } from "../../component"
import { CourseOnTrack } from "./courseTrack"
import { AdminIndexOverviewReport } from "./overviewReport"
import { Suggestion } from "./suggestionbox/suggestion"

export const Admin=()=>{
    return <Navigation items={AdminMenu}>
    <AuthProvider>
        <IndexOverviewHeading/>
    </AuthProvider>
    <AdminIndexOverviewReport/>

    <div className="grid grid-cols-2 gap-2">
    <Suggestion/>
    <CourseOnTrack/>
    </div>
    </Navigation>
}