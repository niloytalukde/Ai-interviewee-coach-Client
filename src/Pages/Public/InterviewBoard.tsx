import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Clock, Info, Video } from "lucide-react";
import { useState } from "react";

import image from "../../assets/interview.png"
import questionStore from "@/zustand/interviewQuestion/getQuestionStore";
import { Link, useParams } from "react-router";


const InterviewBoard = () => {
  const [name, setName] = useState("");
  const params =useParams()
  const id = params.id
    const {getSession,session,setCandidateName}=questionStore()
  const handleStart = () => {
    if (!name.trim()) return alert("Please enter your name");
    console.log("Candidate Name:", name);
    // navigate to interview flow
setCandidateName(name)
    getSession(id)
  };
 
  console.log(session);


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-xl font-semibold text-primary">Alcruiter</h1>
          <p className="text-sm text-muted-foreground">
            AI-Powered Interview Platform
          </p>
        </div>

        {/* Illustration */}
        <div className="flex justify-center my-6">
          <img
            src={image }
            alt="Interview"
            className="h-44 rounded-2xl"
          />
        </div>

        {/* Title */}
        <h2 className="text-lg font-semibold text-center">
         {session?.jobType}
        </h2>

        {/* Meta */}
        <div className="flex justify-center gap-4 text-sm text-muted-foreground mt-2">
          <span className="flex items-center gap-1">
            <Video className="h-4 w-4" />
            Google Inc.
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {session?.duration}
          </span>
        </div>

        {/* Input */}
        <div className="mt-6">
          <label className="text-sm font-medium">Enter your full name</label>
          <Input
            placeholder="e.g., John Smith"
            className="mt-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Instructions */}
        <div className="mt-6 bg-blue-50 border border-blue-100 rounded-lg p-4 text-sm">
          <p className="flex items-center gap-2 font-medium mb-2">
            <Info className="h-4 w-4 text-primary" />
            Before you begin
          </p>
          <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
            <li>Ensure you have a stable internet connection</li>
            <li>Test your camera and microphone</li>
            <li>Find a quiet place for the interview</li>
          </ul>
        </div>

        {/* Action */}
        <Link to={`/start-interview/${id}`}>
        <Button className="w-full mt-6" onClick={handleStart}>
          Start Interview
        </Button>
        
        
        </Link>
      </div>
    </div>
  );
};

export default InterviewBoard ;
