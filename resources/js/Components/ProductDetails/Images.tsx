import {useState} from "react";

interface ProductImagesProps {
  images: string[];
}

const ProductImages: React.FC<ProductImagesProps> = ({ images }) => {
    const [selectedImage, setSelectedImage] = useState(0);
  return (
    <div className="col-span-3">
          <div className="flex sticky top-0 gap-4">
            <div className="flex flex-col gap-4">
              {Array.isArray(images) &&
                images?.map((src, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative h-20 w-20 overflow-hidden rounded-lg border-2 ${
                      selectedImage === index ? "border-primary" : "border-transparent"
                    }`}
                  >
                    <img
                      src={src}
                      alt={`Product ${index + 1}`}
                      className="object-cover"
                    />
                  </button>
                ))}
            </div>
            <div className="relative flex-1 overflow-hidden rounded-lg">
              <img
                src={images?.[selectedImage]}
                alt="Main product"
                className="object-cover shadow-lg rounded-lg"
              />
            </div>
          </div>
        </div>
    // <div className="product-images">
    //   {images.map((image, index) => (
    //     <img
    //       key={index}
    //       src={image}
    //       alt={`Product Image ${index + 1}`}
    //       className="product-image"
    //     />
    //   ))}
    // </div>
  );
};

export default ProductImages;