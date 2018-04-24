import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'

import Input from '../../components/Input'
import DatePicker from '../../components/DatePicker'

@inject('travelStore', 'userStore')
@observer
class TravelCreationPage extends Component {
  render () {
    const { name, startDate, endDate, handleInputsChange } = this.props

    return (
      <div>
        <div>Step one</div>
        <Input name='name' onChange={handleInputsChange} value={name} />
        <DatePicker name='startDate' onChange={handleInputsChange} value={startDate} />
        <DatePicker name='endDate' onChange={handleInputsChange} value={endDate} />
      </div>
    )
  }
}

export default TravelCreationPage
