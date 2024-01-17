const express = require('express')
const PythonShell = require('python-shell').PythonShell;
const fs = require('fs');
const {v4: uuidv4} = require('uuid');
const upload = require('./upload')
const mongoose = require('mongoose')
const Data = require('./models/dataSchema')
const connectdb = require('./config/database')
require('dotenv').config()

app = express()
app.use(express.json())
connectdb()
app.get('/',(req,res)=>{
    

    var options = {
      mode: 'text',
      pythonPath: 'C:\\Users\\Ram\\Desktop\\env\\Scripts',
      pythonOptions: ['-u'],
      scriptPath: './test.py',
      args: ['output.pdf', 'output.docx']
    };
    
    PythonShell.run('test.py', options, function (err, results) {
      if (err) 
        throw err;
      // Results is an array consisting of messages collected during execution
      console.log('results: %j', results);
    });
})
app.post('/single',(req,res)=>{
    
    var dir = './tmpSingle'
    file_name = upload(dir,req.body.file,uuidv4())
    console.log(file_name)
    res.status(200).json({"message":"okay"})
    })

app.post('/multiple',(req,res)=>{
    
var dir = './tmp/'+uuidv4();

if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}
file_names = []
req.body.files.forEach(element => {
    file_names.push(upload(dir,element,uuidv4()))
});
console.log(file_names)
res.status(200).json({"message":"okay"})
})

app.listen(process.env.PORT, (err)=>{
    if (err) console.log("Error in server setup")
    console.log(`listening to port ${process.env.PORT}`)})