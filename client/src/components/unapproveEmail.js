import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Table } from 'semantic-ui-react';
import axios from "axios";

let warn = console.error ;
console.error  = function(warning) {
    if (/(Invalid prop|Failed prop type)/.test(warning)) {
        console.log('failed')
        this.props.history.push({
            pathname: '/NotFound'
        });
    }
    warn.apply(console, arguments);
};

export class unapproveEmail extends Component {

    state = {
        client: '',
        emailList: [{
          statementType: "",
          isApproved: "",
          header: "",
          body: "",
        }]
      };  
    
    componentDidMount() {
        console.log(this.props.location.state)
        try {
          this.setState({
            client: this.props.location.state.client,
            permission: this.props.location.state.permission
          }, () => console.log(this.props.location.permission)
          )
        } catch (err) {
          console.log(err);
          this.props.history.push({
            pathname: '/NotFound'
          });
        }

        axios.post("http://localhost:4000/api/getEmails", {
          client: this.props.location.state.client,
        })
          .then((res) => {
            if(res.data.success === true) {
              console.log(`**[getClientList] Got Email List successfully`);
              this.setState({emailList: res.data.result});
            } else {
              console.error(`**[getClientList] Error getting email list`);
            }
          })
            .catch((error) => {
                console.error(error)
            }) 
        
      }

      
  clog = () => {
    console.log(this.state.emailList);
  }
    render() {
        return (
            <div>
                unapproveEmail
                <Button primary 
                  onClick={ ()=>this.clog() } 
                  content="cLog"
                />
                 <Table celled selectable>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Name</Table.HeaderCell>
        <Table.HeaderCell>Status</Table.HeaderCell>
        <Table.HeaderCell>Notes</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      <Table.Row onClick ={ () => this.clog()}>
        <Table.Cell>John</Table.Cell>
        <Table.Cell>No Action</Table.Cell>
        <Table.Cell>None</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Jamie</Table.Cell>
        <Table.Cell>Approved</Table.Cell>
        <Table.Cell>Requires call</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Jill</Table.Cell>
        <Table.Cell>Denied</Table.Cell>
        <Table.Cell>None</Table.Cell>
      </Table.Row>
      <Table.Row warning>
        <Table.Cell>John</Table.Cell>
        <Table.Cell>No Action</Table.Cell>
        <Table.Cell>None</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Jamie</Table.Cell>
        <Table.Cell positive>Approved</Table.Cell>
        <Table.Cell warning>Requires call</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Jill</Table.Cell>
        <Table.Cell negative>Denied</Table.Cell>
        <Table.Cell>None</Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
            </div>
        )
    }

}

export default unapproveEmail
