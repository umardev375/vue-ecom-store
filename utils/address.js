import _isEqual from 'lodash-es/isEqual'
import _omit from 'lodash-es/omit'
function prePareAddress(obj) {
  const objClone = {
    ...{},
    ..._omit(obj, [
      'title',
      'defaultBilling',
      'defaultDelivery',
      'vat',
      'gender'
    ])
  }

  Object.keys(objClone).forEach((k) => {
    objClone[k] = objClone[k].toString().toLowerCase()
  })

  return objClone
}

export function compareAddresses(address1, address2) {
  return _isEqual(prePareAddress(address1), prePareAddress(address2))
}

export function normalizeAddress(address) {
  return {
    ...address,
    countryId: address.country || address.countryId,
    vat: address.vat ?? '',
    defaultDelivery: !!address.defaultDelivery,
    defaultBilling: !!address.defaultBilling
  }
}
