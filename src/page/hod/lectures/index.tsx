import { Navigation } from "../../../component/navigation"
import { HodMenu } from "../../../util/hodMenu"
import { Role } from "../../../enum/role"
import { UserProvider } from "../../../context/user"
import { DisplayLecture } from "./display"
import { UserStatus } from "../../../enum/userStatus"
import { useState } from "react"

export const HodManageLecturers=()=>{
const [lectureStatus,setLectureStatus]=useState(UserStatus.ACTIVE);
    return <Navigation items={HodMenu}>
      
    <UserProvider status={lectureStatus} role={Role.ROLE_INSTRACTOR}>
        <DisplayLecture selectStatus={  <section>
                <select onChange={e=>e.target.value.length!=0&&setLectureStatus(e.target.value as UserStatus)} className="p-1">
                    <option value="">select status</option>
                    <option value={UserStatus.ACTIVE}>active</option>
                    <option value={UserStatus.INACTIVE}>inactive</option>
                </select>
            </section>}/>
    </UserProvider>
</Navigation>
}