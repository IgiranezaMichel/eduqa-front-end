import {Route, BrowserRouter as Router, Routes } from "react-router-dom"
import { ForgetPassword } from "./page/visitor/authentication/forgetPassword"
import { Login } from "./page/visitor/authentication/login"
import { HOD } from "./page/hod/index"
import { HodManageLecturers } from "./page/hod/lectures"
import { HodManageStudent } from "./page/hod/student"
import { HodManageCourses } from "./page/hod/courses"
// import { HodManageSemester } from "./page/hod/semester"
import { HodManageReport } from "./page/hod/report"
import { InstructorHome } from "./page/instructor/index"
import { AuthProvider } from "./context/authentication"
import { Admin } from "./page/admin/index"
import { AdminManageUser } from "./page/admin/user"
import { AdminManageSemester } from "./page/admin/semester"
import { AdminManageCourse } from "./page/admin/course"
import { AdminReport } from "./page/admin/report"
import { InstructureCourse } from "./page/instructor/course"
import { InstructorManageStudent } from "./page/instructor/student"
import { StudentIndex } from "./page/student/index"
import { StudentSemester } from "./page/student/semester"
import { StudentCourse } from "./page/student/course"
import { StudentSurvey } from "./page/student/survey/display"
import { AdminManageDepartment } from "./page/admin/department"
import { AdminManageLecturers } from "./page/admin/lectures"
import { AdminManageStudent } from "./page/admin/student"
import { UserAccountSetting } from "./component/settings"
import { Deliberation } from "./page/instructor/decision"
function App() {

  return (
    <Router>
      <div className="font-poppins">
      <Routes>
        <Route path="/" element={<Login/>}></Route>
        <Route path="/forgot-password" element={<ForgetPassword/>}></Route>
        
        <Route path="/hod" element={<AuthProvider><HOD/></AuthProvider>}></Route>
        <Route path="/hod/lectures" element={<AuthProvider><HodManageLecturers/></AuthProvider>}></Route>
        <Route path="/hod/students" element={<AuthProvider><HodManageStudent/></AuthProvider>}></Route>
        <Route path="/hod/courses" element={<AuthProvider><HodManageCourses/></AuthProvider>}></Route>
        <Route path="/hod/reports" element={<AuthProvider><HodManageReport/></AuthProvider>}></Route>
        
        <Route path="/instructor" element={<AuthProvider><InstructorHome/></AuthProvider>}></Route>
        <Route path="/instructor/course" element={<AuthProvider><InstructureCourse/></AuthProvider>}></Route>
        <Route path="/instructor/student" element={<AuthProvider><InstructorManageStudent/></AuthProvider>}></Route>
        <Route path="/instructor/student/deliberation" element={<AuthProvider><Deliberation/></AuthProvider>}></Route>

        <Route path="/student" element={<AuthProvider><StudentIndex/></AuthProvider>}></Route>
        <Route path="/student/semesters" element={<AuthProvider><StudentSemester/></AuthProvider>}></Route>
        <Route path="/student/course" element={<AuthProvider><StudentCourse/></AuthProvider>}></Route>
        <Route path="/student/survey" element={<AuthProvider><StudentSurvey/></AuthProvider>}></Route>
        
        <Route path="/admin" element={<AuthProvider><Admin/></AuthProvider>}></Route>
        <Route path="/admin/user" element={<AuthProvider><AdminManageUser/></AuthProvider>}></Route>
        <Route path="/admin/department" element={<AuthProvider><AdminManageDepartment/></AuthProvider>}></Route>
        <Route path="/admin/semester" element={<AuthProvider><AdminManageSemester/></AuthProvider>}></Route>
        <Route path="/admin/course" element={<AuthProvider><AdminManageCourse/></AuthProvider>}></Route>
        <Route path="/admin/report" element={<AuthProvider><AdminReport/></AuthProvider>}></Route>
        <Route path="/admin/lecture" element={<AuthProvider><AdminManageLecturers/></AuthProvider>}></Route>
        <Route path="/admin/student" element={<AuthProvider><AdminManageStudent/></AuthProvider>}></Route>
        <Route path="/settings" element={<AuthProvider><UserAccountSetting/></AuthProvider>}></Route>
        
      </Routes>
      </div>
    </Router>
  )
}

export default App
