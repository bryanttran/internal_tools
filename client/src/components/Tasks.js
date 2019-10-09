import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'

const Selections = [
  {
      key: 'email', 
      // content: 'Unapprove Email',
      text: 'Unapprove Email',
      value: 'Unapprove Email' 
  },
  {
      key: 'password', 
      // content: 'Reset Admin Password',
      text: 'Reset Admin Password',
      value: 'Reset Admin Password' 
  },
]

let Selection = Selections.map( task => <option value={task.value} key={task.key} > {task.text} </option> )

export class Tasks extends Component {

  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.props.setTask(event.target.value)
  }

  render() {
      return (
          <div>
              <Form >
                <Form.Group widths='equal' >
                  <Form.Dropdown label='title' control='select'  onChange={this.handleChange}> {Selection}
                  </Form.Dropdown>
                </Form.Group>
              </Form> 
          </div>
      )
  }
}

export default Tasks
