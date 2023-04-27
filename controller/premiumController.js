const User = require('../models/user')
const Expense = require('../models/expenseModel')

const sequelize = require('../utility/database')


exports.getLeaderBoard = async(req,res) =>{
    
    
    const userDetails = await User.findAll({
        attributes:['id', 'name', 'totalExpense'],
        include: [
            {
                model: Expense,
                attributes: []
            },
        ],
        group: ['user.id'],
        order: [['totalExpense','DESC']]
    })
    
   
    console.log(userDetails)
    res.status(200).json(userDetails)
    
    

}
