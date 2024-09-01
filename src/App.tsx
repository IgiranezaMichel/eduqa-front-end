import {Route, BrowserRouter as Router, Routes } from "react-router-dom"
import { ForgetPassword } from "./page/visitor/authentication/forgetPassword"
import { Login } from "./page/visitor/authentication"
function App() {

  return (
    <Router>
      <div className="font-poppins">
      <Routes>
        <Route path="/" element={<Login/>}></Route>
        <Route path="/forgot-password" element={<ForgetPassword/>}></Route>
      </Routes>
      </div>
    </Router>
  )
}

export default App
