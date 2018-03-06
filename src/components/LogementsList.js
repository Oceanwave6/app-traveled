import React, { Component } from 'react'
import { SectionList, StyleSheet, Text, View, Button } from 'react-native'
import { database } from '../config/firebase'

export default class HousingList extends Component {
  constructor (props) {
    super(props)
    this.travelHousingsRef = database.ref('travels/' + this.props.travelKey + '/housings')
    this.state = {
      sections: []
    }
  }

  componentDidMount () {
    this.travelHousingsRef
      .orderByKey()
      .once('value')
      .then(logementsSnapshot => {
        const logements = logementsSnapshot.val()
        console.log('logements : ')
        console.log(logements)
        const logementsIds = Object.keys(logements)
        const datesDebut = []
        logementsIds.forEach(id => datesDebut.push(logements[id].dateBegin))
        console.log(datesDebut)
        // const sortedLogements = datesDebut.reduce((sortedLogements, dateDebut) => {
        //   sortedLogements[dateDebut] = logements.filter(logement => logement.dateBegin === dateDebut)
        //   return sortedLogements
        // }, {})
        const sections = Object.keys(logements)
          .map(dateDebut => ({
            title: dateDebut,
            data: logements[dateDebut].address
          }))
        this.setState({ sections })
      })
  }

  renderItem = ({ item }) => (
    <View>
      <Text style={styles.item}>{item}</Text>
      <Button title='Rejoindre' />
    </View>
  )

  renderSectionHeader = ({ section }) => (
    <Text style={styles.sectionHeader}>
      {section.title}
    </Text>
  )

  render () {
    const { sections } = this.state

    return (
      <View style={styles.container}>
        <SectionList
          sections={sections}
          renderItem={this.renderItem}
          renderSectionHeader={this.renderSectionHeader}
          keyExtractor={(item, index) => index}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)'
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44
  }
})
