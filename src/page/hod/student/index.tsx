import { Navigation } from "../../../component/navigation"
import { HodMenu } from "../../../util/hodMenu"
import { UserProvider } from "../../../context/user"
import { DisplayStudent } from "./display"

export const HodManageStudent = () => {


    return <Navigation items={HodMenu}>
        <UserProvider>
            <DisplayStudent />
        </UserProvider>
    </Navigation>
}