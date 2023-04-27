const express = require("express");
const path = require('path');
const bodyParser = require('body-parser')

const User = require('./models/user')
const Expense = require('./models/expenseModel')
const Order = require('./models/orderModel')
const ForgotPass =require('./models/forgotPassModel')
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

const purchaseRoutes = require('./routes/purchaseRoutes')

const premiumRoutes = require('./routes/premiumRoutes');

const forgotPassRoutes = require('./routes/forgotPassRoutes')

const History =require('./models/reportModel')
app.use('/user',signUpRoutes);

app.use('/user',loginRoutes);

app.use('/expense',expenseRoutes);

app.use('/purchase',purchaseRoutes)

app.use('/premium',premiumRoutes);

app.use('/password',forgotPassRoutes)

Expense.belongsTo(User)
User.hasMany(Expense);

Order.belongsTo(User)
User.hasMany(Order);

ForgotPass.belongsTo(User)
User.hasMany(ForgotPass);

History.belongsTo(User)
User.hasMany(History);

sequelize.sync()
.then(()=>{
    app.listen(3000)

}).catch(err=>console.log(err))

