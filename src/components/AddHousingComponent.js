import React, { Component } from 'react'
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity, Platform } from 'react-native'
import CheckBox from 'react-native-checkbox'
import DatePicker from '@m5r/react-native-datepicker'
// import { Actions } from 'react-native-router-flux'
import { observer, inject } from 'mobx-react'
import { format } from 'date-fns'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

@inject('housingCreation')
@observer
export default class AddHousingComponent extends Component {
  state = {
    name: '',
    address: '',
    dateBegin: '',
    dateEnd: '',
    members: [],
    contact: '',
    notes: ''
  }

  handleMembersChange = (text, key) => {
    this.setState(prevState => {
      const { members } = prevState
      members[key].text = text

      return {
        members
      }
    })
  }

  validate = () => {
    const { housingCreation } = this.props
    const { name, address, dateBegin, dateEnd, members, contact, notes } = this.state

    housingCreation.addName(name)
    housingCreation.addAddress(address)
    housingCreation.addDateBegin(dateBegin)
    housingCreation.addDateEnd(dateEnd)
    housingCreation.addMembers(members)
    housingCreation.addContact(contact)
    housingCreation.addNotes(notes)

    housingCreation.createHousing('-L3mP01U5xPgHxONVDpC')

    // Actions.formPartTwo()
  }
  render () {
    const { dateBegin, dateEnd } = this.state

    return (
      <View style={styles.mainContainer}>
        <TouchableOpacity style={styles.btn}>
          <Text>++</Text>
        </TouchableOpacity>
        <KeyboardAwareScrollView style={styles.container}>
          <TextInput
            style={{ borderColor: 'gray', marginVertical: 5, borderBottomWidth: Platform.OS === 'ios' ? 1 : 0 }}
            placeholder='Nom'
            onChangeText={name => {
              this.setState({ name })
            }}
            value={this.state.name}
          />
          <TextInput
            style={{ borderColor: 'gray', marginVertical: 5, borderBottomWidth: Platform.OS === 'ios' ? 1 : 0 }}
            placeholder='Adresse'
            onChangeText={address => {
              this.setState({ address })
            }}
            value={this.state.address}
          />
          <View style={styles.datePickerContainer}>
            <DatePicker style={styles.datePick}
              date={dateBegin}
              mode='date'
              placeholder='Date de début'
              format='DD-MM-YYY'
              minDate={format(Date.now(), 'DD-MM-YYY')}
              confirmBtnText='Confirmer'
              cancelBtnText='Annuler'
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
              format='DD-MM-YYY'
              minDate={format(Date.now(), 'DD-MM-YYY')}
              confirmBtnText='Confirmer'
              cancelBtnText='Annuler'
              iconSource={null}
              customStyles={{ placeholderText: { position: 'absolute', left: 0 } }}
              onDateChange={date => {
                this.setState({ dateEnd: date })
              }}
            />
          </View>
          <TextInput style={{ marginVertical: 5, borderColor: 'gray', borderBottomWidth: Platform.OS === 'ios' ? 1 : 0 }}
            placeholder='Contact'
            onChangeText={contact => {
              this.setState({ contact })
            }}
            value={this.state.contact}
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
          <CheckBox
            label='Label'
            checked={1}
            onChange={(checked) => console.log('I am checked', checked)}
          />
        </KeyboardAwareScrollView>
        <Button
          onPress={this.validate}
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
    justifyContent: 'center'
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
