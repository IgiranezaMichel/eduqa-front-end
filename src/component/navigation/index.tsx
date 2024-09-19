import { FC, ReactNode } from "react"
import { INavigationItems } from "../../interface/navigationitems"
import { NavigationItem } from "./NavigationItem"
import { useLocation } from "react-router-dom"
import { Chip } from "@mui/material"
import { NotificationAdd, People } from "@mui/icons-material"
import { AuthProvider, useAuthenticationContext } from "../../context/authentication"
import { NavigationContainer } from "./navigationContainer"

export type Items={
    items:INavigationItems[],
    children:ReactNode
}
// const {}=useAuthenticationContext();



export const Navigation:FC<Items>=(prop)=>{
    





    return <AuthProvider>
          <section className="fixed w-full h-screen">
        <NavigationContainer children={prop.children} items={prop.items}/>
    </section>
    </AuthProvider>
  
}