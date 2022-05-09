const axios = require('axios')
const cheerio = require('cheerio')



const iplCtrls = {
  completedMatches: async (req, res) => {
    try {

     aw axios.get('https://www.hindustantimes.com/cricket/ipl/results')
    .then((response) => {
        const html = response.data
        const $ = cheerio.load(html)
        $('.up-match', html).each(function () {

            const data = {
                match_number: $(this).children('h4').text(),
                match_date: $(this).children('.match-date').text(),
                team_one: {
                    team_name: $(this).children('.flex-items').children('.team-group').first().children('.team-name').text(),
                    team_score: $(this).children('.flex-items').children('.team-group').first().children('.flex-sec').children('strong').text(),
                    team_overs_played: $(this).children('.flex-items').children('.team-group').first().children('.flex-sec').children('span').text()
                },
                team_two: {
                    team_name: $(this).children('.flex-items').children('.team-group').last().children('.team-name').text(),
                    team_score: $(this).children('.flex-items').children('.team-group').last().children('.flex-sec').children('strong').text(),
                    team_overs_played: $(this).children('.flex-items').children('.team-group').last().children('.flex-sec').children('span').text()
                },
                venue: $(this).children('.match-foot').text()
            }

            scheduleCompleted.push(data)
        })
    })

    }
    catch(err){

    }
  },
  upcomingMatches: async (req, res) => {
  },
  teamMetaData:async(req,res) => {

  },
  matchWisePosters:async (req,res) => {

  }
  
}
module.exports = iplCtrls