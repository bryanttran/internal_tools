import React, { Component } from "react";
import './Login.css';
import { Form, Message, Segment, Button } from 'semantic-ui-react';
import axios from "axios";


export default class Login extends Component {
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

        this.setState({username: username, password: password});

        axios.post("http://localhost:4000/api/getLogin", {
            username: username,
            password: password,
            isLoggedIn: this.isLoggedIn
        })
          .then((res) => {
            console.log(`success status: ${res.data.success}`)
            console.log(res)
            if(res.data.success === true) {
              this.setState({isLoggedIn: true, formError: false});
            } else {
              this.setState({isLoggedIn: false, formError: true});
            }
            
            console.log(`state isLoggedIn: ${this.state.isLoggedIn}`)
            console.log(res.data.result);


            if(this.state.isLoggedIn) {
              try {
                console.log(this.props)
                console.log(`${this.state.isLoggedIn} in login`);
                //this.props.isLoggedIn = true;
                this.props.history.push({
                  pathname: '/home',
                  state: { detail: res.data }
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
      const { username, password, submittedUsername, submittedPassword, formError } = this.state;
  
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