import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { IState } from "../interface/state";
import { IPage } from "../interface/page";
import { StudentRegisterCourseDao } from "../controller/studentregistercourse";

const StudentRegisterCourseWithInSemesterContext = createContext<IState | undefined>(undefined);
export const useStudentRegisterCourseWithInSemesterContext = () => {
    const StudentRegisterCourseWithInSemester = useContext(StudentRegisterCourseWithInSemesterContext);
    if (!StudentRegisterCourseWithInSemester) {
        throw new Error("useStudentRegisterCourseWithInSemesterContext must be used within a StudentRegisterCourseWithInSemesterProvider");
    }
    return StudentRegisterCourseWithInSemester;
}
export const StudentRegisterCourseWithInSemesterProvider = (prop:{children:ReactNode,semesterId:string}) => {
    const [page, setPage] = useState<IPage>({
        pageNumber: 0, pageSize: 10, search: '', sortBy: 'id'
    });
    const [refresh, setRefresh] = useState<boolean>(false);
    const [content, setContent] = useState<any>([]);
    useEffect(
        () => {
            if(prop.semesterId!=undefined){
                new StudentRegisterCourseDao().getAllStudentRegisteredCourseWithInAsemester(prop.semesterId)
                    .then((data) => {
                setContent(data.data);
            });}
        }, [page, refresh,prop.semesterId]
    );
    const contextDate: IState = {
        content: content,
        refresh: () => setRefresh(!refresh),
        update: (data: IPage) => setPage(data)
    }
    return <StudentRegisterCourseWithInSemesterContext.Provider value={contextDate}>{prop.children}</StudentRegisterCourseWithInSemesterContext.Provider>
}