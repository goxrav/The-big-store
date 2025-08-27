import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

function ViewOrders()
{
    const [ordersdata,setordersdata]=useState([]);
    const navigate=useNavigate();
    async function fetchorders()
    {
        try
        {
            const resp =  await axios.get("http://localhost:9000/api/getallorders")
            if(resp.status===200)
            {
                if(resp.data.statuscode===1)
                {
                    setordersdata(resp.data.ordersdata)
                }
                else
                {
                    setordersdata([]);
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
        fetchorders();
    },[])
    async function updatestatus(id)
    {
        navigate("/updatestatus?oid=" + id)  
    }
return(
<>
<div className="banner-top">
           
                <h3 >List of Orders</h3>
                <h4><Link to="/">Home</Link><label>/</label>List of Orders</h4>
                <div className="clearfix"> </div></div>
            
        


        <div className="login">

            {/* <div className="main-agileits"> */}
                {/* <div className="form-w3agile"> */}
                {
                    ordersdata.length>0?
                    <>
                    <h2>List of Orders</h2><br/>
                            <table className="table table-bordred">
                                <tbody>
                                    <tr>
                                        <th>Order ID</th>
                                        <th>Address</th>
                                        <th>Bill Amount</th>
                                        <th>Username</th>
                                        <th>Date</th>
                                        <th>Payment Mode</th>
                                        <th>Status</th>
                                        <th>Update Status</th>
                                    </tr>
                                </tbody>
                                {
                                    ordersdata.map((item,index)=>
                                    <tr key={index}>
                                    <td><Link to={`/orderitems?oid=${item._id}`}>{item._id}</Link></td>
                                    <td>{item.saddress}</td>
                                    <td>{item.billamt}</td>
                                    <td>{item.username}</td>
                                    <td>{item.OrderDate}</td>
                                    <td>{item.PayMode}</td>
                                    <td>{item.status}</td>
                                    <td><button className="btn btn-danger" onClick={()=>updatestatus(item._id)}>Update</button></td>



                                    </tr>
                                    
                                    
                                    )
                                }
                             </table><br/>
                             {ordersdata.length} orders found
                        </>:<h2>No orders found</h2>
                }
                {/* </div></div>    */}
                    
                    </div>
                    
                    {/* </div> */}

                     </>

            






)

        }
    



export default ViewOrders;
