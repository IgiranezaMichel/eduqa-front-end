import { Modal } from "@mui/material"
import { CreateAttendance } from "../../../../../form/attendance/create"
import { useState } from "react"
import { Close } from "@mui/icons-material";
import { IAttendance } from "../../../../../interface/attendance";

export const AddNewAttendance = () => {
    const [open, setOpen] = useState(false);
    const [attendance] = useState<IAttendance>({
        id: "",
        date: "",
        lectureCourseId: ""
    })
    return <>
        <section className="flex gap-2">
            <button onClick={() => setOpen(true)} className="p-1 bg-blue-800/80">Add new </button>
        </section>
        <Modal open={open} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <section className="w-max-[90%] h-max-[90%] bg-white rounded-lg">
             <CreateAttendance attendance={attendance}>
                <section className="flex justify-between p-2 bg-blue-950 text-white rounded-t-lg">
                    <section>
                        Create attendance
                    </section>
                    <section>
                        <Close onClick={() => setOpen(false)} className="" />
                    </section>
                </section>
            </CreateAttendance>
            </section>
        </Modal>
    </>
}