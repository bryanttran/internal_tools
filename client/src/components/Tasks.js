import React, { Component } from 'react'
import { Form, Dropdown } from 'semantic-ui-react'

const selections = [
    { 
        key: 'email', 
        content: 'Unapprove Email', 
        text: 'Unapprove Email',
        value: 'Unapprove Email' 
    },
    { 
        key: 'password', 
        content: 'Reset Admin Password', 
        text: 'Reset Admin Password',
        value: 'Reset Admin Password' 
    },
  ].map((task, index) => {
      return (
            <Form.Group widths='equal'>
                <Form.Field label='An HTML <select>' control='select'>
                <option value={task.value}>{`${task.text}`}</option>
                </Form.Field>
            </Form.Group>
      );
  })
  
const Tasks1 = () => (
    <Form>
      <Form.Group widths='equal'>
        <Form.Field label='An HTML <select>' control='select'>
          <option value='male'>Male</option>
          <option value='female'>Female</option>
        </Form.Field>
      </Form.Group>
      <Form.Group widths='equal'>
        <Form.Field label='An HTML <select>' control='select'>
          <option value='male'>Male</option>
          <option value='female'>Female</option>
        </Form.Field>
      </Form.Group>
      <selections />
    </Form>
)


export class Tasks extends Component {
    render() {
        return (
            <div>
                <tasks1/>
                <selections/>
            </div>
        )
    }
}
export default Tasks
