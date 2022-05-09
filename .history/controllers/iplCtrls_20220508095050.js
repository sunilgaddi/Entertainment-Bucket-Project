const axios = require('axios')
const cheerio = require('cheerio')
const iplMetaData = require('./ipl-data/ipl-metadata.json')
const iplMatchesPosters = require('./ipl-data/ipl-matchwise-posters.json')


let scheduleCompleted =[]
let scheduleUpComing =[]
const iplCtrls = {
  completedMatches: async (req, res) => {
    try {
     await axios.get('https://www.hindustantimes.com/cricket/ipl/results')
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
    res.status(200).json(scheduleCompleted)
    }
    catch(err){

    }
  },
  upcomingMatches: async (req, res) => {
    try{
     await axios.get('https://www.hindustantimes.com/cricket/ipl/schedule')
    .then((response) => {
        const html = response.data
        const $ = cheerio.load(html)
        $('.up-match', html).each(function () {
            const data = {
                match_number: $(this).children('h4').text(),
                match_date: $(this).children('.match-date').text(),
                team_one: {
                    team_name: $(this).children('.flex-items').children('.team-name').first().text(),
                },
                team_two: {
                    team_name: $(this).children('.flex-items').children('.team-name').last().text(),
                },
                match_time: $(this).children('.flex-items').children('.match-time').text(),
                venue: $(this).children('.match-foot').text()
            }

            scheduleUpComing.push(data)
        })
    })
    res.status(200).json(scheduleUpComing)
    }
    catch(err){

    }

  },
  teamMetaData:async(req,res) => {
    res.status(200).json(iplMetaData)
  },
  matchWisePosters:async (req,res) => {
    res.status(200).json(ipl)
  }
  
}
module.exports = iplCtrls