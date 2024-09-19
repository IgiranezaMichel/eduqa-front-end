import { BookSharp, Dashboard, Description, Folder, LockPerson, PeopleAlt } from "@mui/icons-material";
import { INavigationItems } from "../interface/navigationitems";

export const AdminMenu:INavigationItems[]=[
    {icon:<Dashboard/>,link:'/admin',name:'Overview'},
    {icon:<PeopleAlt/>,link:'/admin/user',name:'Users'},
    {icon:<Folder/>,link:'/admin/semester',name:'Semesters'},
    {icon:<LockPerson/>,link:'/admin/student',name:'Students'},
    {icon:<BookSharp/>,link:'/admin/course',name:'Courses'},
    {icon:<Description/>,link:'/admin/report',name:'Reports'},

]