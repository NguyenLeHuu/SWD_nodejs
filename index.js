const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const dotenv = require('dotenv');

const connectDatabase = require("./src/configs/db.config"); 
dotenv.config();

connectDatabase.connect();
const port = process.env.PORT || 3334;
const app = express();

app.use(helmet());
app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

const apiRouter = require('./src/routes/router')
app.use("/api", apiRouter);

app.get("/", (req, res) =>{
    res.json({
        message: "Welcome BE_SWD",
    })
})

app.get("*", (req, res) =>{
    res.json({
        message: "Not suppoted!",
    })
})

app.listen(port, () =>{
    console.log(`Sever is listening on port: ${port}`);
})