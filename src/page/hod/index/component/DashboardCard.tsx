import { MoreVert } from "@mui/icons-material"
import { FC, ReactNode } from "react"

export interface IDashboardCard {
    icon:ReactNode,
    title:string,
    total:number,
    className?:string,
}

export const DashboardCard:FC<IDashboardCard> = (prop) => {
  return<>
  <div className={prop.className+" flex items-center gap-5"}>
    <div className="bg-blue-200/50 p-2 rounded">
        {prop.icon}
    </div>
    <div>
        <h1 className="font-bold mb-2">{prop.title}</h1>
        <h1 className="text-xl font-bold">{prop.total}</h1>
    </div>
         <MoreVert className="text-blue-500"/> 
   </div>
  </>
}