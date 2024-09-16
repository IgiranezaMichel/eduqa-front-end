import { ReactNode, useEffect, useState } from "react"
import { UserDao } from "../../../controller/userDao"

export const SuccessAuthenticationPage=(prop:{children:ReactNode})=>{
    const [isLoading,setIsLoading]=useState(true)
    useEffect(
        ()=>{
            const userData=new UserDao().successLogin();
            userData.then(
                data=>data.data
            )
            .catch(err=>console.log(err))
        }
    );
    return <>
    {isLoading?<>
    loading ...
    </>:prop.children}
    </>
}