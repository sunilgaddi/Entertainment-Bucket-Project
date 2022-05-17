const axios = require('axios')


const gamingCtrls = {
    bgmi: async (req, res) => {
        try {
            axios.get("https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=15&playlistId=UUugG6-k5QGbq_iDEPAnG4NQ&key=AIzaSyD1kOS1j_OyiaT3-GPj5qwFJDTmL90RC84").then((respon) => {
                const response = []
                response.push(respon.data)

                res.status(200).json(response)
            })
        }
        catch (err) {
            console.log(err.message)
        }
    },
    valorant: async (req, res) => {
        try {
            axios.get("https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=15&playlistId=PLMJ9cfx_WDdw-DDa_fk8MBgGnHa_teSwg&key=AIzaSyD1kOS1j_OyiaT3-GPj5qwFJDTmL90RC84").then((respon) => {
                const response = []
                response.push(respon.data)

                res.status(200).json(response)
            })

        }
        catch (err) {
            console.log(err.message)
        }
    },
    gameDetails: async (req,res) => {
        const {video_id} = req.body
        try {
             axios.get(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${video_id}&key=AIzaSyD1kOS1j_OyiaT3-GPj5qwFJDTmL90RC84`).then((respon) => {
                const response = []
                response.push(respon.data)

                res.status(200).json(response)
            })

        }
        catch (err) {
            console.log(err.message)
        }
    }
}

module.exports = gamingCtrls