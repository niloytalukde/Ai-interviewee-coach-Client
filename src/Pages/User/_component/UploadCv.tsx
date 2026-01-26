/* eslint-disable @typescript-eslint/no-unused-vars */

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Trash } from "lucide-react";
import { Input } from "@/components/ui/input";
import uploadCvStore from "@/zustand/uploadcv/uploadCv.store";
import toast from "react-hot-toast";

type UploadFile = {
  file: File;
  progress: number;
};

type FormValues = {
  jobTitle: string;
  jobDescription: string;
};

const MAX_FILES = 40;
const MAX_SIZE_MB = 5;
const MAX_SIZE = MAX_SIZE_MB * 1024 * 1024;

const UploadCv = () => {
  const { register, handleSubmit, reset } = useForm<FormValues>();
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [error, setError] = useState<string | null>(null);

  const { uploadCv, loading } = uploadCvStore();

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setError(null);

      if (files.length + acceptedFiles.length > MAX_FILES) {
        setError(`Maximum ${MAX_FILES} CVs allowed`);
        return;
      }

      const validFiles = acceptedFiles.filter(
        (file) =>
          [
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          ].includes(file.type) && file.size <= MAX_SIZE
      );

      setFiles((prev) => [
        ...prev,
        ...validFiles.map((file) => ({ file, progress: 0 })),
      ]);
    },
    [files]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: true,
  });

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const submitData = async (data: FormValues) => {
  if (!files.length) {
    setError("Please upload at least one CV");
    return;
  }

  const formData = new FormData();
  formData.append("jobTitle", data.jobTitle);
  formData.append("jobDescription", data.jobDescription);

  files.forEach((f) => {
    formData.append("cvs", f.file);
  });

  uploadCv(formData);
  setFiles([]);
  toast.success("Upload SuccessFully")
  reset()
};


  
  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <form onSubmit={handleSubmit(submitData)} className="space-y-4">
        <div>
          <Label>Job Title</Label>
          <Input className="mt-2" {...register("jobTitle", { required: true })} />
        </div>

        <div>
          <Label>Job Description</Label>
          <Textarea className="mt-2 h-30" {...register("jobDescription", { required: true })} />
        </div>

        <div {...getRootProps()} className="border-dashed border-2 p-6 text-center">
          <input {...getInputProps()} />
          <p>Drag & drop CVs or click</p>
        </div>

        {error && <p className="text-red-500">{error}</p>}

        {files.map((item, idx) => (
          <div key={idx} className="flex justify-between">
            <p>{item.file.name}</p>
            <button type="button" onClick={() => removeFile(idx)}>
              <Trash size={16} />
            </button>
          </div>
        ))}

        <Button disabled={loading} type="submit">
          {loading ? "Uploading..." : "Submit"}
        </Button>
      </form>
    </div>
  );
};

export default UploadCv;
