import { IndexOverviewHeading } from "../component"

export const Student = () => {
  return <>
  <IndexOverviewHeading/>
  <div className="flex flex-col items-center justify-center">
    <h1 className="text-3xl font-bold mb-4">Student</h1>
    <p className="text-lg">This is the student page.</p>
  </div>
  </>
}