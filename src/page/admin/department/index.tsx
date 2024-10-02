import { Navigation } from "../../../component/navigation"
import { DepartmentProvider } from "../../../context/department"
import { AdminMenu } from "../../../util/admin"
import { AdminDisplayDepartment } from "./display"

export const AdminManageDepartment = () => {
    return <Navigation items={AdminMenu}>
        <DepartmentProvider>
            <AdminDisplayDepartment />
        </DepartmentProvider>
    </Navigation>
}