const mongoose = require('mongoose');
const Joi = require('joi');
const moment = require('moment');

const matchSchema = mongoose.Schema({
    homeTeam: {
            type: String,
            required: true
    },
    awayTeam: {
            type: String,
            required: true
    },
    startTime: {
        type: String,
        required: true

    },
    endTime: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
    },
    homeTeamScore: {
        type: Number,
        default: 0,
        required: true

    },
    awayTeamScore: {
        type: Number,
        default: 0,
        required: true
    },
    league: {
        type: String,
        required: true

    },
    status: {
        type: String,
        enum: ["Will Start", "Active Now", "Finished"],
    }
});

matchSchema.methods.updateStatus = function(){
    if(moment(this.startTime).isBefore(Date.now())&& moment(this.endTime).isAfter(Date.now())){
       this.status = "Active Now"
    }else if(moment(this.startTime).isAfter(Date.now())){
            this.status = "Will Start"
    }else if(moment(this.endTime).isBefore(Date.now())){
        this.status = "Finished"
    }
}
matchSchema.methods.CalculateDuration = function(){
    const duration = moment(this.endTime).diff(this.startTime,'minutes');
    this.duration = duration; 
}

const Match = mongoose.model("Match", matchSchema);


function ValidateMatch(match) {
    const schema = {
        startTime: Joi.date().less(Joi.ref("endTime")).required(),
        endTime: Joi.date().required(),
        homeTeam: Joi.string().min(3).max(255).required(),
        awayTeam: Joi.string().min(3).max(255).required(),
        homeTeamScore: Joi.number().min(0).required(),
        awayTeamScore: Joi.number().min(0).required(),
        league: Joi.string().required(),
    };
    return Joi.validate(match, schema);
  }

exports.Match = Match;

exports.ValidateMatch = ValidateMatch;

