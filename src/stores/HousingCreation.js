import { observable, action } from 'mobx'
// import { database } from '../config/firebase'

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
}

export default new HousingCreation()
