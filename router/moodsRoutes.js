const express = require ("express")
const router = express.Router()
const con = require ("../lib/db_connection")
const middleware = require("../middleware/auth");


//create mood
router.post("/log-mood",middleware, (req, res) => {
    try {
      let sql = "INSERT INTO moods SET ?";
      const {
        rating,
        notes
      } = req.body;
      let mood = {
        user_id:req.params.id,
        rating,
        notes
      };
  
      con.query(sql, mood, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(`Today's mood was logged successfully`);
      });
    } catch (error) {
      console.log(error);
    }
  });

 //update moods
router.put('/edit/:id',middleware, (req, res)=>{
  const {rating,notes}= req.body
      try{
          con.query(
          `UPDATE moods SET rating="${rating}",notes="${notes}" WHERE mood_id=${req.params.id}`, 
          (err, result) => {
              if (err) throw err;
              res.json(result);
          }
      );
      } catch(error){
          console.log(error);
      };
  })

//select single mood
router.get("/view/:id",middleware, (req,res) =>{
  try{
      con.query(
          `SELECT * FROM moods WHERE mood_id=${req.params.id}`, 
          (err, result) => {
              if (err) throw err;
              res.json(result);
          }
      );
      } catch(error){
          console.log(error);
      };
});

//select all moods
router.get("/view-all",middleware, (req,res) =>{
  try{
      con.query("SELECT * FROM moods", (err, result) =>{
          if (err) throw err;
          res.send (result);
      })
  } catch (error){
      console.log (error)
      res.status (400).send(error)
  }
});
  
  module.exports = router