let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let cors = require('cors');
let queries = require('./database/queries');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({
    origin: '*'
}));

app.get("/",(req,res)=>{
    res.send({
        message:"Welcome to E-Learning app."
    })
});

app.post("/showQues",(req,res)=>{
    queries.showQuestions(req,res);
});

app.listen(3500,() => console.log("Server active at port 3500"));