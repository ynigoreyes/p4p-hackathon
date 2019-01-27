import React from 'react'
import { View, Button, AsyncStorage } from 'react-native'
import { SCREEN_STATES } from '../constants/ScreenStates.js'
import SignUpForm from '../components/SignUpForm.js'
import axios from 'axios'
import { connectionString } from '../constants/ConnectionString.js'

export default class SignUpScreen extends React.Component {

  handleRegister = (form) => {
    axios.post(`${connectionString}/api/users`, {
      email: form.email,
      password: form.password,
      name: `${form.fname} ${form.lname}`,
      dob: new Date
    }).then(() => {
      AsyncStorage.setItem('email', form.email).then(() => {
        this.props.handleAuthChange(true)
      }).catch((err) => {
        console.error(err)
      })
    }).catch(() => {
      this.props.handleAuthChange(false)
    })
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
