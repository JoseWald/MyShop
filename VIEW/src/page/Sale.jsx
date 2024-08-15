import axios from 'axios';
import { useState, useEffect } from "react";
import ProdSale from '../component/prodSaleComponent';
import HandleFacture from '../component/HandleFacture';

export default function Sale() {
    const [products, setProducts] = useState([]);
    const [wishList, setWishList] = useState([]);

    useEffect(() => {
        getProdList();
        getWishList();
    }, []);

    const getProdList = async () => {
        try {
            const res = await axios.get("http://localhost:8000/prod/prodList");
            setProducts(res.data.message);
        } catch (err) {
            console.error(err.response?.data.message);
        }
    };

    const getWishList = async () => {
        try {
            const res = await axios.get("http://localhost:8000/sell/showWishList");
            setWishList(res.data.message);
        } catch (err) {
            console.log(err.response?.data.message);
        }
    };

    return (
        <>
            <div className="row mt-5">
                <div className="col-md-5 col-lg-6">
                    <h1 className="m-2">Products</h1>
                    <div className="row">
                        {products.map((product) => (
                            <ProdSale
                                key={product._id}
                                name={product.name}
                                quantity={product.quantity}
                                price={product.price}
                                getWishList={getWishList}  
                            />
                        ))}
                    </div>
                </div>
                <HandleFacture 
                        getWishList={getWishList} 
                        wishList={wishList} 
                        getProdList={getProdList}
                />
            </div>
        </>
    );
}
