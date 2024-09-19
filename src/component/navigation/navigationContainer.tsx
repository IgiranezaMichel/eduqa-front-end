import { FC } from "react";
import { useLocation } from "react-router-dom";
import { Items } from ".";
import { NavigationItem } from "./NavigationItem";
import { Logout, NotificationAdd, Settings } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { useAuthenticationContext } from "../../context/authentication";

export const NavigationContainer:FC<Items> = (prop) => {
    const location=useLocation();
    const {content}=useAuthenticationContext();
  return <>
  <div className="flex">
            <div className="w-[20%] h-screen border-r-2 border-r-blue-400/30 fixed">
                    <div className="flex items-center justify ms-5 py-5">
                            <img src="https://www.w3schools.com/howto/img_avatar.png" alt="" className="w-10 h-10 rounded-full"/>
                            <div className="font-bold text-xl ms-4">
                                EDUQA-<span className="text-blue-900">HUB</span>
                            </div>
                    </div>
                    <div className="ps-5 my-2">
                        Main menu
                    </div>
            
                    <div className="overflow-y-scroll h-[70%]">
                    {prop.items.map((items,index:number)=><div className="mb-4 ">
                    <NavigationItem 
                            key={index+'navigation'} icon={items.icon} 
                            link={items.link} name={items.name} 
                            className={`${location.pathname==items.link?'bg-blue-200/50 border-l-4 text-blue-900  border-l-blue-900':''}`}/>
                    </div>   
                    )}
                        </div>
                        <div>
                           <NavigationItem icon={<Settings/>} name="Settings" link="/settings"/> 
                           <NavigationItem icon={<Logout/>} name="logout" link="/settings"/> 
                        </div>
     </div>

            <section className="ms-[20%] w-[80%] px-2 fixed h-full pb-20">
 
                    <div className="fixed  w-[80%]  flex justify-between border-b border-b-blue-300/50">
                    <div>
                    </div>
                    <div className="flex gap-5 items-center pe-4 my-2">
                    <NotificationAdd/>
                   <div className="flex rounded-md items-center bg-teal-300/20 gap-3">
                   <Avatar src={content.picture}/>
                   <div className="px-3">{content.name}</div>
                   </div>
                    </div>
                </div>

                <section className="mt-14 overflow-auto h-full ">
                {prop.children}
                </section>
            </section>
        </div>
  </>
}