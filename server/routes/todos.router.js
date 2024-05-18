const router = require('express').Router();
const pool = require('../modules/pool');

//DONT forget the require 
//note that pool goes up by ..
// DB CONNECTION


// GET
router.get('/', (req, res) => {
    let queryText = 'SELECT * FROM "todos";';
    pool.query(queryText).then(result => {
      // Sends back the results in an object
      res.send(result.rows);
    }) 
      .catch(error => {
        console.log('error getting to do info', error);
        res.sendStatus(500);
      });
  });

// POST
router.post('/', (req, res) => {
    let newToDo = req.body;
    console.log(`Adding To Do`, newToDo);
  

    let queryText = `INSERT INTO "todos" ("text", "isComplete")
                     VALUES ($1, $2);`;
    pool.query(queryText, [newToDo.text, newToDo.isComplete])
      .then(result => {
        res.sendStatus(201);
      })
      .catch(error => {
        console.log(`Error adding new to do, line 35`, error);
        res.sendStatus(500);
      });
  });

// PUT
router.put('/:id', (req, res) => {

    
    let todoId = req.params.id;
    //not sure if I should change direction 
    //isRead refers to the body as the isRead is in the data part of put request
    let complete  = req.body.isComplete;
  
    let queryText = `
    UPDATE "todos" SET "isComplete"= NOT "isComplete"
    WHERE "id"= $1;
`
    console.log("Change complete: ", todoId, isComplete)
  
  //line 56 confuses me 
  
  
    //in the below statement [] turns the todoId into an Array

    // pool.query needed to take queryText and both todoId and transfer, it was missing transfer - Michael

    pool.query(queryText, [todoId])
      .then((result) => {
        res.sendStatus(204)
      })
      .catch((err) => {
        console.log(`Error making query.. '${queryText}'`, err)
        res.sendStatus(500)
      })
  })

// DELETE

router.delete('/:id', (req, res) => {

  let reqId = [req.params.id]

  let queryText = `DELETE FROM "todos" WHERE "id" = $1;`

  pool.query(queryText, reqId)
  .then((result) => {
      console.log("delete success");
      res.sendStatus(200)
  })
  .catch((err) => {
      console.log("error making query...", `${queryText}`, err);
      res.sendStatus(500)

  })
 
});


module.exports = router;