import React, { Component } from "react";
import { Button } from 'semantic-ui-react';



export default class Home extends Component {

  state = { 
    permission:0,
    validLogin: false
 };    

 componentDidMount() {
   this.setState({permission: this.props.location.state.detail.permission});
   console.log(this.state.permission)

 }

  clog = () => {
    console.log(this.props.location.state.detail)
    console.log(this.state.permission)
  }

  render() {
    return (
      <div className="Home">
        <div className="lander">
          <h1>Home page</h1>
          <p>Displaying home</p>
          <Button onClick={ ()=>this.clog() } content="test"/>
        </div>
      </div>
    );
  }
}