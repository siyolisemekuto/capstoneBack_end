const express = require("express")
cors = require("cors")


// Configure Server
const app = express(); // Initialize express as an app variable
app.use(
  cors({
    origin: ["http://127.0.0.1:8080", "http://localhost:8080"],
    credentials: true,
  })
); // Dont let local development give errors
app.set("port", process.env.PORT || 3000); // Set the port
app.use(express.json()); // Enable the server to handle JSON requests
// app.use(express.static("public")); // Static
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});
//app must get data from this port aka plug



//importing routes
const usersRoutes = require("./router/usersRoutes");
const moodsRoutes = require("./router/moodsRoutes");

//get to front-end
app.get("/", (req,res) =>{
    //msg will show database is connected
    res.json({msg:"We are here!!"})
})
app.get("/reset-psw-form/:id", (req,res) =>{
 res.send(
`  
<form >
    <label for="newPassword">new password </label>
    <input id="newPassword" type="password" name="password">
   <button onclick="Reset(${req.params.id})">submit</button>
</form>
<script>
 const Reset = async (id) => {

 const res = await fetch("http://localhost:3000/users/reset-psw/" + id,{
    method:"PUT",
    body:JSON.stringify({
     password:document.getElementById("newPassword").value
    }),
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
 });
 const resetdata = res.json
 console.log(resetdata);
 localStorage.setItem("password",JSON.stringify(resetdata))
}
</script>
` 
 )
}) 

//implementation of routes
//route link (this file for this url)
app.use("/users", usersRoutes);
app.use("/users/:id", moodsRoutes);


app.listen(app.get("port"),() =>{
    console.log(`Listening for calls on port ${app.get("port")}`);
    console.log("Press Ctrl+C to exit server");
 })