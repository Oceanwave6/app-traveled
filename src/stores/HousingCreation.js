import { observable, action } from 'mobx'
import { database } from '../config/firebase'

class HousingCreation {
    @observable name = ''
    @observable address = ''
    @observable dateBegin = ''
    @observable dateEnd = ''
    @observable contact = ''
    @observable notes = ''

    @action
    addName (name) {
      this.name = name
    }

    @action
    addAddress (address) {
      this.address = address
    }

    @action
    addDateBegin (dateBegin) {
      this.dateBegin = dateBegin
    }

    @action
    addDateEnd (dateEnd) {
      this.dateEnd = dateEnd
    }

    @action
    addMembers (members) {
      this.members = members
    }

    @action
    addContact (contact) {
      this.contact = contact
    }

    @action
    addNotes (notes) {
      this.notes = notes
    }

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
}

export default new HousingCreation()
