import { FC, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Items } from ".";
import { NavigationItem } from "./NavigationItem";
import { Logout, NotificationAdd, Settings } from "@mui/icons-material";
import { Avatar, Button, Dialog } from "@mui/material";
import { useAuthenticationContext } from "../../context/authentication";
import { UserDao } from "../../controller/userDao";
import { Toaster } from "sonner";

export const NavigationContainer: FC<Items> = (prop) => {
    const location = useLocation();
    const { content } = useAuthenticationContext();
    const [openLogoutDialog, setOpenLogoutDialog] = useState(false);
    const navigation = useNavigate()
    const handleLogout = (e: any) => {
        e;
        new UserDao().logout()
            .then(() => navigation("/"))
            .catch(() => {navigation("/");
            })
    }
    return <>
        <div className="flex">
            <div className="w-[20%] flex flex-col h-screen border-r-2 border-r-blue-400/30 fixed">
                <div className="flex items-center justify ms-5 py-5">
                    <img src="../../auca.png" alt="" className="w-16 h-16 rounded-full" />
                    <div className="font-bold text-xl ms-4">
                        EDUQA-<span className="text-blue-900">HUB</span>
                    </div>
                </div>
                <div className="ps-5 my-2">
                    Main menu
                </div>

                <div className="overflow-y-auto h-full">
                    {prop.items.map((items, index: number) => <div className="mb-4 ">
                        <NavigationItem
                            key={index + 'navigation'} icon={items.icon}
                            link={items.link} name={items.name}
                            className={`${location.pathname == items.link ? 'bg-blue-200/50 border-l-4 text-blue-900  border-l-blue-900' : ''}`} />
                    </div>
                    )}
                </div>
                <div className="mt-auto border-t-2 border-t-gray-300">

                    <NavigationItem icon={<Settings />} name="Settings" link="/settings" />
                    <div onClick={()=>setOpenLogoutDialog(true)} className={`flex gap-3 ps-5 py-2 cursor-pointer`}>
                        <div>
                            <Logout />
                        </div>
                        <div>
                            logout
                        </div>
                    </div>
                </div>

            </div>

            <section className="ms-[20%] w-[80%] px-2 fixed h-full pb-20">

                <div className="fixed  w-[80%]  flex justify-between border-b border-b-blue-300/50">
                    <div>
                    {prop.additionalNavInfo}
                    </div>
                    <div className="flex gap-5 items-center pe-4 my-2">
                        <NotificationAdd />
                        <div className="flex rounded-md items-center bg-teal-300/20 gap-3">
                            <Avatar src={content.picture} />
                            <div className="px-3">{content.name}</div>
                        </div>
                    </div>
                </div>

                <section className="mt-14 overflow-auto h-full ">
                    {prop.children}
                </section>
            </section>
        </div>
        <Dialog open={openLogoutDialog} onClose={() => setOpenLogoutDialog(false)}>
            <div className="flex justify-between py-2 bg-blue-900 text-white text-lg font-bold px-3">
                logout
            </div>
            <div className="flex flex-col gap-3 p-4">
                Are you sure {content.name} you want to logout?
            </div>
            <div className="flex justify-between p-3">
                <Button className="border bg-red-600 text-white font-bold rounded-none" onClick={() => setOpenLogoutDialog(false)}>Cancel</Button>
                <Button className="border bg-blue-900 text-white font-bold rounded-none" onClick={handleLogout}>Logout</Button>
            </div>
        </Dialog>
        <Toaster />
    </>
}