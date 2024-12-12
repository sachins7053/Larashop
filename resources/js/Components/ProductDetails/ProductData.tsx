import React from "react";

interface ProductDataProps {
  name: string;
  price: number | string ;
  sale_price: number | null;
  description: string;
  product_type: string;
}

const ProductData: React.FC<ProductDataProps> = ({ name, price, sale_price, description, product_type }) => {
  return (
        
            <div>
            <h1 className="text-2xl font-bold">{name}</h1>
            {sale_price ? (
                <p className="text-xl font-semibold text-green-600">
                ₹{sale_price}{" "}
                <span className="line-through text-gray-500 text-base">MRP ₹{price}</span>
                </p>
            ) : (
                <p className="text-xl font-semibold text-green-600">MRP ₹{price}</p>
            )}
            <p className="text-gray-600">{description}</p>
            </div>


        

    // <div className="product-data">
    //   <h1>{name}</h1>
    //   <p>Price: ${price.toFixed(2)}</p>
    //   <p>{description}</p>
    // </div>
  );
};

export default ProductData;