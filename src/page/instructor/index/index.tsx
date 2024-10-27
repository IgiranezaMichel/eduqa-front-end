import { useEffect, useState } from "react"
import { Navigation } from "../../../component/navigation"
import { InstructorMenu } from "../../../util/instructorMenu"
import { IndexOverviewHeading } from "../../component"
import { InstructorOverview } from "./instructoroverview"
import { RecentCourse } from "./recentcourse"
import { SemesterDao } from "../../../controller/semesterdao"
import { toast } from "sonner"

export const InstructorHome = () => {
    const [semester, setSemester] = useState({});
    const [semesterList, setSemesterList] = useState([]);
    useEffect(
        () => {
            new SemesterDao().getCurrentSemester().then((res) => {
                setSemester(res.data)
            }).catch((err) => {
                toast.error(err.message);
            })
        }, []
    );
    useEffect(
        () => {
            new SemesterDao().getAllSemester().then(data => setSemesterList(data.data))
        }, []
    )

    
    return <Navigation items={InstructorMenu}>
        <div className="overflow-x-hidden h-full">
            <IndexOverviewHeading />
            <InstructorOverview semester={semester} />
            <RecentCourse semester={semester} child={<select onChange={e => setSemester(e.target.value)} name="" id="" className="border">
                <option value="">Select Semester</option>
                {semesterList.map((data: any) => <option value={data}>{data.semesterName}</option>)}
            </select>} />
        </div>
    </Navigation>
}