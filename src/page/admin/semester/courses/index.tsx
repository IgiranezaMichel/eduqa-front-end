import { useEffect, useState } from "react"
import { SemesterCourseProvider } from "../../../../context/semestercourses"
import { DisplaySemesterCourseHome } from "./display"
import { SemesterDao } from "../../../../controller/semesterdao"

export const DisplaySemesterCourses = () => {
    const [semester, setSemester] =useState<any>({});
  useEffect(
    ()=>{
        new SemesterDao().getCurrentSemester().then((semester)=>{
            setSemester(semester.data);
        })
    },[]
  )
  return <SemesterCourseProvider semesterId={semester.id}>
  <DisplaySemesterCourseHome semester={semester}/>
  </SemesterCourseProvider>
}