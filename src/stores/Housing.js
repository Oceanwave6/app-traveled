import { observable, action, computed } from 'mobx'
import { database } from '../config/firebase'

class Housing {
  @observable housings = []

  @observable name = ''
  @observable address = ''
  @observable dateBegin = ''
  @observable dateEnd = ''
  @observable contact = ''
  @observable notes = ''

  @action
  addName (name) { this.name = name }

  @action
  addAddress (address) { this.address = address }

  @action
  addDateBegin (dateBegin) { this.dateBegin = dateBegin }

  @action
  addDateEnd (dateEnd) { this.dateEnd = dateEnd }

  @action
  addMembers (members) { this.members = members }

  @action
  addContact (contact) { this.contact = contact }

  @action
  addNotes (notes) { this.notes = notes }

  // Fonction de création d'un logement sur firebase
  createHousing (id) {
    const travelRef = database.ref('travels/' + id + '/housings').push({
      name: this.name,
      address: this.address,
      dateBegin: this.dateBegin,
      dateEnd: this.dateEnd,
      contact: this.contact,
      notes: this.notes
    })

    this.members.forEach(member => {
      database.refFromURL(`${travelRef.toString()}/members`).push(member.value)
    })
  }

  @action
  pushHousings (housings) {
    housings.filter(Boolean).forEach(housing => {
      housing.membres.forEach((member, key) => {
        database
          .ref(`utilisateurs/${member}`)
          .once('value')
          .then(userSnapshot => {
            housing.membres[key] = userSnapshot.val()
          })
      })
      console.log(housing)
      this.housings.push(housing)
    })
  }

  @action
  fetchHousings () {
    database
      .ref(`voyages`)
      .once('value')
      .then(snapshot => {
        snapshot.forEach(item => {
          const itemValue = item.val().logements

          itemValue.forEach(({ membres }) => {
            membres.forEach((member, key) => {
              database
                .ref(`utilisateurs/${member}`)
                .once('value')
                .then(userSnapshot => {
                  membres[key] = userSnapshot.val()
                })
            })
          })

          this.housings.push(itemValue)
        })
      })
  }

  @computed
  get getHousings () {
    return this.housings
  }
}

export default new Housing()
