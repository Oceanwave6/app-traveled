import React, { Component } from 'react'
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity, Platform } from 'react-native'
import DatePicker from '@m5r/react-native-datepicker'
import { Actions } from 'react-native-router-flux'
import { observer, inject } from 'mobx-react'
import { format } from 'date-fns'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import SelectMultiple from 'react-native-select-multiple'
import { database } from '../config/firebase'

@inject('housing')
@observer
export default class AddHousingComponent extends Component {
  state = {
    name: '',
    address: '',
    dateBegin: '',
    dateEnd: '',
    travelMembers: [],
    members: [],
    contact: '',
    notes: '',
    error: ''
  }

  // Fonction pour charger la liste des participants à un voyage donné dans le select multiple
  loadTravelUsers = (travelId) => {
    let travelUsersRef = database.ref('travels/' + travelId + '/members')

    travelUsersRef.on('value', (travelUsersSnapshot) => {
      let users = []
      travelUsersSnapshot.forEach((id) => {
        database.ref('users/' + id.val()).once('value').then(usersSnapshot => {
          let userSnapshotVal = usersSnapshot.val()
          users.push({
            'value': usersSnapshot.key,
            'label': userSnapshotVal.surname + ' ' + userSnapshotVal.name
          })
          this.setState({ travelMembers: users })
        }).catch(error => {
          console.log(error)
        })
      })
    })
  }

  componentDidMount = () => {
    // TODO remplacer par selectedTravel
    this.loadTravelUsers('-L3mP01U5xPgHxONVDpC')
  }

  onSelectionsChange = (members) => {
    this.setState({ members })
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

  // Fonction qui valide la création d'un logement
  validate = () => {
    // Récupération du store et des informations saisis dans les champs
    const { housing } = this.props
    const { name, address, dateBegin, dateEnd, members, contact, notes } = this.state

    // Vérification que le nom du logement a bien été saisi
    if (name !== '') {
      housing.addName(name)
      housing.addAddress(address)
      housing.addDateBegin(dateBegin)
      housing.addDateEnd(dateEnd)
      housing.addMembers(members)
      housing.addContact(contact)
      housing.addNotes(notes)

      // TODO passer le selectedTravel plutôt que l'id en dur
      housing.createHousing('-L3mP01U5xPgHxONVDpC')

      Actions.housingsList({ selectedTravel: this.props.selectedTravel })
    } else {
      this.setState({ error: 'Veuillez saisir le nom du logement' })
    }
  }

  render = () => {
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
          {
            this.state.error !== '' && <Text style={{ color: '#f00' }}>{this.state.error}</Text>
          }
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
              format='YYYY-MM-DD'
              minDate={format(Date.now(), 'YYYY-MM-DD')}
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
              format='YYYY-MM-DD'
              minDate={format(Date.now(), 'YYYY-MM-DD')}
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
          <View>
            <SelectMultiple
              items={this.state.travelMembers}
              selectedItems={this.state.members}
              onSelectionsChange={this.onSelectionsChange} />
          </View>
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
    justifyContent: 'center',
    zIndex: 100
  },
  datePick: {
    width: 150
  },
  datePickerContainer: {
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  }
})
