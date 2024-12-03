import { useState, useEffect } from "react"
import { MediaFile } from "./types"
import { mockMediaFiles } from "./mock-data"
import { usePage } from "@inertiajs/react"

interface MediaGridProps {
  searchQuery: string
  page: number
  itemsPerPage: number
  onSelectFile: (file: MediaFile) => void
}

export default function MediaGrid({ searchQuery, page, itemsPerPage, onSelectFile }: MediaGridProps) {
  const  files:any  = usePage().props.files;
  console.log(files)
  const [filess, setFiles] = useState<MediaFile[]>([])

  useEffect(() => {
    // In a real application, this would be an API call
    const filteredFiles = mockMediaFiles.filter((file : MediaFile) =>
      file.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    const paginatedFiles = filteredFiles.slice(0, page * itemsPerPage)
    setFiles(paginatedFiles)
  }, [searchQuery, page, itemsPerPage])

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {files.map((file:any) => (
        <div
          key={file.id}
          className="cursor-pointer border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
          onClick={() => onSelectFile(file)}
        >
          <img
            src={file.url}
            alt={file.title}
            width={200}
            height={200}
            className="w-full h-40 object-cover"
          />
          <div className="p-2">
            <h3 className="text-sm font-medium truncate">{file.title}</h3>
          </div>
        </div>
      ))}
    </div>
  )
}

