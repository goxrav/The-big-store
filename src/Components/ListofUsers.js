import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
function ListofUsers() {
    const [membsdata, setmembsdata] = useState([]);
    async function fetchusers()
     {
        try 
        {
            const resp = await axios.get("http://localhost:9000/api/listofusers")
            if (resp.status===200) 
                {
                if (resp.data.statuscode===1)
                     {
                    setmembsdata(resp.data.membsdata)
                }
                else 
                {
                    setmembsdata([]);
                }
            }
            else 
            {
                toast.error("Error Occured",{position:"top-center", theme:"dark"})
            }
        }
        catch (err) 
        {
            alert(err.message);
        }
    }
    useEffect(() => 
        {
        fetchusers();
    }, [])
    async function onmembdel(id) 
    {
        var userresp = window.confirm("Are You Sure,You Want To Delete?");
        if (userresp===true)
             {
            const resp = await axios.delete(`http://localhost:9000/api/deluser/${id}`);
            if (resp.status === 200)
                 {
                if (resp.data.statuscode === 1) 
                    {
                    toast.warn("User deleted successfully", { position: "top-center", theme: "dark" })
                    fetchusers();
                }
                else if (resp.data.statuscode === 0) 
                    {
                    toast.warn("User not deleted", { position: "top-center", theme: "dark" })

                }
            }
            else 
            {
                toast.error("Error occured", { position: "top-center", theme: "dark" })
            }
        }
    }

    return (
        <>
            <div className="banner-top">
                <div className="container">

                    <h3>List Of Users</h3>
                    <h4><Link to="/">Home</Link><label>/</label>List Of Users</h4>
                    <div className="clearfix"> </div>
                </div>
            </div>


            <div className="login">
            <div className="container">

                
                   
                        {
                            membsdata.length>0?
                            <>
                                <h3>List Of Users</h3><br />
                                <table className="table table-bordered">
                                    <tbody>
                                    
                                        <tr>
                                        <th>Name</th>
                                            <th>Username</th>
                                            <th>Email</th>
                                            <th>Delete</th>
                                        </tr>
                                        </tbody>
                                   
                                    {
                                        membsdata.map((item, index)=>
                                            <tr key={index}>
                                            <td>{item.pname}</td>
                                                <td>{item.uname}</td>
                                                <td>{item.email}</td>
                                                <td><button className="label label-danger" onClick={()=> onmembdel(item._id)}>Delete</button></td>
                                                </tr>
                                        )
                                    }
                                    
                    </table><br />
                        {membsdata.length} members found
                        </>:<h2>no users found</h2>
                    }
                    </div>
                    </div>
                    
                    </>
                    )
 }
                    

            export default ListofUsers;





