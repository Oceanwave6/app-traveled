import React, { Component } from 'react'

import Input from '../../components/Input'
import Button from '../../components/Button'
import { observer, inject } from 'mobx-react'

@inject('travelStore', 'userStore')
@observer
class TravelCreationPage extends Component {
  state = {
    participants: [this.props.userStore.user.uid]
  }

  handleInputsChange = ({ target: { name, value } }) => {
    this.props.travelStore.updateTravelCreation(name, value)
  }

  renderStepOne = () => {
    const { name, startDate, endDate } = this.props

    return (
      <div>
        <div>Step one</div>
        <Input name='name' onChange={this.handleInputsChange} value={name} />
        <Input name='startDate' onChange={this.handleInputsChange} value={startDate} />
        <Input name='endDate' onChange={this.handleInputsChange} value={endDate} />
      </div>
    )
  }

  renderStepTwo = () => {
    const { modules } = this.props

    return (
      <div>
        <div>Step one modules</div>
        {JSON.stringify(modules)}
      </div>
    )
  }

  renderStepThree = () => (
    <div>
      <div>Step one</div>
    </div>
  )

  render () {
    return (
      <div className='container is-fluid'>
        {/* <Input
          name='dateBegin'
          onChange={this.updateField}
          value={dateBegin}
        />
        <Input name='dateEnd' onChange={this.updateField} value={dateEnd} />
        */}
        <Button
          color='primary'
          onClick={() => {
            this.props.travelStore.create(this.state)
            this.props.parent.handleClose()
          }}
        >
          Ajouter
        </Button>
      </div>
    )
  }
}

export default TravelCreationPage
