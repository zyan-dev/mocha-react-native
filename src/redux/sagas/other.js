import {call, put, select} from 'redux-saga/effects';
import * as types from '../actions/types';
import API from 'services/api';
import RNIap from 'react-native-iap';
import {showAlert} from 'services/operators';

export function* purchaseSubscription(action) {
  try {
    RNIap.finishTransaction(action.payload.purchase, false);
    // const response = yield call(API.purchaseSubscription, action.payload.receipt);
    // if (response.data.status === 'success') {

    // } else {
    //   showAlert(response.data.data.message);
    // }
  } catch (e) {
    showAlert(e.toString());
  }
}
