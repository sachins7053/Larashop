import { useState, useEffect } from 'react';
import axios from 'axios';
import { ProductGrid } from './product-grid';
import { ProductType } from '@/types';
import { ImageSlider, SliderProps } from './image-slider';
import { Link } from '@inertiajs/react';
import { Skeleton } from './ui/skeleton';

interface ShortcodeParserProps {
  content: string;
}

interface Slide {
  id: number;
  image: string;
  title?: string;
  description?: string;
}

interface Categories {
  id: number;
  name: string;
  image: string;
  slug: string;
}

const ShortcodeParser = ({ content }: ShortcodeParserProps) => {
  const [parsedContent, setParsedContent] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    const splitString = content.split(/(?<=])(?=\[)/); // Split the content into shortcodes

    // Function to make a POST request
    const parseContent = async (item: string) => {
      try {
        const response = await axios.post('/shortcodes/parse', { item });
        return response.data.content; // Return the parsed content from the API
      } catch (error) {
        setErrors(prev => [...prev, `Failed to parse: ${item}`]);
        return null; // Return null if parsing fails
      }
    };

    // Map over split strings and make parallel requests
    const fetchData = async () => {
      try {
        setLoading(true);
        const results = await Promise.all(splitString.map(parseContent));

        // Filter out null results (in case of errors)
        const validResults = results.filter((result) => result !== null);

        if (validResults.length > 0) {
          setParsedContent(validResults); // Store the parsed content in the state
          console.log(validResults)
        } else {
          setParsedContent('No valid content found.');
        }
      } catch (error) {
        console.error('Error during batch request:', error);
        // setParsedContent('Error loading content');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [content]);

  // Helper function to render products
  const renderProducts = (products: ProductType[], title: string) => {
    return (
        <div className='my-10'>
              <ProductGrid
                products={products}
                title={title || 'Featured Products'} // Use the provided title or default to 'Products'
                columns={{ sm: 2, md: 4, lg: 4 }}
              />
          </div>
    );
  };

  // Helper function to render a slider
  const renderSlider = (slides: Slide[]) => {
    if (slides.length > 0) {
      return <ImageSlider slides={slides} />;
    }
   
  };

  const renderCategories = (categories: Categories[]) => {
    if (categories.length > 0) {
      return (
        <div className=" max-w-5xl place-content-center justify-evenly flex flex-wrap my-10 gap-5">
            {categories.map((cat) => {
              return (
                <div key={cat.id} className="">
                  <Link className='text-center' href={cat.slug}>
                    <img className='rounded-full max-w-52' src={cat.image}></img>
                    <h2 className="text-lg hover:text-amber-500 font-bold">{cat.name}</h2>
                  </Link>
                </div>
                
              );
            }  ) }      
        </div>
      )
    }
   
  };
 

  // Loading state while fetching data
  if (loading) {
    // return <div className='w-full h-[400px] rounded-lg bg-slate-100 animate-pulse'></div>;
    return (
          <div className='w-full'>
            <Skeleton className="w-full h-[300px] rounded-lg bg-slate-100 animate-pulse" />
            <div className='flex flex-col md:flex-row my-10 gap-10'>
            <Skeleton className="w-full h-[300px] rounded-lg bg-slate-100 animate-pulse" />
            <Skeleton className="w-full h-[300px] rounded-lg bg-slate-100 animate-pulse" />
            <Skeleton className="w-full h-[300px] rounded-lg bg-slate-100 animate-pulse" />
            <Skeleton className="w-full h-[300px] rounded-lg bg-slate-100 animate-pulse" />
            </div>
          </div>
      );
  }
  

  return (
    <div>
      {Array.isArray(parsedContent) && parsedContent.length > 0 ? (
        parsedContent.map((outerItem, outerIndex) => {
          const firstItem = outerItem[0]; // Access the first item of the outer array

          // Handle product shortcodes
          if (firstItem?.type === 'products') {
            return renderProducts(firstItem?.products, firstItem?.title || 'Featured Products');
          }

          // Handle slider shortcodes
          if (firstItem?.type === 'slider') {
            return renderSlider(firstItem?.slider || []);
          }
          if (firstItem?.type === 'categories') {
            return renderCategories(firstItem?.categories || []);
          }
          // Handle slider shortcodes
         
          if (errors.length > 0) {
              return (
                <div style={{ color: 'red' }}>
                  <h3>Errors occurred while parsing content:</h3>
                  <ul>
                    {errors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </div>
              );
            }
          // If it's not 'products' or 'slider', render the content as HTML
          return (
            <div className='my-10' key={outerIndex} dangerouslySetInnerHTML={{ __html: firstItem?.content || '' }} />
          );
        })
      ) : (
        <div className='my-10' dangerouslySetInnerHTML={{ __html: parsedContent }} />
      )}
    </div>
  );
};

export default ShortcodeParser;
