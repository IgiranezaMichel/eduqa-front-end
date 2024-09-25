import { Close, Visibility } from "@mui/icons-material"
import { useAuthenticationContext } from "../../context/authentication"
import { Dialog, IconButton } from "@mui/material"
import { ShowUserProfile } from "./userdetails"
import { useState } from "react"
export const OverviewHeading=()=>{
    const {content}=useAuthenticationContext()
    const [openDialog,setOpenDialog]=useState(false)
    return <div>
    <div className="rounded-xl bg-blue-900 bg-blue-950/90">
        <div className="flex text-white p-5">
            <section>
                <div className="mb-4 text-xl">
                Welcome ,<span className="text-yellow-400">
                    {content.name}
                    </span>
                </div> 
                <div className="text-sm">
                re, ipsum dolor sit omet consectecture
                Lore, ipsum dolor sit omet consectecture
                re, ipsum dolor sit omet consectecture
                Lore, ipsum dolor sit omet consectecture
                </div>
                <button onClick={()=>setOpenDialog(true)}
                 className="mt-4 flex gap-2 p-2 text-white rounded-xl border border-white">
                    <Visibility className="text-white"/> View Profile
                 </button>
            </section>
                 <img src="../overview-index.png" className="w-[20%]" alt="" />
         </div>
    </div>
    <Dialog open={openDialog} onClose={()=>setOpenDialog(false)}>
      <ShowUserProfile user={content}>
        <div className="flex justify-between font-bold py-2 ms-4 items-center">Details <IconButton onClick={()=>setOpenDialog(false)}><Close/></IconButton></div>
      </ShowUserProfile>
    </Dialog>
</div>
}