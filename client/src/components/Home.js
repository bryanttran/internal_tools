import React, { Component } from "react";
import { Button, Form } from 'semantic-ui-react';
import Breadcrumbs from './Breadcrumbs';
import Tasks from './Tasks';


export default class Home extends Component {

  constructor(props) {
    super(props)
    this.setTask = this.setTask.bind(this)
    this.setClient = this.setClient.bind(this)
  }

  state = {
    permission:0,
    validLogin: false,
    formInfo: {
      task: 'unapproveEmail',
    }
  };    

  componentDidMount() {
    this.setState({permission: this.props.location.state.detail.result.permission});
  }

  clog = () => {
    console.log(this.props.location.state.detail);
    console.log(this.state.permission);
    console.log(this.state.formInfo);
  }

  setTask(task) {
    console.log(task)
    this.setState({
      formInfo: task
    })
  }

  setClient(client) {
    console.log(client)
    this.setState({
      formInfo: client
    })
  }

  render() {
    return (
      <div className="Home">

        <div className="lander">
        <Breadcrumbs />

          <h1>Home page</h1>
          <p>Displaying home</p>
          <p>Permission level: {this.state.permission}</p>
          <Button primary
            onClick={ ()=>this.clog() } 
            content="test"
          />
          <Tasks setTask={this.setTask} setClient={this.setClient} />

        </div>
      </div>
    );
  }
}