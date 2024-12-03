import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Upload, X } from 'lucide-react'
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"

export default function FileUploader() {
  const [files, setFiles] = useState<File[]>([])
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({})

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles])
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  const removeFile = (file: File) => {
    setFiles((prevFiles) => prevFiles.filter((f) => f !== file))
    setUploadProgress((prevProgress) => {
      const newProgress = { ...prevProgress }
      delete newProgress[file.name]
      return newProgress
    })
  }

  const uploadFiles = () => {
    files.forEach((file) => {
      // Simulating file upload with progress
      let progress = 0
      const interval = setInterval(() => {
        progress += 10
        setUploadProgress((prevProgress) => ({
          ...prevProgress,
          [file.name]: progress,
        }))

        if (progress >= 100) {
          clearInterval(interval)
        }
      }, 500)
    })
  }

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer ${
          isDragActive ? "border-primary" : "border-gray-300"
        }`}
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-2 text-sm text-gray-600">
          Drag 'n' drop some files here, or click to select files
        </p>
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file) => (
            <div key={file.name} className="flex items-center justify-between bg-gray-100 p-2 rounded">
              <span className="text-sm truncate">{file.name}</span>
              <div className="flex items-center space-x-2">
                {uploadProgress[file.name] !== undefined && (
                  <Progress value={uploadProgress[file.name]} className="w-24" />
                )}
                <Button variant="ghost" size="icon" onClick={() => removeFile(file)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
          <Button onClick={uploadFiles} className="mt-4">
            Upload Files
          </Button>
        </div>
      )}
    </div>
  )
}

