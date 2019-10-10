import React, { Component } from "react";
import { Button, Form } from 'semantic-ui-react';
import Breadcrumbs from './Breadcrumbs';
import Tasks from './Tasks';


export default class Home extends Component {

  constructor(props) {
    super(props)
    this.setTask = this.setTask.bind(this)
  }

  state = {
    permission:0,
    validLogin: false,
    activeTask: 'unapproveEmail',
  };    

  componentDidMount() {
    this.setState({permission: this.props.location.state.detail.permission});
    console.log(`${this.state.permission} componentDidMount`);
  }

  clog = () => {
    console.log(this.props.location.state.detail);
    console.log(this.state.permission);
  }

  setTask(task) {
    console.log(task);
    this.setState({
      activeTask: task
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
          <Tasks setTask={this.setTask} />

        </div>
      </div>
    );
  }
}