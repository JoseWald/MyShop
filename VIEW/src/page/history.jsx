import SaleHistory from "../component/SaleHistory";

export default function History(){
    return(
        <>
            <div class="mt-5" >
            <h1 class="mt-2">Sales History</h1>
            <div class="row mx-auto">
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