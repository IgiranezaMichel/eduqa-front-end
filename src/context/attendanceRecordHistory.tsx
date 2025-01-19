/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { IState } from "../interface/state";
import { IPage } from "../interface/page";
import { AttendanceRecordHistoryController } from "../controller/attendanceRecordHistoryController";

const AttendanceRecordHistoryContext = createContext<IState | undefined>(undefined);
export const useAttendanceRecordHistoryContext = () => {
    const AttendanceRecordHistory = useContext(AttendanceRecordHistoryContext);
    if (!AttendanceRecordHistory) {
        throw new Error("use AttendanceRecordHistory Context must be used within a AttendanceRecordHistoryProvider");
    }
    return AttendanceRecordHistory;
}

export const AttendanceRecordHistoryProvider = (prop: { attendanceId: string,lectureCourseId:string, children: ReactNode }) => {
    const [page, setPage] = useState<IPage>({
        pageNumber: 0, pageSize: 10, search: '', sortBy: 'id'
    });
    const [refresh, setRefresh] = useState<boolean>(false);
    const [content, setContent] = useState<any>([]);
    useEffect(
        () => {
            new AttendanceRecordHistoryController().getAttendanceRecordList(page, prop.attendanceId,prop.lectureCourseId).then((data) => {
                setContent(data.data);
            });
        }, [page, refresh, prop.attendanceId,prop.lectureCourseId]
    );
    const contextDate: IState = {
        content: content,
        refresh: () => setRefresh(!refresh),
        update: (data: any) => setPage(data)
    }
    return <AttendanceRecordHistoryContext.Provider value={contextDate}>{prop.children}</AttendanceRecordHistoryContext.Provider>
}