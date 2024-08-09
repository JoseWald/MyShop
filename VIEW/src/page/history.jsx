import SaleHistory from "../component/SaleHistory";

export default function History(){
    return(
        <>
            <div className="mt-5" >
            <h1 className="mt-2">Sales History</h1>
            <div className="row mx-auto">
                <SaleHistory/>
                <SaleHistory/>
                <SaleHistory/>
                <SaleHistory/>
                <SaleHistory/>
                <SaleHistory/>
            </div>
            </div>
        </>
    )
}