const Users = require('../model/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const sendMail = require('./sendMail')
const { getAccessToken } = require('../../reefit/controllers/userCtrls')

const {CLIENT_URL} = process.env

const userCtrls = {
    register: async (req, res) => {
        try {

            const {firstName, lastName, email, password,  cf_password, phoneNumber} = req.body

            if(!firstName) return res.status(400).json({firstName:"Plase enter your First Name."})
            if(!lastName) return res.status(400).json({lastName:"Please enter your Last Name."})

            if(!email) return res.status(400).json({email:"Please enter your Email."})

            if(!validateEmail(email)) return res.status(400).json({email:"Invalid Email."})

            const user = await Users.findOne({email})

            if(user) return res.status(400).json({email:"This email is already taken"})

            if(!password) return res.status(400).json({password:"Please enter your Password"})

            if(password.length < 6 ) return res.status(400).json({password:"Password must contain atleast 6 or more characters."})

            if(!cf_password) return res.status(400).json({cf_password:"Please enter Confirm Password ."})

            if(password !== cf_password) return res.status(400).json({cf_password:"Passwords do not match."}) 

            const passwordHash = await bcrypt.hash(password, 12)

            if(!phoneNumber) return res.status(400).json({phoneNumber:"Please enter your PhoneNumber."})

            const newUser = {
                firstName,
                lastName,
                email,
                password:passwordHash,
                phoneNumber,
            }

            const activationToken = createActivationToken(newUser)

            const url = `${CLIENT_URL}/user/activation/${activationToken}`

            sendMail(email, url, 'Verify Email Address.')

            res.status(200).json({success:"Activation link has been sent to your gmail account!"})
       }
       catch(err){
        res.status(500).json({msg:err.message})
       }
    },
    emailActivation: async (req, res) =>{
        try{
            const {activation_token} = req.body

            const user = jwt.verify(activation_token, process.env.ACTIVATION_TOKEN)

            const {firstName, lastName, email, password, phoneNumber} = user

            const newUser = new Users({
                firstName,
                lastName,
                email,
                password,
                phoneNumber
            })

            await newUser.save()

            res.status(200).json({success:"Registered Successfully."})
        }
        catch(err){
            res.status(500).json({msg:err.message})
        }
    },
    login: async (req, res) =>{
        try{
            const {email, password} = req.body

            if(!email) return res.status(400).json({email:"Please enter your Email"})

            if(!validateEmail(email)) return res.status(400).json({email:"Please enter Valid Email"})

            const user = await Users.findOne({email})

            if(!user) return res.status(400).json({email:"This email does not exists."})

            if(!password) return res.status(400).json({password:"Please enter your Password."})

            const isMatch = await bcrypt.compare(password, user.password)

            if(!isMatch) return res.status(400).json({password:"Incorrect Password."})
            
            const refresh_token = createRefreshToken({id:user._id}) 

            res.cookie('refreshToken', refresh_token,
            {
                httpOnly:true,
                path:'/user/refresh_token',
                maxAge:7*24*60*60*1000
            })

            res.status(200).json({success:"Login Successful."})

        }
        catch(err){
            res.status(500).json({msg:err.message})
        }
    },
    getAccessToken: (req, res) => {
        try{
            
            const refresh_token = req.cookies.refreshToken

            if(!refresh_token) return res.status(400).json({msg:"Please Login."})

            jwt.verify(refresh_token, process.env.REFRESH_TOKEN, (err, user)=>{

                if(err) return res.status(400).json({msg:"Please Login."})

                const access_token = createAccessToken({id:user.id})

                res.status(200).json({access_token})
            })
            
        }
        catch(err){
            res.status(500).json({msg:err.message})
        }
    },
    forgotPassword:  async (req ,res) => {
        try{

            const {email} = req.body;

            if(!email) return res.status(400).json({email:"Please enter your email."})

            if(!validateEmail(email)) return res.status(400).json({email:"Please enter a Valid Email."})

            const user = await Users.findOne({email})

            if(!user) return res.status(400).json({email:"This Email does not exists."})

            const access_token = createAccessToken({id:user._id})

            const url =  `${CLIENT_URL}/user/reset/${access_token}`

            sendMail(email, url, "Reset Password")

            res.status(200).json({success:"Please check your gmail to Reset Password."})
        }
        catch(err){
            res.status(500).json({msg:err.message})
        }
    },
    resetPassword: async (req, res) =>{
        const {password, cf_password} = req.body

        if(!password) return res.status(400).json({password:"Please enter Password."})

        if(password.length < 6) return res.status(400).json({password:"Password must contain atleast 6 or more characters."})

        if(!cf_password) return res.status(400).json({cf_password:"Please enter Confirm Password."})

        if(password !== cf_password) return res.status(400).json({cf_password:"Passwords do not match."})

        const passwordHash = await bcrypt.hash(password,12)

        await Users.findByIdAndUpdate(req.user.id, {password:passwordHash})

        res.status(200).json({success:"Password sucessfully Reset."})
    },
    logout: async (req, res) => {
        try {

            res.clearCookie('refreshToken',
            {path:'/user/refresh_token'})

            res.status(200).json({success:"Successfully Logout."})
        }
        catch(err){
            res.status(500).json({msg:err.message})
        }
    },
    getUserInfo: async (req, res) =>{
        try{
            const user = await Users.findById(req.user.id).select('-password')

            res.status(200).json({user})
        }
        catch(err){
            res.status(500).json({msg:err.message})
        }
    },
    getAllUserInfo: async (req,res) => {
        try {
            
            const users =await Users.find().select('-password')

            res.status(200).json({users})
            
        } catch (err) {
            res.status(500).json({msg:err.message})
        }
    },
    userUpdate: async (req, res) => {
        try {
            const {firstName, lastName, avatar } = req.body

            await Users.findByIdAndUpdate(req.user.id, {
                firstName,
                lastName,
                avatar
            })

            res.status(200).json({ msg: "Updated Successfully." })
        } catch (err) {
            res.status(500).json({msg:err.message})
        }

    },
    updateUsersRole: async (req, res) => {
        try {
            
            const {role} = req.body

            await Users.findByIdAndUpdate( req.params.id, {
                role:role
            })

            res.status(200).json({msg:"Role updated"})

        } catch (err) {
            res.status(500).json({msg:err.message})
        }
    },
    deleteUser: async (req, res) => {
        try {
            
            await Users.findByIdAndDelete(req.params.id)

            res.status(200).json({msg:"User Deleted."})

        } catch (err) {
            res.status(500).json({msg:err.message})
        }
    }
}

function validateEmail(payload){
    const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(payload);
}

function createActivationToken(payload){
    return jwt.sign(payload, process.env.ACTIVATION_TOKEN,{expiresIn:'5min'})
}

function createRefreshToken(payload){
    return jwt.sign(payload, process.env.REFRESH_TOKEN, {expiresIn:'7d'})
}

function createAccessToken(payload){
    return jwt.sign(payload, process.env.ACCESS_TOKEN)
}

module.exports = userCtrls