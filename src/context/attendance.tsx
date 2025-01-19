/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext, useEffect, useState } from "react";
import { IState } from "../interface/state";
import { AttendanceController } from "../controller/attendanceController";
import { IPage } from "../interface/page";

const AttendanceContext = createContext<IState|undefined>(undefined);
export const useAttendanceContext=()=>{
    const Attendance=useContext(AttendanceContext);
    if(!Attendance){
        throw new Error("use Attendance Context must be used within a AttendanceProvider");
    }
    return Attendance;
}

export const AttendanceProvider = ({children}:any)=>{
    const [page, setPage] = useState<IPage>({
        pageNumber:0,pageSize:10,search:'',sortBy:'id'
    });
    const [refresh, setRefresh] = useState<boolean>(false);
    const [content, setContent] = useState<any>([]);
    useEffect(
        ()=>{
            new AttendanceController().getAttendanceList(page).then((data)=>{
                setContent(data.data);
            });
        },[page,refresh]
    );
    const contextDate:IState={
        content:content,
        refresh:()=>setRefresh(!refresh),
        update:(data:any)=>setPage(data)
    }
    return <AttendanceContext.Provider value={contextDate}>{children}</AttendanceContext.Provider>
}