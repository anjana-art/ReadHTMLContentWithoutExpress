const express = require("express");
const app = express();
const fs = require("fs");

PORT = 3005;

app.use('/assets',express.static(__dirname + '/public'));
let players = JSON.parse(fs.readFileSync("C:\\Users\\TechOfStudyAccount\\Desktop\\serverWithoutExpress\\ServerWithExpress\\methods\\players.json", 'utf-8'))

app.get("/api/v1/players", (req, res) => {
   res.status(200).json(
    {
        status: "success",
        data: players
    }
   )
})

app.post("/api/v1/players", (req, res) =>{
    //create a new player
    const id = players[players.length -1].id +1; // create id of next player
   const newPlayer = Object.assign({id:id}, req.body)
    players.push(newPlayer)
    fs.writeFile("./players.json", JSON.stringify(players), err => {
        res.status(201).json(
            {
                status: "success",
                data: players
            }
        )
    })
})

app.get("/api/v1/players/:id", (req, res)=>{
    //get player by id

    const id = req.params.id;
    const player = players.find(el => el.id === id);
    if(player === undefined){
        return res.status(404).json({
            status:'fail',
            message: "id not exist"
        })
    }
    res.status(200).json({
        status: 'success', 
        data: player
    })
})

app.patch("/api/v1/players/:id", (req, res)=>{
    //updated player by id
    const id = req.params.id
    const player = players.find(el => el.id === id);
    if(player === undefined){
        return res.status(404).json({
            status:'fail',
            message: "id not exist"
        })
    }

    players[id].firstName = req.body.firstName
    player.lastName = req.body.lastName
    player.age = req.body.age
    player.team = req.body.team
    players[id]= player
    
    fs.writeFile("./players.json",JSON.stringify(players), err=>{
        res.status(200).json(
            {
                status:"success",
                data: players[id]
            })
    });
})

app.delete("/api/v1/players/:id" ,(req, res)=>{
    //delete player by id
    const id = req.params.id
    const player = players.find(el => el.id === id);
    if(player === undefined){
        return res.status(404).json({
            status:'fail',
            message: "id not exist"
        })
    }
    var index = players.findIndex(obj => obj.id == id);
    players.splice(index, 1)

    fs.writeFile("./players.json",JSON.stringify(players), err=>{
        res.status(200).json(
            {
                status:"success delete",
                data: player
            })
    });
  
})

app.listen(PORT, () => {
    console.log(`server is running in PORT ${PORT}`);
})
