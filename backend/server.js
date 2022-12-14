const http = require('http');
const express = require('express');
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose');
const DB = "mongodb+srv://sameercr7:Sameer123@cluster0.w78coy1.mongodb.net/userdata?retryWrites=true&w=majority"
const hostname = 'localhost';
const port = process.env.PORT||3001;
const corsOptions ={
   origin:'*', 
   credentials:true,
   optionSuccessStatus:200,
}

app.use(cors(corsOptions))
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})
//db connection

mongoose.connect(DB, { useNewUrlParser: true });
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.post('/user', function (req, res) {

    var name = req.body.name;
    var age = req.body.age;
    var batch = req.body.batch;
    var Schema = mongoose.Schema;
    var formSchema = new Schema({
        name: String,
        age: Number,
        batch: String
    });
    let User
    try {
        User = mongoose.model('User');
    } catch (error) {
        User = mongoose.model('User', formSchema, 'users');
    }
    var User1 = new User({
        name: name,
        age: age,
        batch: batch
    });

    User1.save(function (err, data) {
        if (err) {
            res.send({ status: 0, result: err });
        }
        else {
            res.send({ status: 1, result: data });
        }
    });

})
app.listen(port, () => {
    console.log(`Server running at ${port}/`);
});
