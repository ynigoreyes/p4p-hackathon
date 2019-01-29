import React from 'react'
import { Text, Button, View, TextInput, ToastAndroid } from 'react-native'
import { connectionString } from '../constants/ConnectionString'
import axios from 'axios'

export default class ProfileScreen extends React.Component {
  state = {
    fname: '',
    lname: '',
    email: '', // How to get email from super(props)
    age: '',
    interests: ''
  }

  handleInputChange = (name) => (val) => {
    this.setState({
      ...this.state,
      [name]: val
    })
  }

  updateProfile = () => {
    const fname = this.state.fname
    const lname = this.state.lname
    const age = this.state.age
    const interests = this.state.interests
    axios.put(`${connectionString}/api/user`, { fname, lname, age, interests}).then(({ data }) => {
      ToastAndroid.show('Updating profile', ToastAndroid.SHORT)
    }).catch((err) => {
      console.log('Couldn\'t update profile')
    })
  }

  render() {
    const { handleInputChange } = this
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
            placeholder='Age'
            onChangeText={handleInputChange('age')}
          />
          <TextInput
            placeholder='Interests'
            onChangeText={handleInputChange('interests')}
          />
          <Button
            title='Save'
            onPress={this.updateProfile}
          />
      </View>
    )
  }
}
