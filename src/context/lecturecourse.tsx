/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { IState } from "../interface/state";
import { LectureCourseDao } from "../controller/lecturecourses";
import { IPage } from "../interface/page";

const LectureCourseContext = createContext<IState | undefined>(undefined);
export const useLectureCourseContext = () => {
    const LectureCourse = useContext(LectureCourseContext);
    if (!LectureCourse) {
        throw new Error("useLectureCourseContext must be used within a LectureCourseProvider");
    }
    return LectureCourse;
}
export const LectureCourseProvider = (prop:{children:ReactNode,semesterId:string}) => {
    const [page, setPage] = useState<IPage>({
        pageNumber: 0, pageSize: 10, search: '', sortBy: 'id'
    });
    const [refresh, setRefresh] = useState<boolean>(false);
    const [content, setContent] = useState<any>([]);
    useEffect(
        () => {
            new LectureCourseDao().getAllLectureCoursePage(page,prop.semesterId).then((data) => {
                setContent(data.data);                
            });
        }, [page, refresh,prop.semesterId]
    );
    const contextDate: IState = {
        content: content,
        refresh: () => setRefresh(!refresh),
        update: (data: IPage) => setPage(data)
    }
    return <LectureCourseContext.Provider value={contextDate}>{prop.children}</LectureCourseContext.Provider>
}