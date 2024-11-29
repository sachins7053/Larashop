import { useState, FormEventHandler } from 'react'
import Authenticatedlayout from '@/Layouts/AuthenticatedLayout'
import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import { CategorySelector } from '@/components/BulkUpload/CategorySelector'
import { FileUpload } from '@/components/BulkUpload/FileUpload'
import { ImageZipUpload } from '@/components/BulkUpload/ZipImageUpload'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useForm, Link } from '@inertiajs/react'
import { toast } from '@/hooks/use-toast'
import Template from '@/components/BulkUpload/Template'
import InputError from '@/components/InputError'

interface FilesType {
  type : string| undefined | null
}

export default function AdminBulkUpload() {
  const [step, setStep] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState<string[]>([])
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [selectedZipFile, setSelectedZipFile] = useState<File | null>(null)
  const [isStepFulfilled, setIsStepFulfilled] = useState(false)
  const [template, setTemplate] = useState(false)
  
  let file : FilesType = {
    type: null
  }
  const { data, setData, post, processing, errors, reset } = useForm({
    category : selectedCategory,
    file : '',
    zip_file : '',
  
  });
  

  const handleCategorySelect = (category: string[]) => {
    setSelectedCategory(category)
    setTemplate(true)
    setIsStepFulfilled(true)
  }

  // const handleFileSelect = (file: File) => {
  //   setData(file)
  //   setIsStepFulfilled(true)
  // }

  const handleZipFileSelect = (file: File) => {
    
    setSelectedZipFile(file)
    setIsStepFulfilled(true)
  }

  const handleUpload :FormEventHandler = (e) => {
    setStep(4)
    setIsStepFulfilled(false)
    e.preventDefault()


        post(route('bulkproduct.add'), {
      onFinish: () => {
        reset();
        toast({
          variant:'success',
          title: 'Bulk Upload Successful',
          description: 'Your files have been uploaded successfully',
        })
      },

      
    });
    console.log('selected Category: ', selectedCategory)
    console.log('Product file uploaded:', data?.file)
    console.log('Image zip file uploaded:', data?.zip_file)
  }

  const handleBack = () => {
    setStep((prevStep) => prevStep - 1)
    setIsStepFulfilled(true)
  }

  const handleNext :FormEventHandler = (e) => {
    if (step < 3) {
      setStep((prevStep) => prevStep + 1)
      setIsStepFulfilled(false)
    } else if (step === 3) {
      handleUpload(e)
    }
  }



  return (
    <Authenticatedlayout>
        <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-amber-100 p-8">
          <Card className="max-w-4xl mx-auto">
            <CardContent className="p-6">
              <h1 className="text-3xl font-bold text-center mb-8">Bulk Product Upload</h1>
              <InputError message={errors.file} className="mb-4" />
              <div className="flex justify-center mb-8">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center">
                    <motion.div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        step >= i ? 'bg-emerald-600 text-white' : 'bg-gray-200'
                      }`}
                      initial={{ scale: 0.8 }}
                      animate={{ scale: step === i ? 1.1 : 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {i}
                    </motion.div>
                    {i < 4 && <ChevronRight className="mx-2 text-gray-400" />}
                  </div>
                ))}
              </div>
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-xl font-semibold mb-4">Select Category</h2>
                  <CategorySelector onSelect={handleCategorySelect} />
                  {template === true && (
                    <Template  />
                  )}
                </motion.div>
              )}
              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-xl font-semibold mb-4">Upload Product File</h2>
                  <FileUpload setData={setData} />
                </motion.div>
              )}
              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-xl font-semibold mb-4">Upload Image Zip File</h2>
                  <ImageZipUpload setData={setData} />
                </motion.div>
              )}
              {step === 4 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-xl font-semibold mb-4">Upload Complete</h2>
                  <p className="text-center text-green-600 mb-4">
                    Your files have been successfully uploaded for the category:
                    <br />
                    <span className="font-semibold">{selectedCategory.join(' > ')}</span>
                  </p>
                  <Button onClick={() => setStep(1)} className="w-full">
                    Upload Another Set of Files
                  </Button>
                </motion.div>
              )}
              {step < 4 && (
                <div className="flex justify-between mt-6">
                  <Button
                    variant="outline"
                    onClick={handleBack}
                    disabled={step === 1}
                  >
                    Back
                  </Button>
                  <Button
                    onClick={handleNext}
                    disabled={processing? processing : false} 
                  >
                    {step === 3 ? 'Upload' : 'Next'}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
    </Authenticatedlayout>
  )
}

