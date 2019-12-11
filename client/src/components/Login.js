import React, { Component } from "react";
import './Login.css';
import { Form, Message, Segment, Button } from 'semantic-ui-react';
import axios from "axios";

import { connect } from 'react-redux'
import {setPermission, setInternalUser} from '../redux/actions'

class Login extends Component {
    state = { 
      username: '', 
      password: '', 
      submittedUsername: '', 
      submittedPassword: '' ,
      permissionLevel: 0 ,
      isLoggedIn: false,
      formError: false
   };    

    isUsernamePasswordValid = (username, password) => {
        console.log(`isUsernamePasswordValid ${username} + ${password}`);

        //this.setState({username: username, password: password});

        axios.post("http://localhost:4000/api/login", {
            username: username,
            password: password,
            isLoggedIn: this.isLoggedIn
        })
          .then((res) => {
            console.log(res.data[0])
            if(res.data === undefined || res.data.length === 0) {
              //this.setState({isLoggedIn: false, formError: true});
            } else {
              //this.setState({isLoggedIn: true, formError: false});
            }
            /*console.log(this.props)
            console.log(setPermission)
            this.props.setPermission(res.data[0].PRIVILEGE)

            console.log(setInternalUser)
            this.props.setInternalUser(res.data[0].USERNAME)

            console.log(`state isLoggedIn: ${this.state.isLoggedIn}`)*/
            console.log(res.data[0].USERNAME);


            if(res.data[0].PRIVILEGE>0) {
              try {
                console.log(this.props)
                console.log(`${this.state.isLoggedIn} in login`);
                //this.props.setPermission(res.data[0].PRIVILEGE)
                //this.props.isLoggedIn = true;
                this.props.history.push({
                  pathname: '/home',
                  state: {
                    username: res.data[0].USERNAME,
                    permission: res.data[0].PRIVILEGE
                  }
                });
              } catch (e) {
                alert(e.message);
              }
            }
        })
            .catch((error) => {
                console.error(error)
            }) 
            console.log(`state isLoggedIn2: ${this.state.isLoggedIn}`)
    };

    handleChange = (e, { name, value }) => {
      this.setState({ [name]: value });
    }
    
    handleSubmit = () => {
      const { username, password } = this.state;
      this.setState({ submittedUsername: username, submittedPassword: password });
    }
  
    render() {
      const { username, password, formError } = this.state;
  
      return (
        <div className='login-container'>
          {(formError === true) ? <Message error header='Incorrect username or password' 
              content='Please try logging in again.' className='loginError' /> : null }
          <Form onSubmit={this.handleSubmit} error={formError} >
              <Segment raised>
                <Form.Input
                  fluid
                  icon='user'
                  iconPosition='left'
                  placeholder='Username'
                  name='username'
                  value={username}
                  onChange={this.handleChange}
                />
                
                <Form.Input
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Password'
                  name='password'
                  type='password'
                  value={password}
                  onChange={this.handleChange}
                />
                <Button primary fluid size='large' disabled={!this.state.username || !this.state.password}
                  onClick={ () => this.isUsernamePasswordValid(username, password)}
                  content='Submit'>
                </Button>
              </Segment>
            </Form>
          {/*<strong>onChange:</strong>
          <pre>{JSON.stringify({ username, password }, null, 2)}</pre>
          <strong>onSubmit:</strong>
          <pre>{JSON.stringify({ submittedUsername, submittedPassword }, null, 2)}</pre>*/}
        </div>
      )
    }
}

export default connect(
  null,
  {setPermission, setInternalUser}
)(Login)