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
  setName (name) { this.name = name }

  @action
  setAddress (address) { this.address = address }

  @action
  setDateBegin (dateBegin) { this.dateBegin = dateBegin }

  @action
  setDateEnd (dateEnd) { this.dateEnd = dateEnd }

  @action
  setMembers (members) { this.members = members }

  @action
  setContact (contact) { this.contact = contact }

  @action
  setNotes (notes) { this.notes = notes }

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
