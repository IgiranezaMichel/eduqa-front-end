import { useStudentRegistrationHistoryContext } from "../../../../context/studentregistrationhistory";

export const DisplaySemester = () => {
    const { content } = useStudentRegistrationHistoryContext();
    console.log(content);

    return <>
        <section>
            <div className="font-bold text-xl">
                List of Course
            </div>
            <div className="text-gray-500 text-sm">
                This table contains all the Course in the department
            </div>
           <div className="grid grid-cols-3 gap-3">
            {content!=undefined&&content.data!=undefined&&content.data.map((item:any, index:number) => {
                return <section key={item.id+index}>
                {item.semesterName}
                </section>
            })
            }
           </div>
        </section>
    </>
}