import React, { Component } from "react";
import { Button, Grid, Message } from 'semantic-ui-react';
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
    incompleteForm: false,
    username: "",
    formInfo: {
      task: '',
      client: '',
      schema: ''
    }
  };  

  componentDidMount() {
    //let test = getPermission()
    console.log(this.props.location.state)
    let propPermission;
    try {

      //propPermission = this.props.location.state.detail[0].PRIVILEGE

      /*if(typeof this.props.location.state.permission !== 'undefined') {
        propPermission = this.props.location.state.permission;
        console.log(`propPermission ${propPermission}`)
      } else {
        propPermission = this.props.location.state.detail[0].PRIVILEGE
      }*/
      this.setState({
        permission: this.props.location.state.permission,
        username: this.props.location.state.username
      }, () => {
        console.log(this.state);
        if(this.state.permission === 0 ? 1 : 0) {
          this.props.history.push({
            pathname: '/NotFound'
          });
        };
      })
    } catch (err) {
      console.error(err);
      this.props.history.push({
        pathname: '/NotFound'
      });
    }
    //store.subscribe();
  }

  

  clog = () => {
    //console.log(this.props.location.state.detail[0].PRIVILEGE);
    //console.log(store.getState().todos)
    //console.log(this.props.location.state.permission);
    console.log(this.state);
    console.log(this.props);
    console.log(this.state.formInfo);
  }

  setTask(task) {
    console.log(task)
    this.setState({
      formInfo: {...this.state.formInfo, task: task}
    }, () => console.log(this.state.formInfo.task) )
  }

  setClient(client) {
    console.log(client)
    this.setState({
      formInfo: {...this.state.formInfo, client: client.value, schema: client.schema}
    }, () => console.log(this.state.formInfo.client) )
  }
  
  nextPage() {
    console.log(this.state.formInfo.client);
    if(this.state.formInfo.client) {
      if(this.state.formInfo.task === "unapproveEmail") {
        this.props.history.push({
          pathname: '/unapproveEmail',
          state: {
             client: this.state.formInfo.client,
             permission: this.props.location.state.permission,
             username: this.props.location.state.username,
             schema: this.state.formInfo.schema
          }
        });
      } else if(this.state.formInfo.task === "resetPassword") {
        this.props.history.push({
          pathname: '/resetAdminPassword',
          state: { 
            client: this.state.formInfo.client,
            permission: this.props.location.state.permission,
            username: this.props.location.state.username,
            schema: this.state.formInfo.schema
          }
        });
      }
    }
    this.setState({
      incompleteForm: true
    })
    
  }

  render() {
    const {incompleteForm} = this.state;
    return (
      <div className="Home">
        <div className="lander">
        <Breadcrumbs />
        
          <h1>Home page</h1> 
          <p>Displaying home</p>
          <p>Permission level: {this.props.location.state.permission}</p>
          <Button primary
            onClick={ ()=>this.clog() } 
            content="cLog"
          />
          <Grid >
            <Grid.Row centered>
              <Tasks setTask={this.setTask} setClient={this.setClient} />
            </Grid.Row>
            <Grid.Row centered>
              <Button primary segment="true" centered="true"
                onClick={ ()=>this.nextPage() } 
                content="SubmitTest"
              />
            </Grid.Row>
            <Grid.Row centered>
              {(incompleteForm === true) ? <Message error header='One or more fields are empty' 
               content='Please choose an option from the dropdown above.' className='loginError' /> : null }
            </Grid.Row>
          </Grid>

        </div>
      </div>
    );
  }
}

/*Home.propTypes = {
  permission: PropTypes.string.isRequired
};*/