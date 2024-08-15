import axios from 'axios';
import { useEffect, useState } from 'react';
import Delete from '../IMG/remove.png';
import Edit from '../IMG/pen.png';

export default function StockProd(props) {
    const [isEditing, setIsEditing] = useState(false);
    const [updatedData, setUpdatedData] = useState({
        name: props.name,
        quantity: props.quantity,
        price: props.price
    });
    const [initialQuantity,setInitialQuantity]=useState(props.quantity);

    useEffect(() => {
        setInitialQuantity(props.quantity);
        setUpdatedData({
            name: props.name,
            quantity: props.quantity,
            price: props.price
        });
    }, [props.name, props.quantity, props.price]);

    const handleDelete = async () => {
        if (window.confirm("Are you sure ?")) {
            try{
                   const res=await axios.delete("http://localhost:8000/prod/deleteProd",{
                        data:{name:updatedData.name}
                    });
                    await props.getProdList();
                    console.log('produit supprimé'+res.data);
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
        let acceptedValue;

        if (name === 'price') {
            acceptedValue = Math.max(0, Number(value));
        } else if (name === 'quantity') {
            acceptedValue = Number(value) < initialQuantity ? initialQuantity : Number(value);
        } else {
            acceptedValue = value;
        }

        setUpdatedData((prevData) => ({
            ...prevData,
            [name]: acceptedValue
        }));
    };

    const handleSave =async () => {
        try{
            await axios.put("http://localhost:8000/prod/updateProd",{
                name:updatedData.name,
                price:updatedData.price,
                quantity:updatedData.quantity
            })
            await props.getProdList();
        }catch(err){
                console.error(err.response?.data.message);
        }  
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
                        readOnly
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
