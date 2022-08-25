const express = require("express")
cors = require("cors")
const app = express()
//app must get data from this port aka plug
app.set("port", process.env.PORT || 3000)
//aka cable
app.use(express.json());
//shares resources across origins therefore allows process
app.use(cors())


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