import { Button, TextField } from "@mui/material"

export const Login=()=>{
    return <section>
    <div className="flex items-center col-[80%]">
        <section>
            <section>
                <div className="font-bold text-2xl">Welcome back :)</div>
                <div className="mb-5 text-gray-500">Welcome back! Please enter your details</div>
            </section>
            <section>
                <div className="font-bold">
                    <label htmlFor="username">Email or username</label>
                    <TextField placeholder="Enter your email or username" fullWidth/>
                </div>
                <div className="font-bold">
                    <label htmlFor="username">Password</label>
                </div>
                <Button className="bg-slate-950">Sign In</Button>
            </section>
        </section>
    </div>
    </section>
}