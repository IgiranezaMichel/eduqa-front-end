import { Navigation } from "../../../component/navigation"
import { HodMenu } from "../../../util/hodMenu"
import { UserProvider } from "../../../context/user"
import { DisplayStudent } from "./display"
import { Role } from "../../../enum/role"
import { UserStatus } from "../../../enum/userStatus"

export const HodManageStudent = () => {


    return <Navigation items={HodMenu}>
        <UserProvider status={UserStatus.ACTIVE} role={Role.ROLE_STUDENT}>
            <DisplayStudent />
        </UserProvider>
    </Navigation>
}