import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
function Register()
{
const [pname,setpname]= useState();
const [uname,setuname] = useState();
const [eml,seteml] = useState();	
const [pass,setpass] = useState();
const [cpass,setcpass] = useState();
const [msg,setmsg] = useState();
async function onregister(e)
{
	e.preventDefault();

	if(pass===cpass)
		{
	const regdata = {pname,uname,eml,pass}	
	try{
const resp= await axios.post("http://localhost:9000/api/register",regdata)

if(resp.status===200)

	{
		toast.success("Registeration Successfull ",{position:"top-center", theme:"dark"})
	}
else{
	toast.error("Some problem occured ",{position:"top-center", theme:"dark"})
	}

}
catch(err)
	{
	setmsg(err.message)
}
	{

	}
		}
		else{
			toast.warn("Passwords Don't Match ",{position:"top-center", theme:"dark"})
		}
}
	
    return(
<>


	
<div className="banner-top">
	<div className="container">
		<h3>Register</h3>
		<h4><Link to="/">Home</Link><label>/</label>Login</h4>
		<div className="clearfix"> </div>
	</div>
</div>
		 
<div className="login">
		<div className="main-agileits">
				<div className="form-w3agile form1">
					<h3>Register</h3>
					
					<form action="#" onSubmit={onregister}>

					<div className="key">
							<i className="fa fa-user" aria-hidden="true"></i> 
							<input  type="text" name="pname"  onChange={(e)=>setpname(e.target.value)} className="form-control" placeholder="Name" onfocus="this.value = '';" onblur="if (this.value == '') {this.value = 'Name';}" required=""/>
							<div className="clearfix"></div>
						</div>
					 
						<div className="key">
							<i className="fa fa-user" aria-hidden="true"></i> 
							<input  type="text" name="uname"  onChange={(e)=>setuname(e.target.value)} className="form-control" placeholder="Username" onfocus="this.value = '';" onblur="if (this.value == '') {this.value = 'Username';}" required=""/>
							<div className="clearfix"></div>
						</div>
						<div className="key">
							<i className="fa fa-envelope" aria-hidden="true"></i>
							<input  type="text" name="email" onChange={(e)=>seteml(e.target.value)} className="form-control" placeholder="Email Address" onfocus="this.value = '';" onblur="if (this.value == '') {this.value = 'Email';}" required=""/>
							<div className="clearfix"></div>
						</div>
						<div className="key">
							<i className="fa fa-lock" aria-hidden="true"></i>
							<input  type="password" name="password" onChange={(e)=>setpass(e.target.value)} placeholder="Password" className="form-control" onfocus="this.value = '';" onblur="if (this.value == '') {this.value = 'Password';}" required=""/>
							<div className="clearfix"></div>
						</div>
						<div className="key">
							<i className="fa fa-lock" aria-hidden="true"></i>
							<input type="password" name="Confirm Password" onChange={(e)=>setcpass(e.target.value)} placeholder="Confirm Password" className="form-control" aria-describedby="basic-addon1" onfocus="this.value = '';" onblur="if (this.value == '') {this.value = 'Confirm Password';}" required=""/>
							<div className="clearfix"></div>
						</div>
						<input type="submit" value="Submit"/> <br/>
						{msg} 
					</form>
					
				</div>
				</div>
			</div>
		</>
		
  
    )
}
export default Register;