const express = require ("express")
const router = express.Router()
const con = require ("../lib/db_connection")

//create mood
router.post("/:id/log-mood", (req, res) => {
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
router.put('/:id/edit/:id', (req, res)=>{
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

//select single user
router.get("/:id/view/:id", (req,res) =>{
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

//select all users
router.get("/:id/view-all", (req,res) =>{
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