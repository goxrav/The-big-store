import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";
import axios from "axios"
import { toast } from "react-toastify";
import { userContext } from "../App";
function Login() {
    const [eml, seteml] = useState();
    const [pass, setpass] = useState();
    const navigate = useNavigate();
    const{setudata} =useContext(userContext);

    async function onlogin(e)
     {
        e.preventDefault();
        const logdata = {eml,pass};
        try
         {
            const resp = await axios.post("http://localhost:9000/api/login",logdata)
            if (resp.status===200) 
                {
                    toast.success("Login Successfull");
                
                if (resp.data.statuscode===0)
                     {
                        toast.warn("Incorrect Username/Password",{position:"top-center", theme:"dark"})
                
            }
            else if(resp.data.statuscode===1)
                 {
                setudata(resp.data.pdata);
                sessionStorage.setItem("userdata", JSON.stringify(resp.data.pdata));
                if(resp.data.pdata.usertype==="admin")
                {
                    navigate("/adminhome");
                }
                else
                {
                    navigate("/");
                }
                

            }
        }
        else
        {
            toast.warn("Error Occured",{position:"top-center", theme:"dark"})
        }
    }
    catch (err) {

    }
}

return (
    <>
        <div className="banner-top">
            <div className="container">
                <h3 >Login</h3>
                <h4><Link to="/">Home</Link><label>/</label>Login</h4>
                <div className="clearfix"> </div>
            </div>
        </div>


        <div className="login">

            <div className="main-agileits">
                <div className="form-w3agile">
                    <h3>Login</h3>
                    <form onSubmit={onlogin}>
                        <div className="key">
                            <i className="fa fa-envelope" aria-hidden="true"></i>
                            <input type="text" placeholder="Email address" className="form-control" name="email" onChange={(e) => seteml(e.target.value)} onfocus="this.value = '';" onblur="if (this.value == '') {this.value = 'Email';}" required="" />
                            <div className="clearfix"></div>
                        </div>
                        <div className="key">
                            <i className="fa fa-lock" aria-hidden="true"></i>
                            <input type="password" placeholder="Password" className="form-control" name="Password" onChange={(e) => setpass(e.target.value)} onfocus="this.value = '';" onblur="if (this.value == '') {this.value = 'Password';}" required="" />
                            <div className="clearfix"></div>
                        </div>
                        <input type="submit" value="Login" /> <br/>
                        
                        
                    </form>
                </div>
                <div className="forg">
                    <Link to="/changepassword" className="forg-left">Forgot Password</Link>
                    <Link to="/register" className="forg-right"> Register</Link>
                    <div className="clearfix"></div>
                </div>
            </div>
        </div>
    </>
)
}


export default Login;