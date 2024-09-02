import { FC, ReactNode } from "react"
import { INavigationItems } from "../../interface/navigationitems"
import { NavigationItem } from "./NavigationItem"
import { useLocation } from "react-router-dom"
import { Chip } from "@mui/material"
import { NotificationAdd, People } from "@mui/icons-material"

type Items={
    items:INavigationItems[],
    children:ReactNode
}




export const Navigation:FC<Items>=(prop)=>{
    const location=useLocation();





    return <section className="fixed w-full h-screen bg-white">
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
            
                    <div className="overflow-y-scroll h-[80%]">
                    {prop.items.map((items,index:number)=><div className="mb-4 ">
                    <NavigationItem 
                            key={index+'navigation'} icon={items.icon} 
                            link={items.link} name={items.name} 
                            className={`${location.pathname==items.link?'bg-blue-200/50 border-l-4 text-blue-900  border-l-blue-900':''}`}/>
                    </div>   
                    )}
                        </div>
     </div>

            <section className="ms-[20%] w-[80%] px-2 fixed h-full pb-20">
 
                    <div className="fixed  w-[80%]  flex justify-between border-b border-b-blue-300/50">
                    <div>
                    </div>
                    <div className="flex gap-5 items-center pe-4 my-2">
                    <NotificationAdd/>
                    <Chip className="bg-blue-200/50" icon={<People/>} label='Jamal'/>
                    </div>
                </div>

                <section className="mt-14 overflow-auto h-full ">
                {prop.children}
                </section>
            </section>
        </div>
    </section>
}