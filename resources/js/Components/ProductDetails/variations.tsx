import React, { useState, useEffect } from 'react';
import { ProductVariation } from '@/types';

interface GroupedVariations {
  [attributeName: string]: {
    value: string;
    price: number;
    sale_price: number;
    variation_id: number;
  }[];
}

interface VariationsSelectorProps {
  variations: ProductVariation[];
  setPrice: (price: number) => void;
  setSalePrice: (salePrice: number) => void;
  selectedAttributes: Record<string, string | null>;
  selectedVariation: ProductVariation | null;
  onSelectVariation: (selectedVariation: ProductVariation | null) => void;
  onSelectAttribute: (attributeName: string, value: string) => void;
}

const Variations: React.FC<VariationsSelectorProps> = ({
  variations,
  setPrice,
  setSalePrice,
  selectedAttributes,
  selectedVariation,
  onSelectVariation,
  onSelectAttribute,
}) => {
  const groupedVariations = groupVariations(variations);
  const [isAvailable, setIsAvailable] = useState<boolean>(true);

  // Effect to check availability when selected attributes change
  useEffect(() => {
    // Only update availability when an attribute is selected
    if (Object.keys(selectedAttributes).length > 0) {
      const matchedVariation = variations.find((variation) =>
        variation.attributes.every((attribute) =>
          Object.entries(selectedAttributes).some(([attr, selectedValue]) =>
            attribute.attribute_name === attr && attribute.attribute_value === selectedValue
          )
        )
      );

      const isAvailable = !!matchedVariation;
      setIsAvailable(isAvailable);
    }
  }, [selectedAttributes]); // Trigger when selectedAttributes changes

  // Effect to set price and sale price when a variation is matched
  useEffect(() => {
    const matchedVariation = variations.find((variation) =>
      variation.attributes.every((attribute) =>
        Object.entries(selectedAttributes).some(([attr, selectedValue]) =>
          attribute.attribute_name === attr && attribute.attribute_value === selectedValue
        )
      )
    );

    if (matchedVariation) {
      setPrice(parseFloat(matchedVariation.price));
      setSalePrice(parseFloat(matchedVariation.sale_price));
      onSelectVariation(matchedVariation);
    } else {
      onSelectVariation(null);
    }
  }, [selectedAttributes, variations, setPrice, setSalePrice, onSelectVariation]);

  return (
    <div className="my-10 w-full rounded bg-gray-50 p-4">
      {Object.keys(groupedVariations).map((attributeName) => (
        <div key={attributeName} className="mb-4">
          <h3 className="font-semibold">{`Select ${attributeName}`}</h3>
          <div className="flex gap-2">
            {groupedVariations[attributeName].map((option) => (
              <button
                key={option.variation_id}
                onClick={() => onSelectAttribute(attributeName, option.value)}
                className={`px-4 py-2 rounded ${
                  selectedAttributes[attributeName] === option.value
                    ? 'bg-slate-800 text-white'
                    : 'bg-white'
                }`}
              >
                {option.value}
              </button>
            ))}
          </div>
        </div>
      ))}
      {isAvailable ? (
        selectedVariation ? (
          null
        ) : (
          <p className="text-gray-500 mt-4">Please select all options to see the price.</p>
        )
      ) : (
        <p className="text-red-500 mt-4">Not Available</p>
      )}
    </div>
  );
};

const groupVariations = (variations: ProductVariation[]): GroupedVariations => {
  return variations.reduce<GroupedVariations>((grouped, variation) => {
    variation.attributes.forEach((attribute) => {
      const { attribute_name, attribute_value } = attribute;

      if (!grouped[attribute_name]) {
        grouped[attribute_name] = [];
      }

      grouped[attribute_name].push({
        value: attribute_value,
        price: parseFloat(variation.price),
        sale_price: parseFloat(variation.sale_price),
        variation_id: variation.variation_id,
      });
    });

    return grouped;
  }, {});
};

export default Variations;
