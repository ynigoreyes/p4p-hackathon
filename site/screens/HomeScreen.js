import React from 'react'
import { connectionString } from '../constants/ConnectionString'
import { Text, View, Button } from 'react-native'
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

  constructor(props) {
    super(props)
    this.props.navigation.setParams({ title: 'People -> Projects' })
  }

  componentDidMount() {
    axios.get(`${connectionString}/api/projects`).then(({ data }) => {
      console.log(data)
    }).catch((err) => {
      console.error(err)
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

  state = {
    expanded: false,
    role: ROLES.PEOPLE,
  }

  like = () => {
    console.log('like')
  }

  dislike = () => {
    console.log('dislike')
  }

  render() {
    return (
      <View>
        <Preview imgURL={img}/>
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

