import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'semantic-ui-react';
import axios from "axios";

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
        client: '',
        emailList: [{
          statementType: "",
          isApproved: "",
          header: "",
          body: "",
        }]
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

        axios.post("http://localhost:4000/api/getEmails", {
          client: this.props.location.state.client,
        })
          .then((res) => {
            if(res.data.success === true) {
              console.log(`**[getClientList] Got Email List successfully`);
              this.setState({emailList: res.data.result});
            } else {
              console.error(`**[getClientList] Error getting email list`);
            }
          })
            .catch((error) => {
                console.error(error)
            }) 
        
      }

      
  clog = () => {
    console.log(this.state.emailList);
  }
    render() {
        return (
            <div>
                unapproveEmail
                <Button primary 
                  onClick={ ()=>this.clog() } 
                  content="cLog"
                />
            </div>
        )
    }

}

export default unapproveEmail
