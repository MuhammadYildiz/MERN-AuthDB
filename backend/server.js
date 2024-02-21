const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const dotenv = require("dotenv").config()
const userRouter = require("./routes/userRouter.js")
const app = express();
/* middleware */
app.use(express.json())
app.use(cors())
/* connect to DB and server */
app.use("/auth",userRouter)
mongoose.connect(process.env.MongoDB_URL)
try {
    console.log("Project connected with MongoDB database");
    app.listen(process.env.PORT, () => {
        console.log('Project working on port ' + process.env.PORT);
    })
} catch (error) {
    console.log(error);
}