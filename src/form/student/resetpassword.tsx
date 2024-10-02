import { useState } from "react";
import { UserDao } from "../../controller/userDao";
import { toast, Toaster } from "sonner";
import { Email, PermIdentity, PhoneAndroid, StarOutline, WcOutlined } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";

export const ResettingUserPasswordForm=(prop:{user:any})=>{
    const [isLoading, setIsLoading] = useState(false);
    const handleChange = (e: any) => {
        e.preventDefault();
        setIsLoading(true);
        new UserDao().resetUserPassword(prop.user.id)
        .then(data=>{setIsLoading(false);toast.success(data.data)})
        .catch(err=>{setIsLoading(false);toast.error(err.response.data)});
    }
    return <>
     <div className="mb-4">
            <div className="p-4 bg-blue-800 text-white">
                <div className="text-lg font-bold">{prop.user.name}</div>
                <small>{prop.user.departmentName}</small>
            </div>
            <div className="flex gap-2">
                <img src={prop.user.picture} className="max-h-40" alt="" />
                <div className="p-4">
                    <p className="mb-1"><PermIdentity className="bg-blue-900 text-white p-1 rounded-md mb-1" /> {prop.user.code}</p>
                    <p className="mb-1"><Email className="bg-blue-900 text-white p-1 rounded-md mb-1" /> {prop.user.email}</p>
                    <p className="mb-1"><WcOutlined className="bg-blue-900 text-white p-1 rounded-md mb-1" /> {prop.user.gender}</p>
                    <p className="mb-1"><PhoneAndroid className="bg-blue-900 text-white p-1 rounded-md mb-1" /> {prop.user.phoneNumber}</p>
                    <p className="mb-1"><StarOutline className="bg-blue-900 text-white p-1 rounded-md mb-1 normal-case" /> {prop.user.status}</p>
                </div>
            </div>
        </div>
        <form onSubmit={handleChange} className="flex gap-2 justify-between p-2 border-t-2 border-t-blue-900">
           {isLoading?<CircularProgress/>: <button type="submit" className="bg-blue-900 text-white rounded-md w-full p-2">Reset password</button>}
        <Toaster/>
        </form>
    </>
}