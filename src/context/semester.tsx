/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import { IState } from "../interface/state";
import { IPage } from "../interface/page";
import { SemesterDao } from "../controller/semesterdao";

const SemesterContext = createContext<IState|undefined>(undefined);
export const useSemesterContext=()=>{
    const Semester=useContext(SemesterContext);
    if(!Semester){
        throw new Error("useSemesterContext must be used within a SemesterProvider");
    }
    return Semester;
}

export const SemesterProvider = ({children}:any)=>{
    const [page, setPage] = useState<IPage>({
        pageNumber:0,pageSize:10,search:'',sortBy:'id'
    });
    const [refresh, setRefresh] = useState<boolean>(false);
    const [content, setContent] = useState<any>([]);
    useEffect(
        ()=>{
            new SemesterDao().getAllSemesterPage(page).then((data)=>{
                setContent(data.data);
            });
        },[page,refresh]
    );
    const contextDate:IState={
        content:content,
        refresh:()=>setRefresh(!refresh),
        update:(data:IPage)=>setPage(data)
    }
    return <SemesterContext.Provider value={contextDate}>{children}</SemesterContext.Provider>
}