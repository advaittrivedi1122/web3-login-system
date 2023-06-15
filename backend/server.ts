export const express = require('express');
require('dotenv').config();
const {connectDb} = require('./config/dbConnection')
const port = process.env.PORT;
const cors = require("cors")

const app = express();
connectDb().then(() => {
    console.log('Connected to DB');
});

const corsOptions: object = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 
}

app.use(cors(corsOptions))
app.use(express.json());
app.use("/api/users", require("./Users/user.route"));

app.listen(port, () => {
    console.log("Server running on port ", port);
})