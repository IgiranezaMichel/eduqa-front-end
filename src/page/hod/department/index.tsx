import { Navigation } from "../../../component/navigation"
import { HodMenu } from "../../../util/hodMenu"
import { HodDisplayDepartment } from "./display"

export const HodManageDepartment = () => {
    return <Navigation items={HodMenu}>
        <HodDisplayDepartment/>
    </Navigation>
}