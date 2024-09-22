import { Email, PermIdentity, Phone, StarOutline, Wc } from "@mui/icons-material"
import { UserStatus } from "../../enum/userStatus"
import { useState } from "react"
import { UserDao } from "../../controller/userDao";
import { toast, Toaster } from "sonner";
import { CircularProgress } from "@mui/material";

export const ChangeUserStatusForm = (prop: { user: any }) => {
    const [userStatus, setUserStatus] = useState<UserStatus>(UserStatus.ACTIVE);
    const [isLoading, setIsLoading] = useState(false);
    const handleChange = (e: any) => {
        e.preventDefault();
        setIsLoading(true);
        new UserDao().changeUserStatus(prop.user.id, userStatus)
        .then(data=>{setIsLoading(false);toast.success(data.data)})
        .catch(err=>{setIsLoading(false);toast.error(err.response.data)});
    }
    return <>
        <div className="mb-4">
            <div className="p-4 bg-blue-800 text-white">
                <div className="text-lg font-bold">{prop.user.name}</div>
                <small>{prop.user.departmentName}</small>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <img src={prop.user.picture} alt="" />
                <div className="border-l-4 border-l-blue-900 p-4">
                    <p className="mb-1"><PermIdentity className="bg-blue-900 text-white p-1 rounded-md mb-1" /> {prop.user.code}</p>
                    <p className="mb-1"><Email className="bg-blue-900 text-white p-1 rounded-md mb-1" /> {prop.user.email}</p>
                    <p className="mb-1"><Wc className="bg-blue-900 text-white p-1 rounded-md mb-1" /> {prop.user.gender}</p>
                    <p className="mb-1"><Phone className="bg-blue-900 text-white p-1 rounded-md mb-1" /> {prop.user.phoneNumber}</p>
                    <p className="mb-1"><StarOutline className="bg-blue-900 text-white p-1 rounded-md mb-1 normal-case" /> {prop.user.status}</p>
                </div>
            </div>
        </div>
        <form onSubmit={handleChange} className="flex gap-2 justify-between p-2 border-t-2 border-t-blue-900">
            <select required onChange={e=>e.target.value.length!=0&&setUserStatus(e.target.value as UserStatus)} className="w-full border border-blue-900 rounded-md p-2">
                <option value="">change user status</option>
                <option value={UserStatus.ACTIVE}>Active</option>
                <option value={UserStatus.INACTIVE}>Not Active</option>
            </select>
           {isLoading?<CircularProgress/>: <button type="submit" className="p-1 bg-blue-900 text-white rounded-md">update</button>}
        <Toaster/>
        </form>
    </>
}