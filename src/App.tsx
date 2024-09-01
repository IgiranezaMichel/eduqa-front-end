import {Route, BrowserRouter as Router, Routes } from "react-router-dom"
import { ForgetPassword } from "./page/visitor/authentication/forgetPassword"
import { Login } from "./page/visitor/authentication/login"
import { HOD } from "./page/hod/index"
import { HodManageLecturers } from "./page/hod/lectures"
import { HodManageStudent } from "./page/hod/student"
import { HodManageCourses } from "./page/hod/courses"
function App() {

  return (
    <Router>
      <div className="font-poppins">
      <Routes>
        <Route path="/" element={<Login/>}></Route>
        <Route path="/forgot-password" element={<ForgetPassword/>}></Route>
        <Route path="/hod" element={<HOD/>}></Route>
        <Route path="/hod/lectures" element={<HodManageLecturers/>}></Route>
        <Route path="/hod/students" element={<HodManageStudent/>}></Route>
        <Route path="/hod/courses" element={<HodManageCourses/>}></Route>
      </Routes>
      </div>
    </Router>
  )
}

export default App
