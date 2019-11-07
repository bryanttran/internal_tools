import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'semantic-ui-react';
import axios from "axios";

export class resetAdminPassword extends Component {
    static propTypes = {

    }

    state = {
        client: '',
        userList: [{
          statementType: "",
          isApproved: ""
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

        axios.post("http://localhost:4000/api/getUsers", {
          client: this.props.location.state.client,
        })
          .then((res) => {
            if(res.data.success === true) {
                console.log(res.data)
              console.log(`**[getUsers] Got user List successfully`);
              this.setState({userList: res.data.result});
            } else {
              console.error(`**[getUsers] Error getting user list`);
            }
          })
            .catch((error) => {
                console.error(error)
            }) 
        
      }

      
  clog = () => {
    console.log(this.state.userList);
  }
    render() {
        return (
            <div>
                resetAdminPassword
                <Button primary 
                  onClick={ ()=>this.clog() } 
                  content="cLog"
                />
            </div>
        )
    }
}

export default resetAdminPassword
