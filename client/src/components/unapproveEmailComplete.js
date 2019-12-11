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
                username: this.props.location.state.username,
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

     // Fetches all data when component mounts
    componentDidMount() {
        console.log(this.props.location.state.client)
        console.log(this.props.location.state.username)
        console.log(this.props.location.state.statementType)

        axios.put("http://localhost:4000/api/unapproveEmail", {
            CID: this.props.location.state.client,
            statementType: this.props.location.state.statementType,
            schema: this.props.location.state.schema,
        })
          .then((res) => {
            if(res.status===200) {
                console.log(`**[unapproveEmail] sucessfully updated approval status`);
                console.log(res);
                var pad = function(num) { return ('00'+num).slice(-2) };
                var date;
                date = new Date();
                date = date.getFullYear()        + '-' +
                        pad(date.getMonth() + 1) + '-' +
                        pad(date.getDate())      + ' ' +
                        pad(date.getHours())     + ':' +
                        pad(date.getMinutes())   + ':' +
                        pad(date.getSeconds());   
                console.log(date)
                axios.post("http://localhost:4000/api/insertAuditLog", {
                   CID: this.props.location.state.client,
                   schema: this.props.location.state.schema,
                   username: this.props.location.state.username,
                   statementType: this.props.location.state.statementType,
                   CID: this.props.location.state.client,
                   date: date,
                   event: "unAppEmail",
                })
                .then((auditRes) => {
                    console.log(auditRes)
                })
            } else {
                console.error(`**[unapproveEmail] Error updating approval status`);
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
