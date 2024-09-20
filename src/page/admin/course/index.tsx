import { Navigation } from "../../../component/navigation"
import { CourseProvider } from "../../../context/course"
import { AdminMenu } from "../../../util/admin"
import { DisplayCourse } from "./display"

export const AdminManageCourse=()=>{
    return <Navigation items={AdminMenu}>
     <CourseProvider>
        <DisplayCourse />
    </CourseProvider>
    </Navigation>
}