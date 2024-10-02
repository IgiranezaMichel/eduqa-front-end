import { Navigation } from "../../../component/navigation"
import { AdminMenu } from "../../../util/admin"
import { HodDisplaySemester } from "./display"


export const HodManageSemester = () => {
    return <Navigation items={AdminMenu}>
        <HodDisplaySemester/>
    </Navigation>
}