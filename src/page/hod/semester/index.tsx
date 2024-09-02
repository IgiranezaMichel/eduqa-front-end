 import { Navigation } from "../../../component/navigation"
import { HodMenu } from "../../../util/hodMenu"
import { Feedback, HistoryEduSharp, People } from "@mui/icons-material"
import { DashboardCard } from "../index/component/DashboardCard"
import { Suggestions } from "../index/component/suggestions"
import { CourseOnTrack } from "../index/component/courseontrack"
 

export const HodManageSemester=()=>{
    return <Navigation items={HodMenu}>

       <div className="flex items-center justify-between clear-both py-3">
            <section>
                <div className="font-bold text-xl">
                    Semesters
                </div> 
            </section>
            <section>
                <select name="" id="" className="p-2">
                    <option value="">Semester filtering</option>
                    <option value="">active</option>
                    <option value="">inactive</option>
                </select>
            </section>
        </div>  

    <div className="flex items-center justify-between border-t-4 border-t-blue-900 mt-5 p-2 border border-b-4 border-b-blue-200/50">
    <DashboardCard icon={<People/>} title="Students" className="border-r border-r-blue-200/50 px-5" total={15}  />
    <DashboardCard icon={<HistoryEduSharp/>} className="border-r border-r-blue-200/50 px-5" title="Courses"  total={15}  />
    <DashboardCard icon={<People/>} className="border-r border-r-blue-200/50 px-5" title="Lecturers"  total={15}  />
    <DashboardCard icon={<Feedback/>}  title="Suggestions"  total={15}  />
    </div> 

<section>
    <div className="flex justify-between mt-5 gap-6">
     <section className=" w-[60%]">
     <Suggestions/>
     </section>

     <section className=" w-[40%]">
        <CourseOnTrack/>
     </section>
    </div>
</section>


        </Navigation>
}