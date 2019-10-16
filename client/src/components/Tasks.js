import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'
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

let Selection = Selections.map( task => <option value={task.value} key={task.key} > {task.text} </option> )

export class Tasks extends Component {

  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this)
  }

  state = {
    formInfo: {
      task: 'unapproveEmail',
    },
    clientList: []
  };    


  getClientList = () => {
    axios.get("http://localhost:4000/api/getClients", {
    })
      .then((res) => {
        console.log(res.data.client)
        if(res.data.success === true) {
          console.log(`[getClientList] Got client list`);
          this.setState({clientList: res.data.client});
          console.log(this.state.clientList)
        } else {
         console.error(`[getClientList] Error getting client list`);
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

  handleChange(event) {
    console.log(event.target)
    this.props.setTask(event.target.value)
  }

  handleSubmitForm() {
    event.preventDefault();
    console.log(`inside handleSubmitForm`)
    
  }

  render() {
      return (
          <div>
              <Form onSubmit={this.handleSubmitForm}>
                <Form.Group widths='equal' >
                  <Form.Select label='Tasks' control='select' placeholder='Select Task' options={this.state.Selections} onChange={this.handleChange}> {Selection}
                  </Form.Select>
                </Form.Group>
                <Form.Button>Submit</Form.Button>
              </Form> 
          </div>
      )
  }
}

export default Tasks
