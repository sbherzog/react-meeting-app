import React, {Component} from 'react';
import MeetingList from './MeetingList';
import FormError from './FormError';


class Meetings extends Component {
    constructor(props){
        super(props);
        this.state = {
            meetingName: '',
            errorMessage:null,
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e){
        const itemName = e.target.name;
        const itemValue = e.target.value;
        this.setState({[itemName]: itemValue})
        this.setState({errorMessage: null})
    }

    handleSubmit(e){
        e.preventDefault();
        if(this.state.meetingName !== ''){
            this.props.addMeeting(this.state.meetingName)
            this.setState({meetingName: ''})    
        }else{
            this.setState({errorMessage: 'Please fill in a meeting name'})    
        }
    }

    render(){
        return(
            <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-md-8 text-center">
                <h1 className="font-weight-light">Add a Meeting</h1>
                <div className="card bg-light">
                    <div className="card-body text-center">
                    <form onSubmit={this.handleSubmit}
                        className="formgroup"
                    >
                        <div className="input-group input-group-lg">
                        <input
                            type="text"
                            className="form-control"
                            name="meetingName"
                            placeholder="Meeting name"
                            aria-describedby="buttonAdd"
                            value={this.state.meetingName}
                            onChange={this.handleChange}
                        />
                        <div className="input-group-append">
                            <button
                            type="submit"
                            className="btn btn-sm btn-info"
                            id="buttonAdd"
                            >
                            +
                            </button>
                        </div>
                        </div>
                    </form>
                    </div>
                </div>
                {this.state.errorMessage !== null? (
                    <FormError theMessage={this.state.errorMessage} />
                ) : null}
                </div>

                <div className="col-12 col-md-8 text-center mt-5">
                    
                        {this.props.meetings && this.props.meetings.length ? (
                            <div className="card rounded-0">
                                <div className="card-body py-2">
                                    <h4 className="card-title font-wight-light m-0">Your Meetings</h4>
                                </div>
                            </div>
                        ) : null }
                        {this.props.meetings &&  (
                            <div className="list-group list-group-flush">
                                <MeetingList userID={this.props.userID} meetings={this.props.meetings} />
                            </div>
                        )}
                </div>
            </div>
            </div>
        );
    }
}

export default Meetings;