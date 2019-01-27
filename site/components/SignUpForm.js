import React from 'react'
import { Platform, View, TextInput, Button } from 'react-native'

const KEY = {
  shake: '0',
  slide: '1',
  tap: '2',
}

export default class SignUpForm extends React.Component {
  state = {
    email: '',
    birth: '',
    fname: '',
    lname: '',
    password: '',
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

  handleInputChange = (name) => (val) => {
    this.setState({
      ...this.state,
      [name]: val
    })
  }

  handleClear = () => {
    this.setState({
      ...this.state,
      password: '',
    })
  }

  render() {
    const { handleInputChange, handleGesture } = this
    return (
      <View>
        <TextInput
          placeholder='First Name'
          onChangeText={handleInputChange('fname')}
        />
        <TextInput
          placeholder='Last Name'
          onChangeText={handleInputChange('lname')}
        />
        <TextInput
          placeholder='Email'
          onChangeText={handleInputChange('email')}
        />
        {/* implement BAuthO Here*/}
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
          title='Register'
          onPress={() => this.props.handleRegister(this.state)}
        />
        <Button
          title='Try Again'
          onPress={this.handleClear}
        />
      </View>
    )
  }
}
