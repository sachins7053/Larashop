import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'


const categories = {
  Electronics: {
    Computers: {
      Laptops: {},
      Desktops: {},
      Tablets: {},
    },
    Smartphones: {
      Android: {},
      iOS: {},
    },
  },
  Clothing: {
    Men: {
      Shirts: {},
      Pants: {},
      Shoes: {},
    },
    Women: {
      Dresses: {},
      Tops: {},
      Shoes: {},
    },
  },
  Books: {
    Fiction: {
      Mystery: {},
      'Science Fiction': {},
      Romance: {},
    },
    'Non-Fiction': {
      Biography: {},
      'Self-Help': {},
      History: {},
    },
  },
}

interface CategorySelectorProps {
  onSelect: (category: string[]) => void
}

export function CategorySelector({ onSelect }: CategorySelectorProps) {
  const [selectedPath, setSelectedPath] = useState<string[]>([])

  const getCurrentLevel = () => {
    let current: any = categories
    for (const category of selectedPath) {
      current = current[category]
    }
    return current
  }

  const handleSelect = (category: string) => {
    const newPath = [...selectedPath, category]
    setSelectedPath(newPath)
    if (Object.keys(getCurrentLevel()[category]).length === 0) {
      onSelect(newPath)
    }
  }

  const handleBack = () => {
    setSelectedPath(selectedPath.slice(0, -1))
  }

  const currentLevel = getCurrentLevel()

  return (
    <div>
      <div className="flex items-center mb-4">
        {selectedPath.map((category, index) => (
          <div key={index} className="flex items-center">
            <span className="text-purple-600 font-semibold">{category}</span>
            {index < selectedPath.length - 1 && <ChevronRight className="mx-2 text-gray-400" />}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {Object.keys(currentLevel).map((category) => (
          <motion.div key={category} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              className="w-full h-20 text-left flex flex-col items-start justify-center p-4"
              onClick={() => handleSelect(category)}
            >
              <span className="font-semibold">{category}</span>
              <span className="text-xs text-gray-500">
                {Object.keys(currentLevel[category]).length} subcategories
              </span>
            </Button>
          </motion.div>
        ))}
      </div>
      {selectedPath.length > 0 && (
        <Button variant="ghost" onClick={handleBack} className="mt-4">
          Change Category
        </Button>
      )}
    </div>
  )
}

