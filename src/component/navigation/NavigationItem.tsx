import { FC} from "react";
import { useNavigate } from "react-router-dom";
import { INavigationItems } from "../../interface/navigationitems";

export const NavigationItem:FC<INavigationItems>=(prop)=>{
    const navigation=useNavigate();

    return <>
    <div onClick={()=>navigation(prop.link)} className= {`flex gap-3 ps-5 py-2 cursor-pointer ${prop.className}`}>
        <div>
            {prop.icon}
        </div>   
        <div>
            {prop.name}
        </div>   
        </div>
    </>
}