import appReducer from "./appSlice";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/es/storage";

const persistConfig = {
    key: 'root',
    storage: storage
};

const reducer = combineReducers({
    app: appReducer
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultSerializer) => getDefaultSerializer({ serializableCheck: false })
});

export default store;
