import { Navigation } from "../../../component/navigation"
import { AdminMenu } from "../../../util/admin"
import { UserManagement } from "./display"

export const AdminManageUser=()=>{
    return <Navigation items={AdminMenu}>
    <UserManagement/>
    </Navigation>
}