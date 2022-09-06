const express = require("express")
cors = require("cors")



// Configure Server
const app = express(); // Initialize express as an app variable
// app.use(
//   cors({
//     origin: ["http://127.0.0.1:8080", "http://localhost:8080"],
//     credentials: true,
//   })
// ); // Dont let local development give errors
app.set("port", process.env.PORT || 3000); // Set the port
app.use(express.json()); // Enable the server to handle JSON requests
// app.use(express.static("public")); // Static
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Allow-Credentials', true);
  // handle OPTIONS method
  if ('OPTIONS' == req.method) {
      return res.sendStatus(200);
  } else {
      next();
}
});
//app must get data from this port aka plug



//importing routes
const usersRoutes = require("./router/usersRoutes");
const moodsRoutes = require("./router/moodsRoutes");

//get to front-end
app.get("/", (req,res) =>{
    //msg will show database is connected
    res.json({msg:`
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body{
            display: flex;
            flex-flow: column wrap;
            align-items: center;
            min-width: 99vw;
            background: linear-gradient(-45deg, #080808, #303330, #D58E23, #343A39);
            color: #FFFFFF;
        }
        ul{
            list-style: none;
            font-size: 1.17em;
            padding: 0;
        }
        li{
            display: flex;
            width: 325px;
            margin: 2.5px 2.5px 2.5px 2.5px;
            justify-content: space-between;
            border-bottom: 1px solid black;
            transition: all 0.75s;
        }
        li:hover{
            width: 350px;
            background-color: #CECECE;
            transition: all 0.75s;
        }
        h1{
            border-top: 1px solid black;
            border-bottom: 1px solid black;
            padding: 15px 0 15px 0;
        }
        @keyframes gradient {
         0% {
          background-position: 0% 50%;
             }
             50% {
                background-position: 100% 50%;
             }
  100% {
    background-position: 0% 50%;
  }}
    </style>
    <title>All Endpoints</title>
</head>
<body>
    <h1>All Endpoints Available my API</h1>
    <h2>Users:</h2>
    <ul>
        <li><span>GET</span>    <a href="https://vinyl2api.herokuapp.com/users">/users</a>
        <li><span>GET</span>     <a href="https://vinyl2api.herokuapp.com/users">/users/:id</a></li>
        <li><span>POST</span>    <a href="https://vinyl2api.herokuapp.com/users">/users</a></li>
        <li><span>PATCH</span>   <a href="https://vinyl2api.herokuapp.com/users">/users</a></li>
        <li><span>PUT</span>     <a href="https://vinyl2api.herokuapp.com/users">/users/:id</a></li>
        <li><span>DELETE</span>  <a href="https://vinyl2api.herokuapp.com/users">/users/:id</a></li>
        <li><span>GET</span>     <a href="https://vinyl2api.herokuapp.com/users">/users/:id/cart</a></li></li>
        <li><span>POST</span>    <a href="https://vinyl2api.herokuapp.com/users">/users/:id/cart</a></li></li>
        <li><span>PUT</span>     <a href="https://vinyl2api.herokuapp.com/users">/users/:id/cart</a></li></li>
        <li><span>DELETE</span>  <a href="https://vinyl2api.herokuapp.com/users">/users/:id/cart</a></li></li>
    </ul>
    <h2>Products:</h2>
        <ul>
            <li><span>GET</span>      <a href="https://vinyl2api.herokuapp.com/products"> /products</a>
            <li><span>GET</span>      <a href="https://vinyl2api.herokuapp.com/products"> /products/</a></li>
            <li><span>POST</span>     <a href="https://vinyl2api.herokuapp.com/products"> /products/</a></li>
            <li><span>PUT</span>      <a href="https://vinyl2api.herokuapp.com/products"> /products/:id</a></li>
            <li><span>DELETE</span>   <a href="https://vinyl2api.herokuapp.com/products"> /products/:id</a></li>
        </ul>
</body>
</html>
    `})
})
 

//implementation of routes
//route link (this file for this url)
app.use("/users", usersRoutes);
app.use("/users/:id",moodsRoutes);


app.listen(app.get("port"),() =>{
    console.log(`Listening for calls on port ${app.get("port")}`);
    console.log("Press Ctrl+C to exit server");
 })