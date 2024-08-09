import axios from 'axios';
import { useState } from 'react';
import Delete from '../IMG/remove.png';
import Edit from '../IMG/pen.png';

export default function StockProd(props) {
    const [isEditing, setIsEditing] = useState(false);
    const [updatedData, setUpdatedData] = useState({
        name: props.name,
        quantity: props.quantity,
        price: props.price
    });

    const handleDelete = async () => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) {
            try{
                    axios.delete("http://localhost:8000/prod/deleteProd",{
                        name:updatedData.name
                    })
            }catch(err){
                console.log(err.response?.data.message);
            }
        }
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSave = () => {
        // Ajoute ici le code pour mettre à jour le produit avec updatedData
        console.log("Produit mis à jour :", updatedData);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

    return (
        <tr>
            <td className="text-center align-middle">
                {isEditing ? (
                    <input
                        type="text"
                        name="name"
                        value={updatedData.name}
                        onChange={handleChange}
                        className="form-control"
                    />
                ) : (
                    props.name
                )}
            </td>
            <td className="text-center align-middle">
                {isEditing ? (
                    <input
                        type="number"
                        name="quantity"
                        value={updatedData.quantity}
                        onChange={handleChange}
                        className="form-control"
                        min="0"
                    />
                ) : (
                    props.quantity
                )}
            </td>
            <td className="text-center align-middle">
                {isEditing ? (
                    <input
                        type="number"
                        name="price"
                        value={updatedData.price}
                        onChange={handleChange}
                        className="form-control"
                        min="0"
                    />
                ) : (
                    props.price
                )}
            </td>
            <td className="text-center align-middle d-flex justify-content-center">
                {isEditing ? (
                    <>
                        <button 
                            className="btn btn-success btn-sm mx-1" 
                            onClick={handleSave}
                        >
                            Save
                        </button>
                        <button 
                            className="btn btn-secondary btn-sm mx-1" 
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>
                    </>
                ) : (
                    <>
                        <button 
                            className="btn btn-light mx-2"
                            onClick={handleEdit}
                        >
                            <img 
                                src={Edit} 
                                alt="Edit" 
                                style={{ width: '20px', height: '20px' }}
                            />
                        </button>
                        <button 
                            className="btn btn-light mx-2"
                            onClick={handleDelete}
                        >
                            <img 
                                src={Delete} 
                                alt="Delete" 
                                style={{ width: '20px', height: '20px' }}
                            />
                        </button>
                    </>
                )}
            </td>
        </tr>
    );
}
