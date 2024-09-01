import { ArrowRight, Book, BookOutlined} from "@mui/icons-material"
import { LinearProgress } from "@mui/material"
export const CourseOnTrack = () => {
    return <div className="border rounded p-2 w-full">
      <div className="  flex justify-between items-center mb-5">
            <div className="font-bold">Course on track</div>
            <button className="border-2 border-blue-900 px-3 py-1 rounded-md text-blue-900">View all <ArrowRight/> </button>
        </div>
        <section className="  ">
 
            <div className="flex items-center border-b-2 pb-5 px-2 mb-5 ">
              <div><BookOutlined className="text-6xl"/></div> 
              <section className=" w-full text-blue-600">
                <div className="font-bold flex justify-between w-full text-sm  mb-1">
                    <div >Course Name</div>                
                    <div>Course hours</div>                
                </div>
                <div > 
                <LinearProgress variant="determinate" value={10} />
                </div>
              </section>   
            </div>
            
        </section>
    </div>
}