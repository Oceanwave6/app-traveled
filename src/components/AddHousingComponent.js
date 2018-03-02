import React, { Component } from 'react'
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity, Platform } from 'react-native'
import CheckBox from 'react-native-checkbox'
import DatePicker from '@m5r/react-native-datepicker'
import { Actions } from 'react-native-router-flux'
import { observer, inject } from 'mobx-react'
import { format } from 'date-fns'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import SelectMultiple from 'react-native-select-multiple'

@inject('travelCreation')
@observer
export default class CreationScreenOne extends Component {
  state = {
    textNom: '',
    textAdresse: '',
    textContact: '',
    textNotes: '',
    dateBegin: '',
    selectedParticipants: [],
    dateEnd: ''
  }
    onSelectionsChange = (selectedParticipants) => {
      // selectedFruits is array of { label, value }
      this.setState({ selectedParticipants })
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
    const Participants = ['Patrick', 'José', 'McDurnam']

    return (
      <View style={styles.mainContainer}>
        <TouchableOpacity style={styles.btn}>
          <Text>++</Text>
        </TouchableOpacity>
        <KeyboardAwareScrollView style={styles.container}>
          <TextInput
            style={{ borderColor: 'gray', marginVertical: 5, borderBottomWidth: Platform.OS === 'ios' ? 1 : 0 }}
            placeholder='Nom'
            onChangeText={textNom => {
              this.setState({ textNom })
            }}
            value={this.state.textNom}
          />
          <TextInput
            style={{ borderColor: 'gray', marginVertical: 5, borderBottomWidth: Platform.OS === 'ios' ? 1 : 0 }}
            placeholder='Adresse'
            onChangeText={textAdresse => {
              this.setState({ textAdresse })
            }}
            value={this.state.textAdresse}
          />
          <View style={styles.datePickerContainer}>
            <DatePicker style={styles.datePick}
              date={dateBegin}
              mode='date'
              placeholder='Date de début'
              format='YYYY-MM-DD'
              minDate={format(Date.now(), 'YYYY-MM-DD')}
              confirmBtnText='Confirm'
              cancelBtnText='Cancel'
              iconSource={null}
              customStyles={{ placeholderText: { position: 'absolute', left: 0 } }}
              onDateChange={date => {
                this.setState({ dateBegin: date })
              }}
            />
            <DatePicker
              style={styles.datePick}
              date={dateEnd}
              mode='date'
              placeholder='Date de fin'
              format='YYYY-MM-DD'
              minDate={format(Date.now(), 'YYYY-MM-DD')}
              confirmBtnText='Confirm'
              cancelBtnText='Cancel'
              iconSource={null}
              customStyles={{ placeholderText: { position: 'absolute', left: 0 } }}
              onDateChange={date => {
                this.setState({ dateEnd: date })
              }}
            />
          </View>
          <TextInput style={{ marginVertical: 5, borderColor: 'gray', borderBottomWidth: Platform.OS === 'ios' ? 1 : 0 }}
            placeholder='Contact'
            onChangeText={textContact => {
              this.setState({ textContact })
            }}
            value={this.state.textContact}
          />
          <TextInput
            style={{ borderColor: 'gray', marginVertical: 5, borderBottomWidth: Platform.OS === 'ios' ? 1 : 0 }}
            placeholder='Notes'
            onChangeText={textNotes => {
              this.setState({ textNotes })
            }}
            value={this.state.textNotes}
          />
          <Text style={styles.text}>Liste des personnes</Text>
          <View>
            <SelectMultiple
              items={Participants}
              selectedItems={this.state.selectedParticipants}
              onSelectionsChange={this.onSelectionsChange} />
          </View>
        </KeyboardAwareScrollView>
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
    marginHorizontal: 30
  },
  text: {
    marginLeft: 5
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff'
  },
  btn: {
    position: 'absolute',
    width: 50,
    height: 50,
    bottom: 50,
    right: 10,
    backgroundColor: '#D42B64',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100
  },
  datePick: {
    width: 150,
    marginLeft: 5
  },
  datePickerContainer: {
    marginVertical: 5,
    flexDirection: 'row'
  }
})
