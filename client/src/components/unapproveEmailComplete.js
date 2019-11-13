import React, { Component } from 'react'

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
                statementType: this.props.statementType,
                permission: this.props.location.state.permission
             }
        })
    }

    countDown() {
        this.setState(state => ({
            seconds: state.seconds - 1
          }));
    }

     // Fetches all data when component mounts
    componentDidMount() {
        if (!this.state.intervalIsSet) {
            let interval = setInterval( () => {
                this.NextPage();
            }, 5000);
            this.setState({ intervalIsSet: interval });
        }
        this.interval = setInterval( () => this.countDown(), 1000 )
    }

    componentWillUnmount() {
        if (this.state.intervalIsSet) {
          clearInterval(this.state.intervalIsSet);
          this.setState({ intervalIsSet: null });
        }
    }

    render() {
        return (
            <div>
                <h1>Redirected to home page in {this.state.seconds} seconds</h1>
            </div>
        )
    }
}

export default unapproveEmailComplete
