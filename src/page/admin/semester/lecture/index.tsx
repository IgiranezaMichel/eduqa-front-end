import { DisplayAvailableLectureForASemester } from "./display";
export const DisplayLectureIndex=(prop:{semester:any})=>{
    return <>
    <DisplayAvailableLectureForASemester semester={prop.semester}/>
    </>
}