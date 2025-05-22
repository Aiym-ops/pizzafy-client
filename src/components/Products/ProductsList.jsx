import { useEffect, useState, } from "react";
import ProductItem from "./ProductItem";
import { a } from "../../services/axiosInstance";
function ProductsList() {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const res = await a.get('/products');
                setProducts(res.data);
            } catch (error) {
                console.error("Error: ", error);
            }
        }
        fetchProducts();
    }, []);
    return (
        <div class="products-list">
             {products.map((product) => (
                <ProductItem key={product.id} product={product} />
            ))}
        </div>

    );
}

export default ProductsList;