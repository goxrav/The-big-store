import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { userContext } from "../App";
import { useEffect } from "react";

function OrderHistory() {
    const [ordersdata, setordersdata] = useState([]);
    const navigate = useNavigate();
    const { udata } = useContext(userContext);
    async function fetchorders() {
        try {
            const resp = await axios.get("http://localhost:9000/api/getuserorders?email=" + udata.email)
            if (resp.status === 200) {
                if (resp.data.statuscode === 1) {
                    setordersdata(resp.data.ordersdata)
                }
                else {
                    setordersdata([]);
                }
            }
            else {
                alert("Some error occured")
            }
        }
        catch (err) {
            alert(err.message);
        }
    }
    useEffect(() => {
        if (udata !== null) {
            fetchorders();
        }
    }, [udata])


    return (
        <>
            <div className="banner-top">
                <div className="container">
                    <h3 >Order History</h3>
                    <h4><Link to="/">Home</Link><label>/</label>Order History</h4>
                    <div className="clearfix"> </div>
                </div>
            </div>
            <div className="login">
                <div className="container">
                    {
                        ordersdata.length > 0 ?
                            <>
                                <h2>List of Orders</h2><br />
                                <table className="table table-bordred">
                                    <tbody>
                                        <tr>
                                            <th>Order ID</th>
                                           
                                            <th>Address</th>
                                            <th>Bill Amount</th>

                                            <th>Date</th>
                                            <th>Payment Mode</th>
                                            <th>Status</th>
                                        </tr>
                                    </tbody>
                                    {
                                        ordersdata.map((item, index) =>
                                            <tr key={index}>
                                                <td><Link to={`/orderitems?oid=${item._id}`}>{item._id}</Link></td>
                                               
                                                <td>{item.saddress}</td>
                                                <td>{item.billamt}</td>

                                                <td>{item.OrderDate}</td>
                                                <td>{item.PayMode}</td>
                                                <td>{item.status}</td></tr>




                                        )
                                    }



                                </table><br />
                                {ordersdata.length} orders found
                            </> : <h2>No orders found</h2>


                    }


                </div>

            </div>


        </>

    )
}
export default OrderHistory;