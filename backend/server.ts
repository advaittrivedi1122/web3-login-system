export const express = require('express');
require('dotenv').config();
const {connectDb} = require('./config/dbConnection')
const port = process.env.PORT;

const app = express();
connectDb().then(() => {
    console.log('Connected to DB');
});
app.use(express.json());
app.use("/api/users", require("./Users/user.route"));

app.listen(port, () => {
    console.log("Server running on port ", port);
})