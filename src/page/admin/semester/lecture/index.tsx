import { useEffect, useState } from "react";
import { SemesterDao } from "../../../../controller/semesterdao";
import { DisplayAvailableLectureForASemester } from "./display";

export const DisplayLectureIndex=()=>{
    const [semester, setSemester] =useState<any>({});
    useEffect(
      ()=>{
          new SemesterDao().getCurrentSemester().then((semester)=>{
              setSemester(semester.data);
          })
      },[]
    )
    return <>
    <DisplayAvailableLectureForASemester semester={semester}/>
    </>
}