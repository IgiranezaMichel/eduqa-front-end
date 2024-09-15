import { Visibility } from "@mui/icons-material"
import { Chip } from "@mui/material"

export const IndexOverviewHeading=()=>{
    return <div>
    <div className="rounded-xl bg-blue-900 bg-blue-950/90">
        <div className="flex text-white p-5">
            <section>
                <div className="mb-4 text-xl">
                Welcome ,<span className="text-yellow-400">Josephan </span>
                </div> 
                <div className="text-sm">
                re, ipsum dolor sit omet consectecture
                Lore, ipsum dolor sit omet consectecture
                re, ipsum dolor sit omet consectecture
                Lore, ipsum dolor sit omet consectecture
                </div>
                <button 
                 className="mt-4 flex gap-2 p-2 text-white rounded-xl border border-white">
                    <Visibility className="text-white"/> View Profile
                 </button>
            </section>
                 <img src="../overview-index.png" className="w-[20%]" alt="" />
         </div>
    </div>
</div>
}