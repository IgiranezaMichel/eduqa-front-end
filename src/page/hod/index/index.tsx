import { Chip } from "@mui/material"
import { Navigation } from "../../../component/navigation"
import { HodMenu } from "../../../util/hodMenu"
import {Visibility } from "@mui/icons-material"
import { Suggestions } from "./component/suggestions"
import { CourseOnTrack } from "./component/courseontrack"
import { HodOverview } from "./component/overview"

export const HOD=()=>{
    return <Navigation items={HodMenu}>
    <div>
        <div className="rounded-xl bg-blue-900 bg-blue-950/90">
            <div className="flex text-white p-5">
                <div>
                    <div className="mb-4 text-xl">
                    Welcome ,<span className="text-yellow-400">Josephan </span>
                    </div> 
                    <div className="text-sm">
                    re, ipsum dolor sit omet consectecture
                    Lore, ipsum dolor sit omet consectecture
                    re, ipsum dolor sit omet consectecture
                    Lore, ipsum dolor sit omet consectecture
                    </div>
                    <Chip icon={<Visibility className="text-white"/>} label="View Profile"
                     className="mt-4 text-white rounded-xl border border-white" />
                </div>
                <div className="flex-1">
                </div>
            </div>
        </div>
    </div>
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