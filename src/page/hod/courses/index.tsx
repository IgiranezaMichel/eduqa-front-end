import { Navigation } from "../../../component/navigation"
import { HodMenu } from "../../../util/hodMenu"
import { CourseProvider } from "../../../context/course"
import { DisplayCourse } from "./display"

export const HodManageCourses = () => {

       return <Navigation items={HodMenu}>
    <CourseProvider>
        <DisplayCourse />
    </CourseProvider>
</Navigation>
}