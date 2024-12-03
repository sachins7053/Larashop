import { useState } from "react"
import { X } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { MediaFile } from "./types"

interface MediaSidebarProps {
  file: MediaFile
  onClose: () => void
}

export default function MediaSidebar({ file, onClose }: MediaSidebarProps) {
  const [editedFile, setEditedFile] = useState(file)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setEditedFile((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    // In a real application, this would send an update request to the server
    console.log("Saving file:", editedFile)
    onClose()
  }

  return (
    <div className="w-80 border-l p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">File Details</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      <div className="space-y-4">
        <div>
          <Label htmlFor="url">URL</Label>
          <Input id="url" name="url" value={editedFile.url} onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor="title">Title</Label>
          <Input id="title" name="title" value={editedFile.title} onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor="alt">Alt Text</Label>
          <Input id="alt" name="alt" value={editedFile.alt} onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            value={editedFile.description}
            onChange={handleChange}
          />
        </div>
        <Button onClick={handleSave}>Save Changes</Button>
      </div>
    </div>
  )
}

