import { useEffect, useState } from "react";

type Product = {
    id: number;
    name: string;
    sku: string;
    description: string;
    price: number;
    quantityInStock: number;
    categoryId: number;
    createdAt: string;
};

function App() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        fetch("https://localhost:7290/api/products")
            .then(response => response.json())
            .then(data => setProducts(data));
    }, []);

    return (
        <div>
            <h1>StockHQ</h1>

            {products.map(product => (
                <div key={product.id}>
                    <h2>{product.name}</h2>
                    <p>SKU: {product.sku}</p>
                    <p>Price: ${product.price}</p>
                    <p>Stock: {product.quantityInStock}</p>
                </div>
            ))}
        </div>
    );
}

export default App;