import React from 'react'
import { View, Button } from 'react-native'
import { SCREEN_STATES } from './AuthScreen.js'
import SignUpForm from '../components/SignUpForm.js'
import axios from 'axios'

export default class SignUpScreen extends React.Component {

  handleRegister = (form) => {
    if (true) { // Successfully logged in
      this.props.handleAuthChange(true)
    }
  }

  render() {
    const { handleInputChange, handleScreenChange } = this.props
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <SignUpForm handleRegister={this.handleRegister}/>
        <Button
          title='Go Back'
          onPress={handleScreenChange(SCREEN_STATES.DEFAULT)}
        />
      </View>
    )
  }
}
