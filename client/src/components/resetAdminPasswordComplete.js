import React, { Component } from 'react'
import axios from "axios";

export class resetAdminPasswordComplete extends Component {
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
            "userList.$.password": this.props.location.state.password
        }
    };

    // Fetches all data when component mounts
    componentDidMount() {
        console.log(this.props.location.state)

        axios.post("http://localhost:4000/api/updateUserPassword", {
            client: this.props.location.state.client,
            username: this.props.location.state.username,
            password: this.props.location.state.password,
            update: this.update,
        })
          .then((res) => {
            if(res.data.success === true) {
              console.log(`**[updateUserPassword] sucessfully updated approval status`);
              console.log(res)
            } else {
                console.error(`**[updateUserPassword] Error updating approval status`);
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

export default resetAdminPasswordComplete
