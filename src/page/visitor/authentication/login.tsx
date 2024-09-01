import { Button, TextField } from "@mui/material"
import { Link } from "react-router-dom"
export const Login=()=>{
    return <>
    <section className="h-screen w-screen bg-slate-300 flex items-center justify-center">
    <div className="grid grid-cols-2 items-center w-[70%] m-auto bg-white">
        <section className="p-10">
            <section>
                <div className="font-bold text-2xl">Welcome back :)</div>
                <div className="mb-5 text-gray-500">Welcome back! Please enter your details</div>
            </section>
            <section>
                <div className="font-bold mb-4">
                    <label htmlFor="username" className="d-block mb-10">Email or username</label>
                    <TextField placeholder="Enter your email or username" fullWidth/>
                </div>
                <div className="font-bold mb-4">
                    <label htmlFor="username" className="d-block mb-10">Password</label>
                    <TextField placeholder="Enter your email or username" fullWidth/>
                </div>
                <Button className="bg-blue-950/90 w-full normal-case text-white p-3 font-bold text-xl">Sign In</Button>
                <div>
                    Forgot Password ? <Link to={'forgot-password'}>reset password</Link>
                </div>
            </section>
        </section>
        <section className="bg-blue-950/90 h-full p-10">
            <img src={'loginHbImg.png'} alt="" className="mb-3" />
           <section className="p-5">
           <div className="font-bold mb-3">
                <span className="font-extrabold text-white text-2xl">EDUQA-</span>
                <span className="font-extrabold  text-2xl">HUB</span>
            </div>
            <div className="text-white">
                    Lore, ipsum dolor sit omet consectecture
                    Lore, ipsum dolor sit omet consectecture
                </div>
           </section>
        </section>
    </div>
    </section>
    
    </>
}