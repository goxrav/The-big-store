import { useContext, useState } from "react";
import { userContext } from "../App";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function AdminHeader() {
	const { udata, setudata } = useContext(userContext);
	const naviagte = useNavigate();
	const [sterm, setsterm] = useState();
	function onlogout() {
		setudata(null);
		sessionStorage.clear();
		naviagte("/");
	}
	function gotocart() {
		naviagte("/showcart");
	}
	function onsearch() {
		naviagte("/searchresults?s=" + sterm);
	}
	return (
		<>
			{
				udata === null ?
					<p><b>Welcome, Guest</b></p> :
					<p><b>Welcome, {udata.pname}</b></p>

			}

			<div className="header">

				<div className="container">

					<div className="logo">
						<h1 ><Link to="/adminhome"><b>T<br />H<br />E</b>Big Store<span>The Best Supermarket</span></Link></h1>
					</div>
					<div className="head-t">
						{
							udata === null ?

								<ul className="card">

									<li><Link to="/login"><i className="fa fa-user" aria-hidden="true"></i>Login</Link></li>
									<li><Link to="/register"><i className="fa fa-arrow-right" aria-hidden="true"></i>Register</Link></li>

								</ul> :
								<ul className="card">
									<li><Link to="about.html" ><i class="fa fa-file-text-o" aria-hidden="true"></i>Order History</Link></li>
									<li><Link to="shipping.html" ><i class="fa fa-ship" aria-hidden="true"></i>Shipping</Link></li>
									<li><Link to="wishlist.html" ><i className="fa fa-heart" aria-hidden="true"></i>Wishlist</Link></li>
									<li><Link to="/changepassword"><i className="fa fa-key" aria-hidden="true"></i>Change Password</Link></li>
									<li><button className="label label-primary" onClick={onlogout}>Logout</button></li>

								</ul>
						}

					</div>
					<div className="header-ri">
						<ul className="social-top">
							<li><Link to="#" className="icon facebook"><i className="fa fa-facebook" aria-hidden="true"></i><span></span></Link></li>
							<li><Link to="#" className="icon twitter"><i className="fa fa-twitter" aria-hidden="true"></i><span></span></Link></li>
							<li><Link to="#" className="icon pinterest"><i className="fa fa-pinterest-p" aria-hidden="true"></i><span></span></Link></li>
							<li><Link to="#" className="icon dribbble"><i className="fa fa-dribbble" aria-hidden="true"></i><span></span></Link></li>
						</ul>
					</div>


					<div className="nav-top">
						<nav className="navbar navbar-default" />

						<div className="navbar-header nav_2">
							<button type="button" className="navbar-toggle collapsed navbar-toggle1" data-toggle="collapse" data-target="#bs-megadropdown-tabs">
								<span className="sr-only">Toggle navigation</span>
								<span className="icon-bar"></span>
								<span className="icon-bar"></span>
								<span className="icon-bar"></span>
							</button>


						</div>

						<ol className="nav navbar-nav ">
							<li ><Link to="/adminhome" className="hyper "><span>Home</span></Link></li>


							<li><Link to="/managecategory" className="hyper"><span> Manage Category</span></Link></li>

							<li><Link to="/manageproduct" className="hyper"><span>Manage Product</span></Link></li>

							<li><Link to="/listofusers" className="hyper"><span>List of Users</span></Link></li>

							<li><Link to="/searchuser" className="hyper"><span>Search User</span></Link></li>

							<li><Link to="/vieworders" className="hyper"><span>Orders</span></Link></li>
						</ol>


					</div></div></div>



			<div className="cart" >
				{
					udata !== null ?
						<form className="last">
							<button className="w3view-cart" type="button" name="submit" value="" onClick={gotocart}>
								<i className="fa fa-cart-arrow-down" aria-hidden="true"></i>
							</button>
						</form> : null
				}
			</div>
			<div className="clearfix"></div>










			<div>

			</div>




		</>
	)
}
export default AdminHeader;