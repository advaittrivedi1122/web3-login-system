export const express = require('express');
require('dotenv').config();
const {connectDb} = require('./config/dbConnection')
const port = process.env.PORT;

const app = express();
connectDb();
app.use(express.json());
app.use("/api/users", require("./Users/user.route"));

app.listen(port, () => {
    console.log("Server running on port ", port);
})