interface Product {
    id: number;
    name: string;
    description: string;
}

interface ShortcodeProductListProps {
    products: Product[];
}

const ShortcodeProductList = ({ products }:ShortcodeProductListProps) => {
    return (
        <div className="product-grid">
            {products.map((product) => (
                <div key={product.id} className="product-card">
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                </div>
            ))}
        </div>
    );
};

export default ShortcodeProductList;
