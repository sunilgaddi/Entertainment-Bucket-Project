const nodeMailer = require('nodemailer')
const {google} = require('googleapis')
const {OAuth2} = google.auth

const OAUTH_PLAYGROUND = 'https://developers.google.com/oauthplayground'

const {
    MAILING_SERVICE_CLIENT_ID,
    MAILING_SERVICE_CLIENT_SECRET,
    MAILING_SERVICE_REFRESH_TOKEN,
    SENDER_EMAIL_ADDRESS
} = process.env

const oauth2Client = new OAuth2(
    MAILING_SERVICE_CLIENT_ID,
    MAILING_SERVICE_CLIENT_SECRET,
    MAILING_SERVICE_REFRESH_TOKEN,
    OAUTH_PLAYGROUND
)

const sendEmail = (to, url,text) =>{
    oauth2Client.setCredentials({
        refresh_token:MAILING_SERVICE_REFRESH_TOKEN
    })

    const accessToken = oauth2Client.getAccessToken()

    const smtpTransport = nodeMailer.createTransport({
        service:'gmail',
        auth:{
            type:'OAuth2',
            user:SENDER_EMAIL_ADDRESS,
            clientId:MAILING_SERVICE_CLIENT_ID,
            clientSecret:MAILING_SERVICE_CLIENT_SECRET,
            refreshToken:MAILING_SERVICE_REFRESH_TOKEN,
            accessToken
        }
    })

    const mailOptions = {
        from:SENDER_EMAIL_ADDRESS.replace,
        to:to,
        subject:"EntertainmentBucket.",
        html:`
        
        <a href=${url}>${text}</a>
        <div>${url}</div>`
    }

    smtpTransport.sendMail(mailOptions, (err, info) =>{
        if(err) return err;

        return info
    })

}

module.exports = sendEmail