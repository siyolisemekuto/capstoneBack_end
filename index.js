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
    res.send(`
    <div class="endpoints">
    <h1>All Endpoints Available my API</h1>
    <h2>Users Router:</h2>
    <table align=center>
        <tr>
        <td>POST</td>
        <td><a href="https://capstone-mood-tracker.herokuapp.com/users">/register</a></td>
        </tr>
        <tr>
        <td>POST</td>
        <td><a href="https://capstone-mood-tracker.herokuapp.com/users">/login</a></td>
        </tr>
        <tr>
        <td>GET</td>
        <td><a href="https://capstone-mood-tracker.herokuapp.com/users">/verify</a></td>
        </tr>
        <tr>
        <td>GET</td>
        <td><a href="https://capstone-mood-tracker.herokuapp.com/users">/:id</a></td>
        </tr>
        <tr>
        <td>GET</td>
        <td><a href="https://capstone-mood-tracker.herokuapp.com/users">/</a></td>
        </tr>
        <tr>
        <td>DELETE</td>
        <td><a href="https://capstone-mood-tracker.herokuapp.com/users">/:id</a></td>
        </tr>
        <tr>
        <td>POST</td>
        <td><a href="https://capstone-mood-tracker.herokuapp.com/users">/forgot-psw</a></td>
        </tr>
        <tr>
        <td>PUT</td>
        <td><a href="https://capstone-mood-tracker.herokuapp.com/users">/:id</a></td>
        </tr>
        <tr>
        <td>PUT</td>
        <td><a href="https://capstone-mood-tracker.herokuapp.com/users">/reset-psw/:id</a></td>
        </tr>
    </table>
    <h2>Moods Router:</h2>
        <table align="center">
            <tr>
            <td>POST</td>
            <td><a href="https://capstone-mood-tracker.herokuapp.com/users/:id">/log-mood</a></td>
            </tr>
            <tr>
            <td>PUT</td>
            <td><a href="https://capstone-mood-tracker.herokuapp.com/users/:id">/edit/:id</a></td>
            </tr>
            <tr>
            <td>GET</td>
            <td><a href="https://capstone-mood-tracker.herokuapp.com/users/:id">/view/:id</a></td>
            </tr>
            <tr>
            <td>GET</td>
            <td><a href="https://capstone-mood-tracker.herokuapp.com/users/:id">/:id/view-all</a></td>
            </tr>
        </table> 
        </div>

        <style>
        table, td {
            border: 1px solid;
          }
        table{
            width:50%;
        }
        .endpoints{
            text-align:center;
        }
        </style>
    `)
})
 

//implementation of routes
//route link (this file for this url)
app.use("/users", usersRoutes);
app.use("/users/:id",moodsRoutes);


app.listen(app.get("port"),() =>{
    console.log(`Listening for calls on port ${app.get("port")}`);
    console.log("Press Ctrl+C to exit server");
 })