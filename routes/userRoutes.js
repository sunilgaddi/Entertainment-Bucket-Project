const router =  require("express").Router()
const userCtrl = require('../controllers/userCtrls')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')
 
router.post('/user/register', userCtrl.register)
router.post('/user/activation',userCtrl.emailActivation)
router.post('/user/login', userCtrl.login)
router.get('/user/refresh_token',userCtrl.getAccessToken)
router.post('/user/forgotpassword', userCtrl.forgotPassword)
router.post('/user/reset', auth, userCtrl.resetPassword )
router.get('/user/logout' ,userCtrl.logout)
router.get('/user/info', auth, userCtrl.getUserInfo)
router.get('/user/all_info',auth, authAdmin, userCtrl.getAllUserInfo)
router.patch('/user/update', auth, userCtrl.userUpdate)
router.patch('/user/update_role/:id', auth, authAdmin, userCtrl.updateUsersRole)
router.delete('/user/delete/:id', auth, authAdmin, userCtrl.deleteUser)

//google

router.post('/user/google_login', userCtrl.googleLogin)

module.exports = router