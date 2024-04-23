const express = require("express");
const app = express();
const fs = require("fs");

PORT = 3000;

app.use("/assets", express.static(__dirname + "/public"));

app.get("/page", ( req,res)=> {
    fs.readFile("file.html", "utf-8", (err, data)=> {
      if(err){
        return res.send("Error")
      }
      res.setHeader("Content-Type", "text/html");
      res.send(data);
    })
   
})

app.get("/api/name",(req, res)=>{
  
   res.status(200).send(" Anjana Bhatta");
})

app.get("/api/students/number",(req, res)=>{
   let  randomNum = Math.floor(Math.random() * 100 )
    res.status(200).send(`Random number : ${randomNum}`);
 })

 app.get("/api/products",(req, res)=>{
   const Product = [{"id": "1", "title": "yellow ball"},{"id": "2", "title": "red ball"}]
     res.status(200).send();
  })

app.post("/courses/n1ton2",(req, res)=>{
    
   
    let  randomNum = Math.floor(Math.random() * (2000 - 1000) + 1000 );
    res.status(200).send(`Random number : ${randomNum}`)
})



app.listen(PORT, () => {
    console.log(`server is running in PORT ${PORT}`);
})


