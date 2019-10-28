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
      task: '',
      client: ''
    }
  };  

  componentDidMount() {
    this.setState({
      permission: this.props.location.state.detail.result.permission,
      formInfo: {
        task: '',
        client: ''
      }
    }, () => console.log(this.state));
    
  }

  clog = () => {
    console.log(this.props.location.state.detail);
    console.log(this.state.permission);
    console.log(this.state.formInfo);
  }

  setTask(task) {
    console.log(task)
    this.setState({
      formInfo: {...this.state.formInfo , task: task}
    }, () => console.log(this.state.formInfo.task) )
  }

  setClient(client) {
    console.log(client)
    this.setState({
      formInfo: {...this.state.formInfo , client: client}
    }, () => console.log(this.state.formInfo.client) )
  }
  
  nextPage() {
    console.log(this.state);
    if(this.state.formInfo.task === "unapproveEmail") {
      this.props.history.push({
        pathname: '/updateEmail',
        state: { client: this.state.formInfo.client }
      });
    } else if(this.state.formInfo.task === "resetPassword") {
      this.props.history.push({
        pathname: '/resetAdminPassword',
        state: { client: this.state.formInfo.client }
      });
    }
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
            content="cLog"
          />
         
          <Tasks setTask={this.setTask} setClient={this.setClient} />
          <Button primary
            onClick={ ()=>this.nextPage() } 
            content="SubmitTest"
          />
        </div>
      </div>
    );
  }
}