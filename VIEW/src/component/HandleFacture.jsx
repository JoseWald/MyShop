import axios from 'axios';
import {useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function HandleFacture(props) {
    const [formData, setFormData] = useState({
        givenAmount: '',
        customer: '',
        date: new Date().toISOString().split('T')[0],
    });

    const [error, setError] = useState('');
    const { wishList } = props;
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        const acceptedValue = name === "givenAmount" ? Math.max(0, Number(value)) : value;
        setFormData((prevData) => ({
            ...prevData,
            [name]: acceptedValue,
        }));
    };

    const undo = async (name) => {
        if (window.confirm("Are you sure you want to undo this product?")) {
            try {
                const res = await axios.delete("http://localhost:8000/sell/deleteWish", {
                    data: { name: name }
                });
                console.log('Produit supprimé :', res.data);
                await  props.getWishList();
                await props.getProdList()
            } catch (err) {
                console.log(err.response?.data.message);
                setError(err.response?.data.message);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:8000/sell/sellProduct", {
                customer: formData.customer,
                givenAmount: Number(formData.givenAmount),
            });
            console.log("Vente effectuée :", res.data);

            props.getWishList();

            setFormData({
                givenAmount: '',
                customer: '',
                date: new Date().toISOString().split('T')[0],
            });

            setError('');
            navigate('/recentSale');
         
        } catch (err) {
            console.error(err.response?.data.message);
            setError(err.response?.data.message);
        }
    };

    const totalAmount = wishList.reduce((acc, product) => acc + (product.price * product.quantity), 0);

    return (
        <div className="col-md-6 container">
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
                            readOnly
                            required
                        />
                    </div>
                    <div className="col-md-6 w-100 mt-3">
                        <label htmlFor="givenAmount">Given Amount:</label>
                        <input
                            type="number"
                            className="form-control"
                            id="givenAmount"
                            name="givenAmount"
                            value={formData.givenAmount}
                            onChange={handleChange}
                            min="0"
                            required
                        />
                    </div>
                    {error && (
                        <div className="alert alert-danger mt-3" role="alert">
                            {error}
                        </div>
                    )}
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
                            <button className="btn btn-success w-100" onClick={handleSubmit}>Sale</button>
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
                    {wishList.map((product) => (
                        <tr key={product._id}>
                            <td className="text-center py-2">{product.name}</td>
                            <td className="text-center py-2">{product.quantity}</td>
                            <td className="text-center py-2">{product.price} Ar</td>
                            <td className="text-center py-2">
                                <button className="btn btn-warning text-light" onClick={() => undo(product.name)}>Undo</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
