import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "../App";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function Changepassword()
{
    const [currpass,setcurrpass]=useState();
    const [newpass,setnewpass]=useState();
    const [cnewpass,setcnewpass]=useState();
    const [msg,setmsg]=useState();
    const navigate=useNavigate();
    const {udata,setudata}= useContext(userContext);
    async function onlogin(e)
    {
        e.preventDefault();
        const uname= udata.username;
        const apidata={currpass,newpass,uname};
        try
        {
            if(newpass===cnewpass)
                {
                    const resp = await axios.put("http://localhost:9000/api/changepassword",apidata)
                    if(resp.status===200)
                    {
                        if(resp.data.statuscode===0)
                    {
                        toast.info("Current Password Incorrect")
                    }
                    else if (resp.data.statuscode===1)
                    {
                        toast.success("Password changed successfully");
                        setudata(null);
                        sessionStorage.clear();
                        navigate("/homepage");
                    }
                }
                else
                {
                    setmsg("Some error occured");
                }
            }
            else
            {
                toast.warning("New Password and confirm new password does not match")
            }
        }
        catch(err)
        {

        }
    }
            
    return(
        <>
<div className="banner-top">
            <div className="container">
                <h3 >Login</h3>
                <h4><Link to="/">Home</Link><label>/</label>Change Password</h4>
                <div className="clearfix"> </div>
            </div>
        </div>


        <div className="login">

            <div className="main-agileits">
                <div className="form-w3agile">
                    <h3>Change Password</h3>
                    <form  onSubmit={onlogin}>
                    <div className="key">
                            <i className="fa fa-lock" aria-hidden="true"></i>
                            <input type="password" placeholder="Current Password" className="form-control" name="Password" onChange={(e) => setcurrpass(e.target.value)} onfocus="this.value = '';" onblur="if (this.value == '') {this.value = 'CurrentPassword';}" required="" />
                            <div className="clearfix"></div>
                        </div>        
                    <div className="key">
                            <i className="fa fa-lock" aria-hidden="true"></i>
                            <input type="password" placeholder="New Password" className="form-control" name="Password" onChange={(e) => setnewpass(e.target.value)} onfocus="this.value = '';" onblur="if (this.value == '') {this.value = 'New Password';}" required="" />
                            <div className="clearfix"></div>
                        </div>        
                    <div className="key">
                            <i className="fa fa-lock" aria-hidden="true"></i>
                            <input type="password" placeholder="Confirm New Password" className="form-control" name="Password" onChange={(e) => setcnewpass(e.target.value)} onfocus="this.value = '';" onblur="if (this.value == '') {this.value = 'Confirm New Password';}" required="" />
                            <div className="clearfix"></div>
                        </div>        
            <input type="submit" name="btn" value="Change Password" /> <br/>
                {msg}        
                        
                    </form>
                </div>
                </div>
                </div>
        </>
    )
}
export default Changepassword;