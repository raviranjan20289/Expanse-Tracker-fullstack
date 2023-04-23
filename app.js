const express = require("express");
const path = require('path');
const bodyParser = require('body-parser')

const User = require('./models/user')
const Expense = require('./models/expenseModel')

const cors = require('cors')

const app = express();
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());

app.use(bodyParser.json({extended: false}))

app.use(express.json());

const sequelize = require('./utility/database');

const signUpRoutes = require('./routes/user');

const loginRoutes =  require('./routes/login');

const expenseRoutes = require('./routes/expenseRoutes');

app.use('/user',signUpRoutes);

app.use('/user',loginRoutes);

app.use('/expense',expenseRoutes);

Expense.belongsTo(User)
User.hasMany(Expense);

sequelize.sync()
.then(()=>{
    app.listen(3000)

}).catch(err=>console.log(err))

