import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'

import Input from '../../components/Input'
import DatePicker from '../../components/DatePicker'

@inject('travelStore', 'userStore')
@observer
class TravelCreationPage extends Component {
  render () {
    const { name, startDate, endDate, note, handleInputsChange, travelStore } = this.props

    return (
      <div>
        <Input name='name' onChange={handleInputsChange} value={name} />
        <DatePicker
          name='startDate'
          getDate={date => {
            travelStore.updateTravelCreation('startDate', date)
          }}
          value={startDate}
        />
        <DatePicker
          name='endDate'
          getDate={date => {
            travelStore.updateTravelCreation('endDate', date)
          }}
          value={endDate}
        />
        <Input name='note' onChange={handleInputsChange} value={note} multiline />
      </div>
    )
  }
}

export default TravelCreationPage
