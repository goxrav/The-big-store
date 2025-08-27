import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
function Categories() {
    const [catdata, setcatdata] = useState([]);
    async function fetchallcat() {
        try {
            const resp = await axios.get("http://localhost:9000/api/getallcat")
            if (resp.status === 200) {
                setcatdata(resp.data.catdata)
            }
            else {
                alert("Some error occured")
            }
        }
        catch (err) {
            alert(err.message);
        }
    }
    useEffect(() => {
        fetchallcat();

    }, []

    )
    return (
        <>
            <div className="banner-top">
                <div className="container">
                    <h3 >Categories</h3>
                    <h4><Link to="/">Home</Link><label>/</label>Categories</h4>
                    <div className="clearfix"> </div>
                </div>
            </div>

            <div className="login">
                <div className="container">

                    {
                        catdata.map((item, index) =>
                            <div className="col-md-3 pro-1" key={index} >
                        <div className="col-m">
                                            <figure>
                                                
                                                        <Link to={`/products?cat=${item._id}`}>
                                                            <img title=" " alt=" " src={`Uploads/${item.catpic}`} height='125' />
                                                            <h4>{item.catname}</h4>
                                                        </Link>
                                                   
                                            </figure>
                                        </div>
                                    </div>
                                
                            
                        )
                    }


                </div>
            </div>
            

        </>
    )
}
export default Categories;