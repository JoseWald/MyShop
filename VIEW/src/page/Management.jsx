import axios from 'axios';
import StockProd from "../component/stockProd";
import AddProduct from "../component/addProd";
import { useEffect, useState } from 'react';

export default function Management() {
    const [products,setProducts]=useState([]);

    const getProdList=async ()=>{
        try{
            const res= await axios.get("http://localhost:8000/prod/prodList");
            setProducts(res.data.message);

        }catch(err){
            console.error(err.response?.data.message);
        }
    }

    useEffect(()=>{
        getProdList();
    },[]);

    return (
        <>
            <main className="container mt-5">
                <div className="mt-5">
                    .
                </div>
                <div className="mt-3">
                    <AddProduct getProdList={getProdList} />
                </div>

                <div className="card my-4 shadow-sm">
                    <div className="card-header bg-primary text-light">Products List</div>
                    <div className="card-body">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th className="text-center">Name</th>
                                    <th className="text-center">Quantity</th>
                                    <th className="text-center">Price (Ar)</th>
                                    <th className="text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                            {products.map((product) => (
                                    <StockProd
                                        key={product._id}
                                        name={product.name}
                                        quantity={product.quantity}
                                        price={product.price}
                                        getProdList={getProdList}
                                    />
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </>
    );
}
