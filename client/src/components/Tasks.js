import React, { Component } from 'react'
import { Form, Dropdown } from 'semantic-ui-react'
import axios from "axios";

const Selections = [
  {
      key: 'email', 
      text: 'Unapprove Email',
      value: 'unapproveEmail' 
  },
  {
      key: 'password', 
      text: 'Reset Admin Password',
      value: 'resetPassword' 
  },
]


export class Tasks extends Component {

  constructor(props) {
    super(props);
    this.handleTaskChange = this.handleTaskChange.bind(this)
    this.handleClientChange = this.handleClientChange.bind(this)
  }

  state = {
    formInfo: {
      task: 'unapproveEmail',
    },
    clientList: [],
    taskValue: '',
    clientValue: '',
    clients: []
  };    


  getClientList = () => {
    axios.get("http://localhost:4000/api/getClients", {
    })
      .then((res) => {
        console.log(`**[getClientList] Got client list`);
        let clientList = res.data.map( cid => ({
          "text":cid.ORG_UNIQUENAME,
          "value":cid.ORG_UNIQUENAME,
          "schema": cid.SCHEMA_NAME
        }))
        if(clientList !== undefined || clientList.length !== 0) {
          console.log(`**[getClientList] Got client list`);
          this.setState({clientList: clientList });
          console.log(this.state.clientList)
        } else {
         console.error(`**[getClientList] Error getting client list`);
        }
      })
        .catch((error) => {
            console.error(error)
        }) 
  };    

  componentDidMount() {
    this.props.setTask(Selections.text)
    this.setState({
      Selections: [
        {
            key: 'email', 
            text: 'Unapprove Email',
            value: 'Unapprove Email' 
        },
        {
            key: 'password', 
            text: 'Reset Admin Password',
            value: 'Reset Admin Password' 
        },
      ]
    })
    this.getClientList()    
  }

  handleTaskChange(event, {value}) {
    console.log(value)
    this.props.setTask(value)
    this.setState({ taskValue: value })
  }

  handleClientChange(event, {value}) {
    console.log(value)
    let cidObject = this.state.clientList.find(cid => cid.text === value )
    this.props.setClient(cidObject)
    this.setState({ clientValue:value })
  }

  //handleChange = (e, { clientList }) => this.setState({ clientList })


  handleSubmitForm() {
    event.preventDefault();
    console.log(`inside handleSubmitForm`)
  }

  render() {
    const {  clientList, clientValue, taskValue } = this.state
      return (
          <div> 
              <Form onSubmit={this.handleSubmitForm}>
                <Form.Group widths='equal' >
                  <Dropdown 
                    fluid selection
                    label='Select a Client' 
                    control='select' 
                    placeholder='Select Task' 
                    options={Selections} 
                    value={taskValue} 
                    onChange={this.handleTaskChange}>
                  </Dropdown>
                </Form.Group>
                <Form.Group widths='equal' >
                  <Dropdown 
                    fluid selection search 
                    label='Select a Client' 
                    control='select' 
                    placeholder='Select Client' 
                    options={clientList} 
                    value={clientValue} 
                    onChange={this.handleClientChange}>
                  </Dropdown>
                </Form.Group>
              </Form> 
          </div>
      )
  }
}

export default Tasks
