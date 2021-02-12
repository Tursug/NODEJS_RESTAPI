const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

//SET UP EXPRESS
const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`The server has started on port: ${PORT}`));

//SET UP MONGOOSE
mongoose.connect(process.env.CONNECTION_STRING, 
    {
        useNewUrlParser:true,
        useUnifiedTopology:true,
        useCreateIndex: true
    },
    (err)=>{
        if(err) throw err;
        console.log("Connection Established")
    });

    app.use("/user", require("./routes/userRouter"));