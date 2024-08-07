import { useState } from "react";

export default function AddProduct(){
    const [formData,setFromData]=useState({
        name:'',
        quantity:0,
        price:0
    })

    const handleChange=(e)=>{
        const {name,value}=e.target;

        setFromData((prevData)=>({
            ...prevData,
            [name]:value
        }))
    }

    const handleSubmit=(e)=>{
        e.preventDefault()
    }

    return(
        <>
            <div class="card shadow-sm bg-light">
                <div class="card-header bg-success text-light ">Add a product</div>
                <div class="card-body">
                    <div className="row">
                        <div className="col m-2">Name</div>
                        <div className="col m-2">Quantity</div>
                        <div className="col m-2">Price</div>
                        <div className="col m-2"></div>
                    </div>
                    <form action="" class="row">
                        <input type="text"
                               class="form-control m-2  col" 
                               name='name'
                               value={formData.name}
                               onChange={handleChange} required/>
                        <input type="number" 
                               class="form-control m-2  col" 
                               name='quantity' 
                               value={formData.quantity}
                               onChange={handleChange} required/>
                        <input type="number" 
                               class="form-control m-2  col"
                               name='price'
                               value={formData.price}
                               onChange={handleChange} required/>
                        <button type="submit" class="btn btn-primary w-100 m-2 col" onSubmit={handleSubmit}>Add+</button>
                    </form>
                </div>
            </div>
        </>
    )
}