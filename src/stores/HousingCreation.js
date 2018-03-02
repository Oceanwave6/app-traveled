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
      this.name = address
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
    addContact (contact) {
      this.name = contact
    }

    @action
    addNotes (notes) {
      this.name = notes
    }

    createHousing () {
      const travelRef = database.ref('voyages/0/logements').push({
        name: this.name,
        dateBegin: this.dateBegin,
        dateEnd: this.dateEnd
      })
  
      this.emails.forEach(email => {
        database.refFromURL(`${travelRef.toString()}/emails`).push(email)
      })

      this.modules.forEach(module => {
        database.refFromURL(`${travelRef.toString()}/modules`).push(module)
      })
      this.sendNewTravelMail()
    }
}

export default new HousingCreation()
