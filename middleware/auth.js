const jwt = require("jsonwebtoken")

const auth = (req, res, next) => {

    try{

        const access_token = req.header('Authorization')

        if(!access_token) return res.status(400).json({msg:"Invalid Authentication."})

        jwt.verify(access_token, process.env.ACCESS_TOKEN, (err, user) => {
            if(err) return res.status(400).json({msg:"Invalid Authentication."})

            req.user = user

            next()
        })

    }
    catch(err){
        res.status(500).json({msg:err.message})
    }

}

module.exports = auth