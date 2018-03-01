import React, { Component } from 'react'
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity } from 'react-native'
import DatePicker from 'react-native-datepicker'
import { Actions } from 'react-native-router-flux'
import { observer, inject } from 'mobx-react'
import { format } from 'date-fns'

@inject('travelCreation')
@observer
export default class CreationScreenOne extends Component {
  state = {
    text: '',
    dateBegin: '',
    dateEnd: ''
  }

  handleNavigation = () => {
    const { travelCreation } = this.props
    const { dateBegin, dateEnd, text } = this.state

    travelCreation.addName(text)
    travelCreation.addDateBegin(dateBegin)
    travelCreation.addDateEnd(dateEnd)

    Actions.formPartTwo()
  }
  render () {
    const { dateBegin, dateEnd } = this.state

    return (
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <TouchableOpacity style={styles.btn}>
            <Text>++</Text>
          </TouchableOpacity>
          <TextInput
            style={{ height: 40, borderColor: 'gray' }}
            placeholder='Nom'
            onChangeText={text => {
              this.setState({ text })
            }}
            value={this.state.text}
          />
          <TextInput
            style={{ height: 40, borderColor: 'gray' }}
            placeholder='Date'
            onChangeText={text => {
              this.setState({ text })
            }}
            value={this.state.text}
          />
          <DatePicker
            style={{ width: 150 }}
            date={dateBegin}
            mode='date'
            placeholder='date de début'
            format='YYYY-MM-DD'
            minDate={format(Date.now(), 'YYYY-MM-DD')}
            confirmBtnText='Confirm'
            cancelBtnText='Cancel'
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0
              },
              dateInput: {
                marginLeft: 36
              }
            }}
            onDateChange={date => {
              this.setState({ dateBegin: date })
            }}
          />
          <DatePicker
            style={{ width: 150 }}
            date={dateEnd}
            mode='date'
            placeholder='date de fin'
            format='YYYY-MM-DD'
            minDate={format(Date.now(), 'YYYY-MM-DD')}
            confirmBtnText='Confirm'
            cancelBtnText='Cancel'
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0
              },
              dateInput: {
                marginLeft: 36
              }
            }}
            onDateChange={date => {
              this.setState({ dateEnd: date })
            }}
          />
          <TextInput
            style={{ height: 40, borderColor: 'gray' }}
            placeholder='Contact'
            onChangeText={text => {
              this.setState({ text })
            }}
            value={this.state.text}
          />
          <TouchableOpacity style={styles.btn2}>
            <Text>Ajouter une personne</Text>
          </TouchableOpacity>
          <TextInput
            style={{ height: 40, borderColor: 'gray' }}
            placeholder='Notes'
            onChangeText={text => {
              this.setState({ text })
            }}
            value={this.state.text}
          />
        </View>
        <Button
        /* onPress={this.handleNavigation} */
          title='Valider'
          color='#D42B64'
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
    paddingLeft: 30,
    paddingRight: 30
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff'
  },
  btn: {
    position: 'absolute',
    width: 50,
    height: 50,
    bottom: 10,
    right: 10,
    backgroundColor: '#D42B64',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
