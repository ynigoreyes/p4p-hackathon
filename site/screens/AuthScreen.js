import React from 'react'
import layout from '../constants/Layout.js'
import { View, Text, Button, StyleSheet } from 'react-native'
import SignInScreen from './SignInScreen.js'
import SignUpScreen from './SignUpScreen.js'
import { SCREEN_STATES } from '../constants/ScreenStates.js'

const style = StyleSheet.create({
  default: {
    height: layout.window.height,
    width: layout.window.width,
    alignItems: 'center',
    justifyContent: 'center',
  }
})

function DefaultScreen({ handleScreenChange }) {
  return (
    <View>
      <Button
        title='Sign In'
        onPress={handleScreenChange(SCREEN_STATES.SIGN_IN)}
      />
      <Button
        title='Register'
        onPress={handleScreenChange(SCREEN_STATES.SIGN_UP)}
      />
    </View>
  )
}

export default class AuthScreen extends React.Component {
  state = {
    screen: SCREEN_STATES.DEFAULT
  }

  handleScreenChange = (newScreen) => () => {
    this.setState(() => ({
      screen: newScreen
    }))
  }

  render() {
    let show

    switch(this.state.screen) {
      case(SCREEN_STATES.DEFAULT):
        show = <DefaultScreen handleScreenChange={this.handleScreenChange} />
        break
      case(SCREEN_STATES.SIGN_IN):
        show = (
          <SignInScreen
            handleScreenChange={this.handleScreenChange}
            handleAuthChange={this.props.handleAuthChange}
          />
        )
        break
      case(SCREEN_STATES.SIGN_UP):
        show = (
          <SignUpScreen
            handleScreenChange={this.handleScreenChange}
            handleAuthChange={this.props.handleAuthChange}
          />
        )
        break
    }

    return (
      <View
        style={style.default}
      >
        {show}
      </View>
    )
  }
}

