import React, { useState, useRef } from 'react'
import { Star, Upload, X } from 'lucide-react'
import { useForm } from '@inertiajs/react';
import { Button } from '../ui/button';

interface ImagePreview {
  file: File;
  preview: string;
}

export function ReviewForm({productId}:any) {
  const [rating, setRating] = useState(0)
  const [title, setTitle] = useState('')
  const [review, setReview] = useState('')
  const [images, setImages] = useState<ImagePreview[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const { data, setData ,post , processing, errors, reset } = useForm({

    title: title,
    rating: rating,
    review: review,
    images: [] as File[],
    productId: productId

  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    post(route('submit.review'),{
        onError: () => {
          
        console.log('Submitted:', { rating, title, review, images: images.map(img => img.file) })
        },
        onSuccess: () => {

          reset();
          console.log('data', data);
        }
    });
    console.log(errors)
    
    setRating(0)
    setTitle('')
    setReview('')
    setImages([])
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files) {
      setData('images', Array.from(files))
      const newImages = Array.from(files).map(file => ({
        file,
        preview: URL.createObjectURL(file)
        
      }))
      setImages(prevImages => [...prevImages, ...newImages])
      
    }
  }

  const removeImage = (index: number) => {
    setImages(prevImages => {
      const newImages = [...prevImages]
      URL.revokeObjectURL(newImages[index].preview)
      newImages.splice(index, 1)
      return newImages
    })
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Leave a Review</h2>
     
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setData('rating',star)}
                className="focus:outline-none"
                aria-label={`Rate ${star} stars`}
              >
                <Star
                  className={`h-6 w-6 ${
                    data.rating >= star ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Review Title
          </label>
          <input
            type="text"
            id="title"
            value={data.title}
            onChange={(e) => setData('title',e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder="Give your review a title"
          />
        </div>
        <div>
          <label htmlFor="review" className="block text-sm font-medium text-gray-700 mb-1">
            Review
          </label>
          <textarea
            id="review"
            value={data.review}
            onChange={(e) => setData('review',e.target.value)}
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder="Tell us about your experience..."
          ></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Upload Images (optional)
          </label>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/*"
            multiple
            className="hidden"
          />
          <div 
            onClick={triggerFileInput}
            className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md cursor-pointer hover:border-indigo-400 transition-colors"
          >
            <div className="space-y-1 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                >
                  <span>Upload files</span>
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB each</p>
            </div>
          </div>
          {images.length > 0 && (
            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
              {images.map((image, index) => (
                <div key={index} className="relative group">
                  <img 
                    src={image.preview} 
                    alt={`Preview ${index + 1}`} 
                    className="w-full h-24 object-cover rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 transform translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label={`Remove image ${index + 1}`}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        <Button
        disabled={processing}
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Submit Review
        </Button>
      </form>
    </div>
  )
}

