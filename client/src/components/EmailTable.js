import React, { Component } from 'react'
import { Table } from 'semantic-ui-react'

var PropertiesReader = require('properties-reader');

let path = '//10.8.8.221/d/processing-ui/conf'

const redStyle = { color: 'red'}

export class EmailTable extends Component {
    constructor(props) {
        super(props);
        this.RenderTBodyRow = this.RenderTBodyRow.bind(this)

    }


    state = {
        client: '',
        emailList: []
    }

    componentDidMount() {
        this.setState({
            client: this.props.client,
            emailList: this.props.emailList
        })
    }
    
    nextPage = (statementType) => {
        this.props.nextPage(statementType)
    }

    RenderTBodyHeader = () => {
        return (!this.props.emailList) ? null : (
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Statement Type</Table.HeaderCell>
                    <Table.HeaderCell>Approval Status</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
        )
    }

    RenderTBodyRow = () => {
        return (!this.props.emailList) ? null : (
            <Table.Body>
                {
                    this.props.emailList.map((email) => {
                        console.log(email.STMT_TYPE);
                        return (
                            <Table.Row 
                                onClick={ email.EM_IS_APPROVED === 'Y' ? () => this.nextPage(email.STMT_TYPE) : ()=>{}} 
                                className={email.EM_IS_APPROVED === 'Y' ? 'positive' : 'negative'}
                                key={email.STMT_TYPE}
                            >
                                <Table.Cell> {email.STMT_TYPE} </Table.Cell>
                                <Table.Cell> {email.EM_IS_APPROVED} </Table.Cell> 
                            </Table.Row>
                        )
                    })
                }
            </Table.Body>
        )
    }


    render() {

        return (
            <div> {console.log(this.props.emailList)}
                <h2>Click on the row to disable approval status for <span style={redStyle}>{this.props.client}</span> </h2>
                <Table celled selectable>
                    {this.RenderTBodyHeader()}
                    {this.RenderTBodyRow()}
                </Table>
            </div>
        )
    }
}

export default EmailTable
