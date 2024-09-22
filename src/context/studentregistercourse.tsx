import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { IState } from "../interface/state";
import { IPage } from "../interface/page";
import { StudentRegisterCourseDao } from "../controller/studentregistercourse";

const StudentRegisterCourseContext = createContext<IState | undefined>(undefined);
export const useStudentRegisterCourseContext = () => {
    const StudentRegisterCourse = useContext(StudentRegisterCourseContext);
    if (!StudentRegisterCourse) {
        throw new Error("useStudentRegisterCourseContext must be used within a StudentRegisterCourseProvider");
    }
    return StudentRegisterCourse;
}
export const StudentRegisterCourseProvider = (prop:{children:ReactNode,semesterId:string}) => {
    const [page, setPage] = useState<IPage>({
        pageNumber: 0, pageSize: 10, search: '', sortBy: 'id'
    });
    const [refresh, setRefresh] = useState<boolean>(false);
    const [content, setContent] = useState<any>([]);
    useEffect(
        () => {
            if(prop.semesterId!=undefined){new StudentRegisterCourseDao()
            .getListregisteredStudentForLectureCourses(prop.semesterId,page).then((data) => {
                setContent(data.data);
            });}
        }, [page, refresh,prop.semesterId]
    );
    const contextDate: IState = {
        content: content,
        refresh: () => setRefresh(!refresh),
        update: (data: IPage) => setPage(data)
    }
    return <StudentRegisterCourseContext.Provider value={contextDate}>{prop.children}</StudentRegisterCourseContext.Provider>
}