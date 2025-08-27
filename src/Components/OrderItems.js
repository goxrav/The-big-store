import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";

function OrderItems()
{
    const[orderitems,setorderitems]=useState([]);
    const[params]=useSearchParams();
    const orderid= params.get("oid");
    async function fetchorderproducts()
    {
        try{
     const resp= await axios.get("http://localhost:9000/getorderproducts?orderno=" + orderid)
     if(resp.status===200)
        {
            if(resp.data.statuscode===1)
            {
                setorderitems(resp.data.items)
            }
            else
            {
                setorderitems([]);
            }
        }     
        else
        {
            alert("Some error occured")
        }  
        }
        catch(err)
        {
            alert(err.message);

            
        }
    }
    useEffect(()=>
    {
        fetchorderproducts();
    },[])
    return(
        <>
         <div className="banner-top">
            <div className="container">
                <h3 >Order Items</h3>
                <h4><Link to="/">Home</Link><label>/</label>Order Items</h4>
                <div className="clearfix"> </div>
            </div>
        </div>


        <div className="login">

            <div className="main-agileits">
                <div className="form-w3agile">
                {
                    orderitems.length>0?
                    <>
                    <h2>Order Products</h2><br/>
                    <table className="table table-bordred">
                        <tbody>
                        <th>Picture</th>
                                        <th>Name</th>
                                        <th>Rate</th>
                                        <th>Quantity</th>
                                        <th>Total Cost</th>       
                        </tbody>
                        {
                            orderitems.map((item,index)=>
                            <tr key={index}>
                            <td><img src={`Uploads/${item.picture}`} height='75'/></td>
                                    <td>{item.ProdName}</td>
                                    <td>{item.Rate}</td>
                                    <td>{item.Qty}</td>
                                    <td>{item.TotalCost}</td>
                            </tr> 
                            )
                        }
                    </table><br/>

                    </>:<h2>No items found</h2>
                }
                </div>
                </div>




                </div>

        




        </>
    )
}
export default OrderItems;
