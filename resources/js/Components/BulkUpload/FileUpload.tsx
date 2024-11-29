import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Upload, FileSpreadsheet } from 'lucide-react'
import { Button } from '@/components/ui/button'

// interface FileUploadProps {
//   onUpload: (file: File) => void
// }

export function FileUpload({ setData }: any) {
  const [dragActive, setDragActive] = useState(false)
  const [fileName, setFileName] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const handleFile = (file: File) => {
    setFileName(file.name)
    setData('file',file)
    console.log(file)
  }

  return (
    <div
      className={`border-2 border-dashed rounded-lg p-8 text-center ${
        dragActive ? 'border-purple-600 bg-purple-50' : 'border-gray-300'
      }`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        onChange={handleChange}
        accept=".csv,.xlsx,.xls"
      />
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex flex-col items-center"
      >
        {fileName ? (
          <>
            <FileSpreadsheet className="w-12 h-12 text-purple-600 mb-4" />
            <p className="mb-2 text-sm text-gray-500">
              Selected file: <span className="font-semibold">{fileName}</span>
            </p>
          </>
        ) : (
          <>
            <Upload className="w-12 h-12 text-purple-600 mb-4" />
            <p className="mb-2 text-sm text-gray-500">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-500">CSV, XLSX, XLS (MAX. 10MB)</p>
          </>
        )}
        <Button
          onClick={() => inputRef.current?.click()}
          variant="outline"
          className="mt-4"
        >
          {fileName ? 'Change File' : 'Select File'}
        </Button>
      </motion.div>
    </div>
  )
}

