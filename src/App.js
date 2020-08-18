import React, {Component} from 'react';
import {Router, navigate} from '@reach/router';
import firebase from './Firebase';

import 'bootstrap/dist/css/bootstrap.css';
import './index.css';


import Home from './Home';
import Navigation from './Navigation';
import Welcome from './Welcome';
import Login from './Login';
import Meetings from './Meetings';
import Register from './Register';
import CheckIn from './Checkin';
import Attendees from './Attendees';


class App extends Component {
  constructor(){
    super();
    this.state ={
      user: null,
      displayName: null,
      userId: null
    }
  }

  componentDidMount(){
    firebase.auth().onAuthStateChanged(FBUser => {
      if(FBUser){
        this.setState({
          user: FBUser, 
          displayName: FBUser.displayName,
          userId: FBUser.uid
        });

        const meetingsRef = firebase.database().ref(`meetings/${this.state.user.uid}`);
        meetingsRef.on('value', snapshot => {
            let meetings = snapshot.val();
            let meetingsList = [];

            for(let item in meetings){
              meetingsList.push({
                meetingID: item,
                meetingName: meetings[item].meetingName
              })
            }
            this.setState({
              meetings: meetingsList,
              howManyMeetings: meetingsList.length
            })
        })
      }else{
        this.setState({user: null});
      }
    })
  }

  registerUser = userName => {
    firebase.auth().onAuthStateChanged(FBUser => {
      FBUser.updateProfile({
        displayName:userName
      }).then(() =>{
        this.setState({
          user: FBUser, 
          displayName: FBUser.displayName,
          userId: FBUser.uid
        });
        navigate('/meetings')
      })
    })
  }

  logOutUser = e => {
    e.preventDefault();
    this.setState({
      user: null, 
      displayName: null,
      userId: null
    });
    firebase.auth().signOut().then(() =>{
      navigate('/login')
    })
  }

  addMeeting = meetingName =>{
    const ref = firebase.database().ref(`meetings/${this.state.user.uid}`);
     ref.push({meetingName: meetingName})
  }

  render(){
    return (
      <div>
        <Navigation user={this.state.user} logOutUser={this.logOutUser}/>
        {this.state.user && <Welcome userName={this.state.user.displayName} logOutUser={this.logOutUser} />}
        <Router >
          <Home path="/" user={this.state.user} />
          <Login path="/login" />
          <Meetings path="/meetings" addMeeting={this.addMeeting} meetings={this.state.meetings} userID={this.state.userId} />
          <CheckIn path="/checkin/:userID/:meetingID" />
          <Register path="/register" registerUser={this.registerUser} />
          <Attendees path="/attendees/:userID/:meetingID" adminUser={this.state.userId}  />          
        </Router>
      </div>
    );
  }
}

export default App;