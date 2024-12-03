import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import MediaGrid from "./media-grid"
import MediaSidebar from "./media-sidebar"
import FileUploader from "./file-uploader"
import { MediaFile } from "./types"

const ITEMS_PER_PAGE = 3

export default function FileManager() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFile, setSelectedFile] = useState<MediaFile | null>(null)
  const [page, setPage] = useState(1)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real application, this would trigger a search request to the server
    console.log("Searching for:", searchQuery)
    setPage(1)
  }

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1)
  }

  return (
    <div className="flex">
      <div className="flex-1">
        <Tabs defaultValue="browse" className="mb-6">
          <TabsList>
            <TabsTrigger value="browse">Browse Files</TabsTrigger>
            <TabsTrigger value="upload">Upload Files</TabsTrigger>
          </TabsList>
          <TabsContent value="browse">
            <form onSubmit={handleSearch} className="mb-6">
              <div className="flex gap-2">
                <Input
                  type="search"
                  placeholder="Search files..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="max-w-sm"
                />
                <Button type="submit">Search</Button>
              </div>
            </form>
            <MediaGrid
              searchQuery={searchQuery}
              page={page}
              itemsPerPage={ITEMS_PER_PAGE}
              onSelectFile={setSelectedFile}
            />
            <div className="mt-6 text-center">
              <Button onClick={handleLoadMore}>Load More</Button>
            </div>
          </TabsContent>
          <TabsContent value="upload">
            <FileUploader />
          </TabsContent>
        </Tabs>
      </div>
      {selectedFile && (
        <MediaSidebar file={selectedFile} onClose={() => setSelectedFile(null)} />
      )}
    </div>
  )
}

