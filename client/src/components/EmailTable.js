import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Table } from 'semantic-ui-react'

let emailKey = [];

const redStyle = { color: 'red'}


export class EmailTable extends Component {
    constructor(props) {
        super(props);
        this.RenderTBodyRow = this.RenderTBodyRow.bind(this)

    }
    static propTypes = {

    }

    getEmailKey = (email) => {
        emailKey=Object.keys(email);
        console.log(emailKey);
    }

    state: {
        client: '',
        emailList: []
    }

    componentDidMount() {
        this.setState({
            client: this.props.client,
            emailList: this.props.emailList
        }), () => console.log(`state updated: ${this.state}`)

    }
    
    clog = (statementType) => {
        console.log(this.props);

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

    addStyleIfApproved = (isApproved) => {
        return (isApproved === 'Y' ? redStyle : '')
    }

    RenderTBodyRow = () => {
        return (!this.props.emailList) ? null : (
            <Table.Body>
                {
                    this.props.emailList.map((email) => {
                        console.log(email.statementType);
                        return (
                            <Table.Row onClick={ () => this.clog(email.statementType)} className={email.isApproved === 'Y' ? 'positive' : 'negative'}>
                                <Table.Cell> { email.statementType}</Table.Cell>
                                <Table.Cell > {email.isApproved}</Table.Cell> 
                            </Table.Row>
                        )
                    })
                }
            </Table.Body>
        )
    }


    render() {

        return (
            <div>
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
