import { ReactNode } from "react"

export const ReviewForm=(prop:{lectureCourse:any,children:ReactNode})=>{
    return <>
    <form action="">
        {prop.children}
        <div className="grid grid-cols-2 gap-5 p-1 bg-blue-600 text-white">
            <div>Question</div>
            <section className="flex justify-between">
                <div>Bad</div>
                <div>Neutral </div>
                <div>Good</div>
                <div>Better</div>
                <div>Best</div>
            </section>
        </div>
        <div className="grid grid-cols-2 gap-5 p-1">
            <div>What is abc ewgwe gregher htretyhrt eyeyer</div>
            <section className="flex justify-between text-center">
                <input type="checkbox" name="" id="" />
                <input type="checkbox" name="" id="" />
                <input type="checkbox" name="" id="" />
                <input type="checkbox" name="" id="" />
                <input type="checkbox" name="" id="" />
            </section>
        </div>
    </form>
    </>
}