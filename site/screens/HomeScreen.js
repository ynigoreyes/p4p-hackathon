import React from 'react'
import { connectionString } from '../constants/ConnectionString'
import { Text, View, Button, AsyncStorage } from 'react-native'
import ButtonSelect from '../components/ButtonSelect.js'
import Preview from '../components/Preview.js'
import ProjectDescription from '../components/ProjectDescription.js'
import PersonDescription from '../components/PersonDescription.js'
import axios from 'axios'

const img = require('../assets/images/charmander.png')

export const ROLES = {
  PROJECT: 'project',
  PEOPLE: 'people'
}

export default class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state
    return params
  }

  state = {
    userEmail: '',
    expanded: false,
    role: ROLES.PEOPLE,
    projects: [],
    currentChoice: 0,
    loading: true,
  }

  constructor(props) {
    super(props)
    this.props.navigation.setParams({ title: 'People -> Projects' })
  }

  componentDidMount() {
    AsyncStorage.getItem('email').then((email) => {
      axios.get(`${connectionString}/api/projects`).then(({ data }) => {
        const randNum = Math.floor(Math.random() * Math.floor(data.length))
        this.setState({
          projects: data,
          currentChoice: randNum,
          userEmail: email
        })
      }).catch((err) => {
        console.error(err)
      }).finally(() => {
        this.setState((prevState) => {
          return ({
            ...prevState,
            loading: false
          })
        })
      })
    })
  }

  handleChangeRole = () => {
    const newTitle = this.props.navigation.state.params.title === 'Project -> People'
      ? 'People -> Project'
      : 'Project -> People'

    this.props.navigation.setParams({ title: newTitle })

    if (newTitle === 'People -> Project') {
      this.setState({
        role: ROLES.PEOPLE
      })
    } else {
      this.setState({
        role: ROLES.PROJECT
      })
    }
  }

  handleExpandDesc = () => {
    this.setState({
      ...this.state,
      expanded: !this.state.expanded
    })
  }

  like = () => {
    const email1 = this.state.userEmail
    const email2 = this.state.projects[this.state.currentChoice].email
    axios.put(`${connectionString}/api/user`, { email1, email2 }).then(({ data }) => {
      this.props.navigation.navigate('Messages', { matchedEmail: email2 })
    }).catch((err) => {
      console.log('No Match')
    })
  }

  dislike = () => {
    const randNum = Math.floor(Math.random() * Math.floor(this.state.projects.length))
    this.setState({
      ...this.state,
      currentChoice: randNum,
    })
  }

  render() {
    {
      if (this.state.loading) {
        return (<Text>Loading...</Text>)
      } else {
        return (
          <View>
            {
              this.state.expanded
                ? null
                : <Preview imgURL={img}/>
            }
            {
              this.state.role === ROLES.PROJECT
                ? (
                  <PersonDescription
                    expanded={this.state.expanded}
                    handleExpandDesc={this.handleExpandDesc}
                  />
                )
                : (
                  <ProjectDescription
                    info={this.state.projects[this.state.currentChoice]}
                    expanded={this.state.expanded}
                    handleExpandDesc={this.handleExpandDesc}
                  />
                )
            }
            <Button
              title='Change Role'
              onPress={this.handleChangeRole}
            />
            <ButtonSelect
              onDislike={this.dislike}
              onLike={this.like}
            />
          </View>
        )
      }
    }
  }
}

