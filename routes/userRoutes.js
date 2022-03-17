const router =  require("express").Router()
const userCtrl = require('../controllers/userCtrls')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')
 
router.post('/register', userCtrl.register)
router.post('/activation',userCtrl.emailActivation)
router.post('/login', userCtrl.login)
router.get('/refresh_token',userCtrl.getAccessToken)
router.post('/forgotpassword', userCtrl.forgotPassword)
router.post('/reset', auth, userCtrl.resetPassword )
router.get('/logout' ,userCtrl.logout)
router.get('/info', auth, userCtrl.getUserInfo)
router.get('/all_info',auth, authAdmin, userCtrl.getAllUserInfo)
router.patch('/update', auth, userCtrl.userUpdate)
router.patch('/update_role/:id', auth, authAdmin, userCtrl.updateUsersRole)
router.delete('/delete/:id', auth, authAdmin, userCtrl.deleteUser)

module.exports = router