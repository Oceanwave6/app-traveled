import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import Avatar from './Avatar'
import Card, { CardContent, CardMedia } from 'material-ui/Card'
import { withStyles } from 'material-ui/styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const styles = {
  card: {
    maxWidth: 345
  },
  media: {
    height: 0,
    paddingTop: '56.25%'
  }
}
@inject('appStore', 'userStore')
@observer
class ListItemVoyage extends Component {
  render () {
    const travel = this.props.travel
    return (
      <Card style={styles.card}>
        <CardMedia
          style={styles.media}
          src={travel.image}
          title={travel.name}
        />
        <CardContent>
          <div>
            {travel.participants && travel.participants.map((item) => {
              return <Avatar key={item.id} src={item.avatar} />
            })}
            <FontAwesomeIcon style={{color: '#F57464', fontSize: 50}} icon={['fas', 'plus-circle']} />
          </div>
          <h1>{travel.name}</h1>
          <h2>{travel.startDate} - {travel.endDate}</h2>
        </CardContent>
      </Card>)
  }
}
export default withStyles(styles)(ListItemVoyage)
