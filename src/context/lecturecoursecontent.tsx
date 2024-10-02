import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { IState } from "../interface/state";
import { CourseContentDao } from "../controller/courseContentDao";

const LectureCourseContentContext = createContext<IState | undefined>(undefined);
export const useLectureCourseContentContext = () => {
    const LectureCourseContent = useContext(LectureCourseContentContext);
    if (!LectureCourseContent) {
        throw new Error("useLectureCourseContentContext must be used within a LectureCourseContentProvider");
    }
    return LectureCourseContent;
}
export const LectureCourseContentProvider = (prop:{children:ReactNode}) => {
    const [lectureCourseId, setLectureCourseId] = useState('');
    const [refresh, setRefresh] = useState<boolean>(false);
    const [content, setContent] = useState<any>({});
    useEffect(
        () => {
            new CourseContentDao().getLectureCourseContent(lectureCourseId).then((data) => {
                setContent(data.data);  
            });
        }, [lectureCourseId, refresh]
    );
    const contextDate: IState = {
        content: content,
        refresh: () => setRefresh(!refresh),
        update: (data: string) => setLectureCourseId(data)
    }
    return <LectureCourseContentContext.Provider value={contextDate}>{prop.children}</LectureCourseContentContext.Provider>
}