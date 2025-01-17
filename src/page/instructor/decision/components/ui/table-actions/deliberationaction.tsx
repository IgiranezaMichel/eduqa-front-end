/* eslint-disable @typescript-eslint/no-explicit-any */
import { GroupWork } from "@mui/icons-material"
import { IconButton, Menu, MenuItem } from "@mui/material"
import { useState } from "react";

export  const DeliberationAction = (prop:{studentCourse:any}) => {
      
      const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
        const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
            setAnchorEl(event.currentTarget);
        };
        const open = Boolean(anchorEl);
        const handleClose = () => {
            setAnchorEl(null);
        };
        const handleAction=(deliberation:any)=>{
            //     new StudentRegisterCourseDao().changeStudentCourseStatus(id,status)
            //     .then((data)=>toast.success(data.data))
            //     .catch(er=>toast.error(er.response.data));
            // handleClose();
            console.log(deliberation);
            
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
            <MenuItem onClick={()=>handleAction(prop.studentCourse)}>Succeed</MenuItem>
            <MenuItem onClick={()=>handleAction(prop.studentCourse)}>Failed</MenuItem>
        </Menu>
    </div>
    )
 
}