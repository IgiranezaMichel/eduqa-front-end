import { createContext, useContext, useEffect, useState } from "react";
import { IState } from "../interface/state";
import { IPage } from "../interface/page";
import { UserDao } from "../controller/userDao";
import { Role } from "../enum/role";
import { UserStatus } from "../enum/userStatus";

const UserContext = createContext<IState|undefined>(undefined);
export const useUserContext=()=>{
    const user=useContext(UserContext);
    if(!user){
        throw new Error("useUserContext must be used within a UserProvider");
    }
    return user;
}

export const UserProvider = (prop:{children:any,role:Role})=>{
    const [page, setPage] = useState<IPage>({
        pageNumber:0,pageSize:10,search:'',sortBy:'id'
    });
    const [userStatus, setUserStatus] = useState<UserStatus>(UserStatus.ACTIVE);
    const [content, setContent] = useState<any>([]);
    useEffect(
        ()=>{
            new UserDao().getAllUserPage(page,prop.role,userStatus).then((data)=>{
                setContent(data.data);
            });
        },[page,userStatus]
    );
    const contextDate:IState={
        content:content,
        refresh:(data:UserStatus)=>setUserStatus(data),
        update:(data:IPage)=>setPage(data)
    }
    return <UserContext.Provider value={contextDate}>{prop.children}</UserContext.Provider>
}