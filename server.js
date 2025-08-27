const express = require('express')
const app = express()
const port = 9000
app.use(express.json());

var cors = require('cors')
app.use(cors())
const fs = require('fs')
const multer = require('multer')
let mystorage = multer.diskStorage(
    {
        destination: (req, file, cb) => {
            cb(null, "public/Uploads");
        },
        filename: (req, file, cb) => {
            var picname = Date.now() + file.originalname;
            cb(null, picname);
        }
    }
);
let upload = multer({ storage: mystorage });

const mongoose = require('mongoose');
const { pid } = require('process');
const { version } = require('os');
const { default: axios } = require('axios');
mongoose.connect('mongodb://127.0.0.1:27017/projectdb').then(() => console.log('connected to mongodb'));
var registerSchema = new mongoose.Schema(
    {
        pname: String, uname: String,
        email: { type: String, unique: true },
        password: String,usertype:String
    },
    { versionKey: false })

var RegisterModel = mongoose.model("register", registerSchema, "register"); //clone table //internal name,schema name,real collection name

app.post("/api/register", async (req, res) => {
    res.send({ msg: "Registeration Succesfull" })

    var newrecord = new RegisterModel({ pname: req.body.pname, uname: req.body.uname, email: req.body.eml, password: req.body.pass,usertype:"normal" }) //it will create a temp record


    var result = await newrecord.save();  //it will save record in real collection


    if (result) {
        res.status(200).send({ statuscode: 1, msg: "Registeration Succesfull" })
    }
    else {
        res.status(500).send({ statuscode: 0, msg: "Registeration Failed" })
    }
})

app.post("/api/login", async (req, res) => {
    var result = await RegisterModel.find({ email: req.body.eml, password: req.body.pass }).select("-password")
    if (result.length === 0) {
        res.status(200).send({ statuscode: 0 })
    }
    else {
        res.status(200).send({ statuscode: 1, pdata: result[0] })

    }
})

app.get("/api/searchuser",async(req,res)=>
    {
        var result = await RegisterModel.find({username:req.query.uname})
        //result will become an array because find function returns an array
        if(result.length===0)
        {
            res.status(200).send({statuscode:0})
        }
        else
        {
            res.status(200).send({statuscode:1,searchdata:result})
        }    
    })
    
app.get("/api/getallusers", async (req, res) => {
    var result = await RegisterModel.find();
    if (result.length === 0) {
        res.status(200).send({ statuscode: 0 })
    }
    else {
        res.status(200).send({ statuscode: 1, membsdata: result })
    }
}

)


app.delete("/api/deluser/:uid", async (req, res) => {
    var result = await RegisterModel.deleteOne({ _id: req.params.uid })
    if (result.deletedCount === 1) {
        res.status(200).send({ statuscode: 1 })
    }
    else {
        res.status(200).send({ statuscode: 0 })
    }
})

app.put("/api/changepassword", async (req, res) => {
    try {
        var updateresult = await RegisterModel.updateOne({ Username: req.body.uname, password: req.body.currpass }, { $set: { password: req.body.newpass } });
        if (updateresult.modifiedCount === 1) {
            res.status(200).send({ statuscode: 1 })
        }
        else {
            res.status(200).send({ statuscode: 0 })
        }
    }
    catch (e) {
        console.log(e);
        res.status(500).send({ statuscode: -1, msg: "Some error occured" })
    }
})



var catSchema = mongoose.Schema({ catname: String, catpic: String }, { versionKey: false })
var CatModel = mongoose.model("category", catSchema, "category");
app.post("/api/savecategory", upload.single('catpic'), async (req, res) => {
    var picturename;
    if (!req.file) {
        picturename = "noimage.jpg";
    }
    else {
        picturename = req.file.filename;
    }
    var newrecord = new CatModel({ catname: req.body.catname, catpic: picturename })
    var result = await newrecord.save();
    if (result) {
        res.status(200).send({ statuscode: 1 })
    }
    else {
        res.status(200).send({ statuscode: 0 })
    }
})
app.get("/api/getallcat", async (req, res) => {
    var result = await CatModel.find();
    if (result.length === 0) {
        res.status(200).send({ statuscode: 0 })
    }
    else {
        res.status(200).send({ statuscode: 1, catdata: result })
    }
})



app.put("/api/updatecategory", upload.single('catpic'), async (req, res) => {
    try {
        var picturename;
        if (!req.file) {
            picturename = req.body.oldpicname;//it will save current picname in this variable
        }
        else {
            picturename = req.file.filename;

            if (req.body.oldpicname !== "noimage.jpg") {
                fs.unlinkSync(`public/Uploads/${req.body.oldpicname}`);
            }
        }

        var updateresult = await CatModel.updateOne({ _id: req.body.cid }, { $set: { catname: req.body.catname, catpic: picturename } });

        if (updateresult.modifiedCount === 1) {
            res.status(200).send({ statuscode: 1 })
        }
        else {
            res.status(500).send({ statuscode: 0 })
        }
    }
    catch (e) {
        console.log(e);
        res.status(500).send({ statuscode: -1, msg: "Some error occured" })
    }
})

