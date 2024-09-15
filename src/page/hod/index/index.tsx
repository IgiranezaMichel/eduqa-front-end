import { Navigation } from "../../../component/navigation"
import { HodMenu } from "../../../util/hodMenu"
import { Suggestions } from "./component/suggestions"
import { CourseOnTrack } from "./component/courseontrack"
import { HodOverview } from "./component/overview"
import { IndexOverviewHeading } from "../../component/overview"

export const HOD=()=>{
    return <Navigation items={HodMenu}>
    <IndexOverviewHeading/>
    <HodOverview/>

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