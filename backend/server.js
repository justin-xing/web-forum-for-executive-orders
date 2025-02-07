const express = require('express')
var mysql = require('mysql');

// queries
var deleteUserQuery = fs.readFileSync('queries/deleteUser.sql').toString();
var getCommentsQuery = fs.readFileSync('queries/getComments.sql').toString();

const app = express()
const port = 3000

var con = mysql.createConnection({
  host: "localhost",
  user: "apiusr",
  password: "password"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

// split these into separate routers later, implement error handling for bad params, etc.

app.get('/comments/:executiveOrderId', (req, res) => {
  const executiveOrderId = req.params.executiveOrderId;
  con.query(getCommentsQuery, [executiveOrderId], function (err, results) {
    if (err) {
      res.status(400).send({
        message: 'Could not retrieve comments'
      });
    }
    res.status(200).send({
      comments: results
    })
  });
  
})

app.delete('/user/:id', (req, res) => {
  const userId = req.params.id;
  con.query(deleteUserQuery, [userId], function (err, results) {
    if (err) {
      res.status(400).send({
        message: 'Could not delete user'
      });
    }
    res.status(200).send({
      message: 'User successfully deleted'
    });
  });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
