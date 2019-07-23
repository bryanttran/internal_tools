import React, { Component } from "react";
import { Form, Button } from 'semantic-ui-react';
import axios from "axios";

export default class Login extends Component {
    state = { 
        username: '', 
        password: '', 
        submittedUsername: '', 
        submittedPassword: '' ,
        validLogin: null
    };

    isUsernamePasswordValid = (username, password) => {
        console.log(`isUsernamePasswordValid ${username} + ${password}`);

        axios.post("http://localhost:4000/api/getLogin", {
            username: username,
            password: password,
            validLogin: this.validLogin
          });
    };

    handleChange2 = (e, { name, value }) => this.setState({ [name]: value });
  
    handleSubmit2 = () => {
      const { username, password } = this.state;
  
      this.setState({ submittedUsername: username, submittedPassword: password });
    }
  
    render() {
      const { username, password, submittedUsername, submittedPassword } = this.state;
  
      return (
        <div>
          <Form onSubmit={this.handleSubmit2}>
            <Form.Group>
              <Form.Input placeholder='Name' name='username' value={username} onChange={this.handleChange2} />
              <Form.Input
                placeholder='password'
                name='password'
                value={password}
                onChange={this.handleChange2}
              />
              <Form.Button content='Submit' />
            </Form.Group>
          </Form>
          <Button onClick={this.isUsernamePasswordValid(submittedUsername, submittedPassword)} content='submit2' />
          <strong>onChange:</strong>
          <pre>{JSON.stringify({ username, password }, null, 2)}</pre>
          <strong>onSubmit:</strong>
          <pre>{JSON.stringify({ submittedUsername, submittedPassword }, null, 2)}</pre>
        </div>
      )
    }
}