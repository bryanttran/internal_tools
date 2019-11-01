import React, { Component } from 'react'
import PropTypes from 'prop-types'

let warn = console.error ;
console.error  = function(warning) {
    if (/(Invalid prop|Failed prop type)/.test(warning)) {
        console.log('failed')
        this.props.history.push({
            pathname: '/NotFound'
        });
    }
    warn.apply(console, arguments);
};

export class unapproveEmail extends Component {

    state = {
        client: ''
      };  
    
    componentDidMount() {
        console.log(this.props.location.state)
        try {
          this.setState({
            client: this.props.location.state.client,
            permission: this.props.location.state.permission
          }, () => console.log(this.props.location.permission)
          )
        } catch (err) {
          console.log(err);
          this.props.history.push({
            pathname: '/NotFound'
          });
        }
      }

    render() {
        return (
            <div>
                unapproveEmail
            </div>
        )
    }

}

export default unapproveEmail
