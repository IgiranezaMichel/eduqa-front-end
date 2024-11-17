import { Avatar } from "@mui/material";
import { useAuthenticationContext } from "../context/authentication"
import { Email, Phone } from "@mui/icons-material";

export const UserAccountSetting=()=>{
    const {content}=useAuthenticationContext();
    return <>
    <div className="flex items-center h-screen w-full justify-center object-center bg-no-repeat bg-fixed object-cover" style={{backgroundImage:'url('+content.picture+')'}}>
   <section className="flex items-center h-screen w-full justify-center backdrop-blur-[20px] bg-black/40">
   <section className="border ">
    <div className="border bg-blue-800/20">
        <div className="flex items-center p-1 gap-3">
            <Avatar src={content.picture}/>{content.name}
        </div>
        <div className="flex gap-4">
        <div><Email/> {content.email}</div>
        <div><Phone/> {content.phoneNumber}</div>
        </div>
    </div>
    <div className="">Reg Number :: {content.code}</div>
    <div className="">Gender :: {content.gender}</div>
    </section>
   </section>
    </div>
    </>
}