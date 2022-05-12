const express = require('express')
const cors = require('cors')
//TODO: 7666feafbcbe77caed1ac8363edb2f5a - token qiwi
//public: 48e7qUxn9T7RyYE1MVZswX1FRSbE6iyCj2gCRwwF3Dnh5XrasNTx3BGPiMsyXQFNKQhvukniQG8RTVhYm3iPrgJeHyiRndpzRBqTXQjGbMxMGEjBRDKiGpCkLBhWBeVipCVGTH7W1HpGVfyN4qyCCnrSM2V5tV5E6Da624JzepaWhZDcaZjstruVzaPPB
//secret: eyJ2ZXJzaW9uIjoiUDJQIiwiZGF0YSI6eyJwYXlpbl9tZXJjaGFudF9zaXRlX3VpZCI6ImZqNnB0Mi0wMCIsInVzZXJfaWQiOiI3OTk5ODk5NTA2OSIsInNlY3JldCI6Ijg3MzM4NmJlMDRiYjAxNTA0MWE1YWJkYTcyNjQ2Yzk1OTUwMGE5ZGJkYTA0NjA5NmFlZDYyNWE0Y2Q4YTMxNDcifX0=

const app = express()
app.use(cors())

app.use(express.json())

app.get('/', (req, res)=>{
    res.send('Welcome to Marketoto!!!')
})

app.listen(8080, ()=>{
    console.log('runnnn')
})