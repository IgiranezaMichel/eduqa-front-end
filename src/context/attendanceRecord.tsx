/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { IState } from "../interface/state";
import { IPage } from "../interface/page";
import { AttendanceRecordController } from "../controller/attendanceRecordController";

const AttendanceRecordContext = createContext<IState | undefined>(undefined);
export const useAttendanceRecordContext = () => {
    const AttendanceRecord = useContext(AttendanceRecordContext);
    if (!AttendanceRecord) {
        throw new Error("use AttendanceRecord Context must be used within a AttendanceRecordProvider");
    }
    return AttendanceRecord;
}

export const AttendanceRecordProvider = (prop: { attendanceId: string,lectureCourseId:string, children: ReactNode }) => {
    const [page, setPage] = useState<IPage>({
        pageNumber: 0, pageSize: 10, search: '', sortBy: 'id'
    });
    const [refresh, setRefresh] = useState<boolean>(false);
    const [content, setContent] = useState<any>([]);
    useEffect(
        () => {
            new AttendanceRecordController().getAttendanceRecordList(page, prop.attendanceId,prop.lectureCourseId).then((data) => {
                setContent(data.data);
            });
        }, [page, refresh, prop.attendanceId,prop.lectureCourseId]
    );
    const contextDate: IState = {
        content: content,
        refresh: () => setRefresh(!refresh),
        update: (data: any) => setPage(data)
    }
    return <AttendanceRecordContext.Provider value={contextDate}>{prop.children}</AttendanceRecordContext.Provider>
}