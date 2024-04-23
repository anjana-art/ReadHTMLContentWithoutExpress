const express = require("express");
const app = express();
const fs = require("fs");

PORT = 3001;

app.get("/api/v1/players", (req, res) => {
    fs.readFile("players.json", "utf-8", (err, data) => {
        if (err) {
            return res.send("Error")
        }
        res.setHeader("Content-Type", "application/txt");
        res.send(data);
    })

})

app.post("/api/v1/players", (req, res) =>{
    //create a new player
})

app.get("/api/v1/players/:id", (req, res)=>{
    //get player by id
})

app.patch("/api/v1/players/:id", (req, res)=>{
    //updated player by id
})

app.delete("/api/v1/players/:id"){
    //delete player by id
}

app.listen(PORT, () => {
    console.log(`server is running in PORT ${PORT}`);
})
