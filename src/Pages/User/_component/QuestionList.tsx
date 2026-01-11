import { Button } from "@/components/ui/button";
import questionStore from "@/zustand/interviewQuestion/getQuestionStore";
import { Link } from "react-router";

type QuestionItem = {
  question: string;
  type: string;
};

const QuestionList = () => {
  const { session, loading } = questionStore();

  if (loading) {
    return <p>Loading questions...</p>;
  }

  if (!session || session.questions.length === 0) {
    return <p>No questions found.</p>;
  }

  return (
    <div className="space-y-4 bg-white p-5 rounded-md">
      {session.questions.map((item: QuestionItem, index: number) => (
        <div
          key={index}
          className="p-4 border rounded-md bg-gray-50"
        >
          <p className="font-medium">
            {index + 1}. {item.question}
          </p>
          <p className="text-primary text-sm mt-2">
            Type: {item.type}
          </p>
        </div>
      ))}

      <div className="flex justify-end mt-10">
        <Link to={`/user/interview-link/${session._id}`}>
          <Button>Create Interview Link</Button>
        </Link>
      </div>
    </div>
  );
};

export default QuestionList;
