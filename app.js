const express = require("express");
const path = require('path');
const bodyParser = require('body-parser')

const cors = require('cors')

const app = express();
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());

app.use(bodyParser.json({extended: false}))

const sequelize = require('./utility/database');

const signUpRoutes = require('./routes/user')

app.use('/user',signUpRoutes);

sequelize.sync()
.then(()=>{
    app.listen(3000)

}).catch(err=>console.log(err))

