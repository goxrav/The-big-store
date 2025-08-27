import { Route, Routes } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
import SearchUser from "./SearchUser";
import ListofUsers from "./ListofUsers";
import Changepassword from "./Changepassword";
import ManageCategory from "./ManageCategory";
import ManageProduct from "./ManageProduct";
import Categories from "./Categories";
import AdminHome from "./AdminHome";
import Contact from "./Contact";
import Products from "./Products";
import Details from "./Details";
import Showcart from "./Showcart";
import OrderItems from "./OrderItems";
import Checkout from "./Checkout";
import OrderSummary from "./OrderSummary";
import ViewOrders from "./ViewOrders";
import OrderHistory from "./OrderHistory";
import UpdateStatus from "./UpdateStatus";
import SearchProducts from "./SearchProducts";

function Projectroutes()
{
    return(
        <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/homepage" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/searchuser" element={<SearchUser/>}/>
          <Route path="/listofusers" element={<ListofUsers/>}/>
          <Route path="/changepassword" element={<Changepassword/>}/>
          <Route path="/managecategory" element={<ManageCategory/>}/>
          <Route path="/manageproduct" element={<ManageProduct/>}/>
          <Route path="/categories" element={<Categories/>}/>
          <Route path="/products" element={<Products/>}/>
          <Route path="/adminhome" element={<AdminHome/>}/>
          <Route path="/contact" element={<Contact/>}/>
          <Route path="/details" element={<Details/>}/>
          <Route path="/showcart" element={<Showcart/>}/>
          <Route path="/orderitems" element={<OrderItems/>}/>
          <Route path="checkout" element={<Checkout/>}/>
          <Route path="ordersummary" element={<OrderSummary/>}/>
          <Route path="vieworders" element={<ViewOrders/>}/>
          <Route path="orderhistory" element={<OrderHistory/>}/>
          <Route path="updatestatus" element={<UpdateStatus/>}/>
          <Route path="searchproducts" element={<SearchProducts/>}/>
          
        </Routes>
    )
}
export default Projectroutes;