app.delete("/api/delcategory/:id", async (req, res) => {
    var result = await CatModel.deleteOne({ _id: req.params.id })
    if (result.deletedCount === 1) {
        res.status(200).send({ statuscode: 1 })
    }
    else {
        res.status(200).send({ statuscode: 0 })
    }
})


    app.get("/api/listofusers", async (req, res) => {
        var result = await RegisterModel.find();
        if (result.length === 0) {
            res.status(200).send({ statuscode: 0 })
        }
        else {
            res.status(200).send({ statuscode: 1, membsdata: result })
        }
    })

   var prodSchema= mongoose.Schema({catid:String,prodname:String,Rate:Number,Discount:Number,Stock:Number,Description:String,picture:String,addedon:String},{versionKey:false})

   var ProdModel=mongoose.model("product",prodSchema,"product");
   app.post("/api/saveproduct",upload.single('picture'),async(req,res)=>
{
    var picturename;
    if(!req.file)
    {
        picturename="noimage.jpg";
    }
    else
    {
        picturename=req.file.filename;
    }
    var newrecord = new ProdModel({catid:req.body.catid,prodname:req.body.prodname,Rate:req.body.rate,Discount:req.body.dis,Stock:req.body.stock,Description:req.body.descp,picture:picturename,addedon:new Date()}) 
    var result= await newrecord.save();
    if(result)
    {
        res.status(200).send({statuscode:1})
    }
    else
    {
        res.status(200).send({statuscode:0})
    }

})

app.get("/api/fetchprodsbycatid",async(req,res)=>
{
var result= await ProdModel.find({catid:req.query.cid})
if(result.length===0)
    {
        res.status(200).send({statuscode:0})
    }
    else
    {
        res.status(200).send({statuscode:1,proddata:result})
    }
})
app.get("/api/getproddetails",async(req,res)=>
{

    var result= await ProdModel.find({_id:req.query.pid})
    if(result.length===0)
    {
        res.status(200).send({statuscode:0})
    }
    else
    {
        res.status(200).send({statuscode:1,proddata:result[0]})
    }
})

var cartSchema= mongoose.Schema({pid:String,picture:String,Prodname:String,Rate:Number,Qty:Number,Totalcost:Number,email:String},{versionKey:false})

var CartModel= mongoose.model("cart",cartSchema,"cart")
app.post("/api/savetocart",async(req,res)=>
{
    var newrecord= new CartModel({pid:req.body.pid,picture:req.body.picture,Prodname:req.body.prodname,Rate:req.body.rate,Qty:req.body.qty,Totalcost:req.body.tc,email:req.body.email})
    var result= await newrecord.save();
    if(result)
    {
        res.status(200).send({statuscode:1})
    }
    else
    {
        res.status(200).send({statuscode:0}) 
    }
}    )

app.get("/api/getcart",async(req,res)=>
{
    try{
        var result= await CartModel.find({email:req.query.email})
        if(result.length===0)
        {
            res.status(200).send({statuscode:0})
        }
        else
        {
            res.status(200).send({statuscode:1,cartinfo:result})
        }
    }
    catch(e)
    {
        res.status(500).send({statuscode:-1,errmsg:e.message})
    }
})

var orderSchema= mongoose.Schema({saddress:String,billamt:Number,email:String,PayMode:String,OrderDate:String,CartDetails:Object,OrderProducts:[Object],status:String},{versionKey:false})

var OrderModel= mongoose.model("finalorder",orderSchema,"finalorder");
app.post("/api/saveorder",async(req,res)=>
{
    var newrecord= new OrderModel({saddress:req.body.saddr,billamt:req.body.tbill,email:req.body.email,OrderDate:new Date(),PayMode:req.body.pmode,CardDetails:req.body.carddetails,OrderProducts:req.body.cartinfo,status:"Payment received, processing"})
    var result = await newrecord.save();

    if(result)
    {
        res.status(200).send({statuscode:1})
    }
    else
    {
        res.status(200).send({statuscode:0})
    }    
})
app.get("/api/getallorders",async(req,res)=>
{
    var result= await OrderModel.find().sort({"OrderDate":-1})
    if(result.length===0)
        {
            res.status(200).send({statuscode:0})
        }
        else
        {
            res.status(200).send({statuscode:1,ordersdata:result})
        }    
})
app.put("/api/updatestock",async(req,res)=>
{
    try{
        var cartdata= req.body.cartinfo;
        for(var x=0;x<cartdata.length;x++)
        {
            var updateresult = await ProdModel.updateOne({_id: cartdata[x].pid}, {$inc:{"Stock":-cartdata[x].Qty}});
        }
        if(updateresult.modifiedCount===1)
        {
            res.status(200).send({statuscode:1})
        }
        else
        {
            res.status(200).send({statuscode:0})
        }
    }
    catch(e)
    {
        // console.log(e);
        res.status(500).send({statuscode:-1,msg:"Some error occured"})
    }
        })
        app.delete("/api/deletecart",async(req,res)=>
        {
            var result= await CartModel.deleteMany({email:req.query.email})
            if(result.deletedCount>=1)
                {
                    res.status(200).send({statuscode:1})
                }
                else
                {
                    res.status(200).send({statuscode:0})
                }    
        })
        app.get("/api/getorderid",async(req,res)=>
        {
            try
            {
                var result= await OrderModel.findOne({email:req.query.email}).sort({"OrderDate":-1});
                if(result)
                {
                    res.status(200).send({statuscode:1,orderdata:result}) 
                }
                else
                {
                    res.status(200).send({statuscode:0})
                }
            }
            catch(e)
            {
                res.status(500).send({statuscode:-1,errmsg:e.message}) 
            }
        })
        app.get("/api/getuserorders",async(req,res)=>
            {
                var result = await OrderModel.find({email:req.query.email}).sort({"OrderDate":-1})
            
                if(result.length===0)
                {
                    res.status(200).send({statuscode:0})
                }
                else
                {
                    res.status(200).send({statuscode:1,ordersdata:result})
                }    
            })
            app.get("/api/searchproducts",async(req,res)=>
            {
                var searchtext=req.query.q;
                var result= await ProdModel.find({prodname: { $regex: '.*' + searchtext ,$options:'i' }})
                if(result.length===0)
                    {
                        res.status(200).send({statuscode:0})
                    }
                    else
                    {
                        res.status(200).send({statuscode:1,proddata:result})
                    }    
                })
            
            
            
                app.get("/api/fetchnewprods",async(req,res)=>
                    {
                        var result = await ProdModel.find().sort({"addedon":-1}).limit(4)
                        //result will become an array because find function returns an array
                        if(result.length===0)
                        {
                            res.status(200).send({statuscode:0})
                        }
                        else
                        {
                            res.status(200).send({statuscode:1,proddata:result})
                        }    
                    })
                    app.delete("/api/delcartitem/:uid",async(req,res)=>
                        {
                            var result = await CartModel.deleteOne({_id:req.params.uid})
                            if(result.deletedCount===1)
                            {
                                res.status(200).send({statuscode:1})
                            }
                            else{
                                res.status(200).send({statuscode:0})
                            }
                        })  
                               
                        app.put("/api/updatestatus",async(req,res)=>
                        {
                            try
                        {
                            var updateresult = await OrderModel.updateOne({_id: req.body.orderid}, { $set: {status:req.body.newst}});
                    
                            if(updateresult.modifiedCount===1)
                            {
                                res.status(200).send({statuscode:1})
                            }
                            else
                            {
                                res.status(200).send({statuscode:0})
                            }
                        }
                        catch(e)
                        {
                            console.log(e);
                            res.status(500).send({statuscode:-1,msg:"Some error occured"})
                        }
                   } )

                   app.get("/api/getorderproducts",async(req,res)=>
                    {
                        var result = await OrderModel.findOne({_id:req.query.orderno});
                        if(result.length===0)
                        {
                            res.status(200).send({statuscode:0})
                        }
                        else
                        {
                            res.status(200).send({statuscode:1,items:result.OrderProducts})
                        }    
                    })             
                    
                        
                    app.put("/api/updateproduct", upload.single('pic'), async (req, res) => {
                        try {
                            var picturename;
                            if (!req.file) {
                                picturename = req.body.oldpicname;//it will save current picname in this variable
                            }
                            else {
                                picturename = req.file.filename;
                    
                                if (req.body.oldpicname !== "noimage.jpg") {
                                    fs.unlinkSync(`public/Uploads/${req.body.oldpicname}`);
                                }
                            }
                    
                            var updateresult = await ProdModel.updateOne({ _id: req.body.pid }, { $set: { catid:req.body.cid,prodname:req.body.prodname,rate:req.body.rate,discount:req.body.dis,Stock:req.body.stock,Description:req.body.descp,picture:picturename } });
                    
                            if (updateresult.modifiedCount === 1) {
                                res.status(200).send({ statuscode: 1 })
                            }
                            else {
                                res.status(500).send({ statuscode: 0 })
                            }
                        }
                        catch (e) {
                            console.log(e);
                            res.status(500).send({ statuscode: -1, msg: "Some error occured" })
                        }
                    })
                                          
                        
                        
                        
                     



    
    
    
    








    
    

app.listen(port, () => {
    console.log("server is running on port " + port);
})
