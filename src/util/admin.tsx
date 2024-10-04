import { BookSharp, Dashboard, Description, Folder, LocalPostOfficeRounded, PeopleAlt } from "@mui/icons-material";
import { INavigationItems } from "../interface/navigationitems";

export const AdminMenu:INavigationItems[]=[
    {icon:<Dashboard/>,link:'/admin',name:'Overview'},
    {icon:<PeopleAlt/>,link:'/admin/user',name:'Users'},
    // {icon:<Folder/>,link:'/admin/semesters',name:'Semesters'},
    {icon:<LocalPostOfficeRounded/>,link:'/admin/department',name:'Department'},
    {icon:<Folder/>,link:'/admin/semester',name:'Semesters'},
    {icon:<BookSharp/>,link:'/admin/course',name:'Courses'},
    {icon:<Description/>,link:'/admin/report',name:'Reports'},

]