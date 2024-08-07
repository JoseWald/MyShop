import Delete from '../IMG/remove.png';
import Edit from '../IMG/pen.png';

export default function StockProd(props){
    return(
        <>
            <td class="col-3 text-center">{props.name}</td>
                            <td class=" col-3 text-center">{props.quantity}</td>
                            <td class=" col-3 text-center">{props.price}</td>
                              <td  class=" d-flex">
                                <div class="col-6 ">
                                    <img src={Delete} alt="" class="w-25"/>
                                </div>
                                <div class="col-6 ">
                                    <img src={Edit} alt="" class="w-25"/>
                                </div>
                                 
            </td>
        </>
    )
}