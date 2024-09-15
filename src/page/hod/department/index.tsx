import { Navigation } from "../../../component/navigation"
import { DepartmentProvider } from "../../../context/department"
import { HodMenu } from "../../../util/hodMenu"
import { HodDisplayDepartment } from "./display"

export const HodManageDepartment = () => {
    return <Navigation items={HodMenu}>
        <DepartmentProvider>
            <HodDisplayDepartment />
        </DepartmentProvider>
    </Navigation>
}