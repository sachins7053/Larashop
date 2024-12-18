import { useState, useEffect } from 'react';
import axios from 'axios';
import { ProductGrid } from './product-grid';
import { ProductType } from '@/types';
import { ImageSlider, SliderProps } from './image-slider';

interface ShortcodeParserProps {
  content: string;
}

interface Slide {
  id: number;
  image: string;
  title?: string;
  description?: string;
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
        setParsedContent('Error loading content');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [content]);

  // Helper function to render products
  const renderProducts = (products: ProductType[], title: string) => {
    return (
      <ProductGrid
        products={products}
        title={title || 'Featured Products'} // Use the provided title or default to 'Products'
        columns={{ sm: 2, md: 4, lg: 4 }}
      />
    );
  };

  // Helper function to render a slider
  const renderSlider = (slides: Slide[]) => {
    if (slides.length > 0) {
      return <ImageSlider slides={slides} />;
    }
   
  };

  // Loading state while fetching data
  if (loading) {
    return <div>Loading content...</div>;
  }

  // Render errors if any
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

  // Render the parsed content
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

          // If it's not 'products' or 'slider', render the content as HTML
          return (
            <div key={outerIndex} dangerouslySetInnerHTML={{ __html: firstItem?.content || '' }} />
          );
        })
      ) : (
        <div dangerouslySetInnerHTML={{ __html: parsedContent }} />
      )}
    </div>
  );
};

export default ShortcodeParser;
