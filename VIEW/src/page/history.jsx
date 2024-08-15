import axios from "axios";
import { useState, useEffect } from "react";
import SaleHistory from "../component/SaleHistory";

export default function History() {
    const [billHistory, setBillHistory] = useState([]);
    
    const getBillHistory = async () => {
        try {
            const res = await axios.get('http://localhost:8000/history/getSaleHistory');
            setBillHistory(res.data.message);
        } catch (err) {
            console.log(err.response?.data.message);
        }
    };

    useEffect(() => {
        getBillHistory();
    }, []);
    
    return (
        <div className="mt-5">
            <h1 className="mt-2">Sales History</h1>
            <div className="row mx-auto">
                {billHistory.map((bill, index) => (
                    <SaleHistory
                        key={index}
                        customer={bill.customer}
                        date={bill.date}
                        products={bill.products}
                        total={bill.totalAmount}
                        given={bill.givenAmount}
                        change={bill.changeAmount}
                    />
                ))}
            </div>
        </div>
    );
}
