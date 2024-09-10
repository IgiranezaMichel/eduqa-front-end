import { createContext, useContext, useEffect, useState } from "react";
import { IState } from "../interface/state";
import { IPage } from "../interface/page";
import { CourseDao } from "../controller/courseDao";

const CourseContext = createContext<IState|undefined>(undefined);
export const useCourseContext=()=>{
    const Course=useContext(CourseContext);
    if(!Course){
        throw new Error("useCourseContext must be used within a CourseProvider");
    }
    return Course;
}

export const CourseProvider = ({children}:any)=>{
    const [page, setPage] = useState<IPage>({
        pageNumber:0,pageSize:10,search:'',sortBy:'id'
    });
    const [refresh, setRefresh] = useState<boolean>(false);
    const [content, setContent] = useState<any>([]);
    useEffect(
        ()=>{
            new CourseDao().getAllCoursePage(page).then((data)=>{
                setContent(data.data);
            });
        },[page,refresh]
    );
    const contextDate:IState={
        content:content,
        refresh:()=>setRefresh(!refresh),
        update:(data:IPage)=>setPage(data)
    }
    return <CourseContext.Provider value={contextDate}>{children}</CourseContext.Provider>
}