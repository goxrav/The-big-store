import axios from "axios";
import { useState } from "react"
import { Link} from "react-router-dom"
function SearchUser() {
    const [uname,setuname]=useState();
    const [msg,setmsg]=useState();
    const [flag,setflag]=useState(false);
    const [udata,setudata]= useState({});
    async function searchuser(e)
    {
        e.preventDefault();
        try
        {
            const resp =  await axios.get(`http://localhost:9000/api/searchuser?un=${uname}`)
            if(resp.status===200)
            {
                if(resp.data.statuscode===0)
                {
                    setmsg("Incorrect Username");
                    setflag(false)
                }
                else if(resp.data.statuscode===1)
                {
                    setmsg("");
                    setflag(true)
                    setudata(resp.data.searchdata[0])
                }
            }
            else
            {
                setmsg("Some error occured");
            }
        }
        catch(err)
        {
            alert(err.message)
        }
    }
    return (
        <>
             <div className="banner-top">
            <div className="container">
                <h3 >Search User</h3>
                <h4><Link to="/adminhome">Home</Link><label>/</label>Search User</h4>
                <div className="clearfix"> </div>
            </div>
        </div>
            <div className="login">
                <div className="main-agileits">
                <div className="form-w3agile">
                    <h2>Search User</h2>

                        <form name="form1" onSubmit={searchuser}>
                        <div className="key">
                            <i className="fa fa-envelope" aria-hidden="true"></i>
                            <input type="text" placeholder="Username" className="form-control" name="username" onChange={(e) => setuname(e.target.value)} onfocus="this.value = '';" onblur="if (this.value == '') {this.value = 'username';}" required="" />
                            <div className="clearfix"></div>




                            

                        </div>
            <input type="submit" name="btn" value="Search" /><br/>
            {msg}
            {
                flag?
                <>
                    <b>Name:-</b>{udata.pname}  <br/>
                    <b>Email:-</b>{udata.email} <br/>
                </>:null
            }
                        </form>
                    </div>
                </div>
            </div>
            
        </>
    )
}
export default SearchUser