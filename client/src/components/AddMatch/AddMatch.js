import React, { Component } from "react";
import axios from 'axios';
import moment from 'moment';

class AddMatch extends Component {
    constructor(props){
        super(props);
        this.state = {
            match: {},
            homeTeam: "",
            awayTeam:"",
            startTime:"",
            endTime:"",
            homeTeamScore:"",
            awayTeamScore:"",
                league:"",
            errors:{}
          };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
       
onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
    onSubmit(e) {
     window.location.reload();        
     e.preventDefault();
        const NewMatch = {
            homeTeam: this.state.homeTeam,
            awayTeam: this.state.awayTeam,
            startTime: this.state.startTime,
            endTime: this.state.endTime,
            homeTeamScore: this.state.homeTeamScore,
            awayTeamScore: this.state.awayTeamScore,
            league: this.state.league,
        };
        axios
         .post("/api/matches", NewMatch)
         .then(res => {
             const match = res.data;
             this.setState({match});
         })
         .catch(err=> console.log(err));
      };


     render() {
        return (
            <div>  
              <h2>Add New match</h2>
              <form onSubmit={this.onSubmit}>
            <div className="form-group">
                <input type="text" onChange={this.onChange} class="form-control"  placeholder="Home Team Name...." name="homeTeam" value={this.state.homeTeam} />
            </div>
            <div className="form-group">
                <input type="text" onChange={this.onChange} class="form-control" id="homeTeamScore" placeholder="Home Team Score...." name="homeTeamScore"  value={this.state.homeTeamScore} />
            </div>
            <div className="form-group">
                <input type="text" onChange={this.onChange} class="form-control" id="awayTeam" name="awayTeam" placeholder="Away Team Name...." value={this.state.awayTeam} />
            </div>
            <div className="form-group">
                <input type="text" onChange={this.onChange} class="form-control" id="awayTeamScore" name="awayTeamScore" placeholder="Away Team Score...." value={this.state.awayTeamScore} />
            </div>
            <div className="form-group col-md-6">
            <label for="startTime"><h5>Start Time</h5></label>
             <input type="datetime-local" onChange={this.onChange} class="form-control" id="startTime" name="startTime" value={this.state.startTime} />
            </div> 
            <div className="form-group col-md-6">
            <label for="endTime"><h5>End Time</h5></label>

            <input type="datetime-local" onChange={this.onChange} class="form-control" id="endTime" name="endTime" value={this.state.endTime} />
            </div> 
            
            <div className="form-group">
                <input type="text" onChange={this.onChange} class="form-control" id="league" name="league" placeholder="Select the League...." value={this.state.league} />
            </div>
            <input
                  type="submit"
                  className="btn btn-info btn-block mt-4"
                  value="Save"
                />
        </form>
</div>
        )
    }
};

export default AddMatch;
