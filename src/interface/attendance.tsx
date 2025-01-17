/**
 * Interface representing attendance information.
 */
export interface IAttendance {
    id:string
    studentRegisteredId:string
    isPresent:boolean
    date:string
}