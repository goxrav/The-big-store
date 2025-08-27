import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Slide } from "react-slideshow-image";
import 'react-slideshow-image/dist/styles.css'
const spanStyle = {
  padding: '20px',
  background: '#efefef',
  color: '#000000'
}

const divStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundSize: 'cover',
  height: '400px'
}
const slideImages = [
  {
    url: 'images/ba.jpg',
    caption: 'Slide 1'
  },
  {
    url: 'images/ba1.jpg',
    caption: 'Slide 2'
  },
  {
    url: 'images/ba2.jpg',
    caption: 'Slide 2'

  }
];






function Home() {
  const navigate = useNavigate();
  const [sterm, setsterm] = useState();
  const [prodsdata, setprodsdata] = useState([]);
  async function fetchlatestprods() {
    try {
      const resp = await axios.get(`http://localhost:9000/api/fetchnewprods`)
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
  useEffect(() => {
    fetchlatestprods();
  }, [])



  function onsearch() {
    navigate("/searchproducts?s=" + sterm);
  }


  return (
    <>

      <div class="banner-top">
        <h3>Search</h3>
        <span className="search-form">
          <div class="container">
            <form action="#">
              <input type="search" name="Search" className="form-control" placeholder="Search for a Product" onChange={(e) => setsterm(e.target.value)} required="" />
              <div className="clearfix"></div>
            </form>
          </div>
          <button type="submit" className="btn btn-default search" aria-label="Center Align" align="left" onClick={onsearch}>
            <i className="fa fa-search" aria-hidden="true"> </i>
          </button>
        </span>
      </div>

      <div className="slide-container">
        <Slide>
          {slideImages.map((slideImage, index) => (
            <div key={index}>
              <div style={{ ...divStyle, 'backgroundImage': `url(${slideImage.url})` }}>
              </div>
            </div>
          ))}
        </Slide>
      </div>





      <div className="login">
        <div className="container">
          <div className="spec ">
            <h3>Special Offers</h3>
            <div class="ser-t">
              <b></b>
              <span><i></i></span>
              <b className="line"></b>
            </div>
            <br /><br />

            {
              prodsdata.length > 0 ?
                prodsdata.map((item, index) =>
                  <div className="col-md-3 pro-1" key={index}>

                    {/* <div className="col-m"> */}
                    <figure>

                      <Link to={`/details?pid=${item._id}`}>
                        <img title=" " alt=" " src={`Uploads/${item.picture}`} height='125' width="100" />
                        <p>{item.prodname}</p>
                      </Link>
                    </figure>
                  </div>





                ) : <h2>No products found</h2>
            }
          </div>
        </div>


      </div>







    </>

  )
}
export default Home;