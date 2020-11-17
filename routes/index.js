const express = require('express');
const router = express.Router();
const {Match, ValidateMatch} = require('../models/matches');



router.post('/', async (req, res) => {
    const { error } = ValidateMatch(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }    
     let match = new Match({
        homeTeam: req.body.homeTeam,
        awayTeam: req.body.awayTeam,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        homeTeamScore: req.body.homeTeamScore,
        awayTeamScore: req.body.awayTeamScore,
        league: req.body.league,
    });
    match.updateStatus();
    match.CalculateDuration();
    try {
        match = await match.save();
        res.status(200).send(match);
      } catch (ex) {
        for (field in ex.errors) {
          console.log(ex.errors[field].message);
        }
      }
});

router.get("/", async (req, res) => { 
const matches = await Match
    .find({})
    .sort({startTime: 1});
    
 matches.map(match => {
      match.updateStatus();
      match.CalculateDuration();
      match.save();
     });   

res.status(200).send(matches);
});

router.get("/:matchId", async (req, res) => { 
  const match = await Match.findById(req.params.matchId)
     
  if(!match) {
    return res.status(404).send("The match with the given ID doesn't exist");
  };

  res.send(match);

  });

router.delete("/:matchId", async (req, res) => {
  const match = await Match.findByIdAndRemove(req.params.matchId);

  if(!match) {
    return res.status(404).send("The match with the given ID doesn't exist");
  };

  res.send("match Deleted");
});

router.post("/:matchId", async (req, res) => {
  const { error } = ValidateMatch(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  };

  let match = await Match.findById(req.params.matchId);

  if(!match) return res.status(404).send("The match with the given ID doesn't exist");
  
    if(match.homeTeam){
      match.homeTeam= req.body.homeTeam
    }
    if(match.awayTeam){
      match.awayTeam= req.body.awayTeam
    }
    if(match.startTime){
      match.startTime= req.body.startTime
    }
    if(match.endTime){
      match.endTime= req.body.endTime
    }
    if(match.duration){
      match.duration= req.body.duration
    }
    if(match.homeTeamScore){
      match.homeTeamScore= req.body.homeTeamScore
    }
    if(match.awayTeamScore){
      match.awayTeamScore= req.body.awayTeamScore
    }
    if(match.league){
      match.league = req.body.league
    }
    match.updateStatus();
    match.CalculateDuration();
    try{
      match= await match.save();
      res.status(200).send(match);

    }catch(ex){
      for (field in ex.errors) {
        console.log(ex.errors[field].message);
      }
    }
});

module.exports = router;
