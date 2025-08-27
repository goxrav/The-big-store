
import axios from "axios";
import { useEffect, useRef, useState } from "react"
import { Link, useNavigate} from "react-router-dom"
import { toast } from "react-toastify";
function ManageCategory() {
    const [catid,setcatid]=useState();
    const [cname,setcname]=useState();
    const [cpic,setcpic]=useState(null);
    
    const [catdata,setcatdata]=useState([]);
    const [picname,setpicname]=useState();
    const [editmode,seteditmode]=useState(false);
    const fileInputRef = useRef(null);
const navigate=useNavigate();
    async function fetchallcat()
    {
        try
        {
            const resp =  await axios.get("http://localhost:9000/api/getallcat")
            if(resp.status===200)
            {
                if(resp.data.statuscode===1)
                {
                    setcatdata(resp.data.catdata)
                }
                else
                {
                    setcatdata([]);
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
        if(sessionStorage.getItem("userdata")===null)
        {
            toast.error("Please login to access the page");
            navigate("/login");
        }
        else
        {
            var uinfo =JSON.parse(sessionStorage.getItem("userdata"));
            if(uinfo.usertype!=="admin")
            {
                toast.error("Please login to access the page");
                navigate("/login");
            }
        }
    },[]
    
    
    
    )

    async function addcategory(e)
    {
        e.preventDefault();
        try
        {
            const formdata = new FormData();
            formdata.append("catname",cname)
            if(cpic!==null)
            {
                formdata.append("catpic",cpic)
            }
            const resp =  await axios.post(`http://localhost:9000/api/savecategory`,formdata)
            if(resp.status===200)
            {
               if(resp.data.statuscode===1)
               {
                   toast.success("Category added successfully")
                   oncancel();
                   fetchallcat();
               }
               else  if(resp.data.statuscode===0)
                {
                    toast.warn("Category not added");
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
            const formdata = new FormData();
            formdata.append("catname",cname)//either oldname or new name

            if(cpic!==null)
            {
                formdata.append("catpic",cpic)
            }
            formdata.append("oldpicname",picname)
            formdata.append("cid",catid);
            const resp =  await axios.put(`http://localhost:9000/api/updatecategory`,formdata)
            if(resp.status===200)
            {
               if(resp.data.statuscode===1)
               {
                   toast.success("Category updated successfully")
                   oncancel();
                   fetchallcat();
               }
               else  if(resp.data.statuscode===0)
                {
                    toast.warn("Category not updated");
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
        const resp= await axios.delete(`http://localhost:9000/api/delcategory/${id}`);
        if (resp.status === 200)
            {
           if (resp.data.statuscode===1) 
               {
                toast.success("Category deleted successfully", { position: "top-center", theme: "dark" })
                fetchallcat();
    }
    

else if (resp.data.statuscode === 0) 
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
    function onupdate(catitem)
    {
        seteditmode(true)
        setcname(catitem.catname)
        setpicname(catitem.catpic)
        setcatid(catitem._id);
    }
    function oncancel()
    {
        seteditmode(false);
        setcname("")
        setpicname("")
        setcatid("");
        if (fileInputRef.current) 
            {
                fileInputRef.current.value = '';
            }
    }
    return (
        <>

<div className="banner-top">
            <div className="container">
                 <h3>Manage Category</h3>
                 <h4><Link to="/adminhome">Home</Link><label>/</label>Manage Category</h4>

                 <div className="clearfix"> </div>
             </div>
         </div>
            <div className="login">

            
                     <h3>Manage Category</h3>
                     <form onSubmit={addcategory}>
                         <div className="key">
                             <input type="text" value={cname} placeholder="Category Name" className="form-control" name="catname" onChange={(e) => setcname(e.target.value)} required="" />
                           <div className="clearfix"></div>
                         </div>
            {
                editmode?
                <>
                    <img src={`uploads/${picname}`} height='100'/>
                    Choose new image, if required<br/><br/>
                </>:null
            }

            <input type="file" name="catpic" ref={fileInputRef} onChange={(e)=>setcpic(e.target.files[0])} /><br/>

            {editmode===false?<input type="submit" name="btn1" value="Add" />:null}
            {
                editmode?
                <>
                    <input type="button" className="btn btn-primary" name="btn2" value="Update" onClick={updatedb} /> &nbsp;
                    <input type="button" className="btn btn-primary" name="btn3" onClick={oncancel} value="Cancel" />
                </>:null
            }
            
                        </form>
                    </div><br/><br/>

                    {
                        catdata.length>0?
                        <>
                            <h2>Added Categories</h2><br/>
                            <table className="table table-bodered">
                                <tbody>
                                    <tr>
                                        <th>Picture</th>
                                        <th>Category Name</th>
                                        <th>Update</th>
                                        <th>Delete</th>
                                    </tr>
                                </tbody>
                            {
                                catdata.map((item,index)=>
                                <tr key={index}>
                                    <td><img src={`Uploads/${item.catpic}`}  height='75'/></td>
                                    <td>{item.catname}</td>
                                    <td><button className="btn btn-primary" onClick={()=>onupdate(item)}>Update</button></td>
                                    <td><button className="btn btn-danger" onClick={()=>ondel(item._id)}>Delete</button></td>
                                </tr>
                                )
                            }
                            </table><br/>
                            {catdata.length} categories found
                        </>:<h2>No categories found</h2>
                    }

                
            
        </>
    )
}
export default ManageCategory