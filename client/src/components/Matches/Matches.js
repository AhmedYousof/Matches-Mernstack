import React, { Component } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import moment from 'moment';

class Matches extends Component {
    state = {
        matches: [],

      };
       componentDidMount(){
         axios.get("/api/matches")
         .then(res => {
             const matches = res.data;
             this.setState({matches})
         })
      };
       onRemoveClick(id) {
        window.location.reload();        
         axios
          .delete(`/api/matches/${id}`)
          .then(res => console.log(res.data))
          .catch(err => console.log(err));
      };
      
    render() {
      return ( 
          <div>
        <table className="table">
        <thead>
            <tr className="bg-info text-white">
              <th scope="col">#</th>
              <th scope="col">Home Team</th>
              <th scope="col">HomeTeam Score</th>
              <th scope="col">Start Time</th>
              <th scope="col">  </th>
              <th scope="col">  </th>
              <th scope="col">AwayTeam Score</th>
              <th scope="col">AwayTeam</th>
              <th scope="col">status</th>
              <th scope="col">Duration</th>

          </tr>
         </thead>
        {this.state.matches.map((match, i) => (
        <tbody key={i}>
          <tr>
          <th scope="row" className="bg-dark text-white">{i}</th>
             <td className="bg-warning text-white">{match.homeTeam}</td>
             <td className="bg-info text-white">{match.homeTeamScore}</td>
             <td className="bg-dark text-warning">{moment(match.startTime).format('MMMM Do YYYY, h:mm:ss a')}</td>
             <td className="bg-dark">
               <Link to={`/update-match/${match._id}`}>
              <button
              type="button"
              className="btn btn-sm btn-info"
              >
                update Match
              </button>
              </Link>
                </td>
             <td className="bg-dark">
              <button
              type="button"
              className="btn btn-sm btn-danger"
              onClick={this.onRemoveClick.bind(this, match._id)}
              >
                Remove Match
              </button>
                </td>
             <td className="bg-danger text-white">{match.awayTeamScore}</td>
             <td className="bg-warning text-white">{match.awayTeam}</td>
             <td className="bg-warning text-white">{match.status}</td>
             <td className="bg-warning text-white">{match.duration}</td>
          </tr>
        </tbody>
    ))}
</table>
</div>
      )
    }
};

export default Matches;
