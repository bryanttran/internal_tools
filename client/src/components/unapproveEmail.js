import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Table } from 'semantic-ui-react';
import axios from "axios";
import EmailTable from './EmailTable'

/*let warn = console.error ;
console.error  = function(warning) {
    if (/(Invalid prop|Failed prop type)/.test(warning)) {
        console.log('failed')
        this.props.history.push({
            pathname: '/NotFound'
        });
    }
    warn.apply(console, arguments);
};*/

export class unapproveEmail extends Component {

  constructor(props) {
    super(props);
  }

    state = {
        client: '',
        emailList: [{
          statementType: "",
          isApproved: "",
          header: "",
          body: "",
        }],
        selectedStatementType: "",
      };  
    
    componentDidMount () {
        console.log(this.props.location.state)
        try {
          this.setState({
            client: this.props.location.state.client,
            permission: this.props.location.state.permission
          })
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

      nextPage = (statementType) => {
        this.props.history.push({
          pathname: '/unapproveEmailConfirm',
          state: {
             client: this.props.location.state.client,
             statementType: statementType,
             permission: this.props.location.state.permission
          }
        })
      }

    PreviousPage = () => {
      this.props.history.goBack();
    }
  
    render() {
        return (
            <div>
              <EmailTable 
                client={this.state.client}  
                emailList={this.state.emailList}
                nextPage={this.nextPage}
              />
              <br />
              <Button primary
                onClick={ ()=>this.PreviousPage() } 
                content="Go Back"
              />
            </div>
        )
    }

}

export default unapproveEmail
