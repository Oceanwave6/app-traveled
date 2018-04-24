import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'

@inject('travelStore', 'userStore')
@observer
class TravelCreationPageThree extends Component {
  render () {
    return (
      <div>
        <div>Step 3</div>
      </div>
    )
  }
}

export default TravelCreationPageThree
