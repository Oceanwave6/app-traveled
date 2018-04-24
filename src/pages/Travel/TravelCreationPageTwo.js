import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'

import Input from '../../components/Input'

@inject('travelStore', 'userStore')
@observer
class TravelCreationPage extends Component {
  render () {
    const { name, startDate, endDate, handleInputsChange } = this.props

    return (
      <div>
        <div>Step one</div>
        <Input name='name' onChange={handleInputsChange} value={name} />
        <Input name='startDate' onChange={handleInputsChange} value={startDate} />
        <Input name='endDate' onChange={handleInputsChange} value={endDate} />
      </div>
    )
  }
}

export default TravelCreationPage
