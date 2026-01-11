import { Button } from "@/components/ui/button";
import questionStore from "@/zustand/interviewQuestion/getQuestionStore";
import { CheckCircle, Copy, Mail, Slack } from "lucide-react";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router";

const CreateLink = () => {
  const params = useParams();
  const id = params.id;
 
  const interviewLink = `${import.meta.env.VITE_HOST_URL}/interview-board/${id}`;

  const { session, } = questionStore();
  console.log(session);
  const handleCopy = async () => {
    await navigator.clipboard.writeText(interviewLink as string);
    toast.success("Linked Copy Successfully");
  };
  return (
    <div className="max-w-3xl  mx-auto items-center justify-center  bg-white rounded-xl shadow-sm p-8 mt-30">
      {/* Header */}
      <div className="flex flex-col items-center text-center">
        <CheckCircle className="h-12 w-12 text-green-500" />
        <h2 className="mt-4 text-2xl font-semibold">
          Your AI Interview is Ready!
        </h2>
        <p className="mt-2 text-muted-foreground">
          Share this link with your candidates to start the interview process
        </p>
      </div>

      {/* Interview Link Box */}
      <div className="mt-8 border rounded-lg p-4 flex items-center justify-between gap-3">
        <div className="overflow-hidden">
          <p className="text-sm font-medium">Interview Link</p>
          <p className="text-primary truncate">{interviewLink}</p>
        </div>

        <Button variant="outline" onClick={handleCopy}>
          <Copy className="h-4 w-4 mr-2" />
          Copy Link
        </Button>
      </div>

      {/* Meta Info */}
      <div className="mt-4 flex flex-wrap gap-6 text-sm text-muted-foreground">
        <span>⏱ {session?.duration}</span>
        <span>❓{session?.questions?.length}Questions</span>
        <span>📅 Expires: {session?.questions?.length}</span>
      </div>

      {/* Share */}
      <div className="mt-8">
        <p className="text-sm font-medium mb-3">Share via</p>
        <div className="flex gap-3">
          <Button variant="outline">
            <Mail className="h-4 w-4 mr-2" />
            Email
          </Button>

          <Button variant="outline">
            <Slack className="h-4 w-4 mr-2" />
            Slack
          </Button>

          <Button variant="outline">WhatsApp</Button>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="mt-10 flex justify-between">
        <Button variant="ghost">← Back to Dashboard</Button>
        <Link to={"/user/create-interview"}><Button>＋ Create New Interview</Button></Link>
      </div>
    </div>
  );
};

export default CreateLink;
