import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { userContext } from "../App";
import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";

function Checkout()
{
    const [saddr,setsaddr]=useState();

    const [hname,sethname]=useState();
    const [ccno,setccno]=useState();
    const [exp,setexp]=useState();
    const [cvv,setcvv]=useState();
    const [flag,setflag]=useState(false);
    const [pmode,setpmode]=useState("");
    const [msg,setmsg]=useState();
    const navigate=useNavigate();
    const {udata} = useContext(userContext);

    async function oncheckout(e)
    {
        e.preventDefault();
        const carddetails= {hname,ccno,exp,cvv}
        const cartinfo= JSON.parse(sessionStorage.getItem("cartdata"));
        const checkoutdata= {saddr,tbill:sessionStorage.getItem("tbill"),email:udata.email,pmode,carddetails,cartinfo};
        try
        {
            const resp= await axios.post("http://localhost:9000/api/saveorder",checkoutdata)
            if(resp.status===200)
            {
                if(resp.data.statuscode===0)
                {
                    toast.error("Error while making the payment");
                }
                else if(resp.data.statuscode===1)
                {
                    updatestock();
                }
            }
            else
            {
                toast.error("Some error occured");
            }
        }
        catch(err)
        {
            toast.error(err.message);
        }
    }

    useEffect(()=>
    {
        if(pmode!=="")
        {
            if(pmode==="Debit Card / Credit Card")
            {
                setflag(true);
            }
            else if(pmode==="Cash on Delivery")
            {
                setflag(false);
            }
        }
        else
        {
            setflag(false);
        }   
    },[pmode]
)
async function updatestock()
    {
        const cartinfo = {cartinfo:JSON.parse(sessionStorage.getItem("cartdata"))};
        try
        {
            const resp =  await axios.put("http://localhost:9000/api/updatestock",cartinfo)
            if(resp.status===200)
            {
                if(resp.data.statuscode===0)
                {
                   toast.error("Error while updating stock")
                }
                else if(resp.data.statuscode===1)
                {
                    emptycart();
                }
            }
            else
            {
                toast.error("Some error occured");
            }
        }
        catch(err)
        {
            toast.error(err.message);
        }
    }
    async function emptycart()
    {
        try
        {
            const resp= await axios.delete("http://localhost:9000/api/deletecart?email=" + udata.email )
            if(resp.status===200)
            {
            if(resp.data.statuscode===0)
            {
                toast.error("Error while deleting")
            }
            else if(resp.data.statuscode===1)
            {
                sessionStorage.removeItem("cartdata");
                navigate("/ordersummary");
            }
        }
        else
        {
            toast.error("Some error occured"); 
        }
    }
catch(err)
{
    toast.error(err.message);
}
}
        
    
    return(
        <>
<div className="banner-top">
            <div className="container">
                <h3 >Checkout</h3>
                <h4><Link to="/">Home</Link><label>/</label>Checkout</h4>
                <div className="clearfix"> </div>
            </div>
        </div>


        <div className="login">

            <div className="main-agileits">
                <div className="form-w3agile">
                    <h3>Checkout</h3>
                    <form name="form1" onSubmit={oncheckout}>
                    <div className="key">
                           
                            <textarea name="addr" placeholder="Shipping address" className="form-control"  onChange={(e) => setsaddr(e.target.value)}></textarea>
                            <div className="clearfix"></div></div>
                            <br/>
                               

                               <select name="pmode" className="form-control" onChange={(e)=>setpmode(e.target.value)}>
                <option value="">Choose Payment Mode</option>
                <option>Cash on Delivery</option>
                <option>Debit Card / Credit Card</option>
            </select><br/>
            {
                flag===true?
            <>
                <input type="text" name="hname"  className= "form-control"placeholder="Holder Name" onChange={(e)=>sethname(e.target.value)}/><br/>
                <input type="text" name="cardno"  className="form-control"placeholder="Card Number" onChange={(e)=>setccno(e.target.value)}/><br/>
                <input type="text" name="expdt" className="form-control" placeholder="Expiry Date" onChange={(e)=>setexp(e.target.value)}/><br/>
                <input type="password"className="form-control" name="cvv" placeholder="CVV" onChange={(e)=>setcvv(e.target.value)}/><br/>
            </>:null

            }
             <input type="submit" name="btn" value="Make Payment" /><br/>
                           
                        
                    </form>   </div></div></div>


        </>
    )
}
export default Checkout;