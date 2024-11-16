import {  call, put, takeLatest } from 'redux-saga/effects';
import { getItem } from '../sagaservices/getItemService';
import { getItemFailure, getItemRequest, getItemSuccess } from '../slices/getItemSlice';

// Worker Saga: Handles API calls
function* fetchItemSaga() {
  try {
    const response = yield call(getItem);
    yield put(getItemSuccess(response)); // Dispatch success action with data
  } catch (error) {
    yield put(getItemFailure()); // Dispatch failure action
  }
}

// Watcher Saga: Watches for actions
export function* watchFetchData() {
  yield takeLatest(getItemRequest.type, fetchItemSaga);
}