import {Link} from 'react-router-dom';

export default function SaleHistory(){
    return(
        <Link to='/Facture'>
              <span className="col-md-2 m-4">
                <div className="card shadow-sm">
                    <div className="card-header bg-success text-light">Customer1</div>
                    <div className="card-body">
                        <h5>Amount: 100000 Ar</h5>
                        <h5>Date: 25/04/2020</h5>
                    </div>
                </div>
            </span>
        </Link>
    )
}