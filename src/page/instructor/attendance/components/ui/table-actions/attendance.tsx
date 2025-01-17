/* eslint-disable @typescript-eslint/no-explicit-any */
import { GroupWork } from "@mui/icons-material"
import { IconButton, Menu, MenuItem } from "@mui/material"
import { useState } from "react";
import { IAttendance } from "../../../../../../interface/attendance";
import { AttendanceController } from "../../../../../../controller/attendanceController";
import { toast } from "sonner";

export const AttendanceAction = (prop: {date:string, studentCourse: any }) => {

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const open = Boolean(anchorEl);
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleAction = (attendance: IAttendance) => {
        new AttendanceController().createAttendance(attendance)
            .then((data) => toast.success(data.data))
            .catch(er => toast.error(er.response.data));
        handleClose();
    }
    return (
        <div>
            <IconButton
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <GroupWork />
            </IconButton>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={() => { handleAction({ id: '', isPresent: false, studentRegisteredId: prop.studentCourse.id,date:prop.date }); }}>Attend</MenuItem>
                <MenuItem onClick={() => { handleAction({ id: '', isPresent: true, studentRegisteredId: prop.studentCourse.id ,date:prop.date})}}>Not attended</MenuItem>
            </Menu>
        </div>
    )

}