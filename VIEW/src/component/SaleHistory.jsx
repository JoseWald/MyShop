import React, { useState } from 'react';

export default function SaleHistory(props) {
    const [showDetails, setShowDetails] = useState(false);

    const toggleDetails = () => {
        setShowDetails(!showDetails);
    };

    return (
        <div className="container mt-5 col-md-4">
           

            <div className="card p-4 shadow-sm">
                <div className="row mb-3">
                    <div className="col-md-6">
                        <h4 className="mb-2">Customer:</h4>
                        <p>{props.customer}</p>
                    </div>
                    <div className="col-md-6 text-end">
                        <h4 className="mb-2">Date:</h4>
                        <p>{props.date}</p>
                    </div>
                </div>

           
                <button 
                    className="btn btn-primary mb-3" 
                    onClick={toggleDetails}
                >
                    {showDetails ? 'Voir moins' : 'Voir plus'}
                </button>

                {showDetails && (
                    <>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Quantity</th>
                                    <th>Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {props.products.map((prod, index) => (
                                    <tr key={index}>
                                        <td>{prod.name}</td>
                                        <td>{prod.quantity}</td>
                                        <td>{prod.price} Ar</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div className="row mt-4">
                            <div className="col-md-6">
                                <h5>Total: {props.total} Ar</h5>
                            </div>
                            <div className="col-md-6 text-end">
                                <h5>Given: {props.given} Ar</h5>
                                <h5>Change: {props.change} Ar</h5>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
