import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { IState } from "../interface/state";
import { IPage } from "../interface/page";
import { CourseDao } from "../controller/courseDao";

const SemesterCourseContext = createContext<IState|undefined>(undefined);
export const useSemesterCourseContext=()=>{
    const SemesterCourse=useContext(SemesterCourseContext);
    if(!SemesterCourse){
        throw new Error("useSemesterCourseContext must be used within a SemesterCourseProvider");
    }
    return SemesterCourse;
}

export const SemesterCourseProvider = (prop:{children:ReactNode,semesterId:string})=>{
    const [page, setPage] = useState<IPage>({
        pageNumber:0,pageSize:10,search:'',sortBy:'id'
    });
    const [refresh, setRefresh] = useState<boolean>(false);
    const [content, setContent] = useState<any>([]);
    useEffect(
        ()=>{
            new CourseDao().getAvailabelCourseWithInASemesterPage(page,prop.semesterId).then((data)=>{
                setContent(data.data);
            });
        },[page,refresh,prop.semesterId]
    );
    const contextDate:IState={
        content:content,
        refresh:()=>setRefresh(!refresh),
        update:(data:IPage)=>setPage(data)
    }
    return <SemesterCourseContext.Provider value={contextDate}>{prop.children}</SemesterCourseContext.Provider>
}