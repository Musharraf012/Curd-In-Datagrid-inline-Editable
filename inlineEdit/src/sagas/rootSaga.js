import { all } from "redux-saga/effects";
import { watchFetchData } from "./getItemSaga";
import { watchUpdatedData } from "./updateItemSaga";

export default function* rootSaga() {
    yield all([watchFetchData(),watchUpdatedData()]);
  }