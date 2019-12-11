import React, { Component } from 'react'
import {Button, Input, Message} from 'semantic-ui-react'

const redStyle = { color: 'red'}

export class resetAdminPasswordConfirm extends Component {

    state = {
        newPassword: "",
        newPasswordConfirm: "",
        passwordError: false
    }

    passwordLogic = () => {
        if((this.state.newPassword === this.state.newPasswordConfirm) && !(this.state.newPassword ==="" || this.state.newPasswordConfirm ==="")) this.nextPage();
        else this.setState({passwordError: true})
    }

    nextPage = () => {
        this.props.history.push({
            pathname: '/resetAdminPasswordComplete',
            state: {
                client: this.props.location.state.client,
                password: this.state.newPassword,
                username: this.props.location.state.username,
                permission: this.props.location.state.permission
             }
        })
    }

    previousPage = () => {
        this.props.history.goBack();
    }

    handleChange = (e) => {   
        console.log(this.state) 
        this.setState({
          [e.target.name]: event.target.value
        });
    }

    render() {
        return (
            <div>
                <h2>Reset password for <span style={redStyle}>{this.props.location.state.client}</span>, user  <span style={redStyle}>{this.props.location.state.username}</span>?</h2>
                {//console.log(this.props.location.state)
                }
                <Input 
                    placeholder='New password' 
                    onChange={ this.handleChange}
                    name='newPassword' 
                />
                <br />
                <br />
                <Input 
                    placeholder='Confirm new password' 
                    onChange={this.handleChange} 
                    name='newPasswordConfirm' 
                />
                <br />
                <br />
                {(this.state.passwordError === true) ? 
                    <Message error header='Password is incorrect' content='Please try entering new passwords again.' className='loginError' /> 
                    : null }
                <Button onClick={() => console.log(this.state)} />
                <Button positive onClick={()=>this.passwordLogic()}>Contine</Button>
                <Button negative onClick={()=>this.previousPage()}>Go Back</Button>
            </div>
        )
    }
}

export default resetAdminPasswordConfirm
