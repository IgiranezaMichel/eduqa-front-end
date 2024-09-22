import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { IState } from "../interface/state";
import { IPage } from "../interface/page";
import { RegistrationDao } from "../controller/registrationdao";

const StudentRegistrationHistoryContext = createContext<IState|undefined>(undefined);
export const useStudentRegistrationHistoryContext=()=>{
    const StudentRegistrationHistory=useContext(StudentRegistrationHistoryContext);
    if(!StudentRegistrationHistory){
        throw new Error("useStudentRegistrationHistory Context must be used within a StudentRegistrationHistoryProvider");
    }
    return StudentRegistrationHistory;
}

export const StudentRegistrationHistoryProvider = (prop:{children:ReactNode})=>{
    const [page, setPage] = useState<IPage>({
        pageNumber:0,pageSize:10,search:'',sortBy:'id'
    });
    const [refresh, setRefresh] = useState<boolean>(false);
    const [content, setContent] = useState<any>([]);
    useEffect(
        ()=>{
            new RegistrationDao().getUserRegistrationHistory(page).then((data)=>{
                setContent(data.data);
            });
        },[page,refresh]
    );
    const contextDate:IState={
        content:content,
        refresh:()=>setRefresh(!refresh),
        update:(data:IPage)=>setPage(data)
    }
    return <StudentRegistrationHistoryContext.Provider value={contextDate}>{prop.children}</StudentRegistrationHistoryContext.Provider>
}