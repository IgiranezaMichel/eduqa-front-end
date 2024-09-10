import { Navigation } from "../../../component/navigation"
import { HodMenu } from "../../../util/hodMenu"
import { HodDisplaySemester } from "./display"


export const HodManageSemester = () => {
    return <Navigation items={HodMenu}>
        <HodDisplaySemester/>
    </Navigation>
}