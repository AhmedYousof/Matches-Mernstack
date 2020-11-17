import React, { Component } from "react";
import axios from 'axios';
import moment from 'moment';

class UpateMatch extends Component {
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
            status:"",
            errors:{}
          };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
      componentDidMount(){
          const matchId = this.props.match.params.matchId;
        if (matchId) {
            axios.get(`/api/matches/${matchId}`)
             .then(res=>{
                 const match = res.data;
                 this.setState({
                     match: match,
                     homeTeam: match.homeTeam,
                     awayTeam: match.awayTeam,
                     startTime: match.startTime,
                     endTime: match.endTime,
                     homeTeamScore: match.homeTeamScore,
                     awayTeamScore: match.awayTeamScore,
                     league: match.league,
                 })
             })
        };
     };
       
onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
    onSubmit(e) {
        window.location.reload();        
        const updatedMatch = {
            homeTeam: this.state.homeTeam,
            awayTeam: this.state.awayTeam,
            startTime: this.state.startTime,
            endTime: this.state.endTime,
            homeTeamScore: this.state.homeTeamScore,
            awayTeamScore: this.state.awayTeamScore,
            league: this.state.league,
            duration: this.state.duration,
        };
        axios
         .post(`/api/matches/${this.state.match._id}`, updatedMatch)
         .then(res => {
             const match = res.data;
             this.setState({match});
         })
         .catch(err=> console.log(err));
      };

     render() {
         const {match} = this.state;
        return (
        <div>
            <table className="table">
        <thead>
            <tr>
              <th scope="col">Home Team</th>
              <th scope="col">HomeTeam Score</th>
              <th scope="col">Start Time</th>
              <th scope="col">AwayTeam Score</th>
              <th scope="col">AwayTeam</th>
              <th scope="col">Status</th>
              <th scope="col">Duration</th>
          </tr>
         </thead>
        <tbody>
          <tr>
             <td className="bg-warning"><h4>{match.homeTeam}</h4></td>
             <td className="bg-info text-white"><h4>{match.homeTeamScore}</h4></td>
             <td className="bg-dark text-warning"><h5>{moment(match.startTime).format('MMMM Do YYYY, h:mm:ss a')}</h5></td>
             <td className="bg-danger text-white"><h4>{match.awayTeamScore}</h4></td>
             <td className="bg-warning"><h4>{match.awayTeam}</h4></td>
             <td className="bg-warning"><h4>{match.status}</h4></td>
             <td className="bg-warning"><h4>{match.duration}</h4></td>
          </tr>
        </tbody>
</table>

    <h2>Update the match</h2>
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

export default UpateMatch;
