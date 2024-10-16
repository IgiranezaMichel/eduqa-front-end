import { ContentType } from "../enum/contenttype"

export interface ILectureCourseProgressReport {
    id: string
    currentChapter: number
    lectureCourseContentId: string
    title: string
    type: ContentType
}