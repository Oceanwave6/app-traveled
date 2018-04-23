import React, { Component } from 'react'
import Grid from 'material-ui/Grid'
import { withStyles } from 'material-ui/styles'
import Avatar from './Avatar'

const styles = {
  logement: {
    marginTop: '50px',
    textAlign: 'center',
    backgroundColor: '#ddd',
    alignItems: 'center'
  },
  dottedLine: {
    borderRight: 'dashed 3px #e7796c',
    width: '50%',
    height: '100%'
  },
  icone: {
    display: 'flex',
    alignItems: 'center'
  },
  info: {
    textAlign: 'left',
    padding: '1%'
  },
  rowAvatar: {
    display: 'flex',
    padding: '1%'
  },
  avatarRecipients: {
    width: 20,
    height: 20,
    margin: 2,
    fontSize: '14px',
    padding: '3px'
  },
  address: {
    fontSize: '14px'
  }
}

class OneLogement extends Component {
  render () {
    const { classes } = this.props

    return (
      <div className={classes.logement}>
        <Grid container spacing={0}>
          <Grid item xs={1}>
            <div className={classes.dottedLine} />
          </Grid>
          <Grid className={classes.icone} item xs={3}>
            {this.props.logementTest.icone}
          </Grid>
          <Grid className={classes.info} item xs={8}>
            <h1>{this.props.logementTest.name}</h1>
            <h2>{this.props.logementTest.address}</h2>
            <div className={classes.rowAvatar}>
              <Avatar className={classes.avatarRecipients} />
              <Avatar className={classes.avatarRecipients} />
              <Avatar className={classes.avatarRecipients} />
              <Avatar className={classes.avatarRecipients} />
            </div>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default withStyles(styles)(OneLogement)
