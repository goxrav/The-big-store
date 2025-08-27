import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";

function Products() {
    const [params] = useSearchParams();
    const catid = params.get("cat");
    const [prodsdata, setprodsdata] = useState([]);
    useEffect(() => {
        if (catid !== "") {
            fetchprodsbycat();
        }
    }, [catid])

    async function fetchprodsbycat() {
        try {
            const resp = await axios.get(`http://localhost:9000/api/fetchprodsbycatid?cid=${catid}`)
            if (resp.status === 200) {
                if (resp.data.statuscode === 1) {
                    setprodsdata(resp.data.proddata)
                }
                else {
                    setprodsdata([]);
                }
            }
            else {
                alert("Some error occured")
            }
        }
        catch (err) {
            alert(err.message);
        }
    }
    return (
        <>
            <div className="login">
                <div className="container">
                    <div class="spec ">
                        <h3>Products</h3>
                        <div class="ser-t">
                            <b></b>
                            <span><i></i></span>
                            <b class="line"></b>
                        </div>
                        <br/><br/>

                        {
                            prodsdata.length > 0 ?
                                prodsdata.map((item, index) =>
                                    <div className="col-md-3 pro-1" key={index}>

                                        <div className="col-m">

                                            <figure>

                                                <Link to={`/details?pid=${item._id}`}>
                                                    <img title=" " alt=" " src={`Uploads/${item.picture}`} height='125' />
                                                    <p>{item.prodname}</p>
                                                </Link>


                                            </figure>
                                        </div>
                                    </div>



                                ) : <h2>No products found</h2>
                        }

                    </div>
                </div>

            </div>

























        </>



    )
}
export default Products;