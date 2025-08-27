import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function ManageProduct()
{
    const [catid,setcatid]=useState("");
    const [prodname,setprodname]=useState();
    const [rate,setrate]=useState();
    const [dis,setdis]=useState();
    const [stock,setstock]=useState();
    const [descp,setdescp]=useState();
    const [picture,setpicture]=useState(null);
    const [msg,setmsg]=useState();
    const [catdata,setcatdata]=useState([]);
    const [prodsdata,setprodsdata]=useState([]);
    const [picname,setpicname]=useState();
    const [editmode,seteditmode]=useState(false);
    const [cname,setcname]=useState();
    const [cpic,setcpic]=useState(null);
    const [prodid,setprodid]=useState();
    const fileInputRef= useRef(null);

    async function fetchallcat()
    {
        try{
const resp= await axios.get("http://localhost:9000/api/getallcat")
if(resp.status===200)
{
    if(resp.data.statuscode===1)
    {
        setcatdata(resp.data.catdata)
    }
    else
    {
        setcatdata([])
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
        fetchallcat();
    },[])

    useEffect(()=>
    {
        if(catid!=="" && editmode===false )
        {
            fetchprodsbycat();
        }
    },[catid])
    async function fetchprodsbycat()
    {
        try
        {
            const resp= await axios.get(`http://localhost:9000/api/fetchprodsbycatid?cid=${catid}`)
            if(resp.status===200)
            {
                if(resp.data.statuscode===1)
                    {
                setprodsdata(resp.data.proddata)
                    }
                else
                {
                    setprodsdata([]);
                    toast.info("No products found");
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
    async function addproduct(e)
    {
        e.preventDefault();
        try
        {
            const formdata=new FormData();
            formdata.append("catid",catid)
            formdata.append("prodname",prodname)
            formdata.append("rate",rate)
            formdata.append("dis",dis)
            formdata.append("stock",stock)
            formdata.append("descp",descp)

            if(picture!==null)
            {
                formdata.append("picture",picture)
            }
            const resp= await axios.post(`http://localhost:9000/api/saveproduct`,formdata)
            if(resp.status===200)
            {
                if(resp.data.statuscode===1)
                {
                    toast.success("Product added successfully")
                }
                else if(resp.data.statuscode===0)
                {
                    toast.warn("Product not added");
                }
            }
            else
            {
                alert("Some error occured");
            }

        }
        catch(err)
        {
            alert(err.message)
        }
    }
    
    async function updatedb()
    {
        try
        {
            const formdata= new FormData();
            formdata.append("cid",catid)
            formdata.append("prodname",prodname)
            formdata.append("rate",rate)
            formdata.append("dis",dis)
            formdata.append("stock",stock)
            formdata.append("descp",descp)
            if(picture!==null)
            {
                formdata.append("pic",picture)
            }
            formdata.append("oldpicname",picname)
            formdata.append("pid",prodid);
            const resp= await axios.put(`http://localhost:9000/api/updateproduct`,formdata)
            if(resp.status===200)
            {
                if(resp.data.statuscode===1)
                {
                    toast.success("Product updated successfully")
                    oncancel();
                    fetchprodsbycat();
                }
                else if(resp.data.statuscode===0)
                {
                    toast.warn("Product not updated");
                }
            }
            else
            {
                alert("Some error occured");
            }
        }
        catch(err)
        {
            alert(err.message)
        }
    }
     async function ondel(id)
    {
        var catresp= window.confirm("Are You Sure,You Want To Delete?");
        if(catresp===true)
        {
            const resp= await axios.delete(`http://localhost:9000/api/delproduct/${id}`);
            if(resp.status===200)
            {
                if (resp.data.statuscode===1) 
                {
                    toast.success("Category deleted successfully", { position: "top-center", theme: "dark" })
                    fetchprodsbycat();
                }
                else if(resp.data.statuscode===1)
                {
                    toast.success("Category deleted successfully", { position: "top-center", theme: "dark" })
                    fetchprodsbycat();
                }
                else if(resp.data.statuscode===0)
                {
                    toast.warn("Category not deleted", { position: "top-center", theme: "dark" })
                }
                
            }
            else
            {
                toast.error("Error occured", { position: "top-center", theme: "dark" })
            }
        }
    }
    function onupdate(proditem)
    {
        seteditmode(true)
        setprodname(proditem.prodname)
        setrate(proditem.Rate)
        setdis(proditem.Discount)
        setstock(proditem.Stock)
        setdescp(proditem.Description)
        setpicname(proditem.picture)
        setprodid(proditem._id);
        
        
        
    }
    function oncancel()
    {
        seteditmode(false);
        setprodname("")
        setrate("")
        setdis("")
        setstock("")
        setdescp("")
        setpicname("")
        setprodid("")
        if (fileInputRef.current) 
            {
                fileInputRef.current.value = '';
            }
            setpicture(null);
    }
    return(
<>
<div className="banner-top">
            <div className="container">
                <h3 >Manage Product</h3>
                <h4><Link to="/">Home</Link><label>/</label>Manage Product </h4>
                <div className="clearfix"> </div>
            </div>
        </div>


        <div className="login">

            <div className="main-agileits">
            <div className="form-w3agile">
                    <h3>Manage Product</h3>
                    <form onSubmit={addproduct}>
                    <select name="cat" className="form-control" onChange={(e)=>setcatid(e.target.value)}>
                <option value="">Choose Category</option>
                {
                    catdata.map((item,index)=>
                    <option value={item._id}  key={index}>{item.catname}</option>
                    )
                }
                </select><br/>



                        <div className="key">
                           
                            <input type="text" placeholder="Product Name" value={prodname} className="form-control" name="prodname" onChange={(e) => setprodname(e.target.value)}  required="" />
                            <div className="clearfix"></div>
                        </div>
                        <div className="key">
                            
                            <input type="text" placeholder="Rate" className="form-control" value={rate} name="rate" onChange={(e) => setrate(e.target.value)} required="" />
                            <div className="clearfix"></div>
                        </div>
                        <div className="key">
                            
                            <input type="text" placeholder="Discount(in percent, do not add % symbol)" value={dis} className="form-control" name="dis" onChange={(e) => setdis(e.target.value)} required="" />
                            <div className="clearfix"></div>
                        </div>
                        <div className="key">
                            
                            <input type="text" placeholder="Stock"value={stock} className="form-control" name="stock" onChange={(e) => setstock(e.target.value)} required="" />
                            <div className="clearfix"></div>
                        </div>
                        <div className="key">
                            
                            <textarea name="des" placeholder="Description" value={descp} className="form-control"  onChange={(e) => setdescp(e.target.value)} required="" />
                            <div className="clearfix"></div>
                       </div>
                       {
                        editmode?
                        <>
                            <img src={`Uploads/${picname}`} height='100'/>
                            Choose new image, if required<br/><br/>
                        </>:null
                       }
                       <input type="file" name="ppic" ref={fileInputRef} onChange={(e)=>setpicture(e.target.files[0])}/><br/>
                       {editmode===false?<input type="submit" name="btn1" value="Add" />:null}
                       {
                        editmode?
                        <>
                        <input type="button" className="btn btn-primary" name="btn2" value="Update" onClick={updatedb} /> &nbsp;

                            <input type="button" className="btn btn-primary" name="btn2" onClick={oncancel} value="Cancel"/>
                        </>:null
                    }



    

</form>
</div><br/><br/>
</div>
{
    prodsdata.length>0?
    <>
    <h2>Added Products</h2><br/>
                            <table className="table table bordered">
    
   
<tbody>
<tr>
                                    <th>Picture</th>
                                    <th>Product Name</th>
                                    <th>Update</th>
                                    <th>Delete</th>


</tr>
</tbody>


{
    prodsdata.map((item,index)=>
    <tr key={index}>
<td><img src={`Uploads/${item.picture}`} height='75'/></td>
<td>{item.prodname}</td>
<td><button className="btn btn-primary" onClick={()=>onupdate(item)}>Update</button></td>
<td><button className="btn btn-danger" onClick={()=>ondel(item._id)}>Delete</button></td>
</tr>
)
}
</table><br/>
{prodsdata.length} Products found



    </>:<h2>No products found</h2>
}
</div>





                    


</>



    )
}
export default ManageProduct;