import { Navigation } from "../../../component/navigation"
import { UserProvider } from "../../../context/user"
import { DisplayStudent } from "./display"
import { Role } from "../../../enum/role"
import { UserStatus } from "../../../enum/userStatus"
import { AdminMenu } from "../../../util/admin"

export const AdminManageStudent = () => {
    return <Navigation items={AdminMenu}>
        <UserProvider status={UserStatus.ACTIVE} role={Role.ROLE_STUDENT}>
            <DisplayStudent />
        </UserProvider>
    </Navigation>
}