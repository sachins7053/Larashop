<?php 

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\ProductCat;
use App\Models\Slider;

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
            if ($name === 'Products') {
                $parsedContent[] = $this->renderProducts($attributes);
            } elseif ($name === 'Categories') {
                $parsedContent[] = $this->renderCategories($attributes);
            } elseif ($name === 'Image') {
                $parsedContent[] = $this->renderImage($attributes);
            }  elseif ($name === 'Slider') {
                $parsedContent[] = $this->renderSlider($attributes);
            }  elseif ($name === 'Banner') {
                $parsedContent[] = $this->renderBanner1($attributes);
            }  elseif ($name === 'Banner2') {
                $parsedContent[] = $this->renderBanner2($attributes);
            }  elseif ($name === 'Banner3') {
                $parsedContent[] = $this->renderBanner3($attributes);
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
    private function renderCategories($attributes)
    {
        // Default to 5 products if no limit is provided
        $limit = $attributes['limit'] ?? 5;
        $categoryIds = $attributes['id'] ?? null;
        $title = $attributes['title'] ?? 'Featured Categories';

        // Query the products (you can modify this query to filter by category or other parameters)
        $query = ProductCat::query();
        
        if (!empty($categoryIds)) {
            // Split the string into an array and trim whitespace
            $idsArray = array_map('trim', explode(',', $categoryIds));
            
            // Only apply the whereIn clause if there are valid IDs
            if (count($idsArray) > 0) {
                $query->whereIn('id', $idsArray);
            }
        }

        // Fetch the products with the specified limit
        $category = $query->limit($limit)->get();

        // Return the structured response for products
        return [
            'title' => $title,
            'type' => 'categories',
            'categories' => $category
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
            'content' => "<img class=\"rounded \" src=\"{$src}\" alt=\"{$alt}\" />"
        ];
    }
    
    private function renderBanner1($attributes)
    {   
        // Get the image source and alt text from the attributes
        $src = $attributes['src'] ?? '';
        $link = $attributes['link'] ?? '';


        // Return the rendered image HTML as a string
        return [
            'type' => 'Banner',
            'banner' => "<a class=\"group\" href=\"{$link}\" ><img class=\"rounded \" src=\"{$src}\" /></a>"
        ];
    }
    private function renderBanner2($attributes)
    {
        // Get the image source and alt text from the attributes
        $src1 = $attributes['src1'] ?? '';
        $src2 = $attributes['src2'] ?? '';
        $link1 = $attributes['link1'] ?? '';
        $link2 = $attributes['link2'] ?? '';

        // Return the rendered image HTML as a string
        return [
            'type' => 'image',
            'content' => "<div class='flex flex-col md:flex-row gap-5'><a class=\"group\" href=\"{$link1}\"><img class=\"rounded \" src=\"{$src1}\" /></a><a class=\"group\" href=\"{$link2}\"><img class=\"rounded \" src=\"{$src2}\" /></div>"
        ];
    }
    private function renderBanner3($attributes)
    {
        // Get the image source and alt text from the attributes
        $src1 = $attributes['src1'] ?? '';
        $src2 = $attributes['src2'] ?? '';
        $src3 = $attributes['src3'] ?? '';
        $link1 = $attributes['link1'] ?? '';
        $link2 = $attributes['link2'] ?? '';
        $link3 = $attributes['link3'] ?? '';

        // Return the rendered image HTML as a string
        return [
            'type' => 'image',
            'content' => "<div class='flex flex-col md:flex-row gap-5'><a class=\"group\" href=\"{$link1}\"><img class=\"rounded \" src=\"{$src1}\" /></a><a class=\"group\" href=\"{$link2}\"><img class=\"rounded \" src=\"{$src2}\" /></a><a class=\"group\" href=\"{$link3}\"><img class=\"rounded \" src=\"{$src3}\" /></div>"
        ];
    }

    private function renderSlider($attributes)
    {

        // Query the products (you can modify this query to filter by category or other parameters)
        $slider = Slider::where('type', $attributes['type'])->get();

        // Return the structured response for products
        return [
            'type' => 'slider',
            'slider' => $slider
        ];
    }
}
