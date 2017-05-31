const express = require('express');
const app = express();
const server = require("http").createServer(app);

app.use(express.static(__dirname+"/build"));

app.get('/',function (req,res){
 res.sendFile(__dirname+'/index.html','utf8');
})


app.listen("3000",()=> {
  console.log("listen in port: http://localhost:3000")
})
