import { Navigation } from "../../../component/navigation"
import { HodMenu } from "../../../util/hodMenu"
import { UserProvider } from "../../../context/user"
import { DisplayStudent } from "./display"
import { Role } from "../../../enum/role"

export const HodManageStudent = () => {


    return <Navigation items={HodMenu}>
        <UserProvider role={Role.ROLE_STUDENT}>
            <DisplayStudent />
        </UserProvider>
    </Navigation>
}