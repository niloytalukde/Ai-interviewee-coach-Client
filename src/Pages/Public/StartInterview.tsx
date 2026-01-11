import Vapi from "@vapi-ai/web";
import {  Mic, MicOff, Phone } from "lucide-react";
import questionStore from "./../../zustand/interviewQuestion/getQuestionStore";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import img from "../../assets/AiImage.png"
import toast from "react-hot-toast";
const StartInterview = () => {
const vapi = new Vapi("8e7c8512-40b9-4fc1-8dde-bfc8236dfadf");
const [isMuted, setIsMuted] = useState(false);
const [activeUser,setActiveUser]=useState(false)
  const candidateName = questionStore((state) => state.candidateName);
  const session = questionStore((state) => state.session);
  useEffect(() => {
    console.log("Candidate:", candidateName);
    console.log("Session:", session);
  }, [candidateName, session]);
  const startCall = async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const questionList = session?.questions.map((item, _index) => {
      return item.question + ",";
    });
    try {
      console.log("Hello VApi");
      await vapi.start({
        name: "AI Recruiter",
        firstMessage: `Hi ${candidateName} how are you? Ready for your interview on ${session?.jobType} ?`,
        transcriber: {
          provider: "deepgram",
          model: "nova-2",
          language: "en-US",
        },
        voice: {
          provider: "11labs",
          voiceId: "pNInz6obpgDQGcFmaJgB",
        },
        model: {
          provider: "openai",
          model: "gpt-4o", // Updated model
          temperature: 0.7,
          messages: [
            {
              role: "system",
              content: `
You are a professional AI voice interviewer.

Your role:
- Conduct the interview using ONLY the questions provided.
- Ask ONE question at a time, in the given order.
- Speak clearly and professionally.

Conversation flow:
1. Start by greeting the candidate briefly and professionally.
2. Ask the first interview question.
3. Wait silently until the candidate finishes speaking.
4. Do NOT repeat the question.
5. Do NOT explain, rephrase, or give hints.
6. Do NOT evaluate or comment on the answer.
7. After the answer, say only: "Thank you."
8. Proceed to the next question.
9. Continue until all questions are completed.

Interview Questions:
${questionList}

Tone & Style:
- Professional
- Calm
- Neutral
- Concise

Important rules:
- Never repeat a question.
- Never ask multiple questions at once.
- Never add your own questions.
- Never interrupt the candidate.
- Keep responses short and natural.

Ending:
When all questions are completed, say:
"The interview is now complete. Thank you for your time. Goodbye."

            `.trim(),
            },
          ],
        },
      });
      toast.success("Your Interview Is Started")
      console.log("Call started successfully");
    } catch (error) {
      console.error("Error starting call:", error);
    }
  };

  const stopCall = () => {
    toast.success("You End The Call")
    console.log("call End SuccessFully");
    vapi.stop();
  };

const muteCall = () => {
  setIsMuted((prev) => {
    vapi.setMuted(!prev);
    return !prev;
  });
};

vapi.on("speech-start",()=>{
  console.log("Started Speech");
   setActiveUser(false)
})

vapi.on("speech-end",()=>{
  console.log("Started Speech");
   setActiveUser(true)
})

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold text-gray-800">
          AI Interview Session
        </h1>

        <div className="flex items-center gap-2 text-gray-700 font-medium">
          ⏱ <span>00:00:00</span>
        </div>
      </div>

      {/* Interview Panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* AI Recruiter */}
        <div className="bg-white rounded-xl shadow-sm h-95 flex flex-col items-center justify-center">
          <img
            src={img}
            alt="AI Recruiter"
            className={`w-20 h-20 rounded-full object-cover mb-3 ${!activeUser&&"animate-ping" }`}
          />
          <p className="font-medium text-gray-800">7 Recruiter</p>
        </div>
        {/* Candidate */}
        <div className="bg-white rounded-xl shadow-sm h-95 flex flex-col items-center justify-center">
           
          <div className="w-20 h-20 rounded-full object-cover  bg-blue-600 flex items-center justify-center text-white text-xl font-semibold mb-3">
            {candidateName}
          </div>
          <p className="font-medium text-gray-800">{candidateName}</p>
        </div>
      </div>

      {/* Controls */}
      <div className="mt-10 flex flex-col items-center gap-3">
        <div className="flex items-center gap-4">
          <button
  onClick={()=>muteCall()}
  className="w-12 h-12 rounded-full bg-gray-700 hover:bg-gray-800 flex items-center justify-center text-white"
>
  {isMuted ? <MicOff size={20} /> : <Mic size={20} />}
</button>
          <button
            onClick={() => stopCall()}
            className="w-12 h-12 rounded-full bg-red-600 hover:bg-red-700 flex items-center justify-center text-white"
          >
            <Phone size={20} />
          </button>

      <Button onClick={()=>startCall()}>Start Call</Button>
        </div>

        <p className="text-sm text-gray-500">Interview in Progress...</p>
      </div>
    </div>
  );
};

export default StartInterview;
