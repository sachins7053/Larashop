'use client'

import React, { useState, useCallback, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Image, Upload, X } from 'lucide-react'
import { usePage } from '@inertiajs/react'
import axios from 'axios';

interface UploadedImage {
  id: number
  name: string
  url: string
}

interface FileUploaderProps {
  onImageSelect: (images: string[] | string | null) => void // Accept single URL, array, or null
  selectedImages: string[] | string | null // Accept single URL, array, or null
  multiple?: boolean // New prop to control single/multiple mode
}

export default function FileUploader({ onImageSelect, selectedImages, multiple = false }: FileUploaderProps) {
  const { props } = usePage();
  const [images, setImages] = useState<UploadedImage[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)

  useEffect(() => {
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
      const newImages: UploadedImage[] = [];

      for (let i = 0; i < uploadedFiles.length; i++) {
        const file = uploadedFiles[i];
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
            id: response.data.id,
            name: file.name,
            url: imageUrl,
          };
          newImages.push(newImage);
        } catch (error) {
          console.error('Upload failed:', error);
        }
      }

      if (multiple) {
        setImages((prevImages) => [...prevImages, ...newImages]);
        onImageSelect([...(selectedImages as string[]), ...newImages.map((img) => img.url)]);
      } else {
        const [firstImage] = newImages;
        setImages([firstImage]);
        onImageSelect(firstImage.url);
      }

      setIsOpen(false);
      setIsUploading(false);
      setUploadProgress(0);
    }
  }, [onImageSelect, selectedImages, multiple]);

  const handleSelectImage = useCallback((image: UploadedImage) => {
    if (multiple) {
      const updatedImages = [...(selectedImages as string[]), image.url];
      onImageSelect(updatedImages);
    } else {
      onImageSelect(image.url);
    }
    setIsOpen(false);
  }, [onImageSelect, selectedImages, multiple]);

  const handleRemoveImage = useCallback((imageUrl: string | null) => {
    if (multiple) {
      onImageSelect((selectedImages as string[]).filter(img => img !== imageUrl));
    } else {
      onImageSelect(null);
    }
  }, [onImageSelect, selectedImages, multiple]);

  return (
    <div className="space-y-4">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-[300px] h-[200px] border-dashed">
            {selectedImages && Array.isArray(selectedImages) && selectedImages.length > 0 ? (
              <div className="grid grid-cols-2 gap-2">
                {selectedImages.map((imageUrl, index) => (
                  <div key={index} className="relative w-full h-full">
                    <img 
                      src={imageUrl} 
                      alt={`Selected image ${index}`} 
                      className="object-cover w-full h-full"
                    />
                    <Button 
                      variant="destructive" 
                      size="icon"
                      className="absolute top-2 right-2"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleRemoveImage(imageUrl)
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            ) : selectedImages ? (
              <div className="relative w-full h-full">
                <img 
                  src={selectedImages as string} 
                  alt="Selected image" 
                  className="object-cover w-full h-full"
                />
                <Button 
                  variant="destructive" 
                  size="icon"
                  className="absolute top-2 right-2"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleRemoveImage(selectedImages as string)
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center">
                <Image className="w-8 h-8 mb-2" />
                <span>Select Image{multiple && 's'}</span>
              </div>
            )}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Select or Upload Image{multiple && "s"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Button onClick={() => document.getElementById('file-upload')?.click()} disabled={isUploading}>
              <Upload className="w-4 h-4 mr-2" />
              Upload {multiple ? "Images" : "Image"}
            </Button>
            <Input 
              id="file-upload"
              type="file" 
              onChange={handleImageUpload} 
              className="hidden"
              accept="image/*"
              multiple={multiple}
              disabled={isUploading}
            />
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
