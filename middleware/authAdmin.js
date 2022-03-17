const Users = require('../model/userModel')

const authAdmin = async (req, res, next) =>{
    try {
        
        const user = await Users.findById(req.user.id)

        if(user.role !== 1) return  res.status(400).json({msg:"Admin resource access denied!"}) 

        next()

    } catch (err) {

        res.status(500).json({msg:err.message})

    }
}

module.exports = authAdmin