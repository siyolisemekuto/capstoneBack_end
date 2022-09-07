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
    <table>
        <tr>
        <td>POST</td>
        <td><a href="https://capstone-mood-tracker.herokuapp.com/users"></a><td>
        <td>/register<td>
        </tr>
        <tr>
        <td>POST</td>
        <td><a href="https://capstone-mood-tracker.herokuapp.com/users"></a></td>
        <td>/login</td>
        </tr>
        <tr>
        <td>GET</td>
        <td><a href="https://capstone-mood-tracker.herokuapp.com/users"></a></td>
        <td>/verify<td>
        </tr>
        <tr>
        <td>GET</td>
        <td><a href="https://capstone-mood-tracker.herokuapp.com/users"></a></td>
        <td>/:id</td>
        </tr>
        <tr>
        <td>GET</td>
        <td><a href="https://capstone-mood-tracker.herokuapp.com/users"></a></td>
        <td>/</td>
        </tr>
        <tr>
        <td>DELETE</td>
        <td><a href="https://capstone-mood-tracker.herokuapp.com/users"></a></td>
        <td>/:id</td>
        </tr>
        <tr>
        <td>POST</td>
        <td><a href="https://capstone-mood-tracker.herokuapp.com/users"></a></td>
        <td>/forgot-psw</td>
        </tr>
        <tr>
        <td>PUT</td>
        <td><a href="https://capstone-mood-tracker.herokuapp.com/users"></a></td>
        <td>/:id</td>
        </tr>
        <tr>
        <td>PUT</td>
        <td><a href="https://capstone-mood-tracker.herokuapp.com/users"></a></td>
        <td>/reset-psw/:id</td>
        </tr>
    </table>
    <h2>Moods:</h2>
        <table>
            <tr>
            <td>POST</td>
            <td><a href="https://capstone-mood-tracker.herokuapp.com/users/:id"></a></td>
            <td>/log-mood</td>
            </tr>
            <tr>
            <td>PUT</td>
            <td><a href="https://capstone-mood-tracker.herokuapp.com/users/:id"></a></td>
            <td>/edit/:id</td>
            </tr>
            <tr>
            <td>GET</td>
            <td><a href="https://capstone-mood-tracker.herokuapp.com/users/:id"></a></td>
            <td/view/:id</td>
            </tr>
            <tr>
            <td>GET</td>
            <td><a href="https://capstone-mood-tracker.herokuapp.com/users/:id"></a></td>
            <td>/:id/view-all</td>
            </tr>
        </table> 
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