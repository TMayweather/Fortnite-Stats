var express = require("express");
var app = express();
var request = require("request");
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));

// var url = "https://api.fortnitetracker.com/v1/profile/xbl/";
//  const headers = {'TRN-Api-Key' : '5a8b2b9e-46a1-432f-9ea8-b5973d2216ac'}

var options = {
  url: "https://api.fortnitetracker.com/v1/profile/",
  headers: {
    "TRN-Api-Key": "5a8b2b9e-46a1-432f-9ea8-b5973d2216ac"
     }
};


// var playerOne = {}


// function getPlayerInfo(error, response, body) {
//   if (!error && response.statusCode == 200) {
//     var playerInfo = JSON.parse(body);
//     // try moving this over to index.ejs
// //     var playerStat = playerInfo.lifeTimeStats
// //     playerStat.forEach((cat) => {
// //  if(cat['key'] == 'Wins') {
// //      playerOne['wins'] = cat['value']
// //  }
// //  if(cat['key'] == 'Kills') {
// //      playerOne['kills'] = cat['value']
// //  }
// //   if (cat["key"] == "Matches Played") {
// //     playerOne["matches"] = cat["value"];
// //   }
// //     })
//     // return playerOne;

//   }
// }


app.get("/", (req, res) => {
  var query = req.query.search;
  console.log(query);
  res.render("landing")
})




app.get("/stats", (req, res) => {
  var user = req.query.user;
  var platform = req.query.platform;
  var options = {
    url: "https://api.fortnitetracker.com/v1/profile/" + platform + "/" + user,
    headers: {
      "TRN-Api-Key": "5a8b2b9e-46a1-432f-9ea8-b5973d2216ac"
    }
  };
request(options, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      const playerInfo = JSON.parse(body);
      const playerStat = playerInfo.lifeTimeStats
      // url = options.url.pathname = query;
      console.log(playerInfo)
      
      res.render("index", {playerStat: playerStat, playerInfo: playerInfo});
     } else {
      console.log(error)
     }
});
});

app.listen(3000, function(){
    console.log('Serving on port 3000!!!')
})

// app.get("/results", (req, res) => {
// var query = req.query.search;

//   request(URL, function(error, response, body) {
//     if (!error && response.statusCode === 200) {
//       var data = JSON.parse(body);
//       res.render("results", { data: data });
//     }
//   });
// });