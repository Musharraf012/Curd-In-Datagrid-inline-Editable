import {  call, put, takeLatest } from 'redux-saga/effects';
import {  updateItem } from '../sagaservices/getItemService';
import { updateItemFailure, updateItemRequest, updateItemSuccess } from '../slices/updateItemSlice';
import { getItemRequest } from '../slices/getItemSlice';

// Worker Saga: Handles API calls
function* updateItemSaga(action) {
  try {
    const response = yield call(updateItem,action.payload);
    yield put(updateItemSuccess(response)); // Dispatch success action with data
    yield put(getItemRequest()); 
  } catch (error) {
    yield put(updateItemFailure()); // Dispatch failure action
  }
}

// Watcher Saga: Watches for actions
export function* watchUpdatedData() {
  yield takeLatest(updateItemRequest.type, updateItemSaga);
}