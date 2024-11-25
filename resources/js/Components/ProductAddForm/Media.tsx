import { Label } from "@/components/ui/label"
import { Card, CardContent } from "../ui/card"
import FileUploader from "../file-uploader"
import { useEffect, useState } from "react"

export function Media({data, setData} :any) {
  const [mainImage, setMainImage] = useState<string | null>(null)
  const [galleryImages, setGalleryImages] = useState<string[]>([])

  
  useEffect(() => {
    
    const images = mainImage ? [mainImage, ...galleryImages] : [...galleryImages];
    setData('images', images)
  }, [mainImage, galleryImages, setData])

  return (

                    <Card>
                        <CardContent className="pt-6">
                        <h2 className="text-xl font-semibold mb-4">Product Images</h2>
                        <div className="space-y-4">
                            <div>
                            <Label htmlFor="mainImage">Main Product Image</Label>
                            <div className="mt-2">
                                
                                <FileUploader 
                                        onImageSelect={(imageUrl: any) => setMainImage( imageUrl )}
                                        selectedImages={mainImage}
                                        multiple={false} // Pass `multiple={false}` for single image
                                    />
                            </div>
                            </div>

                            <div>
                            <Label htmlFor="galleryImages">Gallery Images</Label>
                            <div className="mt-2">
                                
                                <FileUploader 
                                        onImageSelect={(imageUrl: any) => setGalleryImages( imageUrl )}
                                        selectedImages={galleryImages}
                                        multiple={true} // Pass `multiple={false}` for single image
                                    />
                            </div>
                           
                            </div>
                        </div>
                        </CardContent>
                    </Card>

    // <div className="space-y-4">
    //   <div>
    //     <Label htmlFor="images">Images</Label>
    //     <Input id="images" type="file" multiple />
    //   </div>
    //   <div>
    //     <Label htmlFor="video_media">Video</Label>
    //     <Input id="video_media" type="file" accept="video/*" />
    //   </div>
    //   <div>
    //     <Label htmlFor="image">Main Image</Label>
    //     <Input id="image" type="file" accept="image/*" />
    //   </div>
    // </div>
  )
}

