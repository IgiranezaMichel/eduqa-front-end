import { ArrowBack, Check, CheckBoxRounded, Email, Key } from "@mui/icons-material"
import { Avatar, Button, TextField } from "@mui/material"
import { Footer } from "../../../component/footer"
import { Link } from "react-router-dom"

export const ForgetPassword=()=>{
    return <>
    <div className="flex items-center justify-center h-screen w-screen">
        <section className="w-[35%]">
        
        <section>
           <SuccessPasswordResetting/>
            <div className="text-slate-400 text-center">  
            <Link to={'/'}><ArrowBack/> Back to login</Link>
            </div>
        </section>
        </section>

        </div>   
        <Footer/> 
    </>
}
const UserEmail=()=>{
    return <>
    <Avatar className="m-auto bg-blue-300/50 text-blue-950 mb-3"><Key/></Avatar>
        <div className="font-bold text-xl text-center mb-3">
            Forgot password?
        </div>
        <div className="text-slate-600 text-sm mb-3">No wories we reset your password since  you follow instruction</div>
     <label htmlFor="">Email</label>
            <TextField placeholder="Enter your username or email" className="mb-5" fullWidth/>
            <Button className="bg-blue-950/90 w-full normal-case text-white p-3 font-bold text-xl mb-5">Reset password</Button>
    </>
}
const CheckEmailMessage=()=>{
    return <>
    <Avatar className="m-auto bg-blue-300/50 text-blue-950 mb-3"><Email/></Avatar>
        <div className="font-bold text-xl text-center mb-3">
            Check your email
        </div>
        <div className="text-slate-600 text-sm mb-3 text-center">
            We send password reset link to <br />
            ineza@gmail.com
        </div>
        <Button className="bg-blue-950/90 w-full normal-case text-white p-3 font-bold text-xl mb-5">Next</Button>
    </>
}
const ResetPassword=()=>{
    return <>
    <Avatar className="m-auto bg-blue-300/50 text-blue-950 mb-3"><Key/></Avatar>
        <div className="font-bold text-xl text-center mb-3">
          Set new password
        </div>
        <div className="text-slate-600 text-sm mb-3">No wories we reset your password since  you follow instruction</div>
            <TextField 
            inputProps={{ maxLength: 4 }}
            helperText="Only 4 digits allowed"
            label='Enter reset code' className="mb-5" fullWidth/>
            <TextField label='Password' placeholder="Enter reset code sent to your email" className="mb-5" fullWidth/>
            <TextField label='Confirm password' placeholder="Enter reset code sent to your email" className="mb-5" fullWidth/>
            <Button className="bg-blue-950/90 w-full normal-case text-white p-3 font-bold text-xl mb-5">Reset password</Button>
    </>
}
const SuccessPasswordResetting=()=>{
    return <>
    <Avatar className="m-auto bg-blue-300/50 text-blue-950 mb-3"><CheckBoxRounded/></Avatar>
        <div className="font-bold text-xl text-center mb-3">
            Password reset
           </div>
        <div className="text-slate-600 text-md mb-3 text-center">
            Your password has been successful reset<br />
            click below to continue to login       </div>
        <Button className="bg-blue-950/90 w-full normal-case text-white p-3 font-bold text-xl mb-5">Continue</Button>
    </>
}