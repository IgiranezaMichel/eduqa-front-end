import { useEffect, useState } from "react"
import { Navigation } from "../../../component/navigation"
import { LectureCourseProvider } from "../../../context/lecturecourse"
import { InstructorMenu } from "../../../util/instructorMenu"
import { DisplayCourse } from "./display"
import { SemesterDao } from "../../../controller/semesterdao"
import { CourseDao } from "../../../controller/courseDao"
import { generateReport } from "../../../component/generatereport"
import { useAuthenticationContext } from "../../../context/authentication"
import { Download } from "@mui/icons-material"
import { LectureReviews } from "../../component/reviews"

export const InstructureCourse = () => {
    const [semester, setSemester] = useState<any>({});
    const [semesterList, setSemesterList] = useState<any>([]);
    useEffect(() => {
        new SemesterDao().getCurrentSemester().then(data => {
            setSemester(data.data);
        }
        )
    }, [])
    useEffect(() => {
        new SemesterDao().getAllSemester().then(data => {
            setSemesterList(data.data);
        })
    }, []
    )
    const changeSemester = (e: any) => {
        new SemesterDao().getSemester(e.target.value).then(data => {
            setSemester(data.data);
        })
    }
    const { content } = useAuthenticationContext();
    const generateCourseReport = () => {
        new CourseDao().getLectureCourseWithInSemester(semester.id).then(data => {
            generateReport(semester.semesterName + " Course Report", ["Course Name", "Course Code", "Course Credit", "Course Duration", "Course Semester"], Array.from(data.data).map((course: any) => [course.courseName, course.courseCode, course.courseCredit, course.courseDuration, course.semester.semesterName]), content.name);
        }
        )
    }
    return <Navigation items={InstructorMenu} additionalNavInfo={<LectureReviews/>}>
        <LectureCourseProvider semesterId={semester.id}>
            <div className="w-full h-full overflow-x-hidden">
                <DisplayCourse semester={semester} content={<>
                    <div className="flex gap-3 items-center">
                        <div>
                            <h1 className="text-2xl font-bold">{semester.semesterName}</h1>
                            <div className="text-xs text-center">
                                Semester  {semester.semNumber == 1 ? 'I' : semester.semNumber == 2 ? 'II' : semester.semNumber == 3 ? 'III' : semester.semNumber == 4 ? 'IV' : semester.semNumber == 5 ? 'V' : semester.semNumber == 6 ? 'VI' : semester.semNumber == 7 ? 'VII' : semester.semNumber == 8 ? 'VIII' : ''}
                            </div>
                        </div>
                        <div>
                            <div className="text-sm">{semester.startingDate}</div>
                            <div className="text-sm">{semester.endDate}</div>
                        </div>
                    </div>
                    <select onChange={changeSemester} className="border border-gray-300 rounded-md px-2 py-1">
                        <option value="">Select semester </option>
                        {semesterList.map((item: any) => {
                            return <option value={item.id} key={item.id}>{item.semesterName} <small className="text-xs">Semester  {item.semNumber == 1 ? 'I' : item.semNumber == 2 ? 'II' : item.semNumber == 3 ? 'III' : item.semNumber == 4 ? 'IV' : item.semNumber == 5 ? 'V' : item.semNumber == 6 ? 'VI' : item.semNumber == 7 ? 'VII' : item.semNumber == 8 ? 'VIII' : ''}
                            </small></option>
                        })
                        }
                    </select>
                    <button
                        onClick={() => generateCourseReport()}
                        className="border border-gray-300 rounded-md px-2 py-1 flex items-center gap-2 *:\ i"><Download /></button>
                </>} />
            </div>
        </LectureCourseProvider>
    </Navigation>
}