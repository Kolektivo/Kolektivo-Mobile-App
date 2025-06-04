import { getAllVendors } from 'src/kolektivo/activities/service'
import { Actions, setLoading, setVendors } from 'src/kolektivo/vendors/actions'
import { formatVendors } from 'src/kolektivo/vendors/utils'
import Logger from 'src/utils/Logger'
import { call, put, spawn, take } from 'typed-redux-saga'

let vendorsInitialized: boolean = false
export function* watchFetchVendors(): any {
  while (true) {
    try {
      if (vendorsInitialized) yield* take(Actions.FETCH_VENDORS)
      yield* put(setLoading(true))
      // @todo Fetch vendor data from off-chain source
      const vendors: any = yield* call(getAllVendors)
      const formattedVendorObject = formatVendors(vendors)
      yield* put(setVendors(formattedVendorObject))
      yield* put(setLoading(false))
      vendorsInitialized = true
    } catch (error: any) {
      Logger.error('Vendor Saga: ', 'Failed to get vendors', error)
      // @note The saga may throw an error when offline in any screen,
      // instead, of querying, the saga should wait until the client
      // tries to refresh the vendor list.
      yield* take(Actions.FETCH_VENDORS)
    }
  }
}

export function* vendorsSaga() {
  yield* spawn(watchFetchVendors)
}
