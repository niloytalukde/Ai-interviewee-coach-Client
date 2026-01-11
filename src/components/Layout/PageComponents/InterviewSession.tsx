/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import questionStore from "@/zustand/interviewQuestion/getQuestionStore";
import toast from "react-hot-toast";

interface InterviewSessionProps {
  question: [{question: string}];
  loading: boolean;
}
const InterviewSession = ({ question, loading }: InterviewSessionProps) => {
  const { fetchFeedback,feedback }  = questionStore() as { fetchFeedback: (payload: any) => void; feedback: any }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const data = new FormData(form);
    const answers = data.get("answers")?.toString().trim();

    if (!answers) {
      toast.error("Answer cannot be empty");
      return;
    }

    const payload = {
      answers,
      question: question?.[0]?.question ?? "",
    };
    fetchFeedback(payload);
    toast.success("Your answers have been submitted!");
    form.reset();
  };

  console.log(feedback);

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="bg-white shadow-xs rounded-lg p-6 mb-6">
        {loading ? (
          <p>Please wait For Next Question ...</p>
        ) : (
          <p>{question?.[0]?.question}</p>
        )}
      </div>


      <div className="bg-white shadow-xs rounded-lg p-6 mb-6">
       

      <div>
        <h2 className="text-2xl font-bold mb-4">Submit Your Answer</h2>

        <form onSubmit={handleSubmit}>
          <textarea
            name="answers"
            className="w-full h-32 p-2 border border-gray-300 rounded-md"
            placeholder="Type your answer here..."
            onPaste={(e) => {
              e.preventDefault();
              toast.error("Please type your answer instead of pasting.");
            }}
          />

          <Button type="submit" className="mt-4">
            Submit Answer
          </Button>
        </form>
      </div>
       {feedback ? (
          <div className=" mt-10"> 
            <h2 className="text-2xl font-bold mb-4">Feedback</h2>
            <p><span className="font-bold uppercase text-primary">strengths :</span> {feedback.strengths}</p>
            <p><span className="font-bold uppercase text-primary">weaknesses :</span> {feedback.weaknesses}</p>
            <p><span className="font-bold uppercase text-primary">improvement :</span> {feedback.improvement}</p>

            <p><span className="font-bold uppercase text-red-400">ideal hint :</span> {feedback.ideal_hint}</p>
          </div>
          
        ) : (
          <p>No feedback yet.</p>
        )}
      </div>
    </div>
  );
};

export default InterviewSession;
