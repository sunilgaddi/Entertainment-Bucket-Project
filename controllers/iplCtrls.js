const axios = require('axios')
const cheerio = require('cheerio')
const iplMetaData = require('./ipl-data/ipl-metadata.json')
const iplMatchesPosters = require('./ipl-data/ipl-matchwise-posters.json')


let scheduleCompleted = []

async function fetch() {
  await axios.get('https://www.hindustantimes.com/cricket/ipl/results')
    .then((response) => {
      const html = response.data
      const $ = cheerio.load(html)
      $('.up-match', html).each(function () {

        const data = {
          id: $(this).children('h4').text().replace(/\D/g, "") - 1,
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
          venue: $(this).children('.match-foot').text(),
          full_results: $(this).children('.viewFullCov').children('a').attr('href'),

        }

        scheduleCompleted.push(data)
      })
      scheduleCompleted.reverse()
    })
  await axios.get('https://www.hindustantimes.com/cricket/ipl/schedule')
    .then((response) => {
      const html = response.data
      const $ = cheerio.load(html)
      $('.up-match', html).each(function () {
        const data = {
          id: $(this).children('h4').text().replace(/\D/g, "") - 1,
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

        scheduleCompleted.push(data)
      })
    })
}
const iplCtrls = {
  schedule: async (req, res) => {
    try {
      if (scheduleCompleted.length === 0) {
       await fetch()
      }
      res.status(200).json(scheduleCompleted)
    }
    catch (err) {
      console.log(err.message)
    }

  },
  matchScore: async (req, res) => {
    const { full_results } = req.body
    let fullScoreCard = []
    try {
      await axios.get(full_results)
        .then((response) => {
          const html = response.data
          const $ = cheerio.load(html)

          $(".matchScoreBlock").each(function () {

            let battingStats = []
            let extra_runs, extra_runs_details, total_runs, total_runs_per_over, did_not_bat_list, fall_of_wicket, players = 0, bowlers = 0
            $(this).children('.scoreBoard').children('.batting').children("ul").children('li').each(function () {
              let score = {
                id: players++,
                player_name: $(this).children('.playerName').text(),
                player_runs: $(this).children('.playerRun').text(),
                player_balls: $(this).children('.playerBall').text(),
                player_fours: $(this).children('.playerFour').text(),
                player_sixs: $(this).children('.playerSix').text(),
                player_strike: $(this).children('.playerStrike').text(),
                out_details: $(this).children('.outDetail').text()
              }
              battingStats.push(score)
            })

            extra_runs = $(this).children('.scoreBoard').children('.batting').children('.extras').children('.extrasRuns').text()
            extra_runs_details = $(this).children('.scoreBoard').children('.batting').children('.extras').children('.extrasRunsDtl').text()
            total_runs = $(this).children('.scoreBoard').children('.batting').children('.totalRuns').children('.runsTotal').text()
            total_runs_per_over = $(this).children('.scoreBoard').children('.batting').children('.totalRuns').children('.runsTotal').children('.runsPerOver').text()
            did_not_bat_list = $(this).children('.scoreBoard').children('.batting').children('.didNotBat').children('.notBatList').text()
            fall_of_wicket = $(this).children('.scoreBoard').children('.batting').children('.fallOfWicket').children('.fallWicket').text()
            let bowlingStats = []
            $(this).children('.scoreBoard').children('.bowling').children('ul').children('li').each(function () {
              let bowling = {
                id: bowlers++,
                player_name: $(this).children('.playerName').text(),
                player_over: $(this).children('.playerOver').text(),
                player_maiden: $(this).children('.playerMaiden').text(),
                player_runs: $(this).children('.playerRuns').text(),
                player_wickets: $(this).children('.playerWicket').text(),
                player_noball: $(this).children('.playerNoBall').text(),
                player_wide: $(this).children('.playerWide').text(),
                player_eco: $(this).children('.playerEco').text()
              }
              bowlingStats.push(bowling)
            })

            let teamScoreCard = {
              shortscore: $(this).children('.shortScore').text(),
              batting: battingStats,
              bowling: bowlingStats,
              extra_runs: extra_runs,
              extra_runs_details: extra_runs_details,
              total_runs: total_runs,
              total_runs_per_over: total_runs_per_over,
              fall_of_wicket: fall_of_wicket,
              did_not_bat_list: did_not_bat_list
            }

            fullScoreCard.push(teamScoreCard)
          })


          const data = {
            match_status: $('#matchStatus').text(),
            match_results_status: $('#resultInfo').text(),
          }

          fullScoreCard.push(data)
        })
    }
    catch (err) {
      console.log(err)
    }

    res.status(200).json(fullScoreCard)
  },
  teamMetaData: async (req, res) => {
    res.status(200).json(iplMetaData)
  },
  matchWisePosters: async (req, res) => {
    res.status(200).json(iplMatchesPosters)
  }

}
module.exports = iplCtrls