
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Code2,
  Terminal,
  Brain,
  Briefcase,
  MessageCircle,
  Layers,
  ArrowLeft,
} from "lucide-react";
import questionStore from "@/zustand/interviewQuestion/getQuestionStore";

const interviewTypes = [
  { id: "coding", title: "Coding", icon: Code2 },
  { id: "system", title: "System", icon: Layers },
  { id: "dsa", title: "DSA", icon: Brain },
  { id: "backend", title: "Backend", icon: Terminal },
  { id: "fullstack", title: "FullStack", icon: Briefcase },
  { id: "behavior", title: "Behavior", icon: MessageCircle },
];

type FormValues = {
  jobPosition: string;
  jobDescription: string;
  timeDuration: string;
  types: string[];
};

const CreateInterviewForm = () => {
  const { register, handleSubmit, watch, setValue } = useForm<FormValues>({
    defaultValues: {
      jobPosition: "",
      jobDescription: "",
      timeDuration: "",
      types: [],
    },
  });

  // eslint-disable-next-line react-hooks/incompatible-library
  const selectedTypes = watch("types") || [];

  // toggle multi select
  const toggleType = (id: string) => {
    if (selectedTypes.includes(id)) {
      setValue(
        "types",
        selectedTypes.filter((t) => t !== id)
      );
    } else {
      setValue("types", [...selectedTypes, id]);
    }
  };

  const { fetchQuestion, } = questionStore() as { fetchQuestion: (data:FormValues) => void; loading: boolean };


  const onSubmit = (data: FormValues) => {
    fetchQuestion(data)
  };



  return (
    <div className="bg-white shadow rounded-md p-5 mt-5">
        <div className="flex gap-3 items-center">
        <ArrowLeft className="cursor-pointer" />
        <h2 className="font-bold text-2xl">Create A New Interview</h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Job Position */}
        <div className="mt-5">
          <h2 className="font-medium">Job Position</h2>
          <Input
            className="mt-2"
            placeholder="e.g FullStack Developer"
            {...register("jobPosition", { required: true })}
          />
        </div>

        {/* Job Description */}
        <div className="mt-5">
          <h2 className="font-medium">Job Description</h2>
          <Textarea
            className="mt-2 h-32"
            placeholder="Enter Job Description"
            {...register("jobDescription", { required: true })}
          />
        </div>

        {/* Time Duration */}
        <div className="mt-5">
          <Select onValueChange={(value) => setValue("timeDuration", value)}>
            <SelectTrigger className="w-52">
              <SelectValue placeholder="Select Time Duration" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="15 min">15 min</SelectItem>
              <SelectItem value="30 min">30 min</SelectItem>
              <SelectItem value="45 min">45 min</SelectItem>
              <SelectItem value="60 min">60 min</SelectItem>
            </SelectContent>
          </Select>

          {/* hidden input for RHF */}
          <input
            type="hidden"
            {...register("timeDuration", { required: true })}
          />
        </div>

        {/* Interview Types (Multi Select) */}
        <div className="mt-5">
          <h2 className="font-medium mb-2">Interview Types</h2>

          <div className="flex gap-4 flex-wrap">
            {interviewTypes.map((item) => {
              const Icon = item.icon;
              const selected = selectedTypes.includes(item.id);

              return (
                <div
                  key={item.id}
                  onClick={() => toggleType(item.id)}
                  className={`flex items-center gap-2 px-4 py-1 rounded-md cursor-pointer transition
                    ${
                      selected
                        ? "bg-primary text-white"
                        : "bg-primary/10 hover:bg-primary hover:text-white"
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.title}</span>
                </div>
              );
            })}
          </div>

          {/* hidden input for RHF */}
          <input type="hidden" {...register("types")} />
        </div>

        {/* Submit */}
        <div className="flex justify-end mt-10">
            <Button className=" " type="submit">
          Generate Question
        </Button>
        </div>
      </form>
      {/* <QuestionList fromData={}/> */}
    </div>
  );
};

export default CreateInterviewForm;
