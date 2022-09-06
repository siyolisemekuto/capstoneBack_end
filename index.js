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
    <h1>All Endpoints Available my API</h1>
    <h2>Users Route:</h2>
    <ul>
        <li><span>POST</span><a href="https://capstone-mood-tracker.herokuapp.com/users">/register</a>
        <li><span>POST</span><a href="https://capstone-mood-tracker.herokuapp.com/users">/login</a></li>
        <li><span>GET</span><a href="https://capstone-mood-tracker.herokuapp.com/users">/verify</a></li>
        <li><span>GET</span><a href="https://capstone-mood-tracker.herokuapp.com/users">/:id</a></li>
        <li><span>GET</span><a href="https://capstone-mood-tracker.herokuapp.com/users">/</a></li>
        <li><span>DELETE</span><a href="https://capstone-mood-tracker.herokuapp.com/users">/:id</a></li></li>
        <li><span>POST</span><a href="https://capstone-mood-tracker.herokuapp.com/users">/forgot-psw</a></li></li>
        <li><span>PUT</span><a href="https://capstone-mood-tracker.herokuapp.com/users">/:id</a></li></li>
        <li><span>PUT</span><a href="https://capstone-mood-tracker.herokuapp.com/users">/reset-psw/:id</a></li></li>
    </ul>
    <h2>Moods:</h2>
        <ul>
            <li><span>POST</span><a href="https://capstone-mood-tracker.herokuapp.com/users/:id">/log-mood</a>
            <li><span>PUT</span><a href="https://capstone-mood-tracker.herokuapp.com/users/:id">/edit/:id</a></li>
            <li><span>GET</span><a href="https://capstone-mood-tracker.herokuapp.com/users/:id">/view/:id</a></li>
            <li><span>GET</span><a href="https://capstone-mood-tracker.herokuapp.com/users/:id">/:id/view-all</a></li>
        </ul> 
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