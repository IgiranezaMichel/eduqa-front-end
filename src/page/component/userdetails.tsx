import { Email, Person, Phone, Wc } from "@mui/icons-material"
import { ReactNode } from "react"

export const ShowUserProfile=(prop:{user:any,children:ReactNode})=>{
    return <>
    <div className="bg-blue-950 text-white">{prop.children}</div>
    <div className="grid grid-cols-2">
        <img src={prop.user.picture} alt="" />
        <div className="ms-2">
            <div className="mb-2 gap-2 items-center"><Person className="border rounded-full p-1 bg-blue-950 text-white"/> {prop.user.code}</div>
            <div className="mb-2 gap-2 items-center"><Person className="border rounded-full p-1 bg-blue-950 text-white"/> {prop.user.name}</div>
            <div className="mb-2 gap-2 items-center"><Email className="border rounded-full p-1 bg-blue-950 text-white"/> {prop.user.email}</div>
            <div className="mb-2 gap-2 items-center"><Phone className="border rounded-full p-1 bg-blue-950 text-white"/> {prop.user.phoneNumber}</div>
            <div className="mb-2 gap-2 items-center"><Wc className="border rounded-full p-1 bg-blue-950 text-white"/> {prop.user.gender}</div>
            <div className="mb-2 gap-2 items-center"><Wc className="border rounded-full p-1 bg-blue-950 text-white"/> {prop.user.status}</div>
        </div>
    </div>
    </>
}