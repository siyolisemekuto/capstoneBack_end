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

  //edit moods
router.put('/:id/edit/:id', (req, res)=>{
  const {rating,notes
  }= req.body
  let mood = {
    user_id:req.params.id,
    rating,
    notes
  };
      try{
          con.query(sql,mood,
          `UPDATE users SET rating="${rating}",notes="${notes}" WHERE mood_id=${req.params.id}`, 
          (err, result) => {
              if (err) throw err;
              res.json(result);
          }
      );
      } catch(error){
          console.log(error);
      };
  })
  
  module.exports = router