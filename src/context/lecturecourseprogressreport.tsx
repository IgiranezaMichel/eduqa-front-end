import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { IState } from "../interface/state";
import { LectureCourseProgressReportDao } from "../controller/lecturecourseprogressreport";

const LectureCourseProgressReportContext = createContext<IState | undefined>(undefined);
export const useLectureCourseProgressReportContext = () => {
    const LectureCourseProgressReport = useContext(LectureCourseProgressReportContext);
    if (!LectureCourseProgressReport) {
        throw new Error("useLectureCourseProgressReportContext must be used within a LectureCourseProgressReportProvider");
    }
    return LectureCourseProgressReport;
}
export const LectureCourseProgressReportProvider = (prop:{children:ReactNode,lectureCourseId:string}) => {
    const [page, setPage] = useState(prop.lectureCourseId);
    const [refresh, setRefresh] = useState<boolean>(false);
    const [content, setContent] = useState<any>([]);
    useEffect(
        () => {
            new LectureCourseProgressReportDao().getAllCourseContent(prop.lectureCourseId).then((data) => {
                setContent(data.data);                
            });
        }, [page, refresh,prop.lectureCourseId]
    );
    const contextDate: IState = {
        content: content,
        refresh: () => setRefresh(!refresh),
        update: (data:any) => setPage(data)
    }
    return <LectureCourseProgressReportContext.Provider value={contextDate}>{prop.children}</LectureCourseProgressReportContext.Provider>
}