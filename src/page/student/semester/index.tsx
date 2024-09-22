import { Navigation } from "../../../component/navigation"
import { StudentRegistrationHistoryProvider } from "../../../context/studentregistrationhistory"
import { StudentMenu } from "../../../util/studentMenu"
import { DisplaySemester } from "./display"

export  const StudentSemester = () => {
    return (
        <Navigation items={StudentMenu}>
            <StudentRegistrationHistoryProvider>
             <DisplaySemester/>
            </StudentRegistrationHistoryProvider>
        </Navigation>
    )
}