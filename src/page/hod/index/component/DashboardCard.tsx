import { MoreVert } from "@mui/icons-material"
import { IconButton, Menu, MenuItem } from "@mui/material"
import { FC, ReactNode, useState } from "react"
import { useNavigate } from "react-router-dom";

export interface IDashboardCard {
    icon:ReactNode,
    title:string,
    total:number,
    path:string,
    className?:string,
}

export const DashboardCard:FC<IDashboardCard> = (prop) => {
  const ITEM_HEIGHT = 48;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const navigation=useNavigate();
  return<>
  <div className={prop.className+" flex items-center gap-5"}>
    <div className="bg-blue-200/50 p-2 rounded">
        {prop.icon}
    </div>
    <div>
        <h1 className="font-bold mb-2">{prop.title}</h1>
        <h1 className="text-xl font-bold">{prop.total}</h1>
    </div>
    <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
       <MoreVert className="text-blue-500"/> 
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: '20ch',
            },
          },
        }}
      >
           <MenuItem  onClick={()=>navigation(prop.path)}>
            visit
          </MenuItem>
       </Menu>
         
   </div>
  </>
}