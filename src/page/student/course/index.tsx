import { Navigation } from "../../../component/navigation"
import { StudentMenu } from "../../../util/studentMenu"

export  const StudentCourse = () => {
    return (
        <Navigation items={StudentMenu}>
            <h1>Student Course</h1>
            {/* <CourseList /> */}
        </Navigation>
    )
}