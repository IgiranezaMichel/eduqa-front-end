import { createContext, useContext, useEffect, useState } from "react";
import { IState } from "../interface/state";
import { IPage } from "../interface/page";
import { UserDao } from "../controller/userDao";

const UserContext = createContext<IState|undefined>(undefined);
export const useUserContext=()=>{
    const user=useContext(UserContext);
    if(!user){
        throw new Error("useUserContext must be used within a UserProvider");
    }
    return user;
}

export const UserProvider = ({children}:any)=>{
    const [page, setPage] = useState<IPage>({
        pageNumber:0,pageSize:10,search:'',sortBy:'id'
    });
    const [refresh, setRefresh] = useState<boolean>(false);
    const [content, setContent] = useState<any>([]);
    useEffect(
        ()=>{
            new UserDao().getAllUserPage(page).then((data)=>{
                setContent(data.data);
            });
        },[page,refresh]
    );
    const contextDate:IState={
        content:content,
        refresh:()=>setRefresh(!refresh),
        update:(data:IPage)=>setPage(data)
    }
    return <UserContext.Provider value={contextDate}>{children}</UserContext.Provider>
}