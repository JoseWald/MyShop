import axios from 'axios';
import { useState, useEffect } from "react";

export default function Sale() {
    const [formData, setFormData] = useState({
        customer: '',
        date: new Date().toISOString().split('T')[0],
    });

    const [products, setProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);

    const getProdList = async () => {
        try {
            const res = await axios.get("http://localhost:8000/prod/prodList");
            setProducts(res.data.message);
        } catch (err) {
            console.error(err.response?.data.message);
        }
    }

    useEffect(() => {
        getProdList();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleAddProduct = (product, quantity) => {
        const productTotal = product.price * quantity;
        setSelectedProducts(prev => [...prev, { ...product, quantity, total: productTotal }]);
        setTotalAmount(prev => prev + productTotal);
    };

    const handleRemoveProduct = (productName) => {
        setSelectedProducts(prev => {
            const updatedProducts = prev.filter(p => p.name !== productName);
            const removedProduct = prev.find(p => p.name === productName);
            setTotalAmount(prev => prev - (removedProduct.price * removedProduct.quantity));
            return updatedProducts;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:8000/sell", {
                ...formData,
                products: selectedProducts,
                totalAmount
            });
            alert(res.data.message);
            setSelectedProducts([]);
            setTotalAmount(0);
            setFormData({
                customer: '',
                date: new Date().toISOString().split('T')[0],
            });
        } catch (err) {
            console.error(err.response?.data.message);
        }
    };

    return (
        <>
            <div className="row mt-5">
                <div className="col-md-5 col-lg-6">
                    <h1 className="m-2">Products</h1>
                    <div className="row">
                        {products.map((product) => (
                            <div className="col-md-6 col-lg-3 m-2" key={product.name}>
                                <div className="card shadow">
                                    <div className="card-header bg-success text-light">{product.name}</div>
                                    <div className="card-body">
                                        <h5>Price: {product.price} Ar</h5>
                                        <h5>Quantity: {product.quantity}</h5>
                                        <div className="input-group">
                                            <button
                                                className="btn btn-primary"
                                                onClick={() => handleAddProduct(product, 1)}
                                            >
                                                Add
                                            </button>
                                            <input
                                                type="number"
                                                className="form-control"
                                                min="1"
                                                onChange={(e) => handleAddProduct(product, parseInt(e.target.value))}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <form onSubmit={handleSubmit} className="col-md-6 container">
                    <div className="mx-2 w-100 p-3">
                        <div className="row w-75 mx-auto p-3 border rounded shadow my-4">
                            <div className="col-md-6">
                                <label htmlFor="customer">Customer:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="customer"
                                    name="customer"
                                    value={formData.customer}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="date">Date</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    id="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <h1 className="m-2">Products added</h1>
                        <table className="table shadow">
                            <thead>
                                <tr>
                                    <td className="text-center" colSpan="2">
                                        <h3>Total: {totalAmount} Ar</h3>
                                    </td>
                                    <td colSpan="2">
                                        <button className="btn btn-success w-100" type="submit">Sale</button>
                                    </td>
                                </tr>
                                <tr>
                                    <th className="text-center py-2">Name</th>
                                    <th className="text-center py-2">Quantity</th>
                                    <th className="text-center py-2">Price</th>
                                    <th className="text-center py-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {selectedProducts.map((prod) => (
                                    <tr key={prod.name}>
                                        <td className="text-center py-2">{prod.name}</td>
                                        <td className="text-center py-2">{prod.quantity}</td>
                                        <td className="text-center py-2">{prod.total} Ar</td>
                                        <td className="text-center py-2">
                                            <button
                                                className="btn btn-warning text-light"
                                                onClick={() => handleRemoveProduct(prod.name)}
                                            >
                                                Undo
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </form>
            </div>
        </>
    );
}
