import { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { userContext } from "../App";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function Details()
{
    const [params] = useSearchParams();
    const prodid = params.get("pid");
    const [proddata,setproddata]=useState({});
    const [prate,setprate] = useState();
    const [dis,setdis] = useState();
    const [remcost,setremcost] = useState();
    const [qty,setqty] = useState();
    const [tc,settc] = useState();
    const [stock,setstock] = useState([]);
    const navigate= useNavigate();
    const {udata}= useContext(userContext);

    useEffect(()=>
    {
        fetchproddetails();
    },[prodid])

    useEffect(()=>
    {
        setremcost(proddata.Rate-(proddata.Discount*proddata.Rate)/100);
        var stock2=[];
        if(proddata.Stock>10)
        {
            for(var x=1;x<=10;x++)
            {
                stock2.push(x);
            }
        }
        else
        {
            for(var x=1;x<=proddata.Stock;x++)
                {
                    stock2.push(x);//1-5
                }
        }
        setstock(stock2);
    },[proddata])

    useEffect(()=>
    {
        settc(remcost*qty);
    },[qty])
    
    async function fetchproddetails()
    {
        try
        {
            const resp= await axios.get(`http://localhost:9000/api/getproddetails?pid=${prodid}`)
            if(resp.status===200)
            {
                if(resp.data.statuscode===1)
                {
                    setproddata(resp.data.proddata)  
                }
                else
                {
                    toast.error("Some error occured")
                }
            }
        }
        catch(err)
        {
            alert(err.message);
        }
    }
    async function addtocart() {
        if(sessionStorage.getItem("userdata")===null)
        {
            toast.info("Please login to add to cart");
            navigate("/login");
        }
        else
        {
            const cartdata={pid:prodid,picture:proddata.picture,prodname:proddata.prodname,rate:remcost,qty:qty,tc:tc,email:udata.email}
            try{
                const resp= await axios.post("http://localhost:9000/api/savetocart",cartdata)
                if(resp.status===200)
                {
                    if(resp.data.statuscode===0)
                    {
                        toast.warning("Problem while adding to cart, try again")   
                    }
                    else if(resp.data.statuscode===1)
                    {
                        navigate("/showcart");
                    }
                }
                else
                {
                    toast.warning("Problem while adding to cart, try again")
                }
            }
            catch(err)
            {
                toast.warning(err.message) 
            }
        }
        
    }
    
    
    return(
<>
<div className="banner-top">
            
                <h3 >Product Details</h3>
                <h4><Link to="/">Home</Link><label>/</label>Product Details</h4>
                <div className="clearfix"> </div>
            </div>
        


        <div className="login">

          
                <div className="form-w3agile">
                    <h3>Product Details</h3>
                    <div className="products">
                
                    <div>

                        <div className="col-md-4 agileinfo_single_left">
                            <img id="example" src={`Uploads/${proddata.picture}`} alt=" " className="img-responsive" />
                        </div>
                        <div className>
                            <h2>{proddata.prodname}</h2>
                            <div className="w3agile_description">
                                <h4>Description :</h4>
                                <p>{proddata.Description}</p>
                            </div>
                            <div className="snipcart-item block">
                                <div className="snipcart-thumb agileinfo_single_right_snipcart">
                                    <h4 className="m-sing">₹{remcost}<span>₹{proddata.Rate}</span></h4>
                                </div>
                                {
                                    proddata.Stock>0?
                                    <div className="snipcart-details agileinfo_single_right_details">
                                        <form name="form1">
                                            <fieldset>
                                                <select name="qty" className="form-control" onChange={(e)=>setqty(e.target.value)}>
                                                    <option value="">Choose Quantity</option>
                                                    {
                                                        stock.map((item,index)=>
                                                        <option key={index}>{item}</option>
                                                        )
                                                    }
                                                </select><br/>
                                                <input type="button" name="submit" value="Add to cart" onClick={addtocart} className="button" />
                                            </fieldset>
                                        </form>
                                    </div>:<b>Out of Stock</b>
                                }
                           
                            </div>
                        </div>
                        <div className="clearfix"> </div>
                        </div></div></div></div>


</>




    )
}
export default Details;



