import "./ProductDetails.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(`http://localhost:3000/products/${id}`);
                if (!res.ok) throw new Error("Failed to fetch product");
                const data = await res.json();
                setProduct(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) return <p>Loading product…</p>;
    if (error) return <p>Error: {error}</p>;

    //     return (
    //         <div className="product-details-wrapper">
    //             <div className="product-details-container">
    //                 <div className="product-details-card">


    //                     <h1 className="product-title">{product.productName}</h1>


    //                     <div className="product-image-wrapper">
    //                         <img
    //                             src={product.image?.url}
    //                             alt={product.productName}
    //                             className="product-image"
    //                         />
    //                     </div>

    //                     <div className="product-info-box">
    //                         <p className="product-price"><b>Price:</b> £{product.price}</p>
    //                         <p className="product-art-type"><b>Category:</b> {product.artType}</p>

    //                         <div className="artist-section">
    //                             <div className="artist-image-wrapper">
    //                                 <img
    //                                     src={product.userId?.image?.url}
    //                                     alt={product.userId?.userName}
    //                                     className="artist-profile-image"
    //                                 />
    //                             </div>

    //                             <p className="artist-name"><b>Artist:</b> {product.userId?.userName}</p>
    //                         </div>
    //                     </div>

    //                 </div>
    //             </div>
    //         </div>
    //     );
    // };

    return (
        <div className="product-details-wrapper">
            <div className="product-details-container">
                <h1 className="product-title">{product.productName}</h1>

                <div className="product-main">
                    <img
                        className="product-image"
                        src={product.image?.url}
                        alt={product.productName}
                    />

                    <div className="product-info">
                        <p className="product-price"><strong>Price:</strong> £{product.price}</p>
                        <p className="product-type"><strong>Category:</strong> {product.artType}</p>

                        <div className="artist-box">
                            <img
                                className="artist-img"
                                src={product.userId?.image?.url}
                                alt={product.userId?.userName}
                            />
                            <p className="artist-name"><strong>Artist:</strong> {product.userId?.userName}</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ProductDetails;