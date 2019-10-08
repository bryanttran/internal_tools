import React, { Component } from "react";
import { Button, Form } from 'semantic-ui-react';
import Breadcrumbs from './Breadcrumbs';
import Tasks from './Tasks';


export default class Home extends Component {

  state = { 
    permission:0,
    validLogin: false,
    activeTask: "",
 };    

 componentDidMount() {
   this.setState({permission: this.props.location.state.detail.permission});
   console.log(this.state.permission);
 }

  clog = () => {
    console.log(this.props.location.state.detail);
    console.log(this.state.permission);
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
          <Tasks/>

        </div>
      </div>
    );
  }
}