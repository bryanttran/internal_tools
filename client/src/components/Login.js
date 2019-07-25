import React, { Component } from "react";
import { Form } from 'semantic-ui-react';
import axios from "axios";

export default class Login extends Component {
    state = { 
      username: '', 
      password: '', 
      submittedUsername: '', 
      submittedPassword: '' ,
      permissionLevel: 0 ,
      validLogin: false
   };    

    isUsernamePasswordValid = (username, password) => {
        console.log(`isUsernamePasswordValid ${username} + ${password}`);

        this.setState({username: username, password: password});

        axios.post("http://localhost:4000/api/getLogin", {
            username: username,
            password: password,
            validLogin: this.validLogin
        })
          .then((res) => {
            console.log(`success: ${res.data.success}`)
            console.log(res)
            if(res.data.success === true) {
              this.setState({validLogin: true});
            } else {
              this.setState({validLogin: false});
            }
            
            console.log(`state validLogin: ${this.state.validLogin}`)
            console.log(res);

            if(this.state.validLogin) {
              try {
                //this.props.validLogin = true;
                this.props.history.push({
                  pathname: '/',
                  state: { detail: res.data }
                });
                console.log(this.props)
                console.log(`${this.state.validLogin} in login`);
      
              } catch (e) {
                alert(e.message);
              }
            }

        })
            .catch((error) => {
                console.error(error)
            });
            console.log(`state validLogin2: ${this.state.validLogin}`)

      
    };

    handleChange = (e, { name, value }) => this.setState({ [name]: value });
  
    handleSubmit = () => {
      const { username, password } = this.state;
  
      this.setState({ submittedUsername: username, submittedPassword: password });

    }
  
    render() {
      const { username, password, submittedUsername, submittedPassword } = this.state;
  
      return (
        <div>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group>
              <Form.Input placeholder='Name' name='username' value={username} onChange={this.handleChange} />
              <Form.Input
                placeholder='password'
                name='password'
                value={password}
                onChange={this.handleChange}
              />
              <Form.Button onClick={ () => this.isUsernamePasswordValid(username, password)} content='Submit' />
            </Form.Group>
          </Form> 
          <strong>onChange:</strong>
          <pre>{JSON.stringify({ username, password }, null, 2)}</pre>
          <strong>onSubmit:</strong>
          <pre>{JSON.stringify({ submittedUsername, submittedPassword }, null, 2)}</pre>
        </div>
      )
    }
}