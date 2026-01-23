import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import backendClient from "../../src/api/backendClient";
import './Shop.css';

export default function Shop() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Categories with static text
    const categories = [
        { name: "Animal Figures", description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugit laboriosam nihil vero adipisci labore..." },
        { name: "Human Figures", description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugit laboriosam nihil vero adipisci labore..." },
        { name: "Tableware", description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugit laboriosam nihil vero adipisci labore..." },
        { name: "Abstract", description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugit laboriosam nihil vero adipisci labore..." },
    ];

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await backendClient.get('/products');
                setProducts(res.data.products);
            } catch (err) {
                console.error(err);
                setError("Failed to load products");
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    if (loading) return <p>Loading products...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="shop-page">
            <div className="shop-header">
                <h1>Shop</h1>
                <p className="opener"><b>Enjoy our shop where Creativity takes shape!If you want to purchase any artwork, please contact the sellers directly!</b> </p>
            </div>

            {categories.map(category => {
                // Filter products for this category
                const categoryProducts = products.filter(p => p.artType === category.name);

                return (
                    <div key={category.name} className="shopFlex">
                        <div className="itemDiv">
                            <h2>{category.name}</h2>
                            <p>{category.description}</p>

                            <div className="category-products">
                                {categoryProducts.length === 0 && <p>No products yet.</p>}
                                {categoryProducts.map(product => (
                                    <img
                                        key={product._id}
                                        src={product.image?.url}
                                        alt={product.productName}
                                        className="shop-product-img"
                                        onClick={() => navigate(`/products/${product._id}`)}
                                        style={{ cursor: "pointer" }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}





// import './Shop.css';
// export default function Shop() {
//     return (
//         <div>
//             <div className="shop">
//                 <h1> Shop</h1>
//                 <p className="opener">
//                     <b>
//                         Enjoy our shop where Creativity takes shape!
//                     </b>

//                 </p>
//             </div>
//             <div className="shopIntro">
//                 <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab veniam culpa ut fuga ullam vero voluptatem rerum cumque, praesentium aliquam ex officia quas reprehenderit blanditiis maiores, pariatur nisi laborum! Et.</p>

//             </div>

//             <div className="shopFlex">
//                 <div className="itemDiv">
//                     <h2>Animal Figures</h2>
//                     <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugit laboriosam nihil vero adipisci labore, iure quidem blanditiis, molestiae eum, quo obcaecati omnis sit voluptas tempora odit! Reprehenderit, tempora? Amet, nesciunt!</p>
//                 </div>
//             </div>

//             <div className="shopFlex">
//                 <div className="itemDiv">
//                     <h2>Human Figures</h2>
//                     <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugit laboriosam nihil vero adipisci labore, iure quidem blanditiis, molestiae eum, quo obcaecati omnis sit voluptas tempora odit! Reprehenderit, tempora? Amet, nesciunt!</p>
//                 </div>
//             </div>
//             <div className="shopFlex">
//                 <div className="itemDiv">
//                     <h2>Tableware</h2>
//                     <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugit laboriosam nihil vero adipisci labore, iure quidem blanditiis, molestiae eum, quo obcaecati omnis sit voluptas tempora odit! Reprehenderit, tempora? Amet, nesciunt!</p>
//                 </div>
//             </div>
//             <div className="shopFlex">
//                 <div className="itemDiv">
//                     <h2>Abstract</h2>
//                     <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugit laboriosam nihil vero adipisci labore, iure quidem blanditiis, molestiae eum, quo obcaecati omnis sit voluptas tempora odit! Reprehenderit, tempora? Amet, nesciunt!</p>
//                 </div>
//             </div>
//         </div>
//     )
// }