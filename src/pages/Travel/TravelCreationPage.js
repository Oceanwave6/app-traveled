import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'

import TravelCreationPageOne from './TravelCreationPageOne'
import TravelCreationPageTwo from './TravelCreationPageTwo'
import TravelCreationPageThree from './TravelCreationPageThree'

@inject('userStore')
@observer
class TravelCreationPage extends Component {
  state = {
    participants: [this.props.userStore.user.uid],
    step: 1
  }

  handleInputsChange = ({ target: { name, value } }) => {
    this.props.travelStore.updateTravelCreation(name, value)
  }

  renderSwitch = () => {
    switch (this.state.step) {
      case 1:
        return <TravelCreationPageOne handleInputsChange={this.handleInputsChange} />

      case 2:
        return <TravelCreationPageTwo handleInputsChange={this.handleInputsChange} />

      case 3:
        return <TravelCreationPageThree handleInputsChange={this.handleInputsChange} />

      default:
    }
  }

  render () {
    return <div>{this.renderSwitch()}</div>
  }
}

export default TravelCreationPage
