import { ReactNode, useEffect, useState } from "react"
import { UserDao } from "../../../controller/userDao"
import { AuthProvider } from "../../../context/authentication";

export const SuccessAuthenticationPage=()=>{
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
    
    return <AuthProvider>
    {isLoading?<>
    loading ...
    </>:<></>}
    </AuthProvider>
}