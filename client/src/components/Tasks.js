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

  constructor() {
    super();
    this.handleTaskChange = this.handleTaskChange.bind(this)
    this.handleClientChange = this.handleClientChange.bind(this)
  }

  state = {
    formInfo: {
      task: 'unapproveEmail',
    },
    clientList: [],
    taskValue: '',
    clientValue: ''
  };    


  getClientList = () => {
    axios.get("http://localhost:4000/api/getClients", {
    })
      .then((res) => {
        console.log(res.data.client[0])
        if(res.data.success === true) {
          console.log(`**[getClientList] Got client list`);
          this.setState({clientList: res.data.client});
          console.log(this.state.clientList)
        } else {
         console.error(`**[getClientList] Error getting client list`);
        }
      })
        .catch((error) => {
            console.error(error)
        }) 
  };    

  componentWillMount() {
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
    this.props.setClient(value)
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
                    fluid selection
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
