/* eslint-disable @typescript-eslint/no-explicit-any */

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Trash,  } from "lucide-react";

type UploadFile = {
  file: File;
  progress: number;
};

type FormValues = {
  jobDescription: string;
};

const MAX_FILES = 40;
const MAX_SIZE_MB = 5;
const MAX_SIZE = MAX_SIZE_MB * 1024 * 1024;

const UploadCvWithDescription = () => {
  const { register, handleSubmit } = useForm<FormValues>();
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

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
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          ].includes(file.type) && file.size <= MAX_SIZE
      );

      if (validFiles.length !== acceptedFiles.length) {
        setError("Only PDF, DOC, DOCX under 5MB allowed");
      }

      setFiles((prev) => [
        ...prev,
        ...validFiles.map((file) => ({ file, progress: 0 }))
      ]);
    },
    [files]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: true,
    accept: {
      "application/pdf": [".pdf"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [
        ".docx"
      ]
    }
  });

  //  Remove single CV
  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const submitData = async (data: FormValues) => {
    if (!files.length) {
      setError("Please upload at least one CV");
      return;
    }

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("jobDescription", data.jobDescription);

      files.forEach((item) => {
        formData.append("cvs", item.file);
      });

      await axios.post(
        "http://localhost:5000/api/cv/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: (progressEvent) => {
            const percent = Math.round(
              (progressEvent.loaded * 100) /
                (progressEvent.total || 1)
            );

            setFiles((prev) =>
              prev.map((f) => ({ ...f, progress: percent }))
            );
          }
        }
      );

      alert("CVs uploaded successfully");
      setFiles([]);
    } catch (err) {
      console.log(err);
      setError("Upload failed. Try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <form
        onSubmit={handleSubmit(submitData)}
        className="space-y-4"
      >
        {/* Job Description */}
        <div>
          <Label>Job Description</Label>
          <Textarea
            className="h-28 mt-2"
            placeholder="Paste job description here"
            {...register("jobDescription", { required: true })}
          />
        </div>

        {/* Dropzone */}
        <div
          {...getRootProps()}
          className="border-dashed border-2 rounded-xl p-6 text-center cursor-pointer"
        >
          <input {...getInputProps()} />
          <p className="text-sm font-medium">
            Drag & drop CVs here or click to upload
          </p>
          <p className="text-xs text-muted-foreground">
            PDF / DOC / DOCX · Max {MAX_FILES} files ·{" "}
            {MAX_SIZE_MB}MB
          </p>
        </div>

        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}

        {/* File List */}
        <div className="space-y-2">
          {files.map((item, idx) => (
            <div
              key={idx}
              className="border rounded p-3 flex justify-between items-center gap-3"
            >
              <div className="flex-1">
                <p className="text-sm font-medium truncate">
                  {item.file.name}
                </p>
                {uploading && (
                  <Progress value={item.progress} />
                )}
              </div>

              {/*  Remove Button */}
              {!uploading && (
                <button
                  type="button"
                  onClick={() => removeFile(idx)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash size={18} />
                </button>
              )}
            </div>
          ))}
        </div>

        <Button
          type="submit"
          disabled={uploading}
          className="w-full"
        >
          {uploading ? "Uploading..." : "Submit"}
        </Button>
      </form>
    </div>
  );
};

export default UploadCvWithDescription;
