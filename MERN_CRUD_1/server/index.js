const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const app = express();

const FoodModel = require("./models/Food");

app.use(express.json());
//app.use(cors());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
       next();
 });

try{
    mongoose.connect('mongodb+srv://dogacan:<password>@crud.hizbl.mongodb.net/<dbname>?retryWrites=true&w=majority', {
    useNewUrlParser:true,
    useUnifiedTopology:true
    });
    console.log("Connected");
}catch(error){
    console.error("Could Not Connect");
}

app.post('/insert', async (req, res) => {

    const foodName = req.body.foodName
    const days = req.body.days

    const food = new FoodModel({foodName:foodName, daysSinceIAte: days});

    try {
        await food.save();
        res.send("Inserted Data");
    } catch (error) {
        console.error(error);
    }
});

app.get('/read', async (req, res) => {
    FoodModel.find({}, (err, result) => {
        if(err){
            res.send(err);
        }

        res.send(result);
    })
});

app.put('/update', async (req, res) => {

    const newFoodName = req.body.newFoodName;
    const id = req.body.id;

    try {
        await FoodModel.findById(id, (error, updatedFood)=>{
            updatedFood.foodName = newFoodName;
            updatedFood.save();
            res.send("update");
        })
    } catch (error) {
        console.error(error);
    }
});

app.delete('/delete/:id', async (req, res) => {
    const id = req.params.id;

    await FoodModel.findByIdAndRemove(id).exec();
    res.send("deleted");
});

app.listen(3001, () => {
    console.log("Server is up and running on port 3001");
});
