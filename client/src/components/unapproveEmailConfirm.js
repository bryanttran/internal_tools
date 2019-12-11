import React, { Component } from 'react'
import {Button} from 'semantic-ui-react'

const redStyle = { color: 'red'}

export class unapproveEmailConfirm extends Component {


    NextPage = () => {
        this.props.history.push({
            pathname: '/unapproveEmailComplete',
            state: {
                client: this.props.location.state.client,
                statementType: this.props.location.state.statementType,
                schema: this.props.location.state.schema,
                username: this.props.location.state.username,
                permission: this.props.location.state.permission
             }
        }, 
        )
    }

    PreviousPage = () => {
        this.props.history.goBack();
    }

    render() {
        return (
            <div>
                <h2>Unapprove Email for <span style={redStyle}>{this.props.location.state.client}</span> with statement type <span style={redStyle}>{this.props.location.state.statementType}</span>?</h2>
                {console.log(this.props.location.state)}
                <Button positive onClick={()=>this.NextPage()}>Contine</Button>
                <Button negative onClick={()=>this.PreviousPage()}>Go Back</Button>
            </div>
        )
    }
}

export default unapproveEmailConfirm
