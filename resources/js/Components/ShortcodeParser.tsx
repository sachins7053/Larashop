import { useState, useEffect } from 'react';
import axios from 'axios';
import { ProductGrid } from './product-grid';
import { ProductType } from '@/types';

interface ShortcodeParserProps {
  content: string;
}

const ShortcodeParser = ({ content }: ShortcodeParserProps) => {
  const [parsedContent, setParsedContent] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [errors, setErrors] = useState<string[]>([]);
  useEffect(() => {
    const splitString = content.split('][');

    // Ensure proper splitting
    splitString[0] = splitString[0] + ']';
    splitString[splitString.length - 1] = '[' + splitString[splitString.length - 1];

    // Function to make a POST request
    const parseContent = async (item: string) => {
      try {
        const response = await axios.post('/shortcodes/parse', { item });
        return response.data.content;
      } catch (error) {
        setErrors(prev => [...prev, `Failed to parse: ${item}`]);
        return null;
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
            console.log(validResults)
          setParsedContent(validResults);
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
  const renderProducts = (products: ProductType[]) => {
    return (
      <ProductGrid
        products={products}
        title={parsedContent?.title || ''}
        columns={{ sm: 2, md: 4, lg: 4 }}
      />
    );
  };

  if (loading) {
    return <div>Loading content...</div>;
  }

  return (
    <div>
      {errors.length > 0 && (
        <div style={{ color: 'red' }}>
          <h3>Errors occurred while parsing content:</h3>
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      {Array.isArray(parsedContent) && parsedContent.some(item => item.type === 'products') ? (
        parsedContent.map((item, index) =>
          item.type === 'products' ? renderProducts(item.products) : <div key={index} dangerouslySetInnerHTML={{ __html: item }} />
        )
      ) : (
        <div dangerouslySetInnerHTML={{ __html: parsedContent }} />
      )}
    </div>
  );
};

export default ShortcodeParser;
