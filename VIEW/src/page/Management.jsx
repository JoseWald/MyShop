
import StockProd from "../component/stockProd";
import AddProduct from "../component/addProd";

export default function Management(){
    

    return(
        <>
        <main className="container mt-5" >
            <div className="mt-5">
                .
            </div>
            <div className=" mt-3 ">
                    <AddProduct/>
            </div>

                <div className="card my-4 shadow-sm">
                    <div className="card-header bg-primary text-light">Products List</div>
                    <div className="card-body">
                        <table className="col-12 table table-striped">
                            <thead>
                                <tr className="">
                                    <th className=" col-3 text-center">Name</th>
                                    <th className="col-3 text-center">Quantity</th>
                                    <th className="col-3 text-center">Price</th>
                                    <th  className="text-center"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="">
                                    <StockProd name = "ProduitA" quantity = {50} price = {1500}/>
                                </tr>
                                <tr className="">
                                    <StockProd name = "ProduitB" quantity = {100} price = {1500}/>
                                </tr>
                                <tr className="">
                                    <StockProd name = "ProduitC" quantity = {50} price = {1500}/>
                                </tr>
                            
                            </tbody>
                        </table>
                    </div>
                </div>
        </main>
        </>
    )
}