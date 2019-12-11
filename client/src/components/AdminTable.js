import React, { Component } from 'react'
import {Table} from 'semantic-ui-react'

const redStyle = { color: 'red'}

export class AdminTable extends Component {

    constructor(props) {
        super(props);
        this.RenderTBodyRow = this.RenderTBodyRow.bind(this)
    }

    componentDidMount() {
        this.setState({
            client: this.props.client,
            userList: this.props.userList
        })
    }

    nextPage = (username, password) => {
        this.props.nextPage(username, password)
    }

    RenderTBodyHeader = () => {
        return (!this.props.userList) ? null : (
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Username</Table.HeaderCell>
                    <Table.HeaderCell>Password</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
        )
    }

    RenderTBodyRow = () => {
        return (!this.props.userList) ? null : (
            <Table.Body>
                {console.log(this.props.userList)}
                {
                    this.props.userList.map((user) => {
                        console.log(user);
                        return (
                            <Table.Row 
                                onClick={ () => this.nextPage(user.username, user.password) } 
                                className='positive'
                                key={user.username}
                            >
                                <Table.Cell> {user.username} </Table.Cell>
                                <Table.Cell> {user.password} </Table.Cell> 
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

export default AdminTable
