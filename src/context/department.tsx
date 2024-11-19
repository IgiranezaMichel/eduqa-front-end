/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext, useEffect, useState } from "react";
import { IState } from "../interface/state";
import { DepartmentDao } from "../controller/departmentdao";
import { Role } from "../enum/role";

const DepartmentContext = createContext<IState|undefined>(undefined);
export const useDepartmentContext=()=>{
    const Department=useContext(DepartmentContext);
    if(!Department){
        throw new Error("useDepartmentContext must be used within a DepartmentProvider");
    }
    return Department;
}

export const DepartmentProvider = ({children}:any)=>{
    const [role, setRole] = useState<Role>(Role.ROLE_STUDENT);
    const [refresh, setRefresh] = useState<boolean>(false);
    const [content, setContent] = useState<any>([]);
    useEffect(
        ()=>{
            new DepartmentDao().findAllUserWithInDepartment(role).then((data)=>{
                setContent(data.data);
            });
        },[role,refresh]
    );
    const contextDate:IState={
        content:content,
        refresh:()=>setRefresh(!refresh),
        update:(data:Role)=>setRole(data)
    }
    return <DepartmentContext.Provider value={contextDate}>{children}</DepartmentContext.Provider>
}