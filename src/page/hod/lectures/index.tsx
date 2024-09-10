import { Navigation } from "../../../component/navigation"
import { HodMenu } from "../../../util/hodMenu"
import { Role } from "../../../enum/role"
import { UserProvider } from "../../../context/user"
import { DisplayLecture } from "./display"

export const HodManageLecturers=()=>{
    return <Navigation items={HodMenu}>
    <UserProvider role={Role.ROLE_INSTRACTOR}>
        <DisplayLecture />
    </UserProvider>
</Navigation>
}