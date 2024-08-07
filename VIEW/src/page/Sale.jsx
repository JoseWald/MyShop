import { useState } from "react";

export default function Sale() {
    const [formData, setFormData] = useState({
        customer: '',
        date: new Date().toISOString().split('T')[0],
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <>
            <div className="row mt-5">
                <div className="col-md-5 col-lg-6">
                    <h1 className="m-2">Products</h1>
                    <div className="row">
                        {/* Répéter ce bloc pour chaque produit */}
                        <div className="col-md-6 col-lg-3 m-2">
                            <div className="card shadow">
                                <div className="card-header bg-success text-light">ProduitA</div>
                                <div className="card-body">
                                    <h5>Price: 5000 Ar</h5>
                                    <h5>Quantity: 450</h5>
                                    <div className="input-group">
                                        <button className="btn btn-primary">Add</button>
                                        <input type="number" className="form-control" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Répétez le bloc au-dessus pour chaque produit */}
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
                                        <h3>Total: 1500000000 Ar</h3>
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
                                {/* Répétez ce bloc pour chaque produit ajouté */}
                                <tr>
                                    <td className="text-center py-2">ProduitA</td>
                                    <td className="text-center py-2">50</td>
                                    <td className="text-center py-2">250000 Ar</td>
                                    <td className="text-center py-2">
                                        <button className="btn btn-warning text-light">Undo</button>
                                    </td>
                                </tr>
                                {/* Répétez le bloc ci-dessus pour chaque produit */}
                            </tbody>
                        </table>
                    </div>
                </form>
            </div>
        </>
    );
}
