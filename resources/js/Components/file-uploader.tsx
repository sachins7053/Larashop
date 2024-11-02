'use client'

import React, { useState, useCallback, useEffect } from 'react'
import { Button } from "@/Components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/Components/ui/dialog"
import { Input } from "@/Components/ui/input"
import { Progress } from "@/Components/ui/progress"
import { ScrollArea } from "@/Components/ui/scroll-area"
import { Image, Upload, X } from 'lucide-react'
import { usePage } from '@inertiajs/react'
import axios from 'axios';

interface UploadedImage {
  id: number
  name: string
  url: string
}

interface FileUploaderProps {
  onImageSelect: (imageUrl: string | null) => void
  selectedImage: string | null
}

export default function FileUploader({ onImageSelect, selectedImage }: FileUploaderProps) {
  const { props } = usePage();
  const [images, setImages] = useState<UploadedImage[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)

  useEffect(() => {
    // Fetch previously uploaded images from the database
    const fetchImages = async () => {
      try {
        const response = await axios.get('/api/files')
        setImages(response.data)
      } catch (error) {
        console.error('Failed to load images:', error)
      }
    }
    fetchImages()
  }, [])

  const handleImageUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = event.target.files;
    if (uploadedFiles && uploadedFiles.length > 0) {
      const file = uploadedFiles[0];
      const formData = new FormData();
      formData.append('file', file);
  
      try {
        setIsUploading(true);
        const response = await axios.post('/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (progressEvent) => {
            if (progressEvent.total) {
              const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
              setUploadProgress(progress);
            }
          },
        });
        
        const imageUrl = response.data.url;
        const newImage: UploadedImage = {
          id: response.data.id, // Assuming the response includes the new image ID
          name: file.name,
          url: imageUrl,
        };
        setImages((prevImages) => [...prevImages, newImage]);
        onImageSelect(imageUrl);
        setIsOpen(false);
      } catch (error) {
        console.error('Upload failed:', error);
      } finally {
        setIsUploading(false);
        setUploadProgress(0);
      }
    }
  }, [onImageSelect]);

  const handleSelectImage = useCallback((image: UploadedImage) => {
    onImageSelect(image.url)
    setIsOpen(false)
  }, [onImageSelect])

  const handleRemoveImage = useCallback(() => {
    onImageSelect(null)
  }, [onImageSelect])

  return (
    <div className="space-y-4">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-[300px] h-[200px] border-dashed">
            {selectedImage ? (
              <div className="relative w-full h-full">
                <img 
                  src={selectedImage} 
                  alt="Selected image" 
                  className="object-cover w-full h-full"
                />
                <Button 
                  variant="destructive" 
                  size="icon"
                  className="absolute top-2 right-2"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleRemoveImage()
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center">
                <Image className="w-8 h-8 mb-2" />
                <span>Select Image</span>
              </div>
            )}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Select or Upload Image</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <Button onClick={() => document.getElementById('file-upload')?.click()} disabled={isUploading}>
                <Upload className="w-4 h-4 mr-2" />
                Upload Image
              </Button>
              <Input 
                id="file-upload"
                type="file" 
                onChange={handleImageUpload} 
                className="hidden"
                accept="image/*"
                disabled={isUploading}
              />
            </div>
            {isUploading && (
              <div className="space-y-2">
                <Progress value={uploadProgress} className="w-full" />
                <p className="text-sm text-center">{Math.round(uploadProgress)}% uploaded</p>
              </div>
            )}
            <ScrollArea className="h-[300px] w-full rounded-md border p-4">
              <div className="grid grid-cols-2 gap-4">
                {images.map((image) => (
                  <div 
                    key={image.id} 
                    className="cursor-pointer relative group"
                    onClick={() => handleSelectImage(image)}
                  >
                    <img 
                      src={image.url} 
                      alt={image.name} 
                      className="w-full h-32 object-cover rounded-md"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-white text-sm">Select</span>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
