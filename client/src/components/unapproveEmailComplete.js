import React, { Component } from 'react'
import axios from "axios";

export class unapproveEmailComplete extends Component {
    constructor(props) {
        super(props);
        this.state = { seconds: 5 };
    }

    state = {
        intervalIsSet: false
    }

    NextPage = () => {
        this.props.history.push({
            pathname: '/home',
            state: {
                client: this.props.location.state.client,
                statementType: this.props.location.state.statementType,
                permission: this.props.location.state.permission
             }
        })
    }

    countDown() {
        if (this.state.intervalIsSet) {
            this.setState(state => ({
                seconds: state.seconds - 1
            }));
        }
    }

    update = {
        "$set": {
            "emailList.$.isApproved": "N"
        }
    };

     // Fetches all data when component mounts
    componentDidMount() {
        console.log(this.props.location.state.client)
        console.log(this.props.location.state.statementType)

        axios.post("http://localhost:4000/api/updateEmail", {
            statementType: this.props.location.state.statementType,
            client: this.props.location.state.client,
            update: this.update,
        })
          .then((res) => {
            if(res.data.success === true) {
              console.log(`**[updateEmail] sucessfully updated approval status`);
              console.log(res)
            } else {
                console.error(`**[updateEmail] Error updating approval status`);
                console.error(res);
            }
          })
            .catch((error) => {
                console.error(error)
            }) 
      

        if (!this.state.intervalIsSet) {
            this.setState({ intervalIsSet: true });
            this.interval = setInterval(
                () => { this.NextPage() },
                5000
            );
            this.intervalCountDown = setInterval( 
                () => this.countDown(), 
                1000 
            )
        }
    }

    componentWillUnmount() {
        this.setState({ intervalIsSet: false });
        clearInterval(this.interval);
        clearInterval(this.intervalCountDown);
    }

    render() {
        return (
            <div>
                <h2>Successfully</h2>
                <h2>Redirected to home page in {this.state.seconds} seconds</h2>
            </div>
        )
    }
}

export default unapproveEmailComplete
