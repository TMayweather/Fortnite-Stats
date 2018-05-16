const express = require("express");
const app = express();
const request = require("request");
const bodyParser = require("body-parser");
const Fortnite = require("fortnite-api");
// const config = require("./config.js").options;
const access = require("./config.js").access;

app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));

let fortniteAPI = new Fortnite(access,
{
  debug: true
}
);

app.get("/", (req, res) => {
  
  fortniteAPI.login().then(() => {
   let news = fortniteAPI.getFortniteNews("en")
      const status = fortniteAPI.checkFortniteStatus()
      const leaderboard = fortniteAPI.getScoreLeaderBoard("pc", Fortnite.SOLO)
     Promise.all([news, status, leaderboard]) 
      .then(([news, status, leaderboard]) => {
        console.log(news);
        console.log(leaderboard);
       news = news.br
       res.render("landing", {news: news, status: status, leaderboard: leaderboard});
      })
      .catch(err => {
        console.log(err);
      });
      
    });
})


// app.get("/stats", (req, res) => {
//   var user = req.query.user;
//   var platform = req.query.platform;
//   var options = {
//     url: "https://api.fortnitetracker.com/v1/profile/",
//    };
// request(options, (error, response, body) => {
//     if (!error && response.statusCode == 200) {
      
//       const playerInfo = JSON.parse(body);
//       const playerStat = playerInfo.lifeTimeStats
      
//       console.log(playerInfo);
      
//       res.render("index", {playerStat: playerStat, playerInfo: playerInfo});
//      } else {
//       console.log(error)
//      }
// });
// });


app.get("/stats", (req, res) => {
  const user = req.query.user;
  const platform = req.query.platform;

  fortniteAPI.login().then(() => {
  fortniteAPI.getStatsBR(user, platform)
  .then(stats => {
    let lifetimeStats = stats.lifetimeStats;
    let info = stats.info;
    let solo = stats.group.solo
    let duo = stats.group.duo
    let squad = stats.group.squad
   res.render("index", { 
     lifetimeStats: lifetimeStats,
     info: info,
     solo: solo,
     duo: duo,
     squad: squad
    })
  })
  .catch(err => {
    console.log(err);
  });
});
});



app.listen(3000, function(){
    console.log('Serving on port 3000!!!')
})
