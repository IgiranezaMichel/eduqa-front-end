import { useEffect, useState } from "react"
import { Navigation } from "../../../component/navigation"
import { InstructorMenu } from "../../../util/instructorMenu"
import { IndexOverviewHeading } from "../../component"
import { InstructorOverview } from "./instructoroverview"
import { RecentCourse } from "./recentcourse"
import { SemesterDao } from "../../../controller/semesterdao"
import { toast } from "sonner"

export const InstructorHome=()=>{
    const [semester,setSemester]=useState({})
    useEffect(
        ()=>{
            new SemesterDao().getCurrentSemester().then((res) => {
                setSemester(res.data)
            }).catch((err) => {
                toast.error(err.message);
            })
        },[]
    )
    return <Navigation items={InstructorMenu}>
        <div className="overflow-x-hidden h-full">
        <IndexOverviewHeading/>
        <InstructorOverview semester={semester}/>
        <RecentCourse semester={semester}/>
        </div>
    </Navigation>
}