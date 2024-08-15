import axios from "axios";
import { useState } from "react";

export default function AddProduct({getProdList}) {
    const [formData, setFormData] = useState({
        name: '',
        quantity: 0,
        price: 0
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        const validatedValue = name === 'quantity' || name === 'price' ? Math.max(0, Number(value)) : value;

        setFormData((prevData) => ({
            ...prevData,
            [name]: validatedValue
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); 

        try {
            const res=await axios.post("http://localhost:8000/prod/addProd",{
                name:formData.name,
                price:Number(formData.price),
                quantity:Number(formData.quantity)
            })
            console.log("Produit ajouté :", res.formData);
            
            setFormData({
                name: '',
                quantity: 0,
                price: 0
            });

            await getProdList();
        } catch (err) {
     
            setError(err.response?.data.message || 'Une erreur est survenue');
        }
    };

    return (
        <>
            <div className="card shadow-sm bg-light">
                <div className="card-header bg-success text-light">Add a product</div>
                <div className="card-body">
                    <div className="row">
                        <div className="col m-2">Name</div>
                        <div className="col m-2">Quantity</div>
                        <div className="col m-2">Price (Ar)</div>
                        <div className="col m-2"></div>
                    </div>
                    <form onSubmit={handleSubmit} className="row">
                        <input
                            type="text"
                            className="form-control m-2 col"
                            name='name'
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="number"
                            className="form-control m-2 col"
                            name='quantity'
                            value={formData.quantity}
                            onChange={handleChange}
                            min={0}
                            required
                        />
                        <input
                            type="number"
                            className="form-control m-2 col"
                            name='price'
                            value={formData.price}
                            onChange={handleChange}
                            min={0}
                            required
                        />
                        <button type="submit" className="btn btn-primary w-100 m-2 col">Add+</button>
                    </form>
                    {error && (
                        <div className="alert alert-danger mt-3" role="alert">
                            {error}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
