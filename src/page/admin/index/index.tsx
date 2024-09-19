import { Navigation } from "../../../component/navigation"
import { AuthProvider } from "../../../context/authentication"
import { AdminMenu } from "../../../util/admin"
import { IndexOverviewHeading } from "../../component"
import { AdminIndexOverviewReport } from "./overviewReport"

export const Admin=()=>{
    return <Navigation items={AdminMenu}>
    <AuthProvider>
        <IndexOverviewHeading/>
    </AuthProvider>
    <AdminIndexOverviewReport/>
    </Navigation>
}