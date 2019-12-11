import React, { Component } from 'react'
import { Button } from 'semantic-ui-react';
import axios from "axios";
import AdminTable from './AdminTable'

export class resetAdminPassword extends Component {


    state = {
        client: '',
        userList: [{
          username: "",
          password: ""
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
          console.error(err);
          this.props.history.push({
            pathname: '/NotFound'
          });
        }

        axios.post("http://localhost:4000/api/getUsers", {
          client: this.props.location.state.client,
        })
          .then((res) => {
            if(res.data.success === true) {
                console.log(res.data.result.userList)
              console.log(`**[getUsers] Got user List successfully`);
              this.setState({userList: res.data.result.userList});
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

  nextPage = (username, password) => {
    this.props.history.push({
      pathname: '/resetAdminPasswordConfirm',
      state: {
         client: this.props.location.state.client,
         username: username,
         password: password,
         permission: this.props.location.state.permission
      }
    })
  }

  PreviousPage = () => {
    this.props.history.goBack();
  }

    render() {
        return (
            <div>
              <AdminTable 
                client={this.state.client}  
                userList={this.state.userList}
                nextPage={this.nextPage}
              />
              <Button primary
                onClick={ ()=>this.PreviousPage() } 
                content="Go Back"
              />
            </div>
        )
    }
}

export default resetAdminPassword
