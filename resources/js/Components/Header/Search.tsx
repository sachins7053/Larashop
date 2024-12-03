import { FormEventHandler, useEffect, useRef, useState } from 'react'
import { useForm } from '@inertiajs/react'
import { Input } from '../ui/input'
import { Search } from 'lucide-react'

export default function SearchBar() {
    const [searchQuery, setSearchQuery] = useState('')
    const [showSearch, setShowSearch] = useState(false)
    const [searchSuggestions, setSearchSuggestions] = useState<string[]>([])
    const [searchResults, setSearchResults] = useState<string[]>([])
    const searchRef = useRef<HTMLDivElement>(null)

    const { data ,setData, get , processing } = useForm({
        keyword: searchQuery
      });

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
          if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
            setShowSearch(false)
          }
        }
    
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
          document.removeEventListener('mousedown', handleClickOutside)
        }
      }, [])

      useEffect(() => {
        if (searchQuery) {
          // Simulating API call for search suggestions
          const suggestions = ['Sofa', 'Dining Table', 'Bed', 'Wardrobe'].filter(item =>
            item.toLowerCase().includes(searchQuery.toLowerCase())
          )
          console.log(searchQuery);
          setData('keyword', searchQuery);
          setSearchSuggestions(suggestions)
    
          // Simulating API call for search results
          const results = ['Leather Sofa', 'Wooden Dining Table', 'Queen Size Bed', 'Modern Wardrobe'].filter(item =>
            item.toLowerCase().includes(searchQuery.toLowerCase())
          )
          setSearchResults(results)
        } else {
          setSearchSuggestions([])
          setSearchResults([])
        }
      }, [searchQuery])

    

    const handleSearch : FormEventHandler =  (e) =>{
        e.preventDefault()
        console.log(data);

        get(route('search', { keyword: data.keyword } ), {

            onFinish : () => {
                console.log('form submitted');
            }
        }
    
    )
    
    }

  return (
    <div className="relative hidden w-full max-w-md md:block">
    <form className='w-full' onSubmit={handleSearch}>
    <Input
      className="pl-10"
      placeholder="Search"
      type="search"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      onFocus={() => setShowSearch(true)} 
    />
    <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
    </form>
    {showSearch && (searchSuggestions.length > 0 || searchResults.length > 0) && (
      <div className="absolute left-0 z-40 right-0 top-full mt-1 rounded-md border bg-background shadow-lg">
        {searchSuggestions.length > 0 && (
          <div className="p-2">
            <h3 className="mb-1 text-sm font-semibold">Suggestions</h3>
            <ul>
              {searchSuggestions.map((suggestion, index) => (
                <li key={index} className="cursor-pointer p-1 text-sm hover:bg-muted">
                  {suggestion}
                </li>
              ))}
            </ul>
          </div>
        )}
        {searchResults.length > 0 && (
          <div className="p-2">
            <h3 className="mb-1 text-sm font-semibold">Results</h3>
            <ul>
              {searchResults.map((result, index) => (
                <li key={index} className="cursor-pointer p-1 text-sm hover:bg-muted">
                  {result}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    )}
  </div>
  )
}
