import { Loader } from "lucide-react";
import CreateInterviewFrom from "./_component/CreateInterviewFrom";
import QuestionList from "./_component/QuestionList";
import questionStore from "@/zustand/interviewQuestion/getQuestionStore";

const CreateInterview = () => {
  const { session, loading } = questionStore();

  return (
    <div className="mt-10 px-5 md:px-24 xl:px-56 lg:px-44">
      {loading && (
        <div>
          <p className="text-xl font-medium">
            AI is generating your questions
          </p>
          <p className="mt-5 flex justify-center items-center h-screen">
            <Loader className="h-10 w-10 animate-spin" />
          </p>
        </div>
      )}

      {!loading && (
        session && session.questions.length > 0
          ? <QuestionList />
          : <CreateInterviewFrom />
      )}
    </div>
  );
};

export default CreateInterview;
