import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'

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

  };    

  componentWillMount() {
    console.log("test")
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
  }

  handleChange(event) {
    console.log(event.target)
    this.props.setTask(event.target.value)
  }

  handleSubmit() {
    console.log(`handleSubmit`)
  }

  render() {
      return (
          <div>
              <Form onSubmit={this.handleSubmit}>
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
