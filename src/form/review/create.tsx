/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode, useEffect, useState } from "react"
import { toast, Toaster } from "sonner";
import { ICourseReview } from "../../interface/coursereview";
import { CourseReviewDao } from "../../controller/coursereviewdao";
import { Avatar } from "@mui/material";
import { StarRate } from "@mui/icons-material";

export const ReviewForm=(prop:{lectureCourse:any,children:ReactNode})=>{

    const questions = [
        "How satisfied are you with our service?",
        "How would you rate the product quality?",
        "How satisfied are you with the delivery experience?",
        "Was the support team helpful?",
        "Would you recommend us to others?",
        "Would you recommend us to others?",
        "Would you recommend us to others?",
        "Would you recommend us to others?",
        "Would you recommend us to others?",
        "Would you recommend us to others?",
        "Would you recommend us to others?",
        "Would you recommend us to others?",
      ];
      const questionsPerPage = 5;
      const [courseReview,setCourseReview]=useState<ICourseReview>({id:'',
        lectureCourseId:prop.lectureCourse.lectureCourseId,
        marks:0,
        userId:''});
      const totalPages = Math.ceil(questions.length / questionsPerPage);
      const [responses, setResponses] = useState(Array(questions.length).fill(null));
      const [currentPage, setCurrentPage] = useState(0);
      const [averageScore, setAverageScore] = useState(null);
      const handleResponseChange = (questionIndex:any, score:any) => {
        const updatedResponses = [...responses];
        updatedResponses[questionIndex] = score;
        setResponses(updatedResponses);
      };
    
      const handleSubmit = (e:any) => {
        e.preventDefault();
    
        if (responses.includes(null)) {
          toast.error("Please answer all questions before submitting.");
          return;
        }
    
        const totalScore = responses.reduce((sum, score) => sum + score, 0);
        const avgScore = (totalScore / questions.length).toFixed(2);
        setAverageScore(avgScore);
        setCourseReview({...courseReview,marks:Number(avgScore)});
        new CourseReviewDao().createCourseReview(courseReview).then(data=>toast.success(data.data))
        .catch(err=>toast.error(err.response.data))
      };
    
      const goToNextPage = () => {
        if (isPageComplete()) {
          setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
        } else {
            toast.error("Please answer all questions on this page before moving to the next page.");
        }
      };
    
      const goToPreviousPage = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 0));
      };
    
      const isPageComplete = () => {
        const startIndex = currentPage * questionsPerPage;
        const endIndex = startIndex + questionsPerPage;
        return responses.slice(startIndex, endIndex).every((response) => response !== null);
      };
    
      const currentQuestions = questions.slice(
        currentPage * questionsPerPage,
        (currentPage + 1) * questionsPerPage
      );
    const [courseReviewObj,setCourseReviewObj]=useState<any>({});
    useEffect(
        ()=>{
            new CourseReviewDao().getStudentReviewFromLectureCourse(prop.lectureCourse.lectureCourseId)
            .then(data=>setCourseReviewObj(data.data))
        },[]
    )
      return (
        <div className="max-w-xl mx-auto p-5 bg-blue-600 text-white">
            {prop.children}
          <h1 className="text-center mb-5 text-lg font-bold">Course Survey</h1>
        {Object.keys(courseReviewObj).length==0?<>
            <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-5 p-2 bg-blue-600 text-white">
              <div>Question</div>
              <section className="flex justify-between">
                <div>Bad</div>
                <div>Neutral</div>
                <div>Good</div>
                <div>Better</div>
                <div>Best</div>
              </section>
            </div>
    
            {/* Display Questions */}
            {currentQuestions.map((question, index) => {
              const questionIndex = currentPage * questionsPerPage + index;
              return (
                <div key={questionIndex} className="grid grid-cols-2 gap-5 p-2 bg-white text-black rounded-md mb-2">
                  <div>{question}</div>
                  <section className="flex justify-between text-center">
                    {[1, 2, 3, 4, 5].map((score) => (
                      <label key={score} className="text-center">
                        <input
                          type="radio"
                          name={`question-${questionIndex}`}
                          value={score}
                          checked={responses[questionIndex] === score}
                          onChange={() => handleResponseChange(questionIndex, score)}
                          className="mx-1"
                          required
                        />
                      </label>
                    ))}
                  </section>
                </div>
              );
            })}
    
            {/* Pagination Buttons */}
            <div className="flex justify-between mt-5">
              {currentPage > 0 && (
                <button
                  type="button"
                  onClick={goToPreviousPage}
                  className="bg-blue-700 text-white p-2 rounded-md"
                >
                  Previous
                </button>
              )}
    
              {currentPage < totalPages - 1 ? (
                <button
                  type="button"
                  onClick={goToNextPage}
                  className="bg-blue-700 text-white p-2 rounded-md"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  className="bg-green-700 text-white p-2 rounded-md"
                >
                  Submit
                </button>
              )}
            </div>
          </form>
    
          {averageScore && (
            <div className="mt-5 text-center">
              <h2>Average Satisfaction Score: {averageScore} / 5</h2>
            </div>
          )}
          <Toaster position="top-center"/>
        </>:<section className="flex flex-col">
            <Avatar src={courseReviewObj.lecture.picture} className="m-auto"/>
        <div className="mb-3">Lecture name :: {courseReviewObj.lecture.name}</div>
        <div className="mb-3">Lecture gender :: {courseReviewObj.lecture.gender}</div>
        <div className="mb-3">Lecture Email :: {courseReviewObj.lecture.email}</div>
        <div className="mb-3">Lecture Phone :: {courseReviewObj.lecture.phoneNumber}</div>
        <div className="flex justify-between items-center w-full mt-auto">
           <div>
           {
                [...new Array(5)].map((_,index:number)=><span key={index}>
                <StarRate className={`${index<=Number(courseReviewObj.marks)-1?'text-slate-900':'text-slate-300'}`}/>
                </span>
                )
            }
           </div>
            <div>{Number(courseReviewObj.marks)!=0?<>{Number(courseReviewObj.marks)}/5</>:'No review'}</div>
            </div>
         </section>}
          
        </div>
      );
    };
    
