import { Button } from "@/components/ui/button";
import { Camera, Plus } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

const LatestInterviewList = () => {
  const [interview, setInterview] = useState(false);
  console.log(setInterview);
  return (
    <div className="md:my-10 my-5">
      <h2 className="font-bold text-2xl">Previously Created Interview</h2>
      {/* When No Interview Exist  */}
      {!interview && (
        <div className="p-5 gap-3 flex flex-col items-center ">
          <Camera className=" h-10 w-10 text-primary"></Camera>
          <h2>You don't have any Interview created!</h2>
          <Link to={"/user/create-interview"}>
          <Button>
            
              <Plus></Plus>
            
            Create New Interview
          </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default LatestInterviewList;
