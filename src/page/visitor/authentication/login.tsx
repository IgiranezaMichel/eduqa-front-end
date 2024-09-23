import { Button, CircularProgress, TextField } from "@mui/material"
import { useState } from "react"
import { Link } from "react-router-dom"
import {toast, Toaster} from 'sonner'
import { UserDao } from "../../../controller/userDao";
import { SuccessAuthenticationPage } from "./successPage";
export const Login=()=>{
    const [userName,setUserName]=useState('');
    const [password,setPassword]=useState('');
    const [isLoading,setIsLoading]=useState(false)
    const [hasAuthenticated,setHasAuthenticated]=useState(false);
    const loginHandler=async(e:any)=>{
        e.preventDefault();
        setIsLoading(true);
        new UserDao().login(userName,password)
        .then(()=>{setIsLoading(false);setHasAuthenticated(true)}
        )
        .catch(err=>{setIsLoading(false);toast.error(err.response.data||err.message)})
    }
    
    return <>
    {hasAuthenticated?<SuccessAuthenticationPage/>:
    <form onSubmit={loginHandler} className="h-screen w-screen bg-slate-300 flex items-center justify-center">
    <div className="grid grid-cols-2 items-center w-[70%] m-auto bg-white">
        <section className="p-10">
            <section>
                <div className="font-bold text-2xl">Welcome back :)</div>
                <div className="mb-5 text-gray-500">Welcome back! Please enter your details</div>
            </section>
            <section>
                <div className="font-bold mb-4">
                    <label htmlFor="username" className="d-block mb-10">Email or username</label>
                    <TextField
                    onChange={e=>setUserName(e.target.value)} value={userName}
                    placeholder="Enter your email or username" fullWidth/>
                </div>
                <div className="font-bold mb-4">
                    <label htmlFor="username" className="d-block mb-10">Password</label>
                    <TextField
                     type="password" onChange={e=>setPassword(e.target.value)} value={password}
                    placeholder="Enter your password" fullWidth/>
                </div>
                <Toaster position="bottom-left"/>
                {!isLoading?<Button className="bg-blue-950/90 w-full normal-case text-white p-3 font-bold text-xl" type="submit">Sign In</Button>
            :<div className="text-center"><CircularProgress className="m-auto text-center"/>  </div>  
            }
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
    </form>
    }
    </>
}