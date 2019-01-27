import React from 'react'
import { View, TextInput, Button } from 'react-native'

const KEY = {
  shake: '0',
  tap: '1',
  slide: '2',
}

export default class SignInForm extends React.Component {
  state = {
    email: '',
    password: ''
  }

  handleEmailChange = (email) => {
    this.setState({
      ...this.state,
      email
    })
  }

  handleGesture = (type) => {
    switch(type) {
      case('shake'):
        this.setState((prevState) => {
          return ({
            ...prevState,
            password: prevState.password + KEY.shake
          })
        })
        break
      case('tap'):
        this.setState((prevState) => {
          return ({
            ...prevState,
            password: prevState.password + KEY.tap
          })
        })
        break
      case('slide'):
        this.setState((prevState) => {
          return ({
            ...prevState,
            password: prevState.password + KEY.slide
          })
        })
        break
    }
  }

  render() {
    console.log(this.props)
    const { handleEmailChange, handleGesture } = this
    return (
      <View>
        <TextInput
          placeholder='First Name'
          onChangeText={handleEmailChange}
        />
        <Button
          title='Shake'
          onPress={() => handleGesture('shake')}
        />
        <Button
          title='Tap'
          onPress={() => handleGesture('tap')}
        />
        <Button
          title='Slide'
          onPress={() => handleGesture('slide')}
        />
        <Button
          title='Login'
          onPress={() => this.props.handleLogin(this.state)}
        />
      </View>
    )
  }
}
