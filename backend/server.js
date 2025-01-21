const express = require('express')
var mysql = require('mysql');

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

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
