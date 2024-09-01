import {Route, BrowserRouter as Router, Routes } from "react-router-dom"
import { ForgetPassword } from "./page/visitor/authentication/forgetPassword"
import { Login } from "./page/visitor/authentication/login"
import { HOD } from "./page/hod/index"
function App() {

  return (
    <Router>
      <div className="font-poppins">
      <Routes>
        <Route path="/" element={<Login/>}></Route>
        <Route path="/forgot-password" element={<ForgetPassword/>}></Route>
        <Route path="/hod" element={<HOD/>}></Route>
      </Routes>
      </div>
    </Router>
  )
}

export default App
