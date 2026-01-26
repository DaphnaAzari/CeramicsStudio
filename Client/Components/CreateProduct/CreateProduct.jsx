import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../src/context/AuthContext.jsx";
import "./CreateProduct.css";

export default function CreateProduct() {
    const navigate = useNavigate();
    const { token, user } = useContext(AuthContext) || {};

    const [productName, setProductName] = useState("");
    const [price, setPrice] = useState("");
    const [artType, setArtType] = useState("");
    const [imageFile, setImageFile] = useState(null);

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleImageChange = (e) => {
        setImageFile(e.target.files?.[0] ?? null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!imageFile) {
            setError("Please select an image file.");
            return;
        }

        const formData = new FormData();
        formData.append("productName", productName);
        formData.append("price", price);
        formData.append("artType", artType);
        formData.append("imageFile", imageFile);

        try {
            setLoading(true);

            const res = await fetch("http://localhost:8080/products", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            if (!res.ok) {
                const json = await res.json().catch(() => null);
                throw new Error(json?.message || `Error ${res.status}`);
            }

            const created = await res.json();
            navigate(`/products/${created._id}`);
        } catch (err) {
            console.error("Create product error:", err);
            setError(err.message || "Failed to create product");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-form create-product">
            <h1>Add New Product</h1>

            <form onSubmit={handleSubmit}>

                <div className="form-group">
                    <label>Product Name:</label>
                    <input
                        type="text"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label>Price:</label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label>Art Type:</label>
                    <select
                        value={artType}
                        onChange={(e) => setArtType(e.target.value)}
                    >
                        <option value="">Select one</option>
                        <option value="Animal Figures">Animal Figures</option>
                        <option value="Human Figures">Human Figures</option>
                        <option value="Homeware">Homeware</option>
                        <option value="Abstract">Abstract</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Product Image:</label>
                    <input type="file" accept="image/*" onChange={handleImageChange} />
                </div>

                {error && <p className="error">{error}</p>}

                <button className="btn-submit" type="submit">
                    {loading ? "Creating..." : "Create Product"}
                </button>

            </form>
        </div>
    );
}