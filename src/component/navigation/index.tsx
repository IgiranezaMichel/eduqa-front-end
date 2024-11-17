import { FC, ReactNode } from "react"
import { INavigationItems } from "../../interface/navigationitems"
import { AuthProvider } from "../../context/authentication"
import { NavigationContainer } from "./navigationContainer"

export type Items={
    items:INavigationItems[],
    children:ReactNode,
    additionalNavInfo?:ReactNode
}
export const Navigation:FC<Items>=(prop)=>{
    return <AuthProvider>
          <section className="fixed w-full h-screen">
        <NavigationContainer additionalNavInfo={prop.additionalNavInfo} children={prop.children} items={prop.items}/>
    </section>
    </AuthProvider>
  
}