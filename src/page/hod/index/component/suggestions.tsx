import { ArrowRight, CalendarMonth } from "@mui/icons-material"

export const Suggestions = () => {
  return <>
  <div className="  flex justify-between items-center">
            <div className="font-bold">Recent Suggestions</div>
            <button className="border-2 border-blue-900 px-3 py-1 rounded-md text-blue-900">View all <ArrowRight/> </button>
        </div>
        <section className="  border-l-blue-900  border-l-4 pl-5 ">
            <div className="flex justify-between py-5">
                <div className="text-slate-600">
                     <CalendarMonth/>Date
                </div>
                <div className="text-slate-600">lectures</div>
            </div>
            <div className="flex items-center justify-between border-l-blue-900  border-l-4 px-2 mb-5 border">
                <section>
                    <div className="text-slate-600 text-xs">15 sept, 20223</div>
                    <div className="font-bold mb-2 text-sm">Web design</div>
                    <div className="text-xs">Comments ...</div>
                </section>
                <div className=" ">Lecture name</div>
            </div>
            
        </section>
  </>
}