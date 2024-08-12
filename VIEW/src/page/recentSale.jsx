import axios from "axios";
import { useState, useEffect } from "react";

export default function RecentSale() {
  const [billInfo, setBillInfo] = useState({
    date: "",
    customer: "",
    products: [],
    total: "",
    given: "",
    change: ""
  });

  const getBillInfo = async () => {
    try {
      const res = await axios.get("http://localhost:8000/sell/setRecentBill");
      const info = res.data.message;
      setBillInfo({
        date: info.date,
        customer: info.customer,
        products: info.products,
        total: info.totalAmount,
        given: info.givenAmount,
        change: info.changeAmount
      });
    } catch (err) {
      console.log(err.response?.data.message);
    }
  };

  useEffect(() => {
    getBillInfo();
  }, []);

  return (
    <div className="container mt-5">
        <div>.</div>
      <h1 className="text-center mb-4">Invoice</h1>

      <div className="card p-4 shadow-sm">
        <div className="row mb-3">
          <div className="col-md-6">
            <h4 className="mb-2">Customer:</h4>
            <p>{billInfo.customer}</p>
          </div>
          <div className="col-md-6 text-end">
            <h4 className="mb-2">Date:</h4>
            <p>{billInfo.date}</p>
          </div>
        </div>

        <table className="table table-striped">
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {billInfo.products.map((prod, index) => (
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
            <h5>Total: {billInfo.total} Ar</h5>
          </div>
          <div className="col-md-6 text-end">
            <h5>Given: {billInfo.given} Ar</h5>
            <h5>Change: {billInfo.change} Ar</h5>
          </div>
        </div>
      </div>
    </div>
  );
}
