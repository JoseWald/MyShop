import axios from 'axios';
import { useEffect, useState } from 'react';

export default function ProdSale(props) {
    const [infoProd, setInfoProd] = useState({
        name: props.name,
        quantity: props.quantity,
        price: props.price
    });

    const [wantedProd, setWantedProd] = useState({
        quantity: 0
    });

    useEffect(() => {
        setInfoProd({
            name: props.name,
            quantity: props.quantity,
            price: props.price
        });
    }, [props.name, props.quantity, props.price]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const maxQuant = props.quantity;
        const updateNumber = name === "quantity" ? Math.min(maxQuant, Math.max(0, Number(value))) : value;

        setWantedProd((prevData) => ({
            ...prevData,
            [name]: updateNumber
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8000/sell/addWishList", {
                name: props.name,
                quantity: wantedProd.quantity,
                price: props.price
            });
            await props.getWishList(); 
        } catch (err) {
            console.log(err.response?.data.message);
        }
    };
    

    return (
        <div className="col-md-6 col-lg-3 m-2">
            <div className="card shadow">
                <div className="card-header bg-success text-light">{infoProd.name}</div>
                <div className="card-body">
                    <h5>Price: {infoProd.price}</h5>
                    <h5>Quantity: {infoProd.quantity}</h5>
                    <div className="input-group">
                        <button className="btn btn-primary" onClick={handleSubmit}>Add</button>
                        <input
                            type="number"
                            className="form-control"
                            name="quantity"
                            value={wantedProd.quantity}
                            onChange={handleChange}
                            min="0"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
