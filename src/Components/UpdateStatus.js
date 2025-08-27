import axios from "axios";
import { useState } from "react"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { toast } from "react-toastify";
function UpdateStatus()
{
const [newst,setnewst]=useState();
const [params] = useSearchParams();
const orderid = params.get("oid");
const navigate = useNavigate();
async function onupdatestatus(e)
{
    e.preventDefault();
    const updatedata = {newst,orderid};
    try
    {
        const resp =  await axios.put("http://localhost:9000/api/updatestatus",updatedata)
            if(resp.status===200)
            {
                if(resp.data.statuscode===0)
                {
                    toast.error("Error while updating status")
                }
                else if(resp.data.statuscode===1)
                {
                   toast.success("Status updated successfully")
                   navigate("/vieworders");
                }
            }
            else
            {
                toast.error("Some error occured");
            }
        }
        catch(err)
        {
            toast.error(err.message)
        }
    }


    return(
        <>
        <div className="banner-top">
           
           <h3 >Update status</h3>
           <h4><Link to="/">Home</Link><label>/</label>Update Status</h4>
           <div className="clearfix"> </div></div>
       
   


   <div className="login">
   <form name="form1" onSubmit={onupdatestatus}>
                        <select name="newstatus" className="form-control" onChange={(e)=>setnewst(e.target.value)}>
                            <option value="">Choose New Status</option>
                            <option>Confirmed</option>
                            <option>Shipped</option>
                            <option>In-Transit</option>
                            <option>Out for Delivery</option>
                            <option>Delivered</option>
                            <option>Cancelled</option>
                            <option>Returned</option>
                        </select>
                        <input type="submit" name="btn" value="Update" /><br/>
                    </form>
                    </div>
                
            

        </>
    )
}
export default UpdateStatus;