import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { IState } from "../interface/state";
import { IPage } from "../interface/page";
import { Role } from "../enum/role";
import { RegistrationDao } from "../controller/registrationdao";

const SemesterUserContext = createContext<IState|undefined>(undefined);
export const useSemesterUserContext=()=>{
    const SemesterUser=useContext(SemesterUserContext);
    if(!SemesterUser){
        throw new Error("useSemesterUserContext must be used within a SemesterUserProvider");
    }
    return SemesterUser;
}

export const SemesterUserProvider = (prop:{children:ReactNode,semesterId:string,role:Role})=>{
    const [page, setPage] = useState<IPage>({
        pageNumber:0,pageSize:10,search:'',sortBy:'id'
    });
    const [refresh, setRefresh] = useState<boolean>(false);
    const [content, setContent] = useState<any>([]);
    useEffect(
        ()=>{
        //    {prop.semesterId!=undefined&&
             new RegistrationDao().getAvailabelUserRegisteredForASemesterPage(page,prop.semesterId,prop.role).then((data)=>{
                setContent(data.data);
            })
        // };
        },[page,refresh,prop.semesterId,prop.role]
    );
    const contextDate:IState={
        content:content,
        refresh:()=>setRefresh(!refresh),
        update:(data:IPage)=>setPage(data)
    }
    return <SemesterUserContext.Provider value={contextDate}>{prop.children}</SemesterUserContext.Provider>
}