import { LOGEMENTS, TRANSPORTS, DEPENSES, ACTIVITES, DOCUMENTS, LISTES } from './constants'

import { database } from './config/firebase'

/**
 * Méthode renvoyant le libellé du module en fonction de son id
 * @param {*} nIdModule id du libellé du module
 */
export function getModuleNameById (nIdModule) {
  switch (nIdModule) {
    case 0:
      return LOGEMENTS

    case 1:
      return TRANSPORTS

    case 2:
      return DEPENSES

    case 3:
      return ACTIVITES

    case 4:
      return DOCUMENTS

    case 5:
      return LISTES

    default :
      return 'INCONNU'
  }
}

export async function loadTravelUsers (travelId) {
  console.log('get users from ' + travelId)
  let travelUsersRef = database.ref('travels/' + travelId + '/members')
  let users = []
  travelUsersRef.once('value').then(snapshot => {
    snapshot.forEach((id) => {
      id = id.val()
      database.ref('users/' + id).once('value').then(usersSnapshot => {
        let userSnapshotVal = usersSnapshot.val()
        console.log(userSnapshotVal)
        users.push({ 'key': usersSnapshot.key, 'name': userSnapshotVal.name, 'surname': userSnapshotVal.surname })
      })
    })
  })
  console.log('houla ! ' + users)
  return users
}
