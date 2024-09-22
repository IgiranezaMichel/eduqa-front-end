import { UserProvider } from "../../../../context/user"
import { Role } from "../../../../enum/role"
import { UserStatus } from "../../../../enum/userStatus"
import {  DisplayUserByRole } from "./display"
import { useState } from "react"
import { AdminIndexOverviewReport } from "../../index/overviewReport"


export const UserManagement = () => {
    const [activeStatus, setActiveStatus] = useState<UserStatus>(UserStatus.ACTIVE)
    const [role, setRole] = useState<Role>(Role.ROLE_STUDENT)
    const activeClass = "bg-blue-950 text-white p-1";
    const inactiveClass = "p-1";
    return <>
        <section>
            <div className="flex justify-between items-center pt-2">
                <div className="font-bold text-xl">System users </div>
            </div>
            <AdminIndexOverviewReport />
            <div className="border-b flex items-center gap-1">
                <button className={role ===Role.ROLE_STUDENT ? activeClass : inactiveClass} onClick={() => setRole(Role.ROLE_STUDENT)}>Student</button>
                <button className={role ===Role.ROLE_INSTRACTOR? activeClass : inactiveClass} onClick={() => setRole(Role.ROLE_INSTRACTOR)}>Lecture</button>
                <button className={role ===Role.ROLE_HOD ? activeClass : inactiveClass} onClick={() => setRole(Role.ROLE_HOD)}>Hod</button>
            </div>
        </section>
        <UserProvider role={role} status={activeStatus}>
            <DisplayUserByRole role={role} content={<section className="flex gap-2">
                <select onChange={e => setActiveStatus(e.target.value as UserStatus)} className="p-1 border border-black focus:outline-none">
                    <option value="">select status</option>
                    <option value={UserStatus.ACTIVE}>active</option>
                    <option value={UserStatus.INACTIVE}>inactive</option>
                </select>
             </section>} />
        </UserProvider>
    </>
}