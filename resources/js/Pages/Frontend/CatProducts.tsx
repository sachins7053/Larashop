import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { Link } from '@inertiajs/react';
import Guest from '@/Layouts/GuestLayout';
import { ProductGrid } from '@/components/product-grid';
import { ProductType } from '@/types'
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger, } from "@/components/ui/sheet"
import { Label } from '@/components/ui/label';
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from "@/components/ui/slider"
import { Input } from '@/components/ui/input';
  

interface Category {
    id: number;
    name: string;
}

interface Attribute {
    attribute_id: number;
    attribute_name: string;
    values: { value_id: number; value: string }[];
}

interface Props {
    title: any;
    products: ProductType[];
    categories: Category[];
    attributes: Attribute[];
    filters: {
        category?: string;
        price_min?: number;
        price_max?: number;
        rating?: string;
        attributes?: Record<number, number[]>;
    };
    pagination: {
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    min_price: number;
    max_price: number;
}

const SearchResults: React.FC<Props> = ({ title, products, categories, attributes, filters,min_price, max_price , pagination }) => {
    const [category, setCategory] = useState(filters.category || '');
    const [priceMin, setPriceMin] = useState(filters.price_min || '');
    const [priceMax, setPriceMax] = useState(filters.price_max || '');
    const [rating, setRating] = useState(filters.rating || ''); 
    const [priceRange, setPriceRange] = useState<number[]>([min_price, max_price])
    const [selectedAttributes, setSelectedAttributes] = useState<Record<number, number[]>>(filters.attributes || {});
    // console.log(products, "categories", categories, "attributes", attributes, "filters", filters)
    const toggleAttribute = (attributeId: number, valueId: number) => {
        setSelectedAttributes((prev) => ({
            ...prev,
            [attributeId]: prev[attributeId]?.includes(valueId)
                ? prev[attributeId].filter((id) => id !== valueId)
                : [...(prev[attributeId] || []), valueId],
        }));
    };
    // console.log(title)
    console.log(min_price, max_price ,'filters' , priceMin, priceMax)

    const handlePageChange = (page: number) => {
        // Flatten selectedAttributes for query string compatibility
        const attributesQuery: Record<string, number[]> = {};
        Object.keys(selectedAttributes).forEach((attributeId) => {
            attributesQuery[`attributes[${attributeId}]`] = selectedAttributes[Number(attributeId)];
        });
    
        // Merge filters and send the request
        Inertia.get('/search', {
            category,
            price_min: priceRange[0],
            price_max: priceRange[1],
            rating,
            ...attributesQuery,
            page:  page 
        });
    };

    const handleToggleWishlist = (product: any) => {
        // Implement wishlist toggle logic
        console.log('Toggling wishlist:', product)
      }

      const handlePriceRangeChange = (newRange: number[]) => {
        setPriceRange([newRange[0], newRange[1]]);
    };

    const handlePriceInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const newPrice = +e.target.value;
        setPriceRange((prevRange) => {
          const updatedRange = [...prevRange];
          updatedRange[index] = newPrice;
          return updatedRange;
        });
      };

    return (
        <Guest>
            <div className="relative w-full mx-auto max-w-2xl px-4 lg:max-w-8xl">
                <div>
                 <div className="flex justify-between">
                <h2 className="text-2xl font-bold mb-6"> Showing Products From {title}</h2>
                    <Sheet>
                        <SheetTrigger><Button size='lg' variant='outline' >Filter </Button></SheetTrigger>
                            <SheetContent className='overflow-y-auto'>
                                <SheetHeader>
                                <SheetTitle>Filter</SheetTitle>                              
                                </SheetHeader>
                                <div className=' space-y-10'>
                                    <div>
                                        <Label className='text-lg'>Filter by Price </Label>
                                        <Slider className='bg-black' onValueChange={handlePriceRangeChange} value={priceRange} min={min_price} max={max_price} step={50} />
                                        <div className='flex gap-2 mt-2 justify-between'>
                                            <Label htmlFor='minprice' className='py-1'>
                                            <Input id="minprice" onChange={(e) => handlePriceInputChange(e, 0)} type="number" value={priceRange[0]}/>
                                            Min Price
                                            </Label>
                                            <Label htmlFor='maxprice' className='py-1'>
                                            <Input id="maxprice" onChange={(e) => handlePriceInputChange(e, 1)} type="number" value={priceRange[1]}/>
                                            Max Price
                                            </Label>
                                           
                                        </div>
                                    </div>
                                    <div>
                                        <Label className='text-lg'>Filter by Category </Label>
                                            
                                            <Select defaultValue={category} onValueChange={(e:any) => e.target.value}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="All" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {categories?.map((category) => (
                                                    <SelectItem key={category.id} value={category.id.toString()}>
                                                        {category.name}
                                                    </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        
                                    </div>
                                    <div>
                                    {attributes?.map((attribute) => (
                                        <div className='mb-5' key={attribute.attribute_id}>
                                            <h4 className='text-lg'>Filter By {attribute.attribute_name}</h4>
                                            {attribute.values?.map((value) => (
                                                    <div className='mt-1 space-x-2' key={value.value_id}>
                                                    <Checkbox
                                                        id={`checkbox-${value.value_id}`}
                                                        checked={selectedAttributes[attribute.attribute_id]?.includes(value.value_id) || false}
                                                        onCheckedChange={() => toggleAttribute(attribute.attribute_id, value.value_id)}
                                                    />
                                                    <Label htmlFor={`checkbox-${value.value_id}`} key={value.value_id}>
                                                        {value.value.charAt(0).toUpperCase() + value.value.slice(1)}
                                                    </Label>
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                                </div>
                                <SheetFooter className='justify-start'>
                                    <Button className='hover:bg-slate-800' variant={'dark'} onClick={(e) => {e.preventDefault(); 
                                handlePageChange(1)
                            }}>Apply Filters</Button>
                                </SheetFooter>
                        </SheetContent>
                    </Sheet>

                    </div>   

                
                   
                    <section className="mb-12">
                                  <ProductGrid
                                  products={products}
                                  columns={{ sm: 2, md: 4, lg: 4 }}
                                  onToggleWishlist={handleToggleWishlist}
                                  />
                              </section>
                    <div>
                    <nav className="w-full mx-auto flex justify-center space-x-2">
                        {Array.from({ length: pagination.last_page }, (_, i) => i + 1).map((page) => (
                            <Link
                            key={page}
                            href="#"
                            onClick={(e) => {
                                e.preventDefault(); // Prevent default link behavior
                                handlePageChange(page); // Call the handlePageChange function
                            }}
                            className={page === pagination.current_page ? 'font-bold' : ''}
                            >
                            <Button className="hover:bg-black hover:text-white" variant={page === pagination.current_page ? 'dark' : 'outline'} size="sm">
                                {page}
                            </Button>
                            </Link>
                        ))}
                        </nav>

                    </div>
                </div>
        </div>
        </Guest>
    );
};

export default SearchResults;
