import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";



function SearchProducts()
{
    const [params]= useSearchParams();
    const sterm=params.get("s");
    const [prodsdata,setprodsdata]=useState([]);
    useEffect(()=>
    {
        if(sterm!=="")
            {
                searchprods();
            }
    },[sterm])

    async function searchprods()
    {
        try
        {
            const resp= await axios.get(`http://localhost:9000/api/searchproducts?q=${sterm}`)
            if(resp.status===200)
            {
                if(resp.data.statuscode===1)
                {
                    setprodsdata(resp.data.proddata)
                }
                else
                {
                    setprodsdata([]);
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
    return(
<>
<div className="login">
                <div className="container">
                    {
                        prodsdata.length>0?
                        prodsdata.map((item, index) =>
                            <div className="col-md-3 pro-1" key={index}>
                                <div className="col-m">
                                    
                                            <figure>
                                                
                                                        <Link to={`/details?pid=${item._id}`}>
                                                            <img title=" " alt=" " src={`Uploads/${item.picture}`} height='125'/>
                                                            <p>{item.prodname}</p>
                                                        </Link>
                                                    
                                                
                                            </figure>
                                        
                                    </div>
                                </div>
                            
                        ):<h2>No products found</h2>
                    }


                </div>
            </div>

</>


    )
}
export default SearchProducts;