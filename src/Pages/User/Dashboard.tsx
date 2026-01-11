import { Phone, VideoIcon } from "lucide-react";
import LatestInterviewList from "./_component/LatestInterviewList";
import { Link } from "react-router";

const Dashboard = () => {
  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold ">Dashboard</h2>

      <div className="grid grid-flow-row md:grid-cols-2 gap-5 md:gap-15 mt-10 ">
        {/* video Interview  */}
        <Link to={"/user/create-interview"}>
        
        <div className="bg-white p-8 rounded-md border-gray-200  ">
          <VideoIcon className="bg-primary/15 text-primary p-3 rounded-lg h-14 w-14 "/>
          <h2 className="font-bold mt-2">Create New Interview </h2>
          <p className="text-gray-500 mt-2">Create Ai Interview and schedule With Candidates</p>
        </div>
        </Link>
        {/* Phone Sharing  */}
        <div className="bg-white p-8 rounded-md border-gray-200  ">
          <Phone className="bg-primary/15 text-primary p-3 rounded-lg h-14 w-14 "/>
          <h2 className="font-bold mt-2">Create New Phone Screen Call  </h2>
          <p className="text-gray-500 mt-2">Create Ai Interview and schedule With Candidates</p>
        </div>
      </div>
      {/* Latest Interview  */}
      <LatestInterviewList/>
    </div>
  );
};

export default Dashboard;
