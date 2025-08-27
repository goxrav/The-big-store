const { Link } = require("react-router-dom")

function Contact()
{
    return(
<>
<div className="banner-top">
	<div className="container">
		<h3 >Contact</h3>
		<h4><Link to="/">Home</Link><label>/</label>Contact</h4>
		<div className="clearfix"> </div>
	</div>
</div>


<div className="contact">
	<div className="container">
		<div className="spec ">
			<h3>Contact</h3>
				<div className="ser-t">
					<b></b>
					<span><i></i></span>
					<b className="line"></b>
				</div>
		</div>
		<div className=" contact-w3">	
			<div className="col-md-5 contact-right">	
				<img src="images/cac.jpg" className="img-responsive" alt=""/>
				</div>
			<div className="col-md-7 contact-left">
				<h4>Contact Information</h4>
				<p> Nemo enim ipsam voluptatem quia voluptas sit aspernatur 
				aut odit aut fugit, sed quia consequuntur magni dolores eos
				qui ratione voluptatem sequi nesciunt. Neque porro quisquam 
				est, qui dolorem ipsum quia dolor sit amet, consectetur</p>
				<ul className="contact-list">
					<li> <i className="fa fa-map-marker" aria-hidden="true"></i> 756 Global Place, New York.</li>
					<li><i className="fa fa-envelope" aria-hidden="true"></i><a href="mailto:example@mail.com">mail@example.com</a></li>
					<li> <i className="fa fa-phone" aria-hidden="true"></i>+123 2222 222</li>
				</ul>
				<div id="container">
					
					<div id="parentHorizontalTab">
						<ul className="resp-tabs-list hor_1">
							<li><i className="fa fa-envelope" aria-hidden="true"></i></li>
							<li> <i className="fa fa-map-marker" aria-hidden="true"></i> </li>
							<li> <i className="fa fa-phone" aria-hidden="true"></i></li>
						</ul>
						<div className="resp-tabs-container hor_1">
							<div>
								<form >
									<input type="text"  name="Name" onfocus="this.value = '';" onblur="if (this.value == '') {this.value = 'Name';}" required=""/>
									<input type="email"  name="Email" onfocus="this.value = '';" onblur="if (this.value == '') {this.value = 'Email';}" required=""/>
									<textarea name="Message..." onfocus="this.value = '';" onblur="if (this.value == '') {this.value = 'Message...';}" required="">Message...</textarea>
									<input type="submit" value="Submit" />
								</form>
							</div>
							<div>
								<div className="map-grid">
								<h5>Our Branches</h5>
									<ul>
										<li><i className="fa fa-arrow-right" aria-hidden="true"></i>756 Global Place, New York.</li>
										<li><i className="fa fa-arrow-right" aria-hidden="true"></i>889 diamond street, USA.</li>
										<li><i className="fa fa-arrow-right" aria-hidden="true"></i>756 global Place, New York.</li>
										<li><i className="fa fa-arrow-right" aria-hidden="true"></i>889 diamond street, USA.</li>
									</ul>
								</div>
							</div>
							<div>
								<div className="map-grid">
									<h5>Contact Me Through</h5>
									<ul>
										<li>Mobile No : +123 456 7890</li>
										<li>Office No : +123 222 2222</li>
										<li>Home No : +123 456 7890</li>
										<li>Fax No : +123 456 7890</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
</div>
</div>
</div>
</div>









</>




    )
    
}
export default Contact;