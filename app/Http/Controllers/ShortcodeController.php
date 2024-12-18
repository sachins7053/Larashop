<?php 

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;

class ShortcodeController extends Controller
{
    public function parse(Request $request)
    {
        // Get the content from the request
        $content = $request->input('item');
        
        // Initialize an array to store the parsed results
        $parsedContent = [];

        // Match all shortcodes in the content
        preg_match_all('/\[(\w+)(.*?)\]/', $content, $matches, PREG_SET_ORDER);
        
        // Loop through all found shortcodes
        foreach ($matches as $match) {
            $name = $match[1]; // The shortcode name (e.g., "products", "image")
            $attributes = $this->parseAttributes($match[2]); // The attributes inside the shortcode

            // Handle the shortcode based on its name
            if ($name === 'products') {
                $parsedContent[] = $this->renderProducts($attributes);
            } elseif ($name === 'image') {
                $parsedContent[] = $this->renderImage($attributes);
            } else {
                // If the shortcode is unknown, add it as raw content
                $parsedContent[] = [
                    'type' => 'raw',
                    'content' => $match[0] // Include the entire shortcode as-is if unknown
                ];
            }
        }

        // Return the parsed content as a JSON response
        return response()->json(['content' => $parsedContent]);
    }

    private function parseAttributes($attributeString)
    {
        // Parse attributes from the shortcode string (e.g., limit="5" category="electronics")
        $attributes = [];
        preg_match_all('/(\w+)="([^"]+)"/', $attributeString, $matches, PREG_SET_ORDER);

        foreach ($matches as $match) {
            $attributes[$match[1]] = $match[2];
        }

        return $attributes;
    }

    private function renderProducts($attributes)
    {
        // Default to 5 products if no limit is provided
        $limit = $attributes['limit'] ?? 5;
        $category = $attributes['category'] ?? null;
        $title = $attributes['title'] ?? 'Featured Products';

        // Query the products (you can modify this query to filter by category or other parameters)
        $query = Product::query();
        
        // Optionally filter by category if provided
        if ($category) {
            $query->where('category', $category);
        }

        // Fetch the products with the specified limit
        $products = $query->limit($limit)->get();

        // Return the structured response for products
        return [
            'title' => $title,
            'type' => 'products',
            'products' => $products
        ];
    }

    private function renderImage($attributes)
    {
        // Get the image source and alt text from the attributes
        $src = $attributes['src'] ?? '';
        $alt = $attributes['alt'] ?? '';

        // Return the rendered image HTML as a string
        return [
            'type' => 'image',
            'content' => "<img src=\"{$src}\" alt=\"{$alt}\" />"
        ];
    }
}
