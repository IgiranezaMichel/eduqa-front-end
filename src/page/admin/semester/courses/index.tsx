import { SemesterCourseProvider } from "../../../../context/semestercourses"
import { DisplaySemesterCourseHome } from "./display"
export const DisplaySemesterCourses = (prop: { semester: any }) => {
  return <SemesterCourseProvider semesterId={prop.semester.id}>
    <DisplaySemesterCourseHome semester={prop.semester} />
  </SemesterCourseProvider>
}