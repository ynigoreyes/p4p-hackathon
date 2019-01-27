import React from 'react'
import { View } from 'react-native'
import SignInForm from '../components/SignInForm.js'
import axios from 'axios'

export default class SignInScreen extends React.Component {

  handleLogin = (form) => {
    if (true) { // Successfully logged in
      this.props.handleAuthChange(true)
    }
  }

  render() {
    const { handleScreenChange } = this.props
    return (
      <View>
        <SignInForm
          handleScreenChange={handleScreenChange}
          handleLogin={this.handleLogin}
        />
      </View>
    )
  }
}